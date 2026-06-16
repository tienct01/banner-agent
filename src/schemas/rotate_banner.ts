import { z } from 'zod';

export const BannerTemplateSchema = z.object({
  template: z.literal(0),
  banner_text: z.array(z.string()),
  animation_type: z.union([z.literal(0), z.literal(1)]).default(0),
  animation_duration: z.string().default("5"),
  animation_hover_pause: z.boolean().default(true),
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]).default(0),
  bg_color: z.string().default("#FF5722"),
  bg_gradient: z.string().default("{\"color1\":\"#FF6162\",\"color2\":\"#FF9766\"}"),
  bg_opacity: z.number().min(0).max(100).default(100),
  bg_img_url_s3: z.string().default(""),
  font_url: z.string().default(""),
  font_family: z.string().default(""),
  bg_preset: z.number().default(0),
  act_type: z.number().default(0),
  bg_padding: z.number().max(100).default(12),
  bg_padding_bottom: z.number().max(100).default(12),
  bg_padding_left: z.number().max(100).default(12),
  bg_padding_right: z.number().max(100).default(12),
  bg_size: z.enum(["cover", "contain", "auto"]).default("cover"),
  mobile_padding_enabled: z.boolean().default(false),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).default("12px 0px 12px 0px"),
  border_width: z.string().default("0px"),
  border_color: z.string().default("#000000"),
  border_style: z.number().int().min(0).max(7).default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).default("0px 0px 0px 0px"),
});

export const AnnouncementRotateBannerSchema = z.object({
  banner_type: z.literal(1),
  position: z.union([z.literal(0), z.literal(1)]).default(1),
  name: z.string(),
  close_button: z.boolean().default(true),
  btn_close_color: z.string().default("#FFFFFF"),
  show_device: z.enum(["all", "mobile", "desktop"]).default("all"),
  show_arrow: z.boolean().default(true),
  btn_arrow_color: z.string().default("#FFFFFF"),
  font_scale_enabled: z.boolean().default(false),
  font_scale: z.number().min(-100).max(100).default(0),
  banner_templates: z.array(BannerTemplateSchema).length(1),
});

export type AnnouncementRotateBanner = z.infer<typeof AnnouncementRotateBannerSchema>;
