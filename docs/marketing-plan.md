# ARVIT marketing plan

_Last updated 14 Nov 2026. Every feature below was checked against the Child_Wellness app code._

## Positioning

**Goally keeps kids on track. ARVIT gives kids a voice, in their own language.**

ARVIT is a communication (AAC) device first, built for Indian families. Goally is a routines and
screen-time tablet for the US market, with AAC as one app among many.

## What only ARVIT has (confirmed in the app)

| Advantage | Where it lives in the app |
|---|---|
| AAC board in **English, Hindi, Punjabi, Tamil, Telugu** | `app/(tabs)/AACgrid.tsx` (LANG_OPTIONS) |
| **Real-photo symbols** in categories (Food, Body & Pain, Emotions, People & Family, Places, Personal Care) | AAC board |
| **One-tap Alert**: WhatsApp call or text to both caregivers | `AACgrid.tsx` → `alertCaregiver` |
| **Eye control**: look to move the highlight, blink to select | `components/eyecontrol/*`, wired in `app/_layout.tsx` |
| **Therapy Buddy** games (Listen / Tap / Talk) in English, Hindi, Punjabi | `TherapyAvatar.tsx` |
| Speech, OT and special-education game levels | `Games.tsx`, `SessionGames.tsx` |
| **Weekly report** sent to caregiver phones every Sunday evening | `WeeklyReport.tsx`, `backend/routes/weeklyReports.js` |
| **Offline-first** AAC with custom tiles and favourites | `utils/aacOfflineStore` |
| Speech and camera processed **on the device**; no ads, no analytics trackers | `store-assets/APP_STORE_CHECKLIST.md` |

Do not claim: outcome percentages, family counts, clinical results or awards until you have them.
Note that worksheet photos and Therapy Buddy chat text are sent to OpenAI, so never say "nothing leaves the device".

## Comparing with Goally

- On the website, compare against "a regular tablet", never name Goally (ASCI rules on comparative ads).
- In sales conversations, these points are safe to state:
  Indian languages, eye control, caregiver alert, AAC-first design, INR pricing and local support.
  Check Goally's current features before quoting anything about them.

## Website (done)

- Real app screenshots in the hero, the tabbed showcase, the price card and the closing band
  (`public/screens/*.webp`, exported from `Child_Wellness/store-assets/screenshots`).
- New "Speaks Your Family's Language" section: five languages, alert, eye control, offline, privacy.
- Feature grid, comparison table and price card rewritten around the confirmed advantages.
- Company name corrected to Arvit Healthtech Private Limited; fake US phone/address removed.

## Website (next)

1. **More real screenshots** from the tablet (USB debugging on, then
   `adb exec-out screencap -p > screen.png`): a speech game, an OT game, a Hindi AAC board,
   eye control in use, a filled-in weekly report (demo account), the Alert confirmation.
2. **Product video** for the "ARVIT In Action" slot: 60–90 s of a child using the board.
3. Real support phone number and office address in `src/lib/constants.ts`.
4. Hindi landing page (`/hi`) for search traffic in Hindi.

## Getting customers (India)

1. **Therapists first**: speech therapists, OTs and special schools. Demo device plus referral fee.
2. **Search**: "AAC device India", "Hindi AAC app", "speech device for autism", "communication
   device for non-verbal child", plus Hindi, Punjabi, Tamil and Telugu versions.
3. **Short video**: Reels and YouTube clips of the board speaking in each language.
4. **Parent communities**: autism and special-needs parent groups and NGOs. Offer free live demos.
5. **Pilot**: 20–30 families at a discount for feedback and permission to share results.
   After 90 days, add real testimonials and numbers to the empty slots on the site.
6. **Follow-up**: WhatsApp messages to people who booked a demo but did not buy.
