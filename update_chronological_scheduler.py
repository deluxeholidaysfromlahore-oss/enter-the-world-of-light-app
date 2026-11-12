# Python script to update Master Controller.gs and Code.gs with:
# 1. deleteOldIftttPosts at the top of Code.gs
# 2. Sequential chronological selection (Oldest #1 on Day 1, Short #2 on Day 2...)
# 3. Dynamic randomized jitter timing for natural human-like posting
# 4. Dual Primary and Secondary blog tracks

with open('apps-script/Master Controller.gs') as f:
    mc = f.read()

# Let's inspect selectChannelVideoForSlot in Master Controller.gs
print("Length of Master Controller.gs:", len(mc))
