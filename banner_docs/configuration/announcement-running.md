# Announcement Running Banner

The **Announcement Running Banner** (also known as a marquee banner) is a dynamic notification bar that automatically scrolls messages and media horizontally across the screen, typically rendered at the top or bottom of a webpage.

This document outlines the structural configuration for an **Announcement Running Banner**. It serves as a technical reference, detailing all necessary properties, data types, and settings. By following this guide, you can construct a valid configuration object that can be directly consumed and rendered by the application.

## Example Configuration

Below is an example JSON configuration for an **Announcement Running Banner**. *Note: All non-visual fields (such as trigger conditions, display logic, target audiences, and scheduling) have been excluded to focus purely on the design and content of the banner.*

```json
{
  "banner_type": 2,
  "position": 1,
  "name": "New Running Banner",
  "close_button": false,
  "btn_close_color": "#FFFFFF",
  "show_device": "all",
  "font_scale_enabled": false,
  "font_scale": 0,
  "banner_templates": [
    {
      "template": 0,
      "banner_text": [
        {
          "type": 0,
          "content": "🎉 Summer Sale: Get 20% off all orders over $50! Use code SUMMER20.",
          "size": 28,
          "image_url_cdn": ""
        },
        {
          "type": 1,
          "content": "https://example.com/image.png",
          "size": 30,
          "image_url_cdn": "",
          "action_config": {
            "direct_link": "https://example.com"
          }
        },
        {
          "type": 2,
          "content": "SHOP NOW",
          "size": 28,
          "image_url_cdn": "",
          "action_config": {
            "cta_type": 2,
            "direct_link": "https://example.com"
          },
          "action_style": {
            "border_type": 0,
            "background": "#FFFFFF",
            "text_color": "#000000",
            "padding": "5px 10px",
            "animation": 0
          }
        },
        {
          "type": 3,
          "content": "COUPON",
          "size": 28,
          "image_url_cdn": "",
          "coupon_data": {
            "coupon_code": "SUMMER20",
            "source": 0,
            "discount_id": "",
            "auto_apply": false
          },
          "action_style": {
            "border_type": 1,
            "background": "#FFFFFF",
            "text_color": "#FF5722",
            "font_size": 14,
            "animation": 0
          }
        }
      ],
      "content_order": "text,action,coupon",
      "animation_type": 0,
      "animation_duration": "10",
      "animation_hover_pause": true,
      "bg_type": 0,
      "bg_color": "#FF5722",
      "bg_gradient": "{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}",
      "bg_opacity": 100,
      "bg_img_url_s3": "",
      "font_url": "",
      "bg_preset": 0,
      "font_family": "",
      "content_gap": 16,
      "bg_padding": 10,
      "bg_padding_bottom": 10,
      "bg_padding_left": 0,
      "bg_padding_right": 0,
      "bg_size": "auto",
      "mobile_padding_enabled": true,
      "mb_bg_padding": "12px 0px 12px 0px",
      "border_width": "0px 0px 0px 0px",
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
* **Default:** `2`
* **Description:** Indicates the type of the banner. 
* **Example:** `2`
* **Constraints:**
  * Must be `2` for an Announcement Running Banner.

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
* **Example:** `"New Running Banner"`

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
* **Description:** Toggles font scaling for responsive design for the text elements inside `banner_text`.
* **Example:** `false`

---

### font_scale

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Scaling ratio for text inside the banner if `font_scale_enabled` is true. Applies dynamically to sizes found in `banner_text` contents.
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
* **Description:** Use with `banner_type` to determine which type of banner. In Announcement Running Banner, `banner_type` is 2 and `template` is 0.
* **Example:** `0`
* **Constraints:**
  * Must be `0` for Announcement Running Banner.

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
* **Default:** `"{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}"`
* **Description:** A JSON-encoded string defining a CSS linear gradient. The `color1` property maps to the starting color and `color2` maps to the ending color.
* **Example:** `"{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}"`
* **Notes:**
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
* **Notes:**
  * Can use tool `select_bg` to select the image url.
* **Example:** `"https://s3.amazonaws.com/bucket/image.png"`

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
  * Must be in format with exactly 4 numbers for four sides.
  * Must use px unit.

---

### content_gap

* **Type:** `number`
* **Required:** no
* **Default:** `16`
* **Description:** Gap between content elements (the individual text/image blocks) inside the running banner sequence in pixels.
* **Example:** `16`
* **Constraints:**
  * Must be between `0` and `200`

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
  * Must be in `[0, 1, 2, 3, 4, 5, 6, 7]` (0: None, 1: Solid, 2: Dotted, 3: Dashed, etc.).

---

### border_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#000000"`
* **Description:** Configures the banner's outer border color.
* **Example:** `"#000000"`

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

### content_order

* **Type:** `string`
* **Required:** no
* **Default:** `"text,action,coupon"`
* **Description:** Comma-separated list defining the visual order of elements inside the running banner.
* **Constraints:**
  * Valid items include `"text"`, `"action"`, `"coupon"`, `"countdown"`, `"form"`.

---

### font_scale_enabled (template)

* **Type:** `boolean`
* **Required:** no
* **Default:** `false`
* **Description:** Toggles font scaling for responsive design for text elements at the template level.
* **Example:** `false`

---

### font_scale (template)

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** Scaling ratio for text elements if `font_scale_enabled` is true.
* **Example:** `50`
* **Constraints:**
  * Must be between `-100` and `100`.

---

## Animation Settings (Inside `banner_templates`)

### animation_type

* **Type:** `number`
* **Required:** yes
* **Default:** `0`
* **Description:** Specifies the direction of the running banner animation.
* **Example:** `0`
* **Constraints:**
  * Must be in `[0, 1]` (0: Slide Left, 1: Slide Right).

---

### animation_duration

* **Type:** `string`
* **Required:** yes
* **Default:** `"10"`
* **Description:** Determines the speed of the scroll. Technically representing the duration value mapped inversely to standard time (e.g., higher value means faster/shorter actual CSS duration). Computed as `100 / animation_duration`.
* **Example:** `"10"`

---

### animation_hover_pause

* **Type:** `boolean`
* **Required:** yes
* **Default:** `true`
* **Description:** Determines whether the scrolling animation should pause when the user hovers over the banner.
* **Example:** `true`

---

## Content & Typography (Inside `banner_templates`)

### banner_text

* **Type:** `array` of objects (`MediaAnnouncement[]`)
* **Required:** yes
* **Default:** `[]`
* **Description:** An array of complex objects defining each block of content in the running sequence. These can be plain text, images, call-to-action buttons, or coupon codes.

#### MediaAnnouncement Object Structure

Each object inside `banner_text` must correspond to one of the following structures depending on its `type` (0: TEXT, 1: IMAGE, 2: CTA, 3: COUPON).

##### 1. Text (`type: 0`)
* **`type`** (`number`): `0` (TEXT)
* **`content`** (`string`): Supports embedded HTML and inline styling. Supported HTML/inline styles corresponding with available TipTap tools include: `bold` (`<strong>` or `font-weight`), `italic` (`<em>` or `font-style`), `strike` (`<s>` or `text-decoration`), `underline` (`<u>` or `text-decoration`), `color`, and text alignment (`text-align: left | center | right`). Also supports `link` (`<a>`).
* **`size`** (`number`): Display size of the element in pixels. Default is `28`.
* **`image_url_cdn`** (`string`): CDN URL for the element image (empty string for text elements). Default is `""`.
* **`clickable`** (`boolean`, optional): Whether the element is clickable.

##### 2. Image (`type: 1`)
* **`type`** (`number`): `1` (IMAGE)
* **`content`** (`string`): The valid image URL to display. Can use tool `select_images` to choose image.
* **`size`** (`number`): Image height in pixels.
* **`image_url_cdn`** (`string`): CDN URL for the image. Default is `""`.
* **`clickable`** (`boolean`, optional): Whether the image is clickable.
* **`action_config`** (`object`, optional): Action behavior when clicking the image.
  * `direct_link` (`string`): Target link URL.
  * `handle` (`string`, optional): Shopify product/collection handle.
  * `typeUrl` (`string`, optional): Type of the URL target (e.g., product, collection).
  * `open_in_new_tab` (`boolean`, optional): Whether to open the link in a new tab.

##### 3. Call-to-Action / Button (`type: 2`)
* **`type`** (`number`): `2` (CTA)
* **`content`** (`string`): The visual text rendered inside the CTA. Supports embedded HTML and inline styles.
* **`size`** (`number`): Display size of the CTA element in pixels. Default is `28`.
* **`image_url_cdn`** (`string`): CDN URL for the element image (empty string for CTA elements). Default is `""`.
* **`clickable`** (`boolean`, optional): Whether the CTA is clickable.
* **`action_config`** (`object`): Action link or copy behavior.
  * `cta_type` (`number`): Type of CTA action (e.g., `2` for link, `3` for button, `4` for btn_copy).
  * `direct_link` (`string`, optional): Link URL.
  * `handle` (`string`, optional): Shopify product/collection handle.
  * `typeUrl` (`string`, optional): Type of the URL target.
  * `open_in_new_tab` (`boolean`, optional): Whether to open the link in a new tab.
  * `text_copy` (`string`, optional): Text to copy if `cta_type` is btn_copy (`4`).
  * `success_message` (`string`, optional): Success label after copying.
* **`action_style`** (`object`, optional): Styling settings for CTA button.
  * `border_type` (`number`): Border style code.
  * `background` (`string`): Background color hex.
  * `text_color` (`string`): Text color hex.
  * `font_size` (`number`, optional): Text size inside the button.
  * `padding` (`string`): Padding values (e.g., `"5px 10px"`).
  * `animation` (`number`): Button hover animation code.

##### 4. Coupon (`type: 3`)
* **`type`** (`number`): `3` (COUPON)
* **`content`** (`string`): The default visual content.
* **`size`** (`number`): Display size of the coupon element in pixels. Default is `28`.
* **`image_url_cdn`** (`string`): CDN URL for the element image (empty string for coupon elements). Default is `""`.
* **`clickable`** (`boolean`, optional): Whether the coupon block is clickable.
* **`coupon_data`** (`object`): Data associated with the coupon.
  * `coupon_code` (`string`): The code to display and copy.
  * `source` (`number`): Source identifier. `0` (Manual), `1` (Shopify).
  * `discount_id` (`string`): Shopify discount ID if source is Shopify. Default is `""`.
  * `auto_apply` (`boolean`): Whether to automatically apply the code.
* **`action_style`** (`object`, optional): Styling settings for the coupon block.
  * `border_type` (`number`): The border style ID used for the coupon box. It determines the border radius, background fill, and border line style. Supported values are:
    * `0` (Solid): Square corners, solid background.
    * `1` (Outlined): Square corners, transparent background, solid border.
    * `2` (Rounded Solid): 4px rounded corners, solid background.
    * `3` (Rounded Outlined): 4px rounded corners, transparent background, solid border.
    * `4` (Fully Rounded Solid): 99px rounded corners, solid background.
    * `5` (Fully Rounded Outlined): 99px rounded corners, transparent background, solid border.
    * `6` (Dashed): Square corners, transparent background, dashed border.
    * `7` (Rounded Dashed): 4px rounded corners, transparent background, dashed border.
    * `8` (Fully Rounded Dashed): 99px rounded corners, transparent background, dashed border.
  * `background` (`string`): Background color hex.
  * `text_color` (`string`): Text color hex.
  * `font_size` (`number`): Text size inside the coupon.
  * `animation` (`number`): Optional ID for CSS hover/interaction animation styles. Default is `0`. Supported values are:
    * `0` (NONE)
    * `1` (COLOR_FLIP)
    * `2` (THIN)
    * `3` (HOLOGRAM)
    * `4` (PULSE)
    * `5` (WOBBLE)

---

### font_family

* **Type:** `string`
* **Required:** no
* **Default:** `""`
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
