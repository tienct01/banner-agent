# Announcement Single Banner

The **Announcement Single Banner** is a straightforward, static notification bar typically rendered at the top or bottom of a webpage. 

This document outlines the structural configuration for an **Announcement Single Banner**. It serves as a technical reference, detailing all necessary properties, data types, and settings. By following this guide, you can construct a valid configuration object that can be directly consumed and rendered by the application.

## Example Configuration

Below is an example JSON configuration for an **Announcement Single Banner**. *Note: All non-visual fields (such as trigger conditions, display logic, target audiences, and scheduling) have been excluded to focus purely on the design and content of the banner.*

```json
{
  "banner_type": 0,
  "position": 1,
  "name": "New Announcement Banner",
  "close_button": false,
  "btn_close_color": "#FFFFFF",
  "show_device": "all",
  "font_scale_enabled": false,
  "font_scale": 0,
  "banner_templates": [
    {
      "template": 0,
      "banner_text": "<div style=\"font-size: 16px\">🎉 Summer Sale: Get 20% off all orders over $50! Use code SUMMER20.</div>",
      "bg_type": 0,
      "bg_color": "#FF5722",
      "bg_gradient": "{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}",
      "bg_opacity": 100,
      "bg_img_url_s3": "",
      "bg_preset": 0,
      "font_family": "",
      "font_url": "",
      "act_type": 0,
      "act_text": "<span style=\"font-size: 13px\">SHOP NOW</span>", 
      "btn_style": 0,
      "bg_padding": 10,
      "bg_padding_bottom": 10,
      "bg_padding_left": 0,
      "bg_padding_right": 0,
      "bg_size": "auto",
      "mobile_padding_enabled": true,
      "mb_bg_padding": "12px 0px 12px 0px",
      "content_gap": 10,
      "border_width": "0px 0px 0px 0px",
      "border_color": "#000000",
      "border_style": 0,
      "border_radius": "0px 0px 0px 0px",
      "enable_coupon": false,
      "coupon_code": "",
      "btn_copy": {
        "text_copy": "",
        "success_mess": "COPIED ✅"
      },
      "discount_style": {
        "border": 7,
        "background": "#ffffff",
        "text_color": "#ffffff",
        "font_size": 13
      }
    }
  ]
}
```

## Fields

### banner_type

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Indicates the type of the banner. 
* **Example:** `0`
* **Constraints:**
  * Must be `0` for an Announcement Single Banner.

---

### position

* **Type:** `number`
* **Required:** yes
* **Default:** `1`
* **Description:** The physical placement of the banner on the webpage.
* **Example:** `1`
* **Constraints:**
  * Must be in `[0, 1]` (0: Top, 1: Bottom).

---

### name

* **Type:** `string`
* **Required:** yes
* **Default:** —
* **Description:** Internal identifier or name for the banner instance.
* **Example:** `"New Announcement Banner"`

---

### close_button

* **Type:** `boolean`
* **Required:** yes
* **Default:** `false`
* **Description:** Toggles the visibility of the `[X]` close icon, allowing users to dismiss the banner.
* **Example:** `true`

---

### btn_close_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#FFFFFF"`
* **Description:** Hex color code for the close button icon.
* **Example:** `"#FFFFFF"`
* **Constraints:**
  * Must be a valid hex color code.

---

### show_device

* **Type:** `string`
* **Required:** yes
* **Default:** `"all"`
* **Description:** Specifies which device viewports the banner renders on.
* **Example:** `"all"`
* **Constraints:**
  * Must be in `["all", "mobile", "desktop"]`.

---

### font_scale_enabled

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Toggles font scaling for responsive design for the `banner_text`.
* **Example:** `false`

---

### font_scale

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Scaling ratio for `banner_text` inside the banner if `font_scale_enabled` is true. For example, if the `banner_text` is `<div style="font-size: 16px">🎉 Summer Sale: Get 20% off all orders over $50! Use code SUMMER20.</div>` and the scale is `50`, then the content displayed on mobile will be `16 * (50 / 100 + 1) = 24px`.
* **Example:** `50`
* **Constraints:**
  * Must be between `-100` and `100`.

---

### banner_templates

* **Type:** `array` of objects
* **Required:** yes
* **Default:** `[]`
* **Description:** A list containing the layout, design, and content configuration objects for the banner. 
* **Constraints:**
  * Must have exactly 1 element.

---

## Template Layout & Background (Inside `banner_templates`)

### template

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Use with `banner_type` to determine which type of banner. In Announcement Single Banner, `banner_type` is 0 and `template` is 0.
* **Example:** `0`
* **Constraints:**
  * Must be `0` for Announcement Single Banner.

---

### bg_type

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Determines the background fill method.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1, 2]` (0: Solid Color, 1: Gradient, 2: Image).

---

### bg_color

* **Type:** `string`
* **Required:** conditional (if `bg_type` is `0`)
* **Default:** `"#FF5722"`
* **Description:** Hex color code for the solid background.
* **Example:** `"#FF5722"`

---

### bg_gradient

* **Type:** `string` (JSON string)
* **Required:** conditional (if `bg_type` is `1`)
* **Default:** `"{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}`
* **Description:** A JSON-encoded string defining a CSS linear gradient. The `color1` property maps to the starting color (2nd parameter of `linear-gradient`) and `color2` maps to the ending color (3rd parameter of `linear-gradient`).
* **Example:** `"{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}"`
* **Notes:**
  * Represented as a string to facilitate storage and transport.
  * Rendered as `linear-gradient(direction, color1, color2)` in CSS.

---

### bg_opacity

* **Type:** `number`
* **Required:** no
* **Default:** `100`
* **Description:** The opacity percentage of the background fill.
* **Example:** `100`
* **Constraints:**
  * Must be between `0` and `100`.

---

### bg_img_url_s3

* **Type:** `string`
* **Required:** conditional (if `bg_type` is `2`)
* **Default:** `""`
* **Description:** The URL source for a custom uploaded background image.
* **Example:** `"https://s3.amazonaws.com/bucket/image.png"`
* **Notes:**
  * Can use tool `select_bg` to select the image url.
* **Tool Name:** `select_bg`

---

### bg_preset

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Preset background style ID to apply a predefined template background configuration.
* **Example:** `0`

---

### bg_size

* **Type:** `string`
* **Required:** no
* **Default:** `"auto"`
* **Description:** CSS value for background image sizing.
* **Example:** `"cover"`
* **Constraints:**
  * Must be in `["cover", "contain", "auto"]`.

---

### bg_padding / bg_padding_bottom / bg_padding_left / bg_padding_right

* **Type:** `number`
* **Required:** no
* **Default:** `12` for `bg_padding` and `bg_padding_bottom`; `0` for `bg_padding_left` and `bg_padding_right`
* **Description:** Spacing inside the banner container (in pixels).
* **Example:** `10`
* **Constraints:**
  * Max value is 100

---

### mobile_padding_enabled

* **Type:** `boolean`
* **Required:** no
* **Default:** `true`
* **Description:** Flag to use separate padding configurations on mobile devices.
* **Example:** `false`

---

### mb_bg_padding

* **Type:** `string`
* **Required:** conditional (if `mobile_padding_enabled` is true)
* **Default:** `"12px 0px 12px 0px"`
* **Description:** CSS padding string specifically applied when viewed on mobile screens.
* **Example:** `"12px 0px 12px 0px"`
* **Constraints:**
  * Must be in format with exactly 4 numbers for four sides (e.g., `"12px 0px 12px 0px"`).
  * Must use px unit.

---

### content_gap

* **Type:** `number`
* **Required:** no
* **Default:** `16`
* **Description:** Gap between content elements inside the banner (e.g., between text and button) in pixels.
* **Example:** `16`
* **Constraints:**
  * Must be between `0` and `200`

---

### content_order

* **Type:** `string`
* **Required:** no
* **Default:** `"text,action"`
* **Description:** Comma-separated list defining the visual order of elements inside the banner.
* **Constraints:**
  * Valid items include `"text"`, `"action"`, `"coupon"`, `"countdown"`, `"form"`.

---


### border_width

* **Type:** `string`
* **Required:** no
* **Default:** `"0px 0px 0px 0px"`
* **Description:** Configures the banner's outer border width using standard CSS values (e.g., "1px", "2px"). Must include unit.
* **Example:** `"1px"`

---

### border_style

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Configures the banner's outer border style.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5, 6, 7]` (0: None, 1: Solid, 2: Dotted, 3: Dashed, 4: Double, 5: Groove, 6: Inset, 7: Outset).

---

### border_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#000000"`
* **Description:** Configures the banner's outer border color.
* **Example:** `"#000000"`
* **Constraints:**
  * Must be a valid CSS color value (hex).

---

### border_radius

* **Type:** `string`
* **Required:** no
* **Default:** `"0px 0px 0px 0px"`
* **Description:** Configures the banner's rounded corners using standard CSS values.
* **Example:** `"5px 5px 5px 5px"`
* **Constraints:**
  * Must be in format with exactly 4 values for four corners (e.g., `"0px 0px 0px 0px"`).

---

### font_scale_enabled

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Toggles font scaling for responsive design for the `banner_text` at the template level.
* **Example:** `false`

---

### font_scale

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Scaling ratio for `banner_text` inside the banner if `font_scale_enabled` is true. For example, if the `banner_text` is `<div style="font-size: 16px">🎉 Summer Sale: Get 20% off all orders over $50! Use code SUMMER20.</div>` and the scale is `50`, then the content displayed on mobile will be `16 * (50 / 100 + 1) = 24px`.
* **Example:** `50`
* **Constraints:**
  * Must be between `-100` and `100`.

---

## Content & Typography (Inside `banner_templates`)

### banner_text

* **Type:** `string`
* **Required:** yes
* **Default:** `""`
* **Description:** The primary textual message to display. 
* **Example:** `"<div style=\"font-size: 16px; color: #FFFFFF;\">🎉 Summer Sale: Get 20% off all orders over $50! Use code SUMMER20.</div>"`
* **Notes:**
  * Supports embedded HTML and inline styling. Supported HTML/inline styles corresponding with available TipTap tools include: `bold` (`<strong>` or `font-weight`), `italic` (`<em>` or `font-style`), `strike` (`<s>` or `text-decoration`), `underline` (`<u>` or `text-decoration`), `color`, and text alignment (`text-align: left | center | right`). Also supports `link` (`<a>`) and `image` (`<img>`).
  * Image in rich text must has format like this example `<img src="https://production-banner-bucket.s3.us-east-2.amazonaws.com/bss_bp/customer_images/17/faf19816-aa2a-404f-9329-9cdd1e7fe240_ig.png" cdn-url="bss_window_popup_image" alt="faf19816-aa2a-404f-9329-9cdd1e7fe240_ig.png" width="27" height="auto">`, must have attribute `cdn-url` is `""`, `width` must be between `0` and `50`, `height` is always `auto`.
  * Image link can use tools `select_images` to choose image.
* **Constraints:**
  * Must be wrapped in a `<p>` or `<span>` with an inline `font-size` style, and inline `color`.

---

### font_family

* **Type:** `string`
* **Required:** no
* **Default:** `""`
* **Description:** Name of the typography font to apply.
* **Example:** `"Inter"`
* **Notes:**
  * The `font_family` should corresponded with the `font_url`.

---

### font_url

* **Type:** `string`
* **Required:** no
* **Default:** `""`
* **Description:** External resource link to load the selected font if it is a custom web font.
* **Example:** `"https://fonts.googleapis.com/css2?family=Inter&display=swap"`
* **Notes:**
  * Can use tool `select_font` to select font url, can use google font api.

---

## Buttons & Actions (Inside `banner_templates`)

### act_type

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Type of the call-to-action (CTA) button behavior.
  * `0` (None): No call-to-action is rendered. The banner simply displays the text and background without any specific interactive CTA block.
  * `1` (Entire): The intention is for the entire banner itself to be clickable. It does not render a specific button or link within the CTA area.
  * `2` (Link): Renders a standard inline hyperlink (`<a>` tag) with text-decoration set to underline.
  * `3` (Button): Renders an anchor tag (`<a>`) that is heavily styled to look like a solid or outlined button with padding and background colors.
  * `4` (Btn Copy): Renders an interactive `<button>`. When clicked, it copies a pre-defined text string (from `btn_copy.text_copy`) to the user's clipboard and changes text to `btn_copy.success_mess`.
  * `5` (Coupon): Visually renders a stylized coupon code block directly inside the banner based on `coupon_code` and `discount_style`.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5]`.

---

### act_text

* **Type:** `string`
* **Required:** conditional (if `act_type` is 2, 3, 4)
* **Default:** `"<span style=\"font-size: 13px\">SHOP NOW</span>"` for `act_type` 2 or 3, `"COPY CODE"` for `act_type` 4.
* **Description:** Visual text rendered inside the call-to-action button or link. Supports embedded HTML and inline styling similarly to `banner_text` (bold, italic, strike, underline, color, text alignment, link, and image).
* **Example:** `"<span style=\"font-size: 13px\">SHOP NOW</span>"`

---


## Coupon Display & Copy (Inside `banner_templates`)

### discount_style

* **Type:** `object`
* **Required:** conditional (if `enable_coupon` is true)
* **Default:** `{"border": 7, "background": "#ffffff", "text_color": "#ffffff", "font_size": 13}`
* **Description:** Styling specifications for the coupon text block.
  * `border` (`number`): The border style ID used for the coupon box. It determines the border radius, background fill, and border line style. Supported values are:
    * `0` (Solid): Square corners, solid background.
    * `1` (Outlined): Square corners, transparent background, solid border.
    * `2` (Rounded Solid): 4px rounded corners, solid background.
    * `3` (Rounded Outlined): 4px rounded corners, transparent background, solid border.
    * `4` (Fully Rounded Solid): 99px rounded corners, solid background.
    * `5` (Fully Rounded Outlined): 99px rounded corners, transparent background, solid border.
    * `6` (Dashed): Square corners, transparent background, dashed border.
    * `7` (Rounded Dashed): 4px rounded corners, transparent background, dashed border.
    * `8` (Fully Rounded Dashed): 99px rounded corners, transparent background, dashed border.
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
* **Default:** `{"text_copy": "", "success_mess": "COPIED ✅"}`
* **Description:** Defines the text states for a copy button (default and post-click success message).

---

### btn_style

* **Type:** `number`
* **Required:** conditional (if `act_type` is 3, 4)
* **Default:** `0`
* **Description:** The border style ID used for the call-to-action button block. It determines the border radius, background fill, and border line style in the exact same manner as `discount_style.border`. Supported values are:
  * `0` (Solid): Square corners, solid background.
  * `1` (Outlined): Square corners, transparent background, solid border.
  * `2` (Rounded Solid): 4px rounded corners, solid background.
  * `3` (Rounded Outlined): 4px rounded corners, transparent background, solid border.
  * `4` (Fully Rounded Solid): 99px rounded corners, solid background.
  * `5` (Fully Rounded Outlined): 99px rounded corners, transparent background, solid border.
  * `6` (Dashed): Square corners, transparent background, dashed border.
  * `7` (Rounded Dashed): 4px rounded corners, transparent background, dashed border.
  * `8` (Fully Rounded Dashed): 99px rounded corners, transparent background, dashed border.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5, 6, 7, 8]`.

---
