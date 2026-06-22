import { z } from 'zod';

export const BannerTextSchema = z.object({
  default: z.string(),
  success: z.string(),
});

export const ButtonStylesSchema = z.object({
  padding: z.string().default(""),
  animation: z.number(),
});

export const BtnSettingsSchema = z.object({
  btn_style: z.union([z.string(), z.number()]),
  btn_color: z.string().default(""),
  btn_txt_color: z.string().default(""),
  padding: z.string().default(""),
  animation: z.number(),
});

export const FormStructureFieldSchema = z.object({
  type: z.enum(["text", "email", "button", "checkbox"]),
  fieldName: z.string(),
  placeholder: z.string().default(""),
  required: z.boolean(),
});

export const FormStructureSchema = z.object({
  contentOrder: z.string().default(""),
  fieldGap: z.number(),
  bannerGap: z.number(),
  inputTextColor: z.string().default(""),
  inputBGColor: z.string().default(""),
  inputBorderColor: z.string().default(""),
  inputBorderRadius: z.string().default(""),
  inputFontSize: z.number(),
  inputPadding: z.string().default(""),
  structures: z.array(FormStructureFieldSchema),
});

export const EmailSignupBannerTemplateSchema = z.object({
  template: z.literal(0),
  banner_text: BannerTextSchema,
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  bg_color: z.string().default(""),
  font_size_button: z.number(),
  font_color: z.string().default(""),
  font_family: z.string().default(""),
  act_content_color: z.string().default("#000000"),
  btn_text_color: z.string().default("#FFFFFF"),
  btn_style: z.number().int().min(0).max(8).default(0),
  button_styles: ButtonStylesSchema,
  btn_settings: BtnSettingsSchema,
  content_gap: z.number().default(16),
  content_order: z.string().default(""),
  form_structure: FormStructureSchema,
});

export const EmailSignupBannerSchema = z.object({
  banner_type: z.literal(1),
  position: z.union([z.literal(0), z.literal(1)]),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().default("#FFFFFF"),
  show_device: z.enum(["all", "mobile", "desktop"]),
  font_scale_enabled: z.boolean().default(false),
  font_scale: z.number().min(-100).max(100).default(0),
  banner_templates: z.array(EmailSignupBannerTemplateSchema).length(1),
});

export type EmailSignupBanner = z.infer<typeof EmailSignupBannerSchema>;
