# Cyberpunk / Futuristic

## Visual Identity
High-tech, edgy, and attention-commanding. Neon accents glow against dark backgrounds. Geometric patterns, glitch effects, and bold typography create a sci-fi atmosphere. Feels like a video game UI or a tech dystopia.

## Color Palette
- **Background:** Deep black (`#0A0A0A`), dark purple (`#1A0A2E`), or dark navy (`#0F172A`)
- **Text:** Bright white (`#FFFFFF`) or neon cyan (`#00FFFF`)
- **Accent (primary):** Neon cyan (`#00FFFF`), electric magenta (`#FF00FF`), or acid green (`#39FF14`)
- **Accent (secondary):** A complementary neon — e.g., cyan + magenta, green + blue
- **Avoid:** Muted/pastel colors, earth tones, warm beiges

## Typography
- **Font:** Futuristic — Orbitron, Rajdhani, Share Tech Mono, Audiowide, or monospace fonts
- **Font weight:** Bold (700+) for headings; light (300) for body creates contrast
- **Font size:** Often oversized headlines for impact; use Google Fonts `font_url`

## Background
- **Type:** Dark solid (`bg_type: 0`) or dark gradient (`bg_type: 1`)
- **Gradient:** Deep purple to black: `#1A0033` → `#000000`
- **Image (optional):** Grid patterns, circuit traces, neon cityscapes (`bg_type: 2`)
- **Padding:** Moderate (10-14px); tight feels techy

## Borders & Radius
- **Border:** Glowing neon — use `border_style: 1` (solid) with a neon accent color
- **Radius:** Sharp (`0px`) or angled; avoid fully rounded corners
- **Glow effect:** Achieved via bright border color (e.g., `#00FFFF`) on dark background

## CTA / Button
- **Style:** Solid with sharp corners (`btn_style: 0`) or outlined neon (`btn_style: 1`)
- **Color:** Neon accent on dark button, or dark button with neon border
- **Text:** White or matching neon; short and punchy — "ENTER", "CLAIM NOW", "⚡ ACTIVATE"

## Coupon/Discount
- **Style:** Dashed or outlined with neon border (`discount_style.border: 6`)
- **Background:** Semi-transparent dark (`rgba(0,0,0,0.6)`)
- **Animation:** Pulse or hologram (`animation: 4` or `3`)
- **Text:** Neon-colored code text

## When to Use
- Gaming stores, esports, tech gadgets, VR/AR products, crypto/NFT
- User says "cyberpunk", "neon", "futuristic", "tech", "gaming", "sci-fi", "synthwave"
- Late-night shopping campaigns or tech product launches

## When NOT to Use
- Luxury/high-end brands (use `luxury_elegant`)
- Children's products (use `playful_fun`)
- Professional/corporate brands (use `modern_clean`)

## Example
> "Cyberpunk banner for our gaming PC sale — dark background with neon cyan (#00FFFF) border glow, Orbitron font, pulsing 'SHOP NOW' CTA."
