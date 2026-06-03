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
  bg_color: z.string().nullable(),
  bg_gradient: z.string().nullable(),
  bg_opacity: z.number().min(0).max(100).nullable().default(100),
  bg_img_url_s3: z.string().nullable(),
  font_url: z.string().nullable(),
  bg_preset: z.number().nullable(),
  font_family: z.string().nullable().default('Inter'),
  act_type: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ]).nullable().default(0),
  act_text: z.string().nullable(),
  btn_style: z.number().int().min(0).max(8).nullable(),
  act_content_color: z.string().nullable(),
  btn_text_color: z.string().nullable(),
  bg_padding: z.number().max(100).nullable().default(12),
  bg_padding_bottom: z.number().max(100).nullable().default(12),
  bg_padding_left: z.number().max(100).nullable().default(12),
  bg_padding_right: z.number().max(100).nullable().default(12),
  bg_size: z.enum(["cover", "contain", "auto"]).nullable().default("cover"),
  mobile_padding_enabled: z.boolean().nullable().default(false),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).nullable(),
  content_gap: z.number().min(0).max(200).nullable().default(16),
  content_order: z.string().nullable().default("text"),
  border_width: z.string().nullable().default("0px"),
  border_color: z.string().nullable().default("#000000"),
  border_style: z.number().int().min(0).max(7).nullable().default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).nullable().default("0px 0px 0px 0px"),
});

export const FreeShippingBannerSchema = z.object({
  banner_type: z.literal(0),
  position: z.union([z.literal(0), z.literal(1)]),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().nullable().default("#FFFFFF"),
  show_device: z.enum(["all", "mobile", "desktop"]),
  font_scale_enabled: z.boolean().nullable().default(false),
  font_scale: z.number().min(-100).max(100).nullable().default(0),
  banner_templates: z.array(FreeShippingBannerTemplateSchema).length(1),
});

export type FreeShippingBanner = z.infer<typeof FreeShippingBannerSchema>;
