---
version: alpha
name: Receipt Roaster
description: >
  A late-night, slightly mean, ultimately affectionate reading of someone's
  taste. Anthony Bourdain in a velvet booth, not mean-girl Twitter.
colors:
  primary: "#FBBF24"
  secondary: "#A89882"
  tertiary: "#C2410C"
  neutral: "#F5E9D6"
  background: "#0E0B08"
  surface: "#1A1410"
  on-primary: "#0E0B08"
  on-background: "#F5E9D6"
  on-surface: "#F5E9D6"
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 4rem
    fontStyle: italic
    fontWeight: 700
    lineHeight: 1.05
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.75rem
    fontWeight: 600
    letterSpacing: -0.01em
    lineHeight: 1.05
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
  quote:
    fontFamily: JetBrains Mono
    fontSize: 1.25rem
    lineHeight: 1.55
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: 0.18em
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px
    typography: "{typography.body-md}"
  button-primary-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-primary}"
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    rounded: "{rounded.md}"
    padding: 12px
  card-roast:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: 32px
  upload-zone:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.xl}"
    padding: 48px
  vibe-badge:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: 8px
    typography: "{typography.label-caps}"
---

## Overview

Receipt Roaster is a late-night confession booth lit by a single warm bulb. The vibe is *velvet, smoke, and a sharp friend* — Anthony Bourdain reviewing a chain restaurant, not a mean-girl Twitter thread. Every interface decision should feel like a small confidential observation, not a notification.

The whole product runs on contrast: a serious, dim charcoal canvas anchors a single hot accent (amber), with one eccentric italic display face cutting through the otherwise calm sans-serif body. The roast itself uses a typewriter mono — it should look *typed*, not *generated*.

## Colors

The palette is dark by default. Light mode is intentionally not supported — the product is for the kind of moment you'd only show your phone in a dim bar.

- **Primary `#FBBF24` — Bourbon Amber.** The single accent. Reserved for the brand mark, the call-to-action, and the punctuation around the roast quote. Used sparingly enough that when it appears, it commands.
- **Secondary `#A89882` — Aged Linen.** Captions, helper copy, dim borders. Never used for primary text. Pairs with `surface` for unobtrusive labels.
- **Tertiary `#C2410C` — Ember Rust.** Reserved for negative states — error toasts, destructive confirms, the rare "this image won't upload" moment. Never used decoratively.
- **Neutral `#F5E9D6` — Warm Parchment.** A creamy off-white that warms hover states on the primary button. Pure white is forbidden — it breaks the booth.
- **Background `#0E0B08` — Smokehouse Charcoal.** The canvas. Deep enough to feel like night, warm enough to never feel cold or technological.
- **Surface `#1A1410` — Burnt Velvet.** One step lifted from background. Cards, the upload dropzone, secondary panels. Use surface to group, not to draw attention.

## Typography

A three-voice system: a *display italic* for the brand and headline punctuation, a *humanist sans* for everything you actually read, and a *typewriter mono* for the roast itself.

- **Display — Playfair Display Italic.** Reserved for hero punctuation ("Your taste, *roasted*.") and the over-sized quote marks on the roast card. Never use upright Playfair — italic is the entire personality.
- **H1 / body — Plus Jakarta Sans.** Friendly, modern, geometrically calm. Tightens at H1 (`letter-spacing: -0.01em`); reads at ease in body. Avoid weights below 400 — they get lost on the dark surface.
- **Quote — JetBrains Mono.** The roast itself is rendered in mono so it reads like something a friend just typed at you. The mono cadence enforces brevity — long roasts look bad in mono, which is the point.
- **Label caps — JetBrains Mono uppercase, `0.18em` tracking.** The vibe badge ("sad-girl-coded honestly") and the small section labels. The wide tracking sells the "stamp on the inside of a vintage paperback" feel.

## Layout

Single-column, mobile-first, vertically dominant. The product is one screen at a time — never two columns of UI competing. Generous vertical rhythm: prefer `space-y-6` to dense layouts.

- **Hero → Action → Reveal.** Three vertical zones, never side-by-side. Each zone owns its space; the transition from upload zone to roast card is a fade-replace, not a slide-in-beside.
- **Container max-width: `36rem` (~580px).** Even on desktop. The product reads like a phone, intentionally — both because most uploads are screenshots from phones, and because a wider layout would feel like a SaaS dashboard. We are not a SaaS dashboard.
- **Padding scale.** Outer page padding: `lg` (24px) on mobile, `2xl` (64px) on desktop. Card interiors: `xl` (40px). Button padding: `md` × `lg` (16 × 24). Don't deviate without a reason.

## Elevation & Depth

Depth is achieved through a warm radial gradient on the body and subtle surface tinting — never with hard drop shadows. The vibe is "warm bar light," not "Material Design."

- **Body backdrop.** Two stacked radial gradients (amber at 20%/-10%, ember-rust at 80%/110%, both at 8–10% opacity) over the charcoal background. This is the *only* light source.
- **Surface lift.** A 4–6% opacity warm overlay on the surface color. No `box-shadow`. If a card needs more presence, increase its border opacity, not its shadow.
- **The roast card on the export side (1080×1350 PNG) gets a subtle SVG noise overlay at 6% mix-blend overlay** to imply a printed grain. This is the only surface allowed to feel "physical."

## Shapes

Soft, considered, never sharp. Borders are 1px and dim by default — they exist to imply structure, not draw it.

- **Default radius.** `md` (12px) for buttons, `xl` (24px) for cards and the upload zone. The pill `9999px` is reserved for the vibe badge — that single rounded element echoes a stamp.
- **Borders.** When used, prefer 1px solid in `secondary @ 20%`. On hover (upload zone), promote to `primary @ 60%`. Borders should suggest a frame, not enclose a box.
- **Avoid sharp corners entirely.** The product is intimate, not architectural.

## Components

Components map a name to a group of sub-token properties.

- **`button-primary` — Bourbon Amber background, charcoal ink.** The single CTA per screen ("Roast me", "Download PNG"). Hover lightens to `neutral`. Disabled state: `opacity 0.4`. Never two on the same screen at the same time.
- **`button-ghost` — transparent background, parchment text.** Secondary actions ("Share", "Roast again"). 1px border in `secondary @ 30%`. Hover promotes the border to `primary @ 60%` and the text to `primary`.
- **`card-roast` — burnt-velvet surface, parchment text, generous padding.** The container that holds the rendered roast in the live UI. Always preceded by the vibe badge, never alone.
- **`upload-zone` — burnt-velvet surface, dim aged-linen text, dashed `secondary` border.** The sole input affordance on the landing screen. On hover or drag-over: border promotes to `primary @ 60%` and a faint `primary @ 5%` background tint appears.
- **`vibe-badge` — pill, charcoal background, amber text in label-caps.** The two-to-four-word vibe descriptor sits *above* the roast quote, never inside it. Functions as the "stamp" of the receipt.

## Do's and Don'ts

**Do**
- Reserve `primary` (amber) for one job per screen. If two amber things compete, downgrade one to ghost.
- Use Playfair italic only for *one word* in a hero phrase. The whole hero in italic destroys the wink.
- Keep the roast itself in JetBrains Mono. Sans-serif roasts feel like an email; mono feels like a friend.
- Use the vibe badge as a header to the roast, not a footer. The label sets up the joke; you don't put the punchline before the setup.

**Don't**
- Don't introduce blue, green, or any cold accent. The product is warm, ember-toned, and singular. Cold accents will look like an error state regardless of context.
- Don't add drop shadows. Lift comes from background gradient, not from outlined shadows. A shadow makes the UI feel "designed," which kills the bar-booth intimacy.
- Don't use icons inside the roast card. The roast itself is the only content. The download/share buttons live *outside* the card, never overlaid.
- Don't add a logo to the in-app UI. The brand mark only appears on the *exported* image card (`🪞 receipt-roaster`). The app itself is silent about itself.
- Don't right-align body text. Ever. The product is conversational, not a press release.
