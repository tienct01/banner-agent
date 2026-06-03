# Bold & Urgent

## Visual Identity
High-impact, attention-demanding, and impossible to ignore. Maximal contrast, aggressive colors, and large typography create immediate urgency. Designed to stop scrolling and drive instant action — FOMO incarnate.

## Color Palette
- **Background:** Bright red (`#DC2626`), orange (`#F97316`), electric yellow (`#FBBF24`), or black (`#000000`) with aggressive accent
- **Text:** White (`#FFFFFF`) or black on bright backgrounds
- **Accent:** White, black, or a contrasting bold color — never muted
- **Contrast:** Maximum — white on red, black on yellow, white on black
- **Avoid:** Pastels, muted tones, gradients that soften impact

## Typography
- **Font:** Bold, heavy, impactful — Montserrat (800), Bebas Neue, Oswald, Anton, Impact
- **Font weight:** Bold or black (700-900)
- **Font size:** LARGE — 18-24px for key messages; oversized for the headline
- **Text style:** Uppercase for urgency keywords; exclamation marks encouraged

## Background
- **Type:** Solid bold color (`bg_type: 0`) — gradients dilute the urgency
- **Avoid:** Images (distract from the message), subtle gradients
- **Padding:** Moderate (10-14px); tight but readable

## Borders & Radius
- **Border:** Thick and contrasting (`border_style: 1`), e.g., white border on red background
- **Radius:** Sharp (`0px`) or slightly rounded (`4px`); sharp edges feel more aggressive
- **Width:** `2px` to `4px` for visible framing

## CTA / Button
- **Style:** Solid high-contrast (`btn_style: 0` or `2`) — white button on red background, black on yellow
- **Animation:** Pulse (`animation: 4`) recommended for extra urgency
- **Text:** Action verbs — "SHOP NOW", "CLAIM YOURS", "DON'T MISS OUT", "GRAB IT", "HURRY!"
- **Uppercase:** Recommended for maximum impact

## Countdown Timer (for Countdown Banners)
- **Display format:** Large, bold digits — `dd:hh:mm:ss` or `hh:mm:ss`
- **Digit style:** Flip (`digit_style: 1`) or flash bounce (`digit_style: 2`) for attention
- **Colors:** Dark background, bright red/orange accent, white digits
- **Timer color JSON:** High contrast settings

## Coupon/Discount
- **Style:** Bold solid (`discount_style.border: 0` or `2`) with contrasting colors
- **Background:** White or bright contrasting accent
- **Animation:** Color flip (`animation: 1`) or pulse (`animation: 4`)
- **Text:** LARGE, BOLD — "50% OFF", "SAVE $20"

## When to Use
- Flash sales, limited-time offers, clearance events, Black Friday/Cyber Monday (if not using seasonal_holiday)
- User says "urgent", "bold", "flash sale", "FOMO", "sale", "limited", "ending soon", "last chance"
- Countdown banners for time-bound promotions
- Any campaign where conversion rate is the primary metric

## When NOT to Use
- Evergreen/non-urgent announcements (use `announcement_single` with `modern_clean`)
- Luxury brands (use `luxury_elegant`)
- Soft/wellness brands (use `light_mode`)

## Example
> "Bold urgent banner for 24-hour flash sale — red (#DC2626) background, white Montserrat 800 text '⚡ FLASH SALE — 50% OFF — ENDS TONIGHT ⚡', pulsing white 'SHOP NOW' button."
