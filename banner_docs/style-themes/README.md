# Style Themes

Choose ONE style theme that best matches the user's description, brand tone, and campaign context for banner design.

## Themes

| Theme                | Description                                               | When to apply                                                                                                                |
| -------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| minimal              | Clean, simple, lots of space, subtle colors, lightweight  | User says "minimal", "clean", "simple", "no clutter"                                                                         |
| modern-clean         | Contemporary, professional, balanced, neutral with accent | User says "modern", "professional", "clean", "corporate"                                                                     |
| cyberpunk-futuristic | Neon colors, dark backgrounds, glowing, tech-forward      | User says "cyberpunk", "neon", "futuristic", "tech", "gaming", "sci-fi"                                                      |
| vintage-retro        | Warm tones, nostalgic, serif fonts, muted/handcrafted     | User says "vintage", "retro", "old school", "nostalgic", "classic"                                                           |
| playful-fun          | Bright colors, rounded corners, bouncy, casual, cheerful  | User says "fun", "playful", "kids", "colorful", "cheerful", "casual"                                                         |
| dark-mode            | Dark backgrounds, light text, high contrast, sleek        | User says "dark", "dark mode", "night", "black background"                                                                   |
| light-mode           | Light backgrounds, dark text, airy, approachable          | User says "light", "white background", "bright", "airy"                                                                      |
| seasonal-holiday     | Thematic for a specific occasion or season                | User mentions a holiday (Christmas, Halloween, Valentine's, Black Friday, New Year) or season (summer, winter, spring, fall) |
| luxury-elegant       | Premium feel, gold/black/white, sophisticated             | User says "luxury", "premium", "high-end", "elegant", "sophisticated", "exclusive"                                           |
| bold-urgent          | High contrast, red/orange accents, attention-demanding    | User says "urgent", "bold", "flash sale", "FOMO", "sale", "limited"                                                          |

## Style Inference Rules

* Extract style keywords from the user's message and map to the table above.
* If the user's message does NOT mention any style-related keywords, set the theme to null and ask for clarification.
* If the user mentions a specific color palette, reflect that in the theme\_description even if mapping to a general theme.
* For seasonal/holiday events (e.g., "Black Friday sale"), prefer "seasonal-holiday" with event-specific styling.
* A countdown or discount banner paired with urgency language typically maps to "bold-urgent".
* A luxury brand/store typically maps to "luxury-elegant".
