# Elite Masquerade — video plan

Every video slot on the site, ready for one AI generation batch. Each key matches
`src/lib/videos.ts`. To switch a slot on: put the file in `public/videos/<key>.mp4`
(plus an optional `<key>.jpg` poster), then set `src: "/videos/<key>.mp4"` for that key.
Until then the slot shows the animated velvet placeholder.

## House style (applies to every shot)

- **Everyone masked, always.** Gold or black Venetian masks on every guest. No faces are
  identifiable. This is the brand promise ("no one knows who is who").
- **Gents only as guests.** Women appear only as chefs, singers, dancers and staff.
- **Classy, never explicit.** Dancers wear elegant, covered costumes (sequins, feathers, gloves).
  Think a Bond film, not a nightclub ad.
- **Palette:** black lacquer, antique gold, deep crimson velvet, candlelight. Warm, low-key lighting,
  shallow depth of field, slow camera moves.
- **Setting:** a luxurious private house in Nairobi (Lavington): dark wood, chandeliers, velvet
  drapes, red roses, gardens with fire pits. Guests are African men, 30s–50s, in tuxedos or theme attire.
- **Silent loops** unless marked *talking*. Most slots autoplay muted, so motion has to tell the story.
- **Format:** 16:9 masters (1920×1080). Also export 9:16 crops (1080×1920) for slots marked 📱
  (used on phones and for Instagram/TikTok).
- **Length:** 5–8 s seamless loops for background slots; 10–20 s for feature clips.

## Pipeline (existing Wan 2.2 setup, `~/Videos/wan22`)

1. **Keyframe** with Qwen-Image-Edit (or text-to-image): one still per shot from the prompt below.
2. **Animate** with Wan 2.2 I2V (lightx2v 4-step), 81 frames → RIFE 2× → 4x-UltraSharp to 1080p.
3. **Talking clips** (marked *talking*): Kokoro TTS for the voice + Wan 2.2 S2V lip sync
   (scripted in `dramas.json` / `dr.py`, not yet run; check S2V node inputs first).
4. Loop-trim, colour-grade warm, export H.264 MP4 (CRF 23, no audio for silent slots) + JPG poster.

Rough cost (based on past 4090 speeds; check live Vast.ai prices *and* $/GB download first):
24 silent clips ≈ 1.5–2 GPU-hours, plus 3 talking clips ≈ 1 hour → about **$3–8** for the batch.

## Core slots

| Key | Where it shows | Shot | Length / format | Type |
|---|---|---|---|---|
| `hero` | Home hero (full screen, behind emblem) | Slow dolly through a candlelit hall. Masked gentlemen in tuxedos raise champagne coupes; gold confetti drifts; red roses in the foreground, out of focus. Very dark edges so the emblem reads on top. | 8 s loop · 16:9 + 📱 9:16 | silent |
| `brotherhood` | Home manifesto, Experiences "The Network", Membership hero, House lounge | Four masked men in a leather cigar lounge, leaning in, laughing, shaking hands over a deal. Whisky glasses, cigar smoke in a lamp beam. | 8 s loop · 16:9 + 4:5 | silent |
| `chefs` | Experiences "Dine & Wine", Private hero, House dining hall | A female chef in crisp whites plates a course with tweezers, then hand-feeds a bite to a masked gentleman at a candlelit table; a male chef flambés behind her. | 10 s · 16:9 | silent |
| `cages` | Experiences hero, "The Performances", House stage | Gilded birdcage-style cages suspended above a dark room; dancers in sequinned gold costumes and feather fans move slowly inside; masked men seated below watch, glasses in hand. | 8 s loop · 16:9 + 📱 | silent |
| `karaoke` | Experiences "Karaoke Royale" | A glamorous female singer in a red gown at a vintage microphone, spotlight, masked gentlemen at tables clapping; a live band behind her. | 8 s loop · 16:9 | silent |
| `strings` | Experiences "Live Music" | A violinist and a saxophonist in black tie playing on a small stage, candlelight, slow push-in; masked audience silhouettes. | 8 s loop · 16:9 | silent |
| `games` | Home "Games with The Gents", Experiences "Games & Play" | Masked men at a pool table (one lines up a shot), then cards being dealt on green felt, then a putt on an indoor mini-golf green. | 10 s · 16:9 | silent |
| `the-house` | Home "The House", The House hero + gardens | Exterior at dusk: a grand private house in Lavington, lit windows, a gravel drive, fire pits in the garden, a masked guest walking up the steps. | 8 s loop · 16:9 | silent |
| `boutique` | Boutique hero | Close-ups on a velvet table: a gilded Venetian mask, a feathered crimson mask, a folded tuxedo, a black cattleman hat, cowboy boots. Slow rotating turntable light. | 8 s loop · 16:9 | silent |
| `concierge` | (reserved, concierge promo) | Phone screen over a dark bar top: chat bubbles appear, an "Add to order" button is tapped, an M-Pesa confirmation. Gold UI on black. | 8 s · 9:16 📱 | silent (avoid on-screen text gibberish: compose the UI as an overlay in editing, not in the AI prompt) |

## Theme nights (one per theme; used on the event page hero and "This weekend")

| Key | Shot |
|---|---|
| `theme-grand` | The signature ball: a long candlelit table, gold masks, black tie, a string quartet in the corner, a chef presenting a dish under a cloche. |
| `theme-cowboy` | Saloon-styled room: masked men in black cattleman hats and boots, whiskey poured, line dancers in fringe costumes, flame grill in the background. |
| `theme-karaoke` | Same as `karaoke`, plus a masked gentleman stepping up to the mic to cheers. |
| `theme-rhumba` | A live rhumba band (guitar close-up), sapeur-styled masked men in bright tailored suits dancing, palm wine on the table. |
| `theme-tasting` | Sommelier pouring red wine into a row of glasses, candle flames, masked men swirling and toasting, a cheese board. |
| `theme-strings` | Same as `strings`, slower and more intimate, a long dinner table in front. |
| `theme-luo` | Live benga band, whole fried tilapia served on platters, masked guests in modern Luo-inspired attire dancing. |
| `theme-comedy` | A masked comedian on a small stage with a mic, the audience of masked men laughing hard, slapping the table. |
| `theme-nigerian` | Masked men in agbada and fila caps, jollof and suya served, a live Afrobeats band, dancers in gele headwraps. |
| `theme-kikuyu` | Mugithi guitarist singing, nyama choma carved at the table, masked men singing along arm in arm. |
| `theme-country` | Old-school country band, pool table and darts, check shirts and boots, bourbon glasses. |
| `theme-indian` | Masked men in sherwanis, a tandoor in the garden, biryani in copper pots, tabla player and a Bollywood dancer in an embroidered lehenga. |
| `theme-cuisines` | Chef stations: sushi being sliced, a tagine lid lifted, injera being poured; masked guests walking between stations. |
| `theme-halloween` | Candle-only lighting, dark velvet, gothic table with black roses, masks with black feathers, dancers in the cages in dark costumes. Moody, not horror. |

All theme clips: 8 s loops, 16:9 + 📱 9:16, silent.

## Talking clips (marketing, from the client brief)

These are what the client described as the clips that "sell": short scenes of gentlemen
excitedly talking about an upcoming night. Use for social media and as feature videos on the event pages later.

| Key (future) | Scene | Script idea (≈15 s) |
|---|---|---|
| `talk-cultural` | Three masked men in a lounge planning Indian Night | "Saturday is Indian Night." / "Sherwani's already tailored." / "Mask stays on, of course. Nobody will know it's me dancing." |
| `talk-tasting` | Two masked men on the phone to friends about the wine tasting | "Six wines, six courses, the chef at our table. Tuxedo, bro. Book it on the site, it takes a minute." |
| `talk-cowboy` | Group of masked men trying on hats and boots | "The boutique delivered the boots in my size. Saturday, we ride." |

## Delivery checklist

- [ ] Every file named `<key>.mp4` (+ `<key>.jpg` poster) in `public/videos/`
- [ ] `src` set for each key in `src/lib/videos.ts`
- [ ] Hero under ~4 MB; others under ~2.5 MB each (move to a CDN later and add it to the CSP in `next.config.ts`)
- [ ] Check every clip for masks slipping, extra fingers or garbled text before publishing
