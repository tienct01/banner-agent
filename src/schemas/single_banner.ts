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

export const BannerTemplateSchema = z.object({
  template: z.literal(0),
  banner_text: z.string(),
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  bg_color: z.string().default(""),
  bg_gradient: z.string().default(""),
  bg_opacity: z.number().min(0).max(100).default(100),
  bg_img_url_s3: z.string().default(""),
  font_url: z.string().default(""),
  bg_preset: z.number(),
  font_size: z.number(),
  font_size_button: z.number(),
  font_family: z.string(),
  act_type: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]).default(0),
  act_text: z.string().default(""),
  btn_style: z.number().int().min(0).max(8),
  bg_padding: z.number().max(100).default(12),
  bg_padding_bottom: z.number().max(100).default(12),
  bg_padding_left: z.number().max(100).default(12),
  bg_padding_right: z.number().max(100).default(12),
  bg_size: z.enum(["cover", "contain", "auto"]).default("cover"),
  mobile_padding_enabled: z.boolean().default(false),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).default(""),
  content_gap: z.number().min(0).max(200).default(16),
  border_width: z.string().default("0px"),
  border_color: z.string().default("#000000"),
  border_style: z.number().int().min(0).max(7).default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).default("0px 0px 0px 0px"),
  enable_coupon: z.boolean(),
  coupon_code: z.string().default(""),
  btn_copy: BtnCopySchema,
  discount_style: DiscountStyleSchema,
});

export const AnnouncementSingleBannerSchema = z.object({
  banner_type: z.literal(0),
  position: z.union([z.literal(0), z.literal(1)]),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().default("#FFFFFF"),
  show_device: z.enum(["all", "mobile", "desktop"]),
  font_scale_enabled: z.boolean().default(false),
  font_scale: z.number().min(-100).max(100).default(0),
  banner_templates: z.array(BannerTemplateSchema).length(1),
});

export type AnnouncementSingleBanner = z.infer<typeof AnnouncementSingleBannerSchema>;
