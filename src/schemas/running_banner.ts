import { z } from 'zod';

export const ActionConfigImageSchema = z.object({
  direct_link: z.string(),
});

export const ActionConfigCtaSchema = z.object({
  cta_type: z.number(),
  direct_link: z.string().nullable(),
  text_copy: z.string().nullable(),
  success_message: z.string().nullable(),
});

export const ActionStyleCtaSchema = z.object({
  border_type: z.number(),
  background: z.string(),
  text_color: z.string(),
  font_size: z.number().nullable(),
  padding: z.string(),
  animation: z.number(),
});

export const CouponDataSchema = z.object({
  coupon_code: z.string(),
  source: z.literal(0),
  auto_apply: z.boolean(),
});

export const ActionStyleCouponSchema = z.object({
  border_type: z.number().int().min(0).max(8),
  background: z.string(),
  text_color: z.string(),
  font_size: z.number(),
  animation: z.number().int().min(0).max(5).default(0),
});

export const TextAnnouncementSchema = z.object({
  type: z.literal(0),
  content: z.string(),
});

export const ImageAnnouncementSchema = z.object({
  type: z.literal(1),
  content: z.string(),
  size: z.number(),
  action_config: ActionConfigImageSchema.nullable(),
});

export const CtaAnnouncementSchema = z.object({
  type: z.literal(2),
  content: z.string(),
  action_config: ActionConfigCtaSchema,
  action_style: ActionStyleCtaSchema.nullable(),
});

export const CouponAnnouncementSchema = z.object({
  type: z.literal(3),
  content: z.string(),
  coupon_data: CouponDataSchema,
  action_style: ActionStyleCouponSchema.nullable(),
});

export const MediaAnnouncementSchema = z.union([
  TextAnnouncementSchema,
  ImageAnnouncementSchema,
  CtaAnnouncementSchema,
  CouponAnnouncementSchema,
]);

export const RunningBannerTemplateSchema = z.object({
  template: z.literal(0),
  banner_text: z.array(MediaAnnouncementSchema),
  animation_type: z.union([z.literal(0), z.literal(1)]),
  animation_duration: z.string(),
  animation_hover_pause: z.boolean(),
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  bg_color: z.string().nullable(),
  bg_gradient: z.string().nullable(),
  bg_opacity: z.number().min(0).max(100).nullable().default(100),
  bg_img_url_s3: z.string().nullable(),
  font_url: z.string().nullable(),
  bg_preset: z.number().nullable(),
  font_family: z.string().nullable(),
  content_gap: z.number().min(0).max(200).nullable().default(16),
  bg_padding: z.number().max(100).nullable().default(12),
  bg_padding_bottom: z.number().max(100).nullable().default(12),
  bg_padding_left: z.number().max(100).nullable().default(12),
  bg_padding_right: z.number().max(100).nullable().default(12),
  bg_size: z.enum(["cover", "contain", "auto"]).nullable().default("cover"),
  mobile_padding_enabled: z.boolean().nullable().default(false),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).nullable(),
  border_width: z.string().nullable().default("0px"),
  border_color: z.string().nullable().default("#000000"),
  border_style: z.number().int().min(0).max(7).nullable().default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).nullable().default("0px 0px 0px 0px"),
});

export const AnnouncementRunningBannerSchema = z.object({
  banner_type: z.literal(2),
  position: z.union([z.literal(0), z.literal(1)]),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().nullable().default("#FFFFFF"),
  show_device: z.enum(["all", "mobile", "desktop"]),
  font_scale_enabled: z.boolean().nullable().default(false),
  font_scale: z.number().min(-100).max(100).nullable().default(0),
  banner_templates: z.array(RunningBannerTemplateSchema).length(1),
});

export type AnnouncementRunningBanner = z.infer<typeof AnnouncementRunningBannerSchema>;
