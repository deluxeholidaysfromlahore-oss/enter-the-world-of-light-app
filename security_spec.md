# Security Specification: Enter the World of Light & Laughter

## 1. Data Invariants
1. **User Identity & Privacy**: Users can only read and write their own `/users/{userId}` account records. Nobody can impersonate another user's UID.
2. **Profile ABAC**: Public profiles at `/profiles/{userId}` can be read by anyone, but modified strictly by the authenticated owner `{userId}`.
3. **Content Catalog**: The `/content/{contentId}` collection is publicly readable by all visitors (learners, kids, guests), but can only be created, modified, or deleted by verified administrators.
4. **Favorites Integrity**: A favorite document at `/favorites/{favoriteId}` MUST have `userId == request.auth.uid`. No user can add or delete another user's favorites.
5. **Learning Progress**: `/progress/{progressId}` entries must belong to `request.auth.uid`. Users cannot alter others' scores, XP, or progress.
6. **Watch History**: `/watchHistory/{historyId}` entries must belong strictly to the authenticated viewer.
7. **Kids Profiles**: `/kidsProfiles/{profileId}` entries must belong strictly to `parentId == request.auth.uid`.
8. **Admin Protection**: `/adminSettings/{settingId}` requires administrator authorization (`deluxeholidaysfromlahore@gmail.com` or admins list). Regular users are strictly denied.
9. **Google Blogger Syndication**: `/bloggerPosts/{postId}` and `/bloggerPages/{pageId}` are publicly readable by visitors and readers, but write/update/delete operations are restricted strictly to verified administrators with `isValidBloggerItem` schema validation.

## 2. The Dirty Dozen (Adversarial Payloads)
1. **Payload 1 (User ID Hijack)**: Unauthenticated client attempts to create `/users/victim_123` with `uid: "victim_123"`. Result: `PERMISSION_DENIED`.
2. **Payload 2 (User Elevation)**: Authenticated user `user_abc` attempts to update `/users/user_abc` setting `role: "admin"`. Result: `PERMISSION_DENIED`.
3. **Payload 3 (Profile Tampering)**: User `attacker_1` attempts to overwrite `/profiles/victim_2`. Result: `PERMISSION_DENIED`.
4. **Payload 4 (Ghost Field Poisoning)**: User sends valid profile data plus ghost field `__proto__: { isAdmin: true }` or oversized buffer. Result: `PERMISSION_DENIED`.
5. **Payload 5 (Content Vandalism)**: Unauthenticated visitor or regular user attempts to delete `/content/story_1`. Result: `PERMISSION_DENIED`.
6. **Payload 6 (Oversized Payload)**: Attacker attempts to write a 2MB string into `/content/story_fake` or `/profiles/attacker`. Result: `PERMISSION_DENIED`.
7. **Payload 7 (Favorite Forgery)**: User `hacker` attempts to save a favorite with `userId: "other_user"`. Result: `PERMISSION_DENIED`.
8. **Payload 8 (Progress Inflation)**: User `hacker` attempts to set another user's `score: 999999` in `/progress/{targetId}`. Result: `PERMISSION_DENIED`.
9. **Payload 9 (Watch History Snooping)**: User tries to read all documents in `/watchHistory` without querying their own `userId`. Result: `PERMISSION_DENIED`.
10. **Payload 10 (Kids Mode Bypass)**: Non-parent user attempts to toggle `lockedMode: false` on another family's `/kidsProfiles/{id}`. Result: `PERMISSION_DENIED`.
11. **Payload 11 (Admin Setting Poison)**: Regular user attempts to write to `/adminSettings/banner`. Result: `PERMISSION_DENIED`.
12. **Payload 12 (Path Injection / ID Exhaustion)**: Attacker passes an invalid document ID containing path traversal characters or 10KB junk to `/content/..%2F..`. Result: `PERMISSION_DENIED`.
