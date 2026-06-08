---
name: Monochrome Logic
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  code:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 24px
  margin: 24px
  container-max: 1200px
---

## Brand & Style

This design system is defined by a high-contrast, editorial approach that merges the raw, independent spirit of a DIY zine with the precise, functional clarity of a technical developer blog. The aesthetic is intentionally stark and uncompromising, stripping away all visual ornament—shadows, gradients, and color—to focus exclusively on typography and structural rhythm. 

The brand personality is intellectual, disciplined, and transparent. It evokes an emotional response of focus and authority, creating a "low-noise" environment where content is the singular hero. It draws heavily from **Brutalist Minimalism**, utilizing strict grid alignments and monospaced type to convey a sense of "built-in-public" authenticity and engineering rigor.

## Colors

The palette is strictly limited to three values to maintain visual tension and absolute clarity. 

- **Black (#000000):** Used for all primary text, heavy borders, and solid-fill interactive states. It represents the "ink" of the system.
- **White (#FFFFFF):** The primary surface color. Generous "paper" space is used to create breathing room and define hierarchy without the need for secondary colors.
- **Light Grey (#F2F2F2):** Reserved exclusively for subtle UI scaffolding, such as secondary borders, disabled states, or very faint background zones in complex data tables.

Avoid any shades of grey between #000000 and #F2F2F2. Contrast must remain at its maximum theoretical limit for accessibility and impact.

## Typography

Typography is the primary vehicle for brand expression. This design system uses **Space Grotesk** (a monospace-influenced sans-serif that retains technical qualities) to bridge the gap between developer utility and editorial zine style. 

Hierarchy is established through extreme scale shifts rather than color. Headlines should be set tight and large, often touching or crossing grid lines to create a sense of intentionality. All labels and metadata must be set in uppercase with slight letter spacing to differentiate them from prose. Body text preserves a generous line height for readability against the high-contrast background.

## Layout & Spacing

The layout is built on a strict **12-column fluid grid** that snaps to 4px increments. 

- **Grid:** Use a 12-column layout for desktop, 6-column for tablet, and 2-column for mobile. 
- **Borders:** Grid lines should often be visible. Use 1px #000000 lines to separate major sections and 1px #F2F2F2 lines for internal component divisions.
- **Negative Space:** Emphasize "white space as a luxury." Sections should be separated by a minimum of 64px (xl) to maintain the zine-like editorial feel.
- **Alignment:** All elements must align to the baseline grid. Avoid centered layouts; stick to a strong left-aligned axis to reinforce the technical blog aesthetic.

## Elevation & Depth

This design system is strictly **flat**. Depth is conveyed through structural layering and borders rather than light and shadow.

- **No Shadows:** Shadows of any kind are prohibited.
- **Z-axis:** Visual hierarchy is created through "The Stack." Elements that are "higher" in the hierarchy are simply placed inside a container with a 1px solid black border.
- **Active States:** Depth is simulated via inverted colors. For example, a button on hover does not lift; it changes from a white background with black text to a black background with white text.
- **Subtle Layering:** Use the #F2F2F2 grey for background fills only when it is necessary to distinguish a "container" (like a code block or a sidebar) from the main page body.

## Shapes

The shape language is **Sharp (0px roundedness)**. 

Every UI element—including buttons, input fields, cards, and images—must have 90-degree corners. This reinforces the "grid-first" philosophy and the brutalist nature of the design system. Roundness is seen as a decorative soft feature that conflicts with the technical, monospaced narrative of this system.

## Components

- **Buttons:** 1px solid #000000 border, 0px radius, uppercase label. Hover state: Invert (Background: #000000, Text: #FFFFFF). Active state: 2px solid #000000.
- **Input Fields:** 1px solid #000000 bottom border only (like a typewriter or terminal). No background fill. Placeholder text in #000000 at 50% opacity.
- **Cards:** Simple 1px #000000 border. No shadow. Use a "Header" section within the card separated by a 1px horizontal line.
- **Checkboxes:** Square, 1px solid #000000. When checked, fill with a solid #000000 square leaving a 2px white margin inside the border.
- **Lists:** Unordered lists use a hyphen (-) rather than a bullet point to maintain the developer-blog aesthetic.
- **Navigation:** Simple text links separated by a pipe (|) character or placed within a strict horizontal grid.
- **Code Blocks:** Filled with #F2F2F2. No border. Text is #000000. Syntax highlighting is achieved through Bold and Italic font weights, not color.