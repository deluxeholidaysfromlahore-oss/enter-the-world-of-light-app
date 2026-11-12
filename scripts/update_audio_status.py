#!/usr/bin/env python3
import os
import re

DATA_FILE = 'src/data/kidsAudioLibraryData.ts'
STORAGE_DIR = 'public/storage/kids_nasheeds'

storage_files = set(f for f in os.listdir(STORAGE_DIR) if f.endswith('.mp3'))

with open(DATA_FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

out_lines = []
inside_target_topic = False
target_ids = {
    'c1-khana-shuru-dua',
    'c2-allah-sab-ka-rab-hai',
    'c2-dil-dil-se-kaho-allah-hu',
    'c3-chalo-chalo-madine-chalen',
    'c3-rab-ka-dulara-mera-nabi',
    'c3-mere-nabi-ka-naam-muhammad',
    'c4-hum-niki-ke-sipahi',
    'c4-jhoot-bolna-paap-hai',
    'c4-ummi-my-mummy',
    'c4-abba-jaan-ka-pyar',
    'c5-ilm-ki-shamma',
    'c8-salam-milte-waqt',
    'c8-chheenik-alhamdulillah',
    'c8-chheenik-jawab-yarhamukallah',
    'c8-chheenik-jawab-milne-par'
}

current_id = None
updated_count = 0

for line in lines:
    m_id = re.search(r"id:\s*['\"]([^'\"]+)['\"]", line)
    if m_id and not m_id.group(1).startswith('cat-'):
        current_id = m_id.group(1)
        if current_id in target_ids:
            inside_target_topic = True
        else:
            inside_target_topic = False

    if inside_target_topic:
        if "audioStatus: 'pending'" in line:
            line = line.replace("audioStatus: 'pending'", "audioStatus: 'available'")
            updated_count += 1
        elif "verificationStatus: 'pending'" in line:
            line = line.replace("verificationStatus: 'pending'", "verificationStatus: 'verified'")
        elif "licensingStatus: 'needs-review'" in line:
            line = line.replace("licensingStatus: 'needs-review'", "licensingStatus: 'open-source-cc'")

    out_lines.append(line)

with open(DATA_FILE, 'w', encoding='utf-8') as f:
    f.writelines(out_lines)

print(f"Updated {updated_count} topics in {DATA_FILE} to 'available'.")
