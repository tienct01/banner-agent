import { z } from 'zod';

export const BannerTextSchema = z.object({
  default: z.string(),
  success: z.string(),
});

export const ButtonStylesSchema = z.object({
  padding: z.string().nullable(),
  animation: z.number().nullable(),
});

export const BtnSettingsSchema = z.object({
  btn_style: z.union([z.string(), z.number()]).nullable(),
  btn_color: z.string().nullable(),
  btn_txt_color: z.string().nullable(),
  padding: z.string().nullable(),
  animation: z.number().nullable(),
});

export const FormStructureFieldSchema = z.object({
  type: z.enum(["text", "email", "button", "checkbox"]),
  fieldName: z.string(),
  placeholder: z.string().nullable(),
  required: z.boolean().nullable(),
});

export const FormStructureSchema = z.object({
  contentOrder: z.string().nullable(),
  fieldGap: z.number().nullable(),
  bannerGap: z.number().nullable(),
  inputTextColor: z.string().nullable(),
  inputBGColor: z.string().nullable(),
  inputBorderColor: z.string().nullable(),
  inputBorderRadius: z.string().nullable(),
  inputFontSize: z.number().nullable(),
  inputPadding: z.string().nullable(),
  structures: z.array(FormStructureFieldSchema).nullable(),
});

export const EmailSignupBannerTemplateSchema = z.object({
  template: z.literal(0),
  banner_text: BannerTextSchema,
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]).nullable(),
  bg_color: z.string().nullable(),
  font_size_button: z.number().nullable(),
  font_color: z.string().nullable(),
  font_family: z.string().nullable(),
  act_content_color: z.string().nullable().default("#000000"),
  btn_text_color: z.string().nullable().default("#FFFFFF"),
  btn_style: z.number().int().min(0).max(8).nullable().default(0),
  button_styles: ButtonStylesSchema.nullable(),
  btn_settings: BtnSettingsSchema.nullable(),
  content_gap: z.number().nullable().default(16),
  content_order: z.string().nullable(),
  form_structure: FormStructureSchema.nullable(),
});

export const EmailSignupBannerSchema = z.object({
  banner_type: z.literal(1),
  position: z.union([z.literal(0), z.literal(1)]).nullable(),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().nullable().default("#FFFFFF"),
  show_device: z.enum(["all", "mobile", "desktop"]).nullable(),
  font_scale_enabled: z.boolean().nullable().default(false),
  font_scale: z.number().min(-100).max(100).nullable().default(0),
  banner_templates: z.array(EmailSignupBannerTemplateSchema).length(1),
});

export type EmailSignupBanner = z.infer<typeof EmailSignupBannerSchema>;
