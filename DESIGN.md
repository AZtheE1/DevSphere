---
name: Doodle Land
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad6ff'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2ff'
  surface-container: '#efebff'
  surface-container-high: '#e9e5ff'
  surface-container-highest: '#e3dfff'
  on-surface: '#181445'
  on-surface-variant: '#4d4633'
  inverse-surface: '#2d2a5b'
  inverse-on-surface: '#f3eeff'
  outline: '#7e7761'
  outline-variant: '#d0c6ad'
  surface-tint: '#705d00'
  primary: '#705d00'
  on-primary: '#ffffff'
  primary-container: '#ffd93d'
  on-primary-container: '#725e00'
  inverse-primary: '#e8c426'
  secondary: '#ac2a5d'
  on-secondary: '#ffffff'
  secondary-container: '#ff6b9d'
  on-secondary-container: '#6e0034'
  tertiary: '#006780'
  on-tertiary: '#ffffff'
  tertiary-container: '#a3e5ff'
  on-tertiary-container: '#006982'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe173'
  primary-fixed-dim: '#e8c426'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#554500'
  secondary-fixed: '#ffd9e1'
  secondary-fixed-dim: '#ffb1c5'
  on-secondary-fixed: '#3f001b'
  on-secondary-fixed-variant: '#8c0a46'
  tertiary-fixed: '#b7eaff'
  tertiary-fixed-dim: '#5bd5fc'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e61'
  background: '#fcf8ff'
  on-background: '#181445'
  surface-variant: '#e3dfff'
typography:
  display:
    fontFamily: Comfortaa
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Comfortaa
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Comfortaa
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Comfortaa
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-sm:
    fontFamily: Comfortaa
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  title:
    fontFamily: Comfortaa
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-lg:
    fontFamily: Comfortaa
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
  label-md:
    fontFamily: Comfortaa
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
  label-sm:
    fontFamily: Comfortaa
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  stat-counter:
    fontFamily: Comfortaa
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3rem
---

## Brand & Style

This design system channels an animated, tactile toy universe where gamified interaction meets tangible physical play. Inspired by sticker albums, tactile learning apps, and vibrant animated shorts, the interface feels delightfully chunky, reactive, and physically stamped onto the screen. Every interactive element behaves like an extruded vinyl sticker or a pop-art wooden block.

The style fuses **Neo-Brutalism** and **Chunky Toy/Playful Tactility**:
- Crisp, heavy ink outlines anchor the vibrant palette against soft, milky backdrops.
- Hard, zero-blur directional offset drop shadows ground every card, chip, and badge, giving components tactile pop.
- Physics-based bounce feedback (squish on click/tap, micro-rotations on hover) transforms mechanical state changes into joyful physical reactions.
- Decorative accent flourishes—geometric star sparkles, soft cloud puffs, and cel-shaded gloss highlights—inject charm without impeding screen utility or legibility.

## Colors

The palette is electric, confectionery, and balanced against deep grounding ink lines and a rich, creamy substrate.

### Primary Role & Tints
- **Primary (`#FFD93D` - Sunny Yellow):** The primary energetic engine. Used for core progression badges, primary calls to action, hero reward bursts, and streak indicators.
- **Secondary (`#FF6B9D` - Bubblegum Pink):** Hearts, delights, interactive accents, and high-energy celebration alerts.
- **Tertiary (`#4CC9F0` - Sky Blue):** Navigation accents, informational banners, path connectors, and secondary interaction surfaces.

### Complementary Accents
- **Mint Green (`#6BE585`):** Success milestones, verified completions, and XP boosts.
- **Grape Purple (`#9B5DE5`):** Mystery boxes, level milestones, and premium mastery tracks.
- **Tangerine Orange (`#FF9F1C`):** Streaks, fire gauges, and countdown alerts.

### Neutrals & Baselines
- **Outline & Shadow Neutral (`#1E1B4B` - Dark Navy):** Replaces pure black entirely. Delivers punchy graphic structure without harshness.
- **Surface Canvas Light (`#FFF8E7` - Warm Cream):** The standard background, reducing eye strain and evoking aged sticker paper or storybook parchment.
- **Surface Canvas Dark (`#1A1838` - Deep Indigo):** The night mode canvas. When active, card surfaces transition to tinted jewel tones while maintaining `#1E1B4B` boundaries edged with crisp `#FFD93D` or `#4CC9F0` offset highlights.

## Typography

Typography delivers rounded, friendly structural clarity. 

- **Headlines, Buttons & Badges (Comfortaa):** Used for all titles, calls to action, and navigation labels. Its rounded, open letterforms mirror the pill-shaped geometry of the components.
- **Body & Explanatory Text (Nunito Sans):** Selected at `600` weight minimum. Thin weights are explicitly forbidden to retain legibility against tinted surfaces and to balance the heavy `3.5px` dark navy ink lines.
- **Numbers & Stat Counters:** High-value numeric achievements, countdown timers, and XP metrics leverage oversized Comfortaa bold styles with tight kerning for immediate readability.

## Layout & Spacing

The layout model is built on an adaptable 12-column grid for desktop (`1200px` max-width container) that steps down to a 6-column grid on tablets (`768px` to `1023px`) and a single/two-column fluid layout on mobile (`< 768px`).

- **Generous Internal Island Padding:** Because cards and containers use heavy 4px outlines and rigid drop shadows, component gutters and inner padding must never fall below `space-md` (`1.25rem`). This prevents text from colliding visually with the chunky boundaries.
- **Offset Clearance:** All layout blocks, interactive rows, and cards must allocate a minimum of `8px` of margin-bottom and margin-right beyond their bounding box to accommodate the hard-cast shadow without overlapping siblings.
- **Vertical Rhythm:** Main page sections alternate with rhythmic vertical pauses of `space-xl` (`3rem`), creating an open, uncrowded sticker-book arrangement.

## Elevation & Depth

This design system avoids blurred, realistic lighting in favor of sharp, cel-shaded pop-art extrusion. Visual hierarchy is established strictly via border weighting, directional hard-cast offset shadows, and white gloss reflections.

### Elevation Levels
- **Level 0 (Flat Ground):** Canvas background (`#FFF8E7` or `#1A1838`). No shadows.
- **Level 1 (Subtle / Chips / Minor Badges):** 
  - Border: `3px solid #1E1B4B`
  - Shadow: `3px 3px 0px #1E1B4B`
- **Level 2 (Standard Interactive / Buttons / Cards):** 
  - Border: `3.5px solid #1E1B4B`
  - Shadow: `4px 4px 0px #1E1B4B`
- **Level 3 (Floating / Modals / Active Prompts / Quest Nodes):** 
  - Border: `4px solid #1E1B4B`
  - Shadow: `6px 6px 0px #1E1B4B`
- **Pressed State (All Levels):** 
  - Shadow collapses to `0px 0px 0px #1E1B4B`
  - Transform translates the element down and right: `translate(4px, 4px)` (or `translate(3px, 3px)` for Level 1). This mimics pressing a physical spring button.

### Cel-Shade Highlights
Cards and primary buttons feature an inset, semi-translucent highlight along their top edge (`box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.4)`), generating an authentic molded-plastic or glossy vinyl sticker finish.

## Shapes

The shape grammar is soft, exaggerated, and pill-dominant. 

- **Primary Geometry:** Fully rounded pill-shapes (`border-radius: 9999px`) are standard for buttons, status chips, input search bars, and floating action pods.
- **Containers & Big Cards:** Applied at `rounded-xl` (`2rem` to `2.25rem` / `32px` to `36px`), yielding friendly, marshmallow-like panels.
- **Micro-Decorations:** Sparkle stars (4-point star polygons), cloud cutouts, and circular notification pips reinforce the organic, friendly visual universe.

## Components

### Buttons
- **Primary Button:** Filled with `#FFD93D` (Sunny Yellow), border `3.5px solid #1E1B4B`, shadow `4px 4px 0 #1E1B4B`, pill radius (`9999px`), bold Comfortaa label in `#1E1B4B`. Top inner highlight: `inset 0 3px 0 rgba(255, 255, 255, 0.5)`.
- **Secondary Button:** Filled with `#FF6B9D` (Bubblegum Pink) or `#4CC9F0` (Sky Blue) with white text, retaining the same outline and shadow specs.
- **States:** Hover translates `translate(-1px, -1px)` and increases the shadow offset to `5px 5px 0 #1E1B4B`. Active/Pressed collapses shadow to zero and translates `translate(4px, 4px)`.

### Cards
- **Base Card:** Crisp white (`#FFFFFF`) or tinted surface (`#FFFDF5`), border `3.5px solid #1E1B4B`, shadow `6px 6px 0 #1E1B4B`, `border-radius: 28px`.
- **Accent Ribbon:** Cards may feature an overlapping pill tag positioned along the top left edge that breaks the top boundary, sporting a contrasting background (e.g., `#6BE585` Mint Green).

### Chips & Badges
- Pill-shaped (`border-radius: 9999px`), `3px solid #1E1B4B`, `3px 3px 0 #1E1B4B` offset shadow.
- Font: Comfortaa `label-md` (`14px` bold).
- Includes an optional left-aligned circular sticker icon or avatar.

### Inputs & Text Fields
- Surface: `#FFFFFF`, `3.5px solid #1E1B4B`, `border-radius: 20px`, internal padding `0.875rem 1.25rem`.
- Focus state: Shadow snaps to `4px 4px 0 #4CC9F0` with outline remaining `#1E1B4B`. Placeholder text in muted `#1E1B4B` at 50% opacity.

### Checkboxes & Radio Controls
- **Checkboxes:** Squared with extra-round corners (`border-radius: 10px`), `3px solid #1E1B4B`, size `28px x 28px`. When checked, the background fills with `#6BE585` (Mint Green), and displays a chunky `#1E1B4B` checkmark with a `2px 2px 0 #1E1B4B` hard shadow.
- **Radio Buttons:** Circular (`border-radius: 50%`), `3px solid #1E1B4B`, size `28px x 28px`. When selected, an inner `#FF6B9D` circle expands with an immediate snappy spring transition.

### Playful Gamification Nodes (Custom System Component)
- Circular level nodes (`64px x 64px`), `4px solid #1E1B4B`, `6px 6px 0 #1E1B4B`.
- Locked nodes are desaturated stone gray with a lock glyph. Active/current nodes are `#FFD93D` with an animated pulsing star burst halo and a bottom bounce loop.