# Free Shipping Banner

The **Free Shipping Banner** is a dynamic notification bar that motivates customers to spend more to unlock free shipping. It displays different messages and an optional progress bar based on the customer's cart value.

This document outlines the structural configuration for a **Free Shipping Banner**. It serves as a technical reference, detailing all necessary properties, data types, and settings. By following this guide, you can construct a valid configuration object that can be directly consumed and rendered by the application.

## Example Configuration

Below is an example JSON configuration for a **Free Shipping Banner**. *Note: All non-visual fields (such as trigger conditions, display logic, target audiences, and scheduling) have been excluded to focus purely on the design and content of the banner.*

```json
{
  "banner_type": 0,
  "position": 1,
  "name": "Free Shipping Banner",
  "close_button": true,
  "btn_close_color": "#FFFFFF",
  "show_device": "all",
  "font_scale_enabled": false,
  "font_scale": 0,
  "banner_templates": [
    {
      "template": 3,
      "banner_text": {
        "start_msg": "<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">🚚 Free shipping for orders over {{currency_symbol}}{{free_shipping_goal}}!</span>",
        "progress_msg": "<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">😍 Spend {{currency_symbol}}{{remaining_amount}} more to get free shipping</span>",
        "goal_reached_msg": "<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">✅ Congratulations! You got free shipping!</span>"
      },
      "free_shipping_goal": {
        "default": 500
      },
      "progress_bar_config": {
        "show_progress_bar": true,
        "progress_bar_width": 50,
        "progress_bar_bg_color": "#FFFFFF",
        "progress_bar_color": "#000000"
      },
      "bg_type": 0,
      "bg_color": "#FF5722",
      "bg_gradient": "{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}",
      "bg_opacity": 100,
      "bg_img_url_s3": "",
      "font_url": "",
      "bg_preset": 0,
      "font_family": "",
      "act_type": 0,
      "act_text": "<span style=\"font-size: 13px\">SHOP NOW</span>", 
      "btn_style": 2,
      "act_content_color": "#000000",
      "btn_text_color": "#FFFFFF",
      "bg_padding": 12,
      "bg_padding_bottom": 12,
      "bg_padding_left": 12,
      "bg_padding_right": 12,
      "bg_size": "cover",
      "mobile_padding_enabled": false,
      "mb_bg_padding": "12px 12px 12px 12px",
      "content_gap": 16,
      "content_order": "text",
      "border_width": "0px",
      "border_color": "#000000",
      "border_style": 0,
      "border_radius": "0px 0px 0px 0px"
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
  * Must be `0` for Single Banner (which includes Free Shipping Banner).

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
* **Example:** `"Free Shipping Banner"`

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
* **Description:** Scaling ratio for `banner_text` inside the banner if `font_scale_enabled` is true. For example, if the font size in the text is `14px` and the scale is `50`, then the content displayed on mobile will be `14 * (50 / 100 + 1) = 21px`.
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
* **Default:** `3`
* **Description:** Use with `banner_type` to determine which type of banner. For Free Shipping Banner, `template` is 3.
* **Example:** `3`
* **Constraints:**
  * Must be `3` for Free Shipping Banner.

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
* **Default:** `"#000000"`
* **Description:** Hex color code for the solid background.
* **Example:** `"#FF5722"`

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
* **Example:** `12`
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
* **Default:** `"12px 12px 12px 12px"`
* **Description:** CSS padding string specifically applied when viewed on mobile screens.
* **Example:** `"12px 0px 12px 0px"`
* **Constraints:**
  * Must be in format with exactly 4 numbers for four sides.
  * Must use px unit.

---

### content_gap

* **Type:** `number`
* **Required:** no
* **Default:** `16`
* **Description:** Gap between content elements inside the banner (e.g., between text and action button) in pixels.
* **Example:** `16`
* **Constraints:**
  * Must be between `0` and `200`

---

### content_order

* **Type:** `string`
* **Required:** no
* **Default:** `"text"`
* **Description:** Comma-separated list defining the visual order of elements inside the banner.
* **Constraints:**
  * Valid items include `"text"`, `"action"`.

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
  * Must be in format with exactly 4 values for four corners.

---

## Free Shipping Specific Configuration (Inside `banner_templates`)

### banner_text

* **Type:** `object`
* **Required:** yes
* **Default:** 
```json
{
  "start_msg": "<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">🚚 Free shipping for orders over {{currency_symbol}}{{free_shipping_goal}}!</span>",
  "progress_msg": "<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">😍 Spend {{currency_symbol}}{{remaining_amount}} more to get free shipping</span>",
  "goal_reached_msg": "<span style=\"color: rgb(255, 255, 255); font-size: 14px;\">✅ Congratulations! You got free shipping!</span>"
}
```
* **Description:** The primary textual messages to display based on the cart value. It contains three keys for three different states:
  * `start_msg`: Message shown when cart is empty.
  * `progress_msg`: Message shown when cart has items but hasn't reached the free shipping goal.
  * `goal_reached_msg`: Message shown when cart total is greater than or equal to the free shipping goal.
* **Notes:**
  * Supports embedded HTML and inline styling similarly to other banners.
  * Supports variables inside the rich text: `{{free_shipping_goal}}`, `{{remaining_amount}}`, `{{market}}`, and `{{currency_symbol}}`.

---

### free_shipping_goal

* **Type:** `object`
* **Required:** yes
* **Default:** `{"default": 500}`
* **Description:** Defines the target order amount to unlock free shipping.
  * `default` (`number`): The default threshold amount.

---

### progress_bar_config

* **Type:** `object`
* **Required:** yes
* **Default:** 
```json
{
  "show_progress_bar": true,
  "progress_bar_width": 50,
  "progress_bar_bg_color": "#FFFFFF",
  "progress_bar_color": "#000000"
}
```
* **Description:** Configuration for the visual progress bar displayed beneath the banner text.
  * `show_progress_bar` (`boolean`): Toggles the visibility of the progress bar.
  * `progress_bar_width` (`number`): Width of the progress bar relative to the container, as a percentage. Max `100`, Min `0`.
  * `progress_bar_bg_color` (`string`): Hex color code for the progress bar track background.
  * `progress_bar_color` (`string`): Hex color code for the filled progress indicator.

---

## Typography & Actions (Inside `banner_templates`)

### font_family

* **Type:** `string`
* **Required:** no
* **Default:** `"Inter"`
* **Description:** Name of the typography font to apply.
* **Example:** `"Inter"`

---

### font_url

* **Type:** `string`
* **Required:** no
* **Default:** `""`
* **Description:** External resource link to load the selected font if it is a custom web font.
* **Example:** `"https://fonts.googleapis.com/css2?family=Inter&display=swap"`

---

### act_type

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Type of the call-to-action (CTA) button behavior.
  * `0` (None): No call-to-action is rendered.
  * `1` (Entire): The intention is for the entire banner itself to be clickable.
  * `2` (Link): Renders a standard inline hyperlink.
  * `3` (Button): Renders an anchor tag (`<a>`) styled as a button.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1, 2, 3]`.

---

### act_text

* **Type:** `string`
* **Required:** conditional (if `act_type` is 2 or 3)
* **Default:** `"<span style=\"font-size: 13px\">SHOP NOW</span>"`
* **Description:** Visual text rendered inside the call-to-action button or link.
* **Example:** `"<span style=\"font-size: 13px\">SHOP NOW</span>"`

---

### btn_style

* **Type:** `number`
* **Required:** conditional (if `act_type` is 3)
* **Default:** `2`
* **Description:** The style ID used for the call-to-action button block. It determines the border radius, background fill, and border line style. Supported values:
  * `0` (Solid): Square corners, solid background.
  * `1` (Outlined): Square corners, transparent background, solid border.
  * `2` (Rounded Solid): 4px rounded corners, solid background.
  * `3` (Rounded Outlined): 4px rounded corners, transparent background, solid border.
  * `4` (Fully Rounded Solid): 99px rounded corners, solid background.
  * `5` (Fully Rounded Outlined): 99px rounded corners, transparent background, solid border.
  * `6` (Dashed): Square corners, transparent background, dashed border.
  * `7` (Rounded Dashed): 4px rounded corners, transparent background, dashed border.
  * `8` (Fully Rounded Dashed): 99px rounded corners, transparent background, dashed border.

---

### act_content_color

* **Type:** `string`
* **Required:** conditional (if `act_type` is 3)
* **Default:** `"#000000"`
* **Description:** Hex color code used as the background fill (for solid button types) or border/text color (for outlined/dashed types).

---

### btn_text_color

* **Type:** `string`
* **Required:** conditional (if `act_type` is 3)
* **Default:** `"#FFFFFF"`
* **Description:** Hex color code for the text inside the button.

---
