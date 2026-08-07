---
name: NEON X E-commerce
description: Dark-mode gaming storefront with electric violet accents — precision engineering meets bold energy.
colors:
  neon-arc: "#8b5cf6"
  neon-arc-deep: "#7c3aed"
  neon-arc-text: "#a78bfa"
  void-deep: "#0f172a"
  void-surface: "#1e293b"
  neutral-text: "#f8fafc"
  neutral-muted: "#b0bec5"
  neutral-border: "#334155"
  signal-star: "#fbbf24"
  signal-success: "#4ade80"
  signal-error: "#ef4444"
typography:
  display:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "42px"
    fontWeight: 700
    lineHeight: 1.1
  headline:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "60px"
  3xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.neon-arc-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "10px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.neon-arc}"
  button-favorite:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-muted}"
    rounded: "{rounded.sm}"
    padding: "8px"
  card-surface:
    backgroundColor: "{colors.void-surface}"
    rounded: "{rounded.sm}"
    padding: "30px"
  card-surface-hover:
    backgroundColor: "{colors.void-surface}"
  input-field:
    backgroundColor: "{colors.void-deep}"
    textColor: "{colors.neutral-text}"
    rounded: "{colors.rounded.sm}"
    padding: "10px 12px"
  badge-cart:
    backgroundColor: "{colors.neon-arc}"
    textColor: "#ffffff"
    rounded: "{colors.rounded.full}"
    size: "18px"
  badge-wishlist:
    backgroundColor: "{colors.signal-error}"
    textColor: "#ffffff"
    rounded: "{colors.rounded.full}"
    size: "18px"
---

# Design System: NEON X E-commerce

## Overview

**Creative North Star: "The Midnight Lab"**

NEON X lives in the dark — not the murky dark of neglected corners, but the purposeful darkness of a high-performance laboratory after hours. Equipment hums. Indicators pulse. The only light is the light that matters: the violet arc of energy across a contact, the amber glow of a rating, the green confirmation of a successful operation. Every pixel on this screen earned its photons.

The design is **bold, electric, and vibrant** — but never chaotic. Energy is channeled, not sprayed. The Neon Arc (#8b5cf6) drives every interaction: buttons lift into its glow, borders ignite on focus, badges pulse with current. Semantic signals (amber for ratings, green for success, red for error) are just that — signals, not decoration. They appear only when there is state to convey. The rest of the palette is a disciplined scale of deep slates that recede, allowing the accent to do its work.

Interactions are events, not afterthoughts. A hover lifts. A focus rings. A purchase button pulses three times on load, then settles — like a heartbeat finding its rhythm. Cards translate upward on hover, revealing their shadow as if pushed toward the user. The system feels alive, responsive, and dangerous in the best way: the way that makes you want to touch it.

**Key Characteristics:**
- Dark-first: the void (#0f172a) is the canvas; light emerges from it
- Single accent: Neon Arc violet drives all primary interactions
- Semantic signals only: amber, green, red appear exclusively to convey state
- Electric feedback: every interactive element responds with lift, glow, or pulse
- Flat at rest, shadowed on elevation: surfaces gain depth only in response to state
- System fonts for zero-latency rendering; Material Symbols for iconography
- Mobile-first responsive with sticky buy button, bottom-sheet drawers, and touch-optimized hit targets

## Colors

The palette is a midnight spectrum — deep slates for surfaces, electric violet for action, and a disciplined set of semantic signals that speak only when they have something to say.

### Primary
- **Neon Arc** (#8b5cf6): The singular accent. Buttons, links, active borders, focus rings, badges, price highlights. Every interactive element that isn't conveying a semantic state routes through this color. Its rarity on any given screen is its power — use it on 10-15% of surface area, never more.
- **Neon Arc Deep** (#7c3aed): The resting state of primary buttons. Slightly darker, slightly more restrained. Transitions to Neon Arc on hover/focus, creating the sensation of a glow intensifying.
- **Neon Arc Text** (#a78bfa): Accent text for category labels, highlighted copy, and muted accent needs where full Neon Arc would be too loud. The whisper of violet.

### Neutral
- **Deep Void** (#0f172a): The foundational dark. Page background, input backgrounds, the canvas on which everything else sits. Dark enough to make accent colors sing, light enough to maintain text contrast.
- **Surface** (#1e293b): Elevated surfaces. Cards, drawers, modals, checkout panels. Sits one step above the void — creates depth purely through tonal contrast before shadows are even applied.
- **Text Primary** (#f8fafc): All headings and body text. Near-white with a hint of cool to complement the slate backgrounds.
- **Text Muted** (#b0bec5): Secondary text, descriptions, placeholders, metadata, footer links. Meets WCAG AA 4.5:1 contrast against both void and surface backgrounds.
- **Border** (#334155): Dividers, input borders, card borders, drawer edges. Visible enough to define boundaries, subtle enough to not compete with content.

### Semantic Signals
- **Amber Star** (#fbbf24): Rating stars only. Never decorative. Appears exclusively in the star picker, review cards, and product rating display.
- **Signal Green** (#4ade80): Success states. Confirmation messages, checkout success icon, shipping success text, applied coupon indicator.
- **Signal Red** (#ef4444): Error states and the wishlist accent. Invalid coupon feedback, CEP error, wishlist badge and active favorite button. The dual role (error + wishlist) is intentional: the wishlist heart is a deliberate exception that uses red as an identity marker, not a semantic signal.

### Named Rules
**The One Accent Rule.** Neon Arc (#8b5cf6) is the sole decorative accent. Amber, green, and red are semantic signals only — they appear when there is state to convey (rating, success, error, wishlist) and never as alternative decoration. If it glows and it's not a signal, it must be violet.

**The Void Rule.** No light backgrounds. No white cards. No gray-mode alternatives. The dark canvas is non-negotiable. Content that needs elevation moves to Surface (#1e293b); content that needs even more contrast moves to text-primary (#f8fafc). Lightness is a resource spent sparingly.

## Typography

**Primary Font:** Segoe UI, system-ui, sans-serif
**Icon Font:** Material Symbols Outlined (24px optical size, 400 weight, 0 FILL, 0 GRAD)

**Character:** A system-native stack chosen for zero-latency rendering and OS-level hinting quality. On Windows, Segoe UI brings clean geometric precision; on macOS and iOS, SF Pro steps in with the same weight; on Android, Roboto fills the role. No web font payload, no FOUT, no compromise. The type is neutral enough to let the color and motion carry the personality.

### Hierarchy
- **Display** (bold 700, 42px / clamp(24px, 5vw, 42px), 1.1 line-height): Product title only. The one place where type takes center stage. On mobile, scales down to 24px.
- **Headline** (bold 700, 28px / 22px mobile, 1.3 line-height): Section headings — "Especificações Técnicas", "Avaliações de Clientes". Marks major content boundaries.
- **Title** (bold 700, 24px, 1.3 line-height): Component titles — card headings, modal titles, drawer headers. Used in `h3` contexts throughout.
- **Body** (regular 400, 16px / 14px mobile, 1.6 line-height): Product descriptions, review text, form labels. The workhorse. Lines stay within 65-75ch in the main content column for comfortable reading.
- **Label** (medium 500, 14px / 12px mobile, 1.4 line-height): Secondary text, metadata, button text, navigation links, footer copy. Small enough to stay out of the way, large enough to remain legible.

### Named Rules
**The Zero-Latency Rule.** Typography loads with the first paint. No web font requests, no swap flash, no invisible text. The chosen system stack renders identically on every OS the audience uses. A custom font must clear a higher bar than "it looks nice" to justify the performance trade-off.

## Layout

**Container Model:** Single centered container, `max-width: 1200px`, with responsive horizontal padding: 20px default, 24px at 1024px, 16px at 600px. One column of truth down the page.

**Page Structure:** Sticky header (80px / 68px tablet / 60px mobile) → Product hero (two-column grid → single column at 768px) → Specifications grid (auto-fit cards) → Reviews grid (auto-fit cards) → Footer (four-column → two-column → single column).

**Spacing Rhythm:** The scale runs 4px → 8px → 16px → 24px → 40px → 60px → 80px. Section margins use the upper range (40-80px). Internal padding uses the lower range (8-16px). The product hero grid gap is 60px desktop, collapsing to 24px on mobile. Card grids gap at 30px desktop, 12-16px mobile.

**Breakpoints:**
- 1200px: Max container width
- 1024px: Tablet — header compacts, product grid maintains two columns, card grids tighten
- 900px: Footer collapses from 4 cols to 2 cols
- 768px: Product hero stacks to single column, image constrained to 340px
- 600px: Mobile — full-width drawers, sticky buy bar, gallery adjusts, all cards go single or double column

**Mobile-Specific Behaviors:**
- Navigation collapses to hamburger with animated clip-path reveal
- Search becomes an expandable bar that drops from the header
- Cart and wishlist drawers become bottom sheets (height: 85vh, radius: 16px top)
- Sticky buy button appears at viewport bottom with full-width CTA
- Quantity control goes full-width for easier thumb access
- Gallery thumbs size proportionally (4 per row) with arrow navigation

## Elevation & Depth

The Midnight Lab uses a hybrid depth model: **tonal layering for structure, shadows for state and persistent elevation.**

The foundational depth comes from color alone. Deep Void (#0f172a) is the baseline. Surface (#1e293b) is one step above it — cards, drawers, and modals are perceptibly lighter than the page background even before any shadow is applied. This tonal separation is the primary depth mechanism and works regardless of `prefers-reduced-motion` or `prefers-contrast` settings.

Shadows are reserved for two purposes: **state response** (hover, focus, activation) and **persistent raised layers** (drawers, modals). A card at rest has no shadow. A card on hover lifts and reveals its ambient-mid shadow. The primary button's glow-shadow is the system's signature depth gesture — a violet radial spread that makes the button feel like it's pushing toward the user.

### Shadow Vocabulary
- **Ambient Low** (`0 2px 4px rgba(0,0,0,0.1)`): The faintest elevation. Card hover, subtle lift indicators. Just enough to break the plane.
- **Ambient Mid** (`0 4px 12px rgba(0,0,0,0.15)`): Card hover on features. Deeper than ambient-low, communicates a stronger separation from the background.
- **Glow Primary** (`0 10px 20px rgba(139,92,246,0.3)`): The signature shadow. Button hover on primary CTA. Not just a shadow — a colored glow that feels like the Neon Arc is radiating energy outward. Never used without the primary color context.
- **Focus Ring** (`0 0 0 2px rgba(139,92,246,0.2)`): Keyboard focus indicator on all interactive elements. Consistent 2px offset ring in Neon Arc at 20% opacity. On primary buttons, composes with Glow Primary for a double-ring effect.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Cards, inputs, and containers sit flush against their background with no ambient shadow. Shadows appear only in response to state (hover, focus, modal open) or on deliberately elevated layers (drawers, modals). If it's not moving and it's not above something, it casts no shadow.

**The Tonal-First Rule.** Depth hierarchy must read even when shadows are disabled (`prefers-reduced-motion`, `prefers-contrast: more`). The tonal gap between Deep Void and Surface is the system's fallback depth mechanism. Never rely on shadow alone to distinguish layers.

## Shapes

**Radius Strategy:** The system uses 8px as its foundational corner radius — headers, cards, inputs, buttons, modals, and thumbnails all share this value. It's rounded enough to feel contemporary and approachable, sharp enough to maintain the laboratory precision of the Midnight Lab metaphor.

On mobile, key interactive surfaces scale up: the buy button, quantity control, checkout modal, and card edges move to 12px. Drawer bottom sheets use 16px top radius for the characteristic mobile panel silhouette.

**Border Language:** 1px solid borders using the neutral border color (#334155) define all surface boundaries. Cards, drawers, inputs, and dividers share this treatment. Borders are structural, not decorative — they provide the crisp definition that prevents dark surfaces from bleeding into each other.

**Circular Elements:** Badges (cart count, wishlist count) are fully circular (50% radius) at 18px diameter. The skip-link, icon buttons, and close buttons use the standard 8px radius.

**Form Language:** Inputs are inset — darker background (Deep Void) inside a lighter bordered container. This creates a recessed effect that distinguishes editable regions from display surfaces. On focus, the border ignites to Neon Arc with the focus ring glow.

### Named Rules
**The Precision Edge Rule.** Every boundary in the system is a 1px solid border. No borderless cards, no shadow-only separation, no ghost containers. The dark background demands crisp definition between surfaces, and the 1px border provides it without visual weight.

## Components

### Buttons

**Character:** Electric and alive — every button responds to interaction with energy. Hover lifts, focus glows, and the primary CTA pulses with a heartbeat animation on page load.

**Primary Button (.btn-buy):**
- **Shape:** 8px radius (12px mobile), full width or flex-1, padding 10px (16px mobile)
- **Resting:** Background Neon Arc Deep (#7c3aed), white text, bold weight
- **Hover/Focus:** Background shifts to Neon Arc (#8b5cf6), lifts -2px on Y, gains Glow Primary shadow. Focus-visible composes Glow Primary + Focus Ring.
- **Disabled:** Opacity 0.7, no transform, cursor not-allowed
- **Pulse:** On page load, the main CTA pulses 3 times — a box-shadow animation that radiates violet outward and fades. Hover cancels the animation. This is the Midnight Lab's signature micro-interaction.

**Icon Button (.icon-btn):**
- **Shape:** 8px radius, 8px padding, transparent background
- **Resting:** Text Primary (#f8fafc)
- **Hover/Focus:** Color shifts to Neon Arc. Focus-visible adds Focus Ring.
- **Usage:** Cart, wishlist, search toggle, hamburger menu, close buttons in drawers and modals

**Favorite Button (.btn-favorite):**
- **Shape:** 8px radius, 8px padding, 2px solid border
- **Resting:** Transparent background, Text Muted color, neutral border
- **Hover/Focus:** Border and color shift to Signal Red. Focus ring uses red tint.
- **Active:** Filled red border, red color, Material Symbol switches to FILL 1 variant
- **Purpose:** Wishlist toggle on the product page — the only place red is used as an identity marker rather than an error signal

**Small Action Buttons:**
- **Primary Small:** Neon Arc background, white text, 6px 12px padding, 12px font. Used in wishlist "add to cart" action.
- **Ghost Remove:** Transparent, Text Muted, 1px neutral border. Hover shifts to red border and red text. Used in wishlist item removal.

### Cards

**Character:** Precision containers that sit one tonal step above the void. At rest, they're defined by border and background contrast alone. On hover, they lift — translating upward while a shadow blooms beneath.

**Feature Card:**
- **Shape:** 8px radius (12px mobile), 30px padding (20px 16px mobile), 1px border
- **Background:** Surface (#1e293b)
- **Icon:** 40px Material Symbol (32px mobile) in Neon Arc, centered above the title
- **Title + Description:** Title in 18px bold (14px mobile), description in 14px muted (12px mobile)
- **Hover:** Border ignites to Neon Arc, card lifts -5px Y, Ambient Mid shadow appears

**Review Card:**
- **Shape:** 8px radius (12px mobile), 30px padding (20px mobile), 1px border
- **Background:** Surface (#1e293b)
- **Hover:** Ambient Mid shadow appears (border stays neutral — reviews are content, not actions)
- **Content:** Reviewer name in 16px bold, date in 12px muted, star rating in Amber Star, review text in 14px italic muted

### Inputs & Fields

**Character:** Recessed regions carved into the dark background. They read as editable by being darker than their surroundings — the opposite of a raised card.

**Text Input / Textarea:**
- **Shape:** 8px radius (10-12px mobile), 10px 12px padding (12px mobile for touch), 1px neutral border
- **Background:** Deep Void (#0f172a) — darker than surrounding Surface cards
- **Text:** Text Primary, 14px (16px mobile to prevent iOS zoom)
- **Placeholder:** Text Muted
- **Focus:** Border ignites to Neon Arc, Focus Ring appears. The transition from neutral border to violet glow is the primary focus affordance.
- **Autofill:** Neutralize browser autofill styles with inset box-shadow matching Deep Void

**Select:**
- **Shape:** Same as text input, with native dropdown arrow
- **Background:** Surface (the select sits on pages, not inside cards — uses Surface to match its context)

**Star Picker:**
- **Shape:** Horizontal row of 5 star buttons, 24px font (28px mobile), 5px gap
- **Resting:** Neutral border color (#334155)
- **Hover/Focus:** Shifts to Amber Star. Focus adds Focus Ring.
- **Selected:** Amber Star, persistent
- **Interaction:** Click sets rating; hover previews. Functions as a radio group with ARIA role.

### Navigation

**Header:**
- **Position:** Sticky top, 80px height (68px tablet, 60px mobile)
- **Background:** Deep Void at 90% opacity with 10px backdrop-blur — translucent enough to show scrolling content, solid enough to read
- **Border:** 1px bottom border in neutral

**Logo:**
- **Typography:** NEON in white, X in Neon Arc. 24px, 800 weight, 2px letter-spacing. 6px gap between NEON and X.
- **Link:** Full logo is a single anchor to index.html

**Main Navigation (Desktop):**
- **Layout:** Horizontal flex, 30px gap (20px tablet)
- **Links:** Text Primary, 500 weight, no underline. 0.3s ease color transition.
- **Hover/Focus:** Color shifts to Neon Arc. Focus adds Focus Ring.

**Main Navigation (Mobile ≤600px):**
- **Trigger:** Hamburger icon button, order -1 (leftmost in header)
- **Menu:** Full-width dropdown below header, Deep Void at 98% opacity with backdrop-blur. Animated via clip-path (polygon wipe from top). Active state reveals full height with 0.4s ease-in-out transition.
- **Links:** Full-width touch targets, 18px padding top/bottom, 20px sides, 16px font. Separated by subtle 5% white border-bottom. Centered text.

**Search Bar (Desktop):**
- **Shape:** 240px wide (180px tablet), flex row, 5px padding, 5px gap, Surface background, 1px border
- **Icon:** Search icon in Text Muted, 20px
- **Input:** Transparent background, 14px font, Text Primary text, Text Muted placeholder
- **Focus:** Container border ignites to Neon Arc with Focus Ring

**Search Bar (Mobile ≤600px):**
- **Initial:** Hidden. Triggered by search icon button.
- **Expanded:** Full-width bar below header, Deep Void background, 10px 12px padding, border-top and border-bottom. Slides down from behind header with 0.3s ease. Input at 16px to prevent iOS zoom.

### Drawers (Cart & Wishlist)

**Character:** Side panels that slide from the right edge (desktop) or rise from the bottom (mobile). They're elevated workspaces — Surface background, bordered, with their own scroll context.

**Desktop:**
- **Width:** 380px, max 90vw. Full viewport height.
- **Position:** Fixed right, off-screen at -400px. Slides to right: 0 with 0.3s ease.
- **Structure:** Header (20px padding, bottom border), scrollable body (flex-1, 20px padding), footer (20px padding, top border)
- **Overlay:** Fixed full-screen black at 50% opacity, fades in with the drawer

**Mobile (≤600px):**
- **Position:** Fixed bottom, off-screen at -100vh. Rises to bottom: 0.
- **Height:** 85vh. Top corners rounded at 16px.
- **Border:** Top border only, no left border.
- **Header/Body/Footer:** 16px padding

**Cart Items:**
- **Layout:** Horizontal flex, 15px gap (12px mobile), 20px padding-bottom + 20px margin-bottom with bottom border (16px mobile)
- **Image:** 70x70px (60x60px mobile), 8px radius (10px mobile), object-fit cover
- **Info:** Item name 15px, quantity/price 14px muted
- **Remove:** Underlined text link, 13px muted. Hover shifts to Neon Arc.

**Cart Footer:**
- **Shipping:** Label + input + calculate button row. Input follows standard input style. Button is small primary.
- **Total:** 18px, total amount in bold Neon Arc
- **CTA:** Full-width primary button — "Finalizar Compra"

### Modal (Checkout)

**Character:** Centered overlay that scales in from 95% to 100% with a simultaneous fade. The most elevated surface in the system.

- **Shape:** 420px max-width, max 90vw (95vw mobile), 85vh max-height with scroll. 30px padding (20px mobile). 8px radius (16px mobile). 1px border.
- **Background:** Surface (#1e293b)
- **Animation:** Scale(0.95) + opacity 0 → scale(1) + opacity 1, 0.3s ease
- **Overlay:** Fixed full-screen black at 60% opacity
- **Payment Methods:** 3-column grid, each button is a Surface-dark background with 1px border. Active state switches border to Neon Arc, background to 10% violet tint, text to Text Primary.
- **Credit Card Form:** Conditionally revealed. Standard input styling. Two-column row for expiry/CVV.
- **Success State:** Centered, green check circle icon at 60px, order number in 24px bold Neon Arc.
- **Simulation Notice:** 12px muted text: "Simulação: nenhum dado é enviado ou armazenado de verdade."

### Toast

**Character:** A floating confirmation that rises from below — brief, centered, dismissive.

- **Position:** Fixed bottom 30px (20px mobile), centered horizontally with translateX(-50%). Mobile: full-width with 16px side margins.
- **Shape:** Surface background, 1px border, 8px radius (12px mobile), 14px 24px padding (12px 20px mobile), 14px font
- **Shadow:** Glow Primary — the toast shares the primary button's signature shadow
- **Animation:** translateY(20px) + opacity 0 → translateY(0) + opacity 1, 0.3s ease. Auto-dismisses after 3 seconds.

### Badges

**Cart Badge:**
- **Shape:** 18px circle (16px mobile), Neon Arc background, white text
- **Position:** Absolute, -5px top, -10px right of parent icon button
- **Animation:** Bounce scale (1 → 1.3 → 1, 0.4s ease) when count changes
- **Accessibility:** `aria-live="polite"` on the element for screen reader announcements

**Wishlist Badge:**
- **Shape:** 18px circle, Signal Red background, white text
- **Position:** Identical to cart badge positioning
- **Animation:** Same bounce scale as cart badge

### Scroll Reveal

- **Initial:** Opacity 0, translateY(40px)
- **Revealed:** Opacity 1, translateY(0)
- **Transition:** 0.6s ease on both properties
- **Trigger:** Intersection Observer at 15% threshold
- **Respects:** `prefers-reduced-motion` — disables animation entirely, elements remain visible

## Do's and Don'ts

### Do:
- **Do** use Neon Arc (#8b5cf6) as the sole accent for all primary interactive elements — buttons, links, focus rings, active borders, price highlights
- **Do** use Surface (#1e293b) for cards and elevated containers; Deep Void (#0f172a) for page backgrounds and input fields
- **Do** provide a 2px violet focus ring (`0 0 0 2px rgba(139,92,246,0.2)`) on every interactive element's `:focus-visible` state
- **Do** maintain the 1px solid border (#334155) on all surface boundaries — no borderless cards or shadow-only separation
- **Do** lift interactive elements on hover (-2px to -5px translateY) paired with shadow emergence
- **Do** use amber (#fbbf24) exclusively for star ratings; green (#4ade80) exclusively for success states; red (#ef4444) for errors and wishlist
- **Do** keep the container at max-width 1200px with responsive horizontal padding (20px → 24px → 16px)
- **Do** respect `prefers-reduced-motion` by disabling animations, transitions, and scroll-behavior
- **Do** respect `prefers-contrast: more` by boosting text to pure white, borders to white, and accent to #a78bfa
- **Do** make mobile touch targets at least 44px in their smallest dimension for interactive elements
- **Do** use 16px font-size on mobile inputs to prevent iOS auto-zoom
- **Do** provide focus trap in modals and drawers; ESC to close; click-outside on overlay to dismiss

### Don't:
- **Don't** use light backgrounds or white cards. The dark canvas is non-negotiable — the void is the brand
- **Don't** introduce a second decorative accent color. Amber, green, and red are semantic signals, not decoration
- **Don't** add shadows to static surfaces — cards at rest have no shadow; shadows are a response to state
- **Don't** use bounce or elastic easing outside of badge animations (the detector flags these as dated)
- **Don't** remove the 1px border from cards or containers — the dark theme demands crisp surface definition
- **Don't** shrink text below 12px (font-size-xs) — that's the floor for legibility
- **Don't** ship custom web fonts — the system font stack is chosen for zero-latency rendering and must remain the primary type source
- **Don't** animate anything that a `prefers-reduced-motion` user would see as motion — check the media query before adding any new animation
- **Don't** nest more than one level of surface elevation (a card inside a drawer inside a modal is too deep — flatten or use tonal distinction)
