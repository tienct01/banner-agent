import { z } from 'zod';

export const FreeShippingGoalSchema = z.object({
  default: z.number(),
});

export const ProgressBarConfigSchema = z.object({
  show_progress_bar: z.boolean(),
  progress_bar_width: z.number().min(0).max(100),
  progress_bar_bg_color: z.string(),
  progress_bar_color: z.string(),
});

export const BannerTextSchema = z.object({
  start_msg: z.string(),
  progress_msg: z.string(),
  goal_reached_msg: z.string(),
});

export const FreeShippingBannerTemplateSchema = z.object({
  template: z.literal(3),
  banner_text: BannerTextSchema,
  free_shipping_goal: FreeShippingGoalSchema,
  progress_bar_config: ProgressBarConfigSchema,
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  bg_color: z.string().default(""),
  bg_gradient: z.string().default(""),
  bg_opacity: z.number().min(0).max(100).default(100),
  bg_img_url_s3: z.string().default(""),
  font_url: z.string().default(""),
  bg_preset: z.number(),
  font_family: z.string().default('Inter'),
  act_type: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ]).default(0),
  act_text: z.string().default(""),
  btn_style: z.number().int().min(0).max(8),
  act_content_color: z.string().default(""),
  btn_text_color: z.string().default(""),
  bg_padding: z.number().max(100).default(12),
  bg_padding_bottom: z.number().max(100).default(12),
  bg_padding_left: z.number().max(100).default(12),
  bg_padding_right: z.number().max(100).default(12),
  bg_size: z.enum(["cover", "contain", "auto"]).default("cover"),
  mobile_padding_enabled: z.boolean().default(false),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).default(""),
  content_gap: z.number().min(0).max(200).default(16),
  content_order: z.string().default("text"),
  border_width: z.string().default("0px"),
  border_color: z.string().default("#000000"),
  border_style: z.number().int().min(0).max(7).default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).default("0px 0px 0px 0px"),
});

export const FreeShippingBannerSchema = z.object({
  banner_type: z.literal(0),
  position: z.union([z.literal(0), z.literal(1)]),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().default("#FFFFFF"),
  show_device: z.enum(["all", "mobile", "desktop"]),
  font_scale_enabled: z.boolean().default(false),
  font_scale: z.number().min(-100).max(100).default(0),
  banner_templates: z.array(FreeShippingBannerTemplateSchema).length(1),
});

export type FreeShippingBanner = z.infer<typeof FreeShippingBannerSchema>;
