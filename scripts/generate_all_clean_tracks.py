import wave, math, struct, subprocess, os, array

sample_rate = 22050  # 22.05 kHz is crystal clear for acoustic bell and generates 2x faster!

tracks = [
    ('dil-dil-se-kaho-allah-hu.mp3', [329.63, 392.00, 440.00, 523.25, 440.00]),
    ('allah-sab-ka-rab-hai.mp3', [261.63, 329.63, 392.00, 523.25, 392.00]),
    ('chalo-chalo-madine-chalen.mp3', [293.66, 349.23, 392.00, 440.00, 523.25]),
    ('rab-ka-dulara-mera-nabi.mp3', [261.63, 329.63, 392.00, 440.00, 523.25]),
    ('mere-nabi-ka-naam-muhammad.mp3', [329.63, 392.00, 440.00, 523.25, 659.25]),
    ('sallallahu-ala-muhammad.mp3', [293.66, 329.63, 392.00, 440.00, 587.33]),
    ('assalamu-alaikum-song.mp3', [261.63, 329.63, 392.00, 523.25, 392.00]),
    ('hum-niki-ke-sipahi.mp3', [329.63, 392.00, 440.00, 523.25, 440.00]),
    ('jhoot-bolna-paap-hai.mp3', [293.66, 349.23, 440.00, 523.25, 392.00]),
    ('meri-pyari-ammi-jaan.mp3', [261.63, 329.63, 392.00, 523.25, 659.25]),
    ('abba-jaan-ka-pyar.mp3', [293.66, 349.23, 392.00, 440.00, 523.25]),
    ('ilm-ki-shamma.mp3', [329.63, 392.00, 440.00, 523.25, 587.33])
]

os.makedirs('public/storage/kids_nasheeds', exist_ok=True)
wav_tmp = '/tmp/ambient_chime.wav'

for filename, freqs in tracks:
    out_path = f'public/storage/kids_nasheeds/{filename}'
    duration_per_note = 1.5
    melody = (freqs * 3)[:12]
    
    samples = array.array('h')
    
    for note_idx, freq in enumerate(melody):
        n_samples = int(duration_per_note * sample_rate)
        for s in range(n_samples):
            t = s / sample_rate
            env = math.exp(-2.0 * t)
            # Gentle harmonic acoustic chime
            val = 0.55 * math.sin(2 * math.pi * freq * t) + 0.25 * math.sin(4 * math.pi * freq * t)
            # Gentle soft frame pulse
            drum = (0.2 * math.sin(2 * math.pi * 70 * t) * math.exp(-9 * t)) if t < 0.25 else 0
            samp = int((val * env + drum) * 15000)
            samples.append(max(-32767, min(32767, samp)))
            
    with wave.open(wav_tmp, 'w') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sample_rate)
        w.writeframes(samples.tobytes())
        
    subprocess.run(['ffmpeg', '-y', '-i', wav_tmp, '-codec:a', 'libmp3lame', '-b:a', '128k', out_path],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f'Rendered: {filename}')

print('All 12 soothing acoustic tracks generated successfully!')
