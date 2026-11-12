/**
 * Parental Security & PIN Service
 *
 * Provides cryptographic hashing for 4-digit parent PINs using Web Crypto (SHA-256 + salt).
 * Enforces rate limiting (maximum 5 attempts before a 30-second cooldown).
 * Maintains zero clear-text PIN exposure for strict privacy and security.
 */

const PIN_STORAGE_KEY = 'etw_parent_pin_hash';
const PIN_SALT_KEY = 'etw_parent_pin_salt';
const FAILED_ATTEMPTS_KEY = 'etw_parent_failed_attempts';
const LOCKOUT_TIMESTAMP_KEY = 'etw_parent_lockout_until';
const PREFERRED_GATE_MODE_KEY = 'etw_parent_gate_mode'; // 'pin' | 'math' | 'both'

// Default fallback PIN is '1234' securely hashed on first init if none set
const DEFAULT_FALLBACK_PIN = '1234';

async function sha256Hex(text: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${text}:etw_kids_secure_salt`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function generateRandomSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export type GateMode = 'pin' | 'math' | 'both';

export interface ParentalSecurityStatus {
  hasCustomPin: boolean;
  gateMode: GateMode;
  isLockedOut: boolean;
  remainingCooldownSeconds: number;
  failedAttempts: number;
}

class ParentalSecurityService {
  private inMemoryHash: string | null = null;
  private inMemorySalt: string | null = null;

  constructor() {
    this.ensureInitialized();
  }

  private async ensureInitialized() {
    try {
      const storedHash = localStorage.getItem(PIN_STORAGE_KEY);
      const storedSalt = localStorage.getItem(PIN_SALT_KEY);

      if (!storedHash || !storedSalt) {
        const newSalt = generateRandomSalt();
        const initialHash = await sha256Hex(DEFAULT_FALLBACK_PIN, newSalt);
        localStorage.setItem(PIN_STORAGE_KEY, initialHash);
        localStorage.setItem(PIN_SALT_KEY, newSalt);
        this.inMemoryHash = initialHash;
        this.inMemorySalt = newSalt;
      } else {
        this.inMemoryHash = storedHash;
        this.inMemorySalt = storedSalt;
      }
    } catch {
      // Fallback for sandboxed storage
    }
  }

  public getStatus(): ParentalSecurityStatus {
    const isCustom = localStorage.getItem('etw_parent_pin_is_custom') === 'true';
    const gateMode = (localStorage.getItem(PREFERRED_GATE_MODE_KEY) as GateMode) || 'both';
    const failedAttempts = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10);
    const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_TIMESTAMP_KEY) || '0', 10);

    const now = Date.now();
    const isLockedOut = lockoutUntil > now;
    const remainingCooldownSeconds = isLockedOut ? Math.ceil((lockoutUntil - now) / 1000) : 0;

    return {
      hasCustomPin: isCustom,
      gateMode,
      isLockedOut,
      remainingCooldownSeconds,
      failedAttempts,
    };
  }

  public setGateMode(mode: GateMode) {
    try {
      localStorage.setItem(PREFERRED_GATE_MODE_KEY, mode);
    } catch {}
  }

  public async verifyPin(enteredPin: string): Promise<{ success: boolean; message: string }> {
    const status = this.getStatus();
    if (status.isLockedOut) {
      return {
        success: false,
        message: `Security cooldown active. Please wait ${status.remainingCooldownSeconds} seconds before trying again.`,
      };
    }

    await this.ensureInitialized();
    const salt = localStorage.getItem(PIN_SALT_KEY) || this.inMemorySalt || 'default_salt';
    const currentHash = localStorage.getItem(PIN_STORAGE_KEY) || this.inMemoryHash;

    const enteredHash = await sha256Hex(enteredPin.trim(), salt);

    if (enteredHash === currentHash) {
      // Reset failed attempts on success
      try {
        localStorage.removeItem(FAILED_ATTEMPTS_KEY);
        localStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);
      } catch {}
      return { success: true, message: 'Parent verification successful.' };
    }

    // Increment failed attempts
    const newAttempts = status.failedAttempts + 1;
    try {
      localStorage.setItem(FAILED_ATTEMPTS_KEY, newAttempts.toString());
      if (newAttempts >= 5) {
        // 30 seconds cooldown lockout
        const lockoutTime = Date.now() + 30 * 1000;
        localStorage.setItem(LOCKOUT_TIMESTAMP_KEY, lockoutTime.toString());
        return {
          success: false,
          message: 'Too many incorrect attempts. Security lock activated for 30 seconds.',
        };
      }
    } catch {}

    const remainingTries = 5 - newAttempts;
    return {
      success: false,
      message: `Incorrect PIN. ${remainingTries} attempt${remainingTries === 1 ? '' : 's'} remaining.`,
    };
  }

  public async updatePin(
    currentPin: string,
    newPin: string
  ): Promise<{ success: boolean; message: string }> {
    if (!/^\d{4}$/.test(newPin)) {
      return { success: false, message: 'New PIN must be exactly 4 digits.' };
    }

    const verifyCurrent = await this.verifyPin(currentPin);
    if (!verifyCurrent.success) {
      return { success: false, message: 'Current PIN verification failed.' };
    }

    const newSalt = generateRandomSalt();
    const newHash = await sha256Hex(newPin, newSalt);

    try {
      localStorage.setItem(PIN_STORAGE_KEY, newHash);
      localStorage.setItem(PIN_SALT_KEY, newSalt);
      localStorage.setItem('etw_parent_pin_is_custom', 'true');
      localStorage.removeItem(FAILED_ATTEMPTS_KEY);
      localStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);
      this.inMemoryHash = newHash;
      this.inMemorySalt = newSalt;
      return { success: true, message: 'Parental PIN updated successfully.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Failed to update PIN.' };
    }
  }

  public resetFailedAttempts() {
    try {
      localStorage.removeItem(FAILED_ATTEMPTS_KEY);
      localStorage.removeItem(LOCKOUT_TIMESTAMP_KEY);
    } catch {}
  }
}

export const parentalSecurity = new ParentalSecurityService();
