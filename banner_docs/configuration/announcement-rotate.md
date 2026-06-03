# Announcement Rotate Banner

The **Announcement Rotate Banner** is a dynamic notification bar that rotates through multiple messages, typically rendered at the top or bottom of a webpage.

This document outlines the structural configuration for an **Announcement Rotate Banner**. It serves as a technical reference, detailing all necessary properties, data types, and settings. By following this guide, you can construct a valid configuration object that can be directly consumed and rendered by the application.

## Example Configuration

Below is an example JSON configuration for an **Announcement Rotate Banner**. *Note: All non-visual fields (such as trigger conditions, display logic, target audiences, and scheduling) have been excluded to focus purely on the design and content of the banner.*

```json
{
  "banner_type": 1,
  "position": 1,
  "name": "New Announcement Rotate Banner",
  "close_button": true,
  "btn_close_color": "#FFFFFF",
  "show_device": "all",
  "show_arrow": true,
  "btn_arrow_color": "#FFFFFF",
  "font_scale_enabled": false,
  "font_scale": 0,
  "banner_templates": [
    {
      "template": 0,
      "banner_text": [
        "<div style=\"font-size: 16px\">🎉 Summer Sale: Get 20% off all orders over $50! Use code SUMMER20.</div>",
        "<div style=\"font-size: 16px\">🚚 Free shipping on all orders over $100.</div>"
      ],
      "animation_type": 0,
      "animation_duration": "5",
      "animation_hover_pause": true,
      "bg_type": 0,
      "bg_color": "#FF5722",
      "bg_gradient": "{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}",
      "bg_opacity": 100,
      "bg_img_url_s3": "",
      "font_url": "",
      "bg_preset": 0,
      "font_family": "",
      "act_type": 0,
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
    }
  ]
}
```

## Fields

### banner_type

* **Type:** `number`
* **Required:** yes
* **Default:** `1`
* **Description:** Indicates the type of the banner. 
* **Example:** `1`
* **Constraints:**
  * Must be `1` for an Announcement Rotate Banner.

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
* **Example:** `"New Announcement Rotate Banner"`

---

### close_button

* **Type:** `boolean`
* **Required:** yes
* **Default:** `true`
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

### show_arrow

* **Type:** `boolean`
* **Required:** yes
* **Default:** `true`
* **Description:** Toggles the visibility of the left/right navigation arrows to manually switch between slides.
* **Example:** `true`

---

### btn_arrow_color

* **Type:** `string`
* **Required:** conditional (if `show_arrow` is true)
* **Default:** `"#FFFFFF"`
* **Description:** Hex color code for the navigation arrows.
* **Example:** `"#FFFFFF"`
* **Constraints:**
  * Must be a valid hex color code.

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
* **Description:** Use with `banner_type` to determine which type of banner. In Announcement Rotate Banner, `banner_type` is 1 and `template` is 0.
* **Example:** `0`
* **Constraints:**
  * Must be `0` for Announcement Rotate Banner.

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

### bg_size

* **Type:** `string`
* **Required:** no
* **Default:** `"cover"`
* **Description:** CSS value for background image sizing.
* **Example:** `"cover"`
* **Constraints:**
  * Must be in `["cover", "contain", "auto"]`.

---

### bg_padding / bg_padding_bottom / bg_padding_left / bg_padding_right

* **Type:** `number`
* **Required:** no
* **Default:** `12`
* **Description:** Spacing inside the banner container (in pixels).
* **Example:** `10`
* **Constraints:**
  * Max value is 100

---

### mobile_padding_enabled

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
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

### border_width

* **Type:** `string`
* **Required:** no
* **Default:** `"0px"`
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

## Animation Settings (Inside `banner_templates`)

### animation_type

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Specifies the direction of the rotation animation.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1]` (0: Horizontal, 1: Vertical).

---

### animation_duration

* **Type:** `string`
* **Required:** yes
* **Default:** `"5"`
* **Description:** The duration (in seconds) that each message is displayed before rotating to the next.
* **Example:** `"5"`

---

### animation_hover_pause

* **Type:** `boolean`
* **Required:** yes
* **Default:** `true`
* **Description:** Determines whether the auto-rotation should pause when the user hovers over the banner.
* **Example:** `true`

---

## Content & Typography (Inside `banner_templates`)

### banner_text

* **Type:** `array` of strings
* **Required:** yes
* **Default:** `[]`
* **Description:** The array of primary textual messages to display and rotate through. 
* **Example:** `["<div style=\"font-size: 16px; color: #FFFFFF;\">🎉 Message 1</div>", "<div style=\"font-size: 16px; color: #FFFFFF;\">🎉 Message 2</div>"]`
* **Notes:**
  * Supports embedded HTML and inline styling. Supported HTML/inline styles corresponding with available TipTap tools include: `bold` (`<strong>` or `font-weight`), `italic` (`<em>` or `font-style`), `strike` (`<s>` or `text-decoration`), `underline` (`<u>` or `text-decoration`), `color`, and text alignment (`text-align: left | center | right`). Also supports `link` (`<a>`).
* **Constraints:**
  * Each string element must be wrapped in a `<p>`, `<span>`, or `<div>` with an inline `font-size` style, and inline `color`.

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
