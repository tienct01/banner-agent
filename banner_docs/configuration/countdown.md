# Countdown Banner

The **Countdown Banner** is a dynamic notification bar that displays a countdown timer alongside text and optional call-to-action (CTA) or coupon elements. It creates a sense of urgency, often used for limited-time offers, sales, or event announcements.

This document outlines the structural configuration for a **Countdown Banner**. It serves as a technical reference, detailing all necessary visual properties, data types, and settings. By following this guide, you can construct a valid configuration object that can be directly consumed and rendered by the application.

## Example Configuration

Below is an example JSON configuration for a **Countdown Banner**. *Note: All non-visual fields (such as trigger conditions, display logic, target audiences, and scheduling) have been excluded to focus purely on the design and content of the banner.*

```json
{
  "banner_type": 3,
  "position": 1,
  "name": "Flash Sale Countdown",
  "close_button": true,
  "btn_close_color": "#FFFFFF",
  "show_device": "all",
  "font_scale_enabled": false,
  "font_scale": 0,
  "banner_templates": [
    {
      "template": 0,
      "content_order": "text,countdown,action",
      "content_gap": 16,
      "banner_text": "<div style=\"font-size: 16px; color: #FFFFFF;\">🔥 Flash Sale Ends In:</div>",
      "countdown_format": "dd:hh:mm:ss",
      "font_size_countdown": 16,
      "timer_color": "{\"background\":\"#494949\",\"text\":\"#ffffff\",\"number\":\"#ffffff\",\"border\":\"#ff3f3f\",\"flipLine\":\"#000\",\"accentColor\":\"#FF3366\"}",
      "digit_style": 0,
      "bg_type": 0,
      "bg_color": "#000000",
      "bg_gradient": "{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}",
      "bg_opacity": 100,
      "bg_img_url_s3": "",
      "font_url": "",
      "bg_preset": 0,
      "font_size_button": 14,
      "font_family": "",
      "act_type": 3,
      "act_text": "<span style=\"font-size: 13px\">SHOP NOW</span>", 
      "btn_style": 0,
      "bg_padding": 10,
      "bg_padding_bottom": 10,
      "bg_padding_left": 15,
      "bg_padding_right": 15,
      "bg_size": "cover",
      "mobile_padding_enabled": false,
      "mb_bg_padding": "12px 0px 12px 0px",
      "border_width": "0px",
      "border_color": "#000000",
      "border_style": 0,
      "border_radius": "0px 0px 0px 0px",
      "enable_coupon": false,
      "coupon_code": "",
      "btn_copy": {
        "text_copy": "Copy",
        "success_mess": "Copied!"
      },
      "discount_style": {
        "border": 0,
        "background": "#FFFFFF",
        "text_color": "#000000",
        "font_size": 14
      }
    }
  ]
}
```

## Fields

### banner_type

* **Type:** `number`
* **Required:** yes
* **Description:** Indicates the type of the banner. For a Countdown Banner, this is typically `3`.

---

### position

* **Type:** `number`
* **Required:** yes
* **Default:** `1`
* **Description:** The physical placement of the banner on the webpage.
* **Constraints:**
  * Must be in `[0, 1]` (0: Top, 1: Bottom).

---

### name

* **Type:** `string`
* **Required:** yes
* **Description:** Internal identifier or name for the banner instance.

---

### close_button

* **Type:** `boolean`
* **Required:** yes
* **Default:** `true`
* **Description:** Toggles the visibility of the `[X]` close icon, allowing users to dismiss the banner.

---

### btn_close_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#FFFFFF"`
* **Description:** Hex color code for the close button icon.
* **Constraints:**
  * Must be a valid hex color code.

---

### show_device

* **Type:** `string`
* **Required:** yes
* **Default:** `"all"`
* **Description:** Specifies which device viewports the banner renders on.
* **Constraints:**
  * Must be in `["all", "mobile", "desktop"]`.

---

### font_scale_enabled

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Toggles font scaling for responsive design for the `banner_text`.

---

### font_scale

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Scaling ratio for `banner_text` inside the banner if `font_scale_enabled` is true. For example, if the `banner_text` is `<div style="font-size: 16px">🔥 Flash Sale</div>` and the scale is `50`, then the content displayed on mobile will be `16 * (50 / 100 + 1) = 24px`.
* **Constraints:**
  * Must be between `-100` and `100`.

---

### banner_templates

* **Type:** `array` of objects
* **Required:** yes
* **Description:** A list containing the layout, design, and content configuration objects for the banner. 
* **Constraints:**
  * Must have exactly 1 element.

---

## Template Layout & Background (Inside `banner_templates`)

### template

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Use with `banner_type` to determine which type of banner.

---

### content_order

* **Type:** `string`
* **Required:** yes
* **Default:** `"text,countdown,action"`
* **Description:** Comma-separated list defining the visual order of elements inside the banner.
* **Constraints:**
  * Valid items include `"text"`, `"countdown"`, `"action"`, `"coupon"`.
  * Must have text element

---

### content_gap

* **Type:** `number`
* **Required:** no
* **Default:** `16`
* **Description:** Gap between content elements inside the banner (e.g., between text, countdown, and button) in pixels.
* **Constraints:**
  * Must be between `0` and `200`

---

### bg_type

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Determines the background fill method.
* **Constraints:**
  * Must be in `[0, 1, 2]` (0: Solid Color, 1: Gradient, 2: Image).

---

### bg_color

* **Type:** `string`
* **Required:** conditional (if `bg_type` is `0`)
* **Default:** `"#000000"`
* **Description:** Hex color code for the solid background.

---

### bg_gradient

* **Type:** `string` (JSON string)
* **Required:** conditional (if `bg_type` is `1`)
* **Description:** A JSON-encoded string defining a CSS linear gradient. The `color1` property maps to the starting color and `color2` maps to the ending color.
* **Example:** `"{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}"`

---

### bg_opacity

* **Type:** `number`
* **Required:** no
* **Default:** `100`
* **Description:** The opacity percentage of the background fill.
* **Constraints:**
  * Must be between `0` and `100`.

---

### bg_img_url_s3

* **Type:** `string`
* **Required:** conditional (if `bg_type` is `2`)
* **Description:** The URL source for a custom uploaded background image.

---

### bg_size

* **Type:** `string`
* **Required:** no
* **Default:** `"cover"`
* **Description:** CSS value for background image sizing.
* **Constraints:**
  * Must be in `["cover", "contain", "auto"]`.

---

### bg_padding / bg_padding_bottom / bg_padding_left / bg_padding_right

* **Type:** `number`
* **Required:** no
* **Default:** `12`
* **Description:** Spacing inside the banner container (in pixels).
* **Constraints:**
  * Max value is 100

---

### mobile_padding_enabled

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Flag to use separate padding configurations on mobile devices.

---

### mb_bg_padding

* **Type:** `string`
* **Required:** conditional (if `mobile_padding_enabled` is true)
* **Default:** `"12px 0px 12px 0px"`
* **Description:** CSS padding string specifically applied when viewed on mobile screens.
* **Constraints:**
  * Must be in format with exactly 4 numbers for four sides.
  * Must use px unit.

---

### border_width

* **Type:** `string`
* **Required:** no
* **Default:** `"0px"`
* **Description:** Configures the banner's outer border width using standard CSS values (e.g., "1px", "2px"). Must include unit.

---

### border_style

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Configures the banner's outer border style.
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5, 6, 7]` (0: None, 1: Solid, 2: Dotted, 3: Dashed, 4: Double, 5: Groove, 6: Inset, 7: Outset).

---

### border_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#000000"`
* **Description:** Configures the banner's outer border color.
* **Constraints:**
  * Must be a valid CSS color value (hex).

---

### border_radius

* **Type:** `string`
* **Required:** no
* **Default:** `"0px 0px 0px 0px"`
* **Description:** Configures the banner's rounded corners using standard CSS values.
* **Constraints:**
  * Must be in format with exactly 4 values for four corners (e.g., `"0px 0px 0px 0px"`).

---

## Content & Typography (Inside `banner_templates`)

### banner_text

* **Type:** `string`
* **Required:** yes
* **Default:** `""`
* **Description:** The primary textual message to display alongside the countdown timer. 
* **Example:** `"<div style=\"font-size: 16px; color: #FFFFFF;\">🔥 Flash Sale Ends In:</div>"`
* **Notes:**
  * Supports embedded HTML and inline styling. Supported HTML/inline styles include: `bold` (`<strong>` or `font-weight`), `italic` (`<em>` or `font-style`), `strike` (`<s>` or `text-decoration`), `underline` (`<u>` or `text-decoration`), `color`, and text alignment (`text-align: left | center | right`). Also supports `link` (`<a>`) and `image` (`<img>`).
* **Constraints:**
  * Must be wrapped in a `<p>` or `<span>` or `<div>` with an inline `font-size` style, and inline `color`.

---

### font_family

* **Type:** `string`
* **Required:** no
* **Default:** `"Inter"`
* **Description:** Name of the typography font to apply.
* **Notes:**
  * The `font_family` should corresponded with the `font_url`.

---

### font_url

* **Type:** `string`
* **Required:** no
* **Default:** `""`
* **Description:** External resource link to load the selected font if it is a custom web font.

---

## Countdown Timer Details (Inside `banner_templates`)

### countdown_format

* **Type:** `string`
* **Required:** yes
* **Default:** `"dd:hh:mm:ss"`
* **Description:** Defines the segments of time shown in the timer. The format specifies exactly what units of time are displayed based on colon-separated acronyms.
* **Constraints:**
  * Must be one of the following string options:
    * `"dd:hh:mm:ss"`: Displays Days, Hours, Minutes, and Seconds.
    * `"hh:mm"`: Displays only Hours and Minutes.
    * `"dd:hh:mm"`: Displays Days, Hours, and Minutes.
    * `"hh:mm:ss"`: Displays Hours, Minutes, and Seconds.
    * `"mm:ss"`: Displays only Minutes and Seconds.

---

### font_size_countdown

* **Type:** `number`
* **Required:** yes
* **Default:** `13`
* **Description:** Font size of the countdown timer text in pixels.

---

### timer_color

* **Type:** `string` (JSON string)
* **Required:** no
* **Default:** `"{\"background\":\"#494949\",\"text\":\"#ffffff\",\"number\":\"#ffffff\",\"border\":\"#ff3f3f\",\"flipLine\":\"#000\",\"accentColor\":\"#FF3366\"}"`
* **Description:** A JSON-encoded string defining the colors applied to the countdown timer digits and styles. It contains the following properties:
  * `background`: Background color of the digits.
  * `text`: Color of the text labels (e.g., "Days", "Hours").
  * `number`: Color of the numeric digits.
  * `border`: Border color for specific digit styles (e.g., Flash Bounce).
  * `flipLine`: Color of the dividing line in the Flip digit style.
  * `accentColor`: Accent color for specific digit styles (e.g., Limited Glow).

---

### digit_style

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Specifies the visual style and animation variation for the countdown digits. 
* **Constraints:**
  * Must be one of the following enumerations (mapped internally):
    * `0` (Classic): Standard numerical countdown with static digits.
    * `1` (Flip): Mechanical flip-clock style countdown where digits flip downwards. Requires standard flipLine configuration inside timer_color.
    * `2` (Flash Bounce): Digit styles that pulse/bounce with a highlighted border line.
    * `3` (Limited Glow): Emphasized digit style showcasing an inner/outer neon accent glow indicating high urgency.

---

## Buttons & Actions (Inside `banner_templates`)

### act_type

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Type of the call-to-action (CTA) button behavior.
  * `0` (None): No call-to-action is rendered.
  * `1` (Entire): The entire banner itself is clickable.
  * `2` (Link): Renders a standard inline hyperlink (`<a>` tag) with text-decoration set to underline.
  * `3` (Button): Renders an anchor tag (`<a>`) that is heavily styled to look like a solid or outlined button with padding and background colors.
  * `4` (Btn Copy): Renders an interactive `<button>`. When clicked, it copies a pre-defined text string (from `btn_copy.text_copy`) to the user's clipboard and changes text to `btn_copy.success_mess`.
  * `5` (Coupon): Visually renders a stylized coupon code block directly inside the banner based on `coupon_code` and `discount_style`.
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5]`.

---

### act_text

* **Type:** `string`
* **Required:** conditional (if `act_type` is 2, 3, 4, 6)
* **Default:** `"<span style=\"font-size: 13px\">SHOP NOW</span>"` for `act_type` 2 or 3, `"COPY CODE"` for `act_type` 4.
* **Description:** Visual text rendered inside the call-to-action button or link. Supports embedded HTML and inline styling similarly to `banner_text`.

---

### btn_style

* **Type:** `number`
* **Required:** conditional (if `act_type` is 3, 4, 6)
* **Default:** `0`
* **Description:** The border style ID used for the call-to-action button block. It determines the border radius, background fill, and border line style. Supported values are:
  * `0` (Solid): Square corners, solid background.
  * `1` (Outlined): Square corners, transparent background, solid border.
  * `2` (Rounded Solid): 4px rounded corners, solid background.
  * `3` (Rounded Outlined): 4px rounded corners, transparent background, solid border.
  * `4` (Fully Rounded Solid): 99px rounded corners, solid background.
  * `5` (Fully Rounded Outlined): 99px rounded corners, transparent background, solid border.
  * `6` (Dashed): Square corners, transparent background, dashed border.
  * `7` (Rounded Dashed): 4px rounded corners, transparent background, dashed border.
  * `8` (Fully Rounded Dashed): 99px rounded corners, transparent background, dashed border.
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5, 6, 7, 8]`.

---

## Coupon Display & Copy (Inside `banner_templates`)

### discount_style

* **Type:** `object`
* **Required:** conditional (if `enable_coupon` is true or `act_type` is 5)
* **Default:** `{"border": 0, "background": "#FFFFFF", "text_color": "#000000", "font_size": 14}`
* **Description:** Styling specifications for the coupon text block.
  * `border` (`number`): The border style ID used for the coupon box. Supported values are the same as `btn_style` (`0` to `8`).
  * `background` (`string`): Hex color code used as the background fill (for solid types) or border color (for outlined/dashed types).
  * `text_color` (`string`): Hex color code for the coupon code text.
  * `font_size` (`number`): Text size of the coupon code in pixels.
  * `animation` (`number`): Optional ID for CSS hover/interaction animation styles based on `BtnAnimationType`. Default is `0`. Supported values are:
    * `0` (NONE)
    * `1` (COLOR_FLIP)
    * `2` (THIN)
    * `3` (HOLOGRAM)
    * `4` (PULSE)
    * `5` (WOBBLE)

---

### btn_copy

* **Type:** `object`
* **Required:** conditional (if button copies code)
* **Default:** `{"text_copy": "Copy", "success_mess": "Copied!"}`
* **Description:** Defines the text states for a copy button (default and post-click success message).
