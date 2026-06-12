import { z } from 'zod';

export const DiscountStyleSchema = z.object({
  border: z.number().int().min(0).max(8),
  background: z.string(),
  text_color: z.string(),
  font_size: z.number(),
  animation: z.number().default(0),
});

export const BtnCopySchema = z.object({
  text_copy: z.string(),
  success_mess: z.string(),
});

export const CountdownBannerTemplateSchema = z.object({
  template: z.literal(0),
  content_order: z.string().nullable().default("text,countdown,action"),
  content_gap: z.number().min(0).max(200).nullable().default(16),
  banner_text: z.string(),
  countdown_format: z.enum(["dd:hh:mm:ss", "hh:mm", "dd:hh:mm", "hh:mm:ss", "mm:ss"]).nullable().default("dd:hh:mm:ss"),
  font_size_countdown: z.number().nullable().default(13),
  timer_color: z.string().nullable().default("{\"background\":\"#494949\",\"text\":\"#ffffff\",\"number\":\"#ffffff\",\"border\":\"#ff3f3f\",\"flipLine\":\"#000\",\"accentColor\":\"#FF3366\"}"),
  digit_style: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]).nullable().default(0),
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  bg_color: z.string().nullable(),
  bg_gradient: z.string().nullable(),
  bg_opacity: z.number().min(0).max(100).nullable().default(100),
  bg_img_url_s3: z.string().nullable(),
  font_url: z.string().nullable(),
  bg_preset: z.number().nullable(),
  font_family: z.string().nullable(),
  act_type: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]).nullable().default(0),
  act_text: z.string().nullable(),
  btn_style: z.number().int().min(0).max(8).nullable(),
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
  enable_coupon: z.boolean().nullable(),
  coupon_code: z.string().nullable(),
  btn_copy: BtnCopySchema.nullable(),
  discount_style: DiscountStyleSchema.nullable(),
});

export const AnnouncementCountdownBannerSchema = z.object({
  banner_type: z.literal(3),
  position: z.union([z.literal(0), z.literal(1)]),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().nullable().default("#FFFFFF"),
  show_device: z.enum(["all", "mobile", "desktop"]),
  font_scale_enabled: z.boolean().nullable().default(false),
  font_scale: z.number().min(-100).max(100).nullable().default(0),
  banner_templates: z.array(CountdownBannerTemplateSchema).length(1),
});

export type AnnouncementCountdownBanner = z.infer<typeof AnnouncementCountdownBannerSchema>;
