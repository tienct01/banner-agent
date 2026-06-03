# Multi Banners Slider

The **Multi Banners Slider** is a dynamic notification bar that displays multiple banner slides in a carousel/slider, typically rendered at the top or bottom of a webpage. Each slide can independently contain text, countdown timer, call-to-action, or coupon elements, allowing merchants to showcase multiple offers in a single banner location.

This document outlines the structural configuration for a **Multi Banners Slider**. It serves as a technical reference, detailing all necessary properties, data types, and settings. By following this guide, you can construct a valid configuration object that can be directly consumed and rendered by the application.

## Example Configuration

Below is an example JSON configuration for a **Multi Banners Slider**. *Note: All non-visual fields (such as trigger conditions, display logic, target audiences, and scheduling) have been excluded to focus purely on the design and content of the banner.*

```json
{
  "banner_type": 3,
  "position": 1,
  "name": "New Multi Banners Slider",
  "close_button": true,
  "btn_close_color": "#FFFFFF",
  "show_device": "all",
  "show_arrow": true,
  "btn_arrow_color": "#FFFFFF",
  "font_scale_enabled": false,
  "font_scale": 0,
  "multi_config": {
    "transition": 0,
    "duration": 4,
    "pause_on_hover": false,
    "slider_order": [0, 1],
    "bg_padding": 12,
    "bg_padding_bottom": 12,
    "bg_padding_left": 20,
    "bg_padding_right": 20,
    "mobile_padding_enabled": true,
    "mb_bg_padding": "12px 20px 12px 20px",
    "border_width": "0px 0px 0px 0px",
    "border_color": "#000000",
    "border_style": 0,
    "border_radius": "0px 0px 0px 0px"
  },
  "banner_templates": [
    {
      "template": 5,
      "banner_text": "<div style=\"font-size: 16px\">🎉 Summer Sale: Get 20% off all orders over $50!</div>",
      "content_order": "text,action",
      "content_gap": 16,
      "bg_type": 0,
      "bg_color": "#006BFF",
      "bg_gradient": "{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}",
      "bg_opacity": 100,
      "bg_img_url_s3": "",
      "bg_size": "auto",
      "bg_preset": 0,
      "font_family": "",
      "font_url": "",
      "act_type": 3,
      "act_text": "<span style=\"font-size: 13px\">SHOP NOW</span>",
      "btn_style": 2,
      "act_content_color": "#000000",
      "btn_text_color": "#FFFFFF",
      "bg_padding": 12,
      "bg_padding_bottom": 12,
      "bg_padding_left": 0,
      "bg_padding_right": 0,
      "mobile_padding_enabled": true,
      "mb_bg_padding": "12px 0px 12px 0px",
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
        "border": 0,
        "background": "#FFFFFF",
        "text_color": "#000000",
        "font_size": 14
      },
      "button_styles": {
        "animation": 0,
        "padding": "8px 8px 8px 8px"
      },
      "slide_config": {
        "name": "Banner 1",
        "hidden": false
      }
    },
    {
      "template": 5,
      "banner_text": "<div style=\"font-size: 16px\">🚚 Free shipping on all orders over $100.</div>",
      "content_order": "text,action",
      "content_gap": 16,
      "bg_type": 0,
      "bg_color": "#006BFF",
      "bg_gradient": "{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}",
      "bg_opacity": 100,
      "bg_img_url_s3": "",
      "bg_size": "auto",
      "bg_preset": 0,
      "font_family": "",
      "font_url": "",
      "act_type": 3,
      "act_text": "<span style=\"font-size: 13px\">LEARN MORE</span>",
      "btn_style": 2,
      "act_content_color": "#000000",
      "btn_text_color": "#FFFFFF",
      "bg_padding": 12,
      "bg_padding_bottom": 12,
      "bg_padding_left": 0,
      "bg_padding_right": 0,
      "mobile_padding_enabled": true,
      "mb_bg_padding": "12px 0px 12px 0px",
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
        "border": 0,
        "background": "#FFFFFF",
        "text_color": "#000000",
        "font_size": 14
      },
      "button_styles": {
        "animation": 0,
        "padding": "8px 8px 8px 8px"
      },
      "slide_config": {
        "name": "Banner 2",
        "hidden": false
      }
    }
  ]
}
```

## Fields

### banner_type

* **Type:** `number`
* **Required:** yes
* **Default:** `3`
* **Description:** Indicates the type of the banner.
* **Example:** `3`
* **Constraints:**
  * Must be `3` for a Multi Banners Slider.

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
* **Example:** `"New Multi Banners Slider"`

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
* **Description:** Toggles font scaling for responsive design for `banner_text` across all slides.
* **Example:** `false`

---

### font_scale

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Scaling ratio for `banner_text` inside all slides if `font_scale_enabled` is true. For example, if the `banner_text` is `<div style="font-size: 16px">🎉 Summer Sale</div>` and the scale is `50`, then the content displayed on mobile will be `16 * (50 / 100 + 1) = 24px`.
* **Example:** `50`
* **Constraints:**
  * Must be between `-100` and `100`.

---

### banner_templates

* **Type:** `array` of objects
* **Required:** yes
* **Default:** `[]`
* **Description:** A list containing the layout, design, and content configuration objects for each slide in the slider. Each element represents one slide.
* **Constraints:**
  * Must have at least 2 elements.

---

## Slider Configuration (Inside `multi_config`)

The `multi_config` object controls the overall slider behavior and the wrapper container styling (padding, border) that wraps all slides.

### transition

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Specifies the direction of the slide transition animation.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1]` (0: Horizontal, 1: Vertical).

---

### duration

* **Type:** `number`
* **Required:** yes
* **Default:** `4`
* **Description:** The duration (in seconds) that each slide is displayed before transitioning to the next.
* **Example:** `4`
* **Constraints:**
  * Must be between `1` and `30`. Step value is `0.2`.

---

### pause_on_hover

* **Type:** `boolean`
* **Required:** yes
* **Default:** `false`
* **Description:** Determines whether the auto-rotation should pause when the user hovers over the banner.
* **Example:** `false`

---

### slider_order

* **Type:** `array` of numbers
* **Required:** yes
* **Default:** `[0, 1]`
* **Description:** An array of slide indices controlling the display order of slides. The index values correspond to the positions of slides in the `banner_templates` array.
* **Example:** `[0, 1]`

---

## Slider Wrapper Styling (Inside `multi_config`)

The following fields inside `multi_config` control the padding and border of the outer slider container that wraps all slides. These are separate from the per-slide padding and border settings.

### bg_padding / bg_padding_bottom / bg_padding_left / bg_padding_right

* **Type:** `number`
* **Required:** no
* **Default:** `12`
* **Description:** Spacing inside the slider wrapper container (in pixels).
* **Example:** `12`
* **Constraints:**
  * Max value is 100

---

### mobile_padding_enabled

* **Type:** `boolean`
* **Required:** no
* **Default:** `true`
* **Description:** Flag to use separate padding configurations on mobile devices for the slider wrapper.
* **Example:** `true`

---

### mb_bg_padding

* **Type:** `string`
* **Required:** conditional (if `mobile_padding_enabled` is true)
* **Default:** `"12px 20px 12px 20px"`
* **Description:** CSS padding string specifically applied to the slider wrapper when viewed on mobile screens.
* **Example:** `"12px 20px 12px 20px"`
* **Constraints:**
  * Must be in format with exactly 4 numbers for four sides (e.g., `"12px 20px 12px 20px"`).
  * Must use px unit.

---

### border_width

* **Type:** `string`
* **Required:** no
* **Default:** `"0px 0px 0px 0px"`
* **Description:** Configures the slider wrapper's outer border width. Must include unit.
* **Example:** `"1px 1px 1px 1px"`

---

### border_style

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Configures the slider wrapper's outer border style.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5, 6, 7]` (0: None, 1: Solid, 2: Dotted, 3: Dashed, 4: Double, 5: Groove, 6: Inset, 7: Outset).

---

### border_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#000000"`
* **Description:** Configures the slider wrapper's outer border color.
* **Example:** `"#000000"`
* **Constraints:**
  * Must be a valid CSS color value (hex).

---

### border_radius

* **Type:** `string`
* **Required:** no
* **Default:** `"0px 0px 0px 0px"`
* **Description:** Configures the slider wrapper's rounded corners using standard CSS values.
* **Example:** `"5px 5px 5px 5px"`
* **Constraints:**
  * Must be in format with exactly 4 values for four corners (e.g., `"0px 0px 0px 0px"`).

---

## Slide Configuration (Inside `banner_templates[].slide_config`)

Each slide in the `banner_templates` array has an optional `slide_config` object that controls the slide's metadata, visibility, and scheduling.

### name

* **Type:** `string`
* **Required:** no
* **Default:** `"banner"`
* **Description:** Display name/label for the slide, used in the admin UI for identification.
* **Example:** `"Banner 1"`

---

### hidden

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Toggles the visibility of the slide. When `true`, the slide is hidden from the slider rotation.
* **Example:** `false`

---

### enable_schedule

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Enables per-slide scheduling, allowing the slide to be visible only within a specified date/time range.
* **Example:** `false`

---

### from_date

* **Type:** `string`
* **Required:** conditional (if `enable_schedule` is true)
* **Default:** —
* **Description:** The start date/time for the slide's visibility. ISO 8601 format.
* **Example:** `"2026-01-01T00:00:00.000Z"`

---

### to_date

* **Type:** `string`
* **Required:** conditional (if `enable_schedule` is true and `enable_to_date` is true)
* **Default:** —
* **Description:** The end date/time for the slide's visibility. ISO 8601 format.
* **Example:** `"2026-12-31T23:59:59.000Z"`

---

### enable_visibility_date

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Enables the `from_date` visibility start condition.
* **Example:** `false`

---

### enable_to_date

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Enables the `to_date` visibility end condition.
* **Example:** `false`

---

### enable_fixed_time

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Enables a fixed daily time window for the slide's visibility.
* **Example:** `false`

---

### fixed_time

* **Type:** `object`
* **Required:** conditional (if `enable_fixed_time` is true)
* **Default:** —
* **Description:** Defines a daily recurring time window during which the slide is visible. Contains `from` and `to` time properties.

---

## Template Layout & Background (Inside `banner_templates[]`)

Each slide in the `banner_templates` array shares the same background and layout fields as a single banner template, with the following specifics:

### template

* **Type:** `number`
* **Required:** yes
* **Default:** `5`
* **Description:** Use with `banner_type` to determine which type of banner. In Multi Banners Slider, `banner_type` is 3 and `template` is 5.
* **Example:** `5`
* **Constraints:**
  * Must be `5` for Multi Banners Slider.

---

### content_order

* **Type:** `string`
* **Required:** no
* **Default:** `"text,action"`
* **Description:** Comma-separated list defining the visual order of elements inside the slide.
* **Constraints:**
  * Valid items include `"text"`, `"action"`, `"countdown"`, `"coupon"`.

---

### content_gap

* **Type:** `number`
* **Required:** no
* **Default:** `16`
* **Description:** Gap between content elements inside the slide (e.g., between text and button) in pixels.
* **Example:** `16`
* **Constraints:**
  * Must be between `0` and `200`

---

### bg_type

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Determines the background fill method for the slide.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1, 2]` (0: Solid Color, 1: Gradient, 2: Image).

---

### bg_color

* **Type:** `string`
* **Required:** conditional (if `bg_type` is `0`)
* **Default:** `"#006BFF"`
* **Description:** Hex color code for the solid background of the slide.
* **Example:** `"#006BFF"`

---

### bg_gradient

* **Type:** `string` (JSON string)
* **Required:** conditional (if `bg_type` is `1`)
* **Default:** `"{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}"`
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
* **Default:** `"auto"`
* **Description:** CSS value for background image sizing.
* **Example:** `"auto"`
* **Constraints:**
  * Must be in `["cover", "contain", "auto"]`.

---

### bg_padding / bg_padding_bottom / bg_padding_left / bg_padding_right

* **Type:** `number`
* **Required:** no
* **Default:** `12`
* **Description:** Spacing inside the slide container (in pixels).
* **Example:** `12`
* **Constraints:**
  * Max value is 100

---

### mobile_padding_enabled

* **Type:** `boolean`
* **Required:** no
* **Default:** `true`
* **Description:** Flag to use separate padding configurations on mobile devices for the slide.
* **Example:** `true`

---

### mb_bg_padding

* **Type:** `string`
* **Required:** conditional (if `mobile_padding_enabled` is true)
* **Default:** `"12px 0px 12px 0px"`
* **Description:** CSS padding string specifically applied to the slide when viewed on mobile screens.
* **Example:** `"12px 0px 12px 0px"`
* **Constraints:**
  * Must be in format with exactly 4 numbers for four sides (e.g., `"12px 0px 12px 0px"`).
  * Must use px unit.

---

### border_width

* **Type:** `string`
* **Required:** no
* **Default:** `"0px 0px 0px 0px"`
* **Description:** Configures the slide's outer border width using standard CSS values. Must include unit.
* **Example:** `"1px 1px 1px 1px"`

---

### border_style

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Configures the slide's outer border style.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5, 6, 7]` (0: None, 1: Solid, 2: Dotted, 3: Dashed, 4: Double, 5: Groove, 6: Inset, 7: Outset).

---

### border_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#000000"`
* **Description:** Configures the slide's outer border color.
* **Example:** `"#000000"`
* **Constraints:**
  * Must be a valid CSS color value (hex).

---

### border_radius

* **Type:** `string`
* **Required:** no
* **Default:** `"0px 0px 0px 0px"`
* **Description:** Configures the slide's rounded corners using standard CSS values.
* **Example:** `"5px 5px 5px 5px"`
* **Constraints:**
  * Must be in format with exactly 4 values for four corners (e.g., `"0px 0px 0px 0px"`).

---

## Content & Typography (Inside `banner_templates[]`)

### banner_text

* **Type:** `string`
* **Required:** yes
* **Default:** `""`
* **Description:** The primary textual message to display on the slide.
* **Example:** `"<div style=\"font-size: 16px; color: #FFFFFF;\">🎉 Summer Sale: Get 20% off all orders over $50!</div>"`
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
* **Default:** `"Inter"`
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

## Buttons & Actions (Inside `banner_templates[]`)

### act_type

* **Type:** `number`
* **Required:** no
* **Default:** `3`
* **Description:** Type of the call-to-action (CTA) button behavior for the slide.
  * `0` (None): No call-to-action is rendered. The slide simply displays the text and background without any specific interactive CTA block.
  * `1` (Entire): The intention is for the entire slide itself to be clickable. It does not render a specific button or link within the CTA area.
  * `2` (Link): Renders a standard inline hyperlink (`<a>` tag) with text-decoration set to underline.
  * `3` (Button): Renders an anchor tag (`<a>`) that is heavily styled to look like a solid or outlined button with padding and background colors.
  * `4` (Btn Copy): Renders an interactive `<button>`. When clicked, it copies a pre-defined text string (from `btn_copy.text_copy`) to the user's clipboard and changes text to `btn_copy.success_mess`.
  * `5` (Coupon): Visually renders a stylized coupon code block directly inside the slide based on `coupon_code` and `discount_style`.
* **Example:** `3`
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5]`.

---

### act_text

* **Type:** `string`
* **Required:** conditional (if `act_type` is 2, 3, 4, 6)
* **Default:** `"<span style=\"font-size: 13px\">SHOP NOW</span>"` for `act_type` 2 or 3, `"COPY CODE"` for `act_type` 4.
* **Description:** Visual text rendered inside the call-to-action button or link. Supports embedded HTML and inline styling similarly to `banner_text` (bold, italic, strike, underline, color, text alignment, link, and image).
* **Example:** `"<span style=\"font-size: 13px\">SHOP NOW</span>"`

---

### act_content_color

* **Type:** `string`
* **Required:** conditional (if `act_type` is 3)
* **Default:** `"#000000"`
* **Description:** Hex color code for the CTA button's background/content color (used for solid button styles).
* **Example:** `"#000000"`

---

### btn_text_color

* **Type:** `string`
* **Required:** conditional (if `act_type` is 3)
* **Default:** `"#FFFFFF"`
* **Description:** Hex color code for the CTA button's text color.
* **Example:** `"#FFFFFF"`

---

### btn_style

* **Type:** `number`
* **Required:** conditional (if `act_type` is 3, 4, 6)
* **Default:** `2`
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
* **Example:** `2`
* **Constraints:**
  * Must be in `[0, 1, 2, 3, 4, 5, 6, 7, 8]`.

---

### button_styles

* **Type:** `object`
* **Required:** no
* **Default:** `{"animation": 0, "padding": "8px 8px 8px 8px"}`
* **Description:** Additional styling specifications for the CTA button.
  * `animation` (`number`): Optional ID for CSS hover/interaction animation styles based on `BtnAnimationType`. Default is `0`. Supported values are:
    * `0` (NONE)
    * `1` (COLOR_FLIP)
    * `2` (THIN)
    * `3` (HOLOGRAM)
    * `4` (PULSE)
    * `5` (WOBBLE)
  * `padding` (`string`): CSS padding string for the button. Must be in format with exactly 4 values for four sides (e.g., `"8px 8px 8px 8px"`).

---

## Coupon Display & Copy (Inside `banner_templates[]`)

### discount_style

* **Type:** `object`
* **Required:** conditional (if `enable_coupon` is true or `act_type` is 5)
* **Default:** `{"border": 0, "background": "#FFFFFF", "text_color": "#000000", "font_size": 14}`
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

## Countdown Timer (Inside `banner_templates[]`)

Each slide in a Multi Banners Slider can optionally include a countdown timer by adding `"countdown"` to the `content_order` field. The countdown fields are the same as those used in a Countdown Banner template.

### countdown_format

* **Type:** `string`
* **Required:** conditional (if `"countdown"` is in `content_order`)
* **Default:** `"dd:hh:mm:ss"`
* **Description:** Defines the segments of time shown in the timer.
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
* **Required:** conditional (if `"countdown"` is in `content_order`)
* **Default:** `20`
* **Description:** Font size of the countdown timer text in pixels.

---

### timer_color

* **Type:** `string` (JSON string)
* **Required:** no
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
  * Must be one of the following:
    * `0` (Classic): Standard numerical countdown with static digits.
    * `1` (Flip): Mechanical flip-clock style countdown where digits flip downwards. Requires standard flipLine configuration inside timer_color.
    * `2` (Flash Bounce): Digit styles that pulse/bounce with a highlighted border line.
    * `3` (Limited Glow): Emphasized digit style showcasing an inner/outer neon accent glow indicating high urgency.

---
