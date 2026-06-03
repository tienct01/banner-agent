# Email Signup Banner

The **Email Signup Banner** is a notification bar that includes a form for users to subscribe to emails, typically rendered at the top or bottom of a webpage.

This document outlines the structural configuration for an **Email Signup Banner**. It serves as a technical reference, detailing all necessary properties, data types, and settings. By following this guide, you can construct a valid configuration object that can be directly consumed and rendered by the application.

## Example Configuration

Below is an example JSON configuration for an **Email Signup Banner**. *Note: All non-visual fields (such as trigger conditions, display logic, target audiences, and scheduling) have been excluded to focus purely on the design and content of the banner.*

```json
{
  "banner_type": 1,
  "position": 1,
  "name": "New Email Signup Banner",
  "close_button": true,
  "btn_close_color": "#FFFFFF",
  "show_device": "all",
  "font_scale_enabled": false,
  "font_scale": 0,
  "banner_templates": [
    {
      "template": 0,
      "banner_text": {
        "default": "<div style=\"font-size: 16px\">Subscribe to our newsletter!</div>",
        "success": "<div style=\"font-size: 16px\">Thank you for subscribing!</div>"
      },
      "bg_type": 0,
      "bg_color": "#FF5722",
      "font_size_button": 14,
      "font_color": "#000000",
      "font_family": "",
      "act_content_color": "#000000",
      "btn_text_color": "#FFFFFF",
      "btn_style": 0,
      "button_styles": {
        "padding": "8px 16px",
        "animation": 0
      },
      "btn_settings": {
        "btn_style": "0",
        "btn_color": "#000000",
        "btn_txt_color": "#FFFFFF",
        "padding": "8px 16px",
        "animation": 0
      },
      "content_gap": 16,
      "content_order": "text,form",
      "form_structure": {
        "contentOrder": "text,form",
        "fieldGap": 8,
        "bannerGap": 16,
        "inputTextColor": "#000000",
        "inputBGColor": "#FFFFFF",
        "inputBorderColor": "#CCCCCC",
        "inputBorderRadius": "16px",
        "inputFontSize": 14,
        "inputPadding": "8px 12px",
        "structures": [
          {
            "type": "email",
            "fieldName": "email",
            "placeholder": "Enter your email",
            "required": true
          },
          {
            "type": "button",
            "fieldName": "submit",
            "placeholder": "Join now"
          },
          {
            "type": "checkbox",
            "fieldName": "consent",
            "placeholder": "I agree to the terms and conditions"
          }
        ]
      }
    }
  ]
}
```

## Fields

### banner_type

* **Type:** `number`
* **Required:** yes
* **Description:** Indicates the type of the banner. For an Email Signup Banner, typically a specific identifier.

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
* **Description:** Scaling ratio for `banner_text` inside the banner if `font_scale_enabled` is true.

---

## Template Layout & Background (Inside `banner_templates`)

### banner_text

* **Type:** `object`
* **Required:** yes
* **Description:** An object containing the primary textual messages to display for different states.
  * `default`: The text to display initially (during signup step).
  * `success`: The text to display after successful submission.

---

### content_order

* **Type:** `string`
* **Required:** no
* **Default:** `"text,coupon"`
* **Description:** Comma-separated list of component names dictating the order they appear (e.g., `"text,coupon"`). This applies after the signup step. This is the `content_order` of success step
* **Constraints:**
  * Valid items include `"text"`, `"coupon"`, `"action"`
  * Must have text element

---

### content_gap

* **Type:** `number`
* **Required:** no
* **Default:** `16`
* **Description:** Gap between content elements inside the banner in pixels.

---

### font_color

* **Type:** `string`
* **Required:** no
* **Description:** Color for the text such as the consent checkbox label.

---

### act_content_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#000000"`
* **Description:** Hex color code used primarily for button background.

---

### btn_text_color

* **Type:** `string`
* **Required:** no
* **Default:** `"#FFFFFF"`
* **Description:** Hex color code for text inside buttons.

---

### btn_style

* **Type:** `number`
* **Required:** no
* **Default:** `0`
* **Description:** The border style ID used for the call-to-action button block. 

---

### font_size_button

* **Type:** `number`
* **Required:** no
* **Description:** Font size of the text inside the button.

---

### button_styles

* **Type:** `object`
* **Required:** no
* **Description:** Custom styling properties for buttons.
  * `padding`: The CSS padding string for the button.
  * `animation`: The animation type ID.

---

### btn_settings

* **Type:** `object`
* **Required:** no
* **Description:** Configuration specifically overriding or supplementing global button settings.
  * `btn_style`: The style ID for the submit button.
  * `btn_color`: The background color.
  * `btn_txt_color`: The text color.
  * `padding`: CSS padding.
  * `animation`: The animation type ID.

---

### form_structure

* **Type:** `object`
* **Required:** no
* **Description:** Settings for configuring the signup form and its layout.
  * `contentOrder` (`string`): Order of elements during the signup step (e.g., `"text,form"`).
  * `fieldGap` (`number`): Spacing between input fields and buttons in the form.
  * `bannerGap` (`number`): Gap between the main text content and the form during the signup step.
  * `inputTextColor` (`string`): Text color for input fields.
  * `inputBGColor` (`string`): Background color for input fields.
  * `inputBorderColor` (`string`): Border color for input fields.
  * `inputBorderRadius` (`string`): Border radius for input fields (e.g., `"16px"`).
  * `inputFontSize` (`number`): Font size for input text (e.g., `14`).
  * `inputPadding` (`string`): CSS padding for input fields (e.g., `"8px 12px"`).
  * `structures` (`array` of objects): The fields rendered in the form. Each object can have:
    * `type`: "text", "email", "button", or "checkbox".
    * `fieldName`: Identifying string for the field.
    * `placeholder`: The placeholder text or label (for checkbox/button).
    * `required`: Boolean indicating if the field is mandatory.
