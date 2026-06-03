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

export const ButtonStylesSchema = z.object({
  animation: z.number().default(0),
  padding: z.string(),
});

export const FixedTimeSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const SlideConfigSchema = z.object({
  name: z.string().default('Banner 1'),
  hidden: z.boolean().default(false),
  enable_schedule: z.boolean().default(false).optional(),
  from_date: z.string().optional(),
  to_date: z.string().optional(),
  enable_visibility_date: z.boolean().default(false).optional(),
  enable_to_date: z.boolean().default(false).optional(),
  enable_fixed_time: z.boolean().default(false).optional(),
  fixed_time: FixedTimeSchema.optional(),
});

export const MultiBannerTemplateSchema = z.object({
  template: z.literal(5),
  banner_text: z.string(),
  content_order: z.string().default('text,action'),
  content_gap: z.number().min(0).max(200).optional().default(16),
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  bg_color: z.string().optional().default('#006BFF'),
  bg_gradient: z.string().optional(),
  bg_opacity: z.number().min(0).max(100).optional().default(100),
  bg_img_url_s3: z.string().optional().default(''),
  bg_size: z.enum(['cover', 'contain', 'auto']).optional().default('auto'),
  bg_preset: z.number().optional().default(0),
  font_family: z.string().default(''),
  font_url: z.string().optional().default(''),
  act_type: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
    .optional()
    .default(3),
  act_text: z.string().optional(),
  btn_style: z.number().int().min(0).max(8).optional().default(2),
  act_content_color: z.string().optional().default('#000000'),
  btn_text_color: z.string().optional().default('#FFFFFF'),
  bg_padding: z.number().max(100).optional().default(12),
  bg_padding_bottom: z.number().max(100).optional().default(12),
  bg_padding_left: z.number().max(100).optional().default(0),
  bg_padding_right: z.number().max(100).optional().default(0),
  mobile_padding_enabled: z.boolean().optional().default(true),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).optional().default('12px 0px 12px 0px'),
  border_width: z.string().optional().default('0px 0px 0px 0px'),
  border_color: z.string().optional().default('#000000'),
  border_style: z.number().int().min(0).max(7).optional().default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).optional().default('0px 0px 0px 0px'),
  enable_coupon: z.boolean().optional().default(false),
  coupon_code: z.string().optional().default(''),
  coupon_source: z.number().optional().default(0),
  discount_id: z.string().optional().default(''),
  btn_copy: BtnCopySchema.optional(),
  discount_style: DiscountStyleSchema.optional(),
  button_styles: ButtonStylesSchema.optional(),
  auto_apply_discount: z.boolean().optional().default(false),
  slide_config: SlideConfigSchema.optional(),
  countdown_start_time: z.string().optional(),
  countdown_end_time: z.string().optional(),
  act_timer_end: z.number().optional().default(1),
  timer_color: z.string().optional(),
  trans_countdown: z.string().optional(),
  font_size_countdown: z.number().optional().default(20),
  countdown_type: z.number().optional().default(0),
  countdown_format: z
    .enum(['dd:hh:mm:ss', 'hh:mm', 'dd:hh:mm', 'hh:mm:ss', 'mm:ss'])
    .optional()
    .default('dd:hh:mm:ss'),
  countdown_daily: z.string().optional(),
  countdown_interval: z
    .object({
      start_time: z.string(),
      countdown_length: z.object({ days: z.number(), hours: z.number(), minutes: z.number() }),
      break_length: z.object({ days: z.number(), hours: z.number(), minutes: z.number() }),
    })
    .optional(),
  countdown_evergreen: z
    .object({ days: z.number(), hours: z.number(), minutes: z.number() })
    .optional(),
  digit_style: z.number().min(0).max(3).optional().default(0),
});

export const MultiConfigSchema = z.object({
  transition: z.union([z.literal(0), z.literal(1)]),
  duration: z.number().min(1).max(30),
  pause_on_hover: z.boolean(),
  slider_order: z.array(z.number()),
  bg_padding: z.number().max(100).optional().default(12),
  bg_padding_bottom: z.number().max(100).optional().default(12),
  bg_padding_left: z.number().max(100).optional().default(20),
  bg_padding_right: z.number().max(100).optional().default(20),
  mobile_padding_enabled: z.boolean().optional().default(true),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).optional(),
  border_width: z.string().optional().default('0px 0px 0px 0px'),
  border_color: z.string().optional().default('#000000'),
  border_style: z.number().int().min(0).max(7).optional().default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).optional().default('0px 0px 0px 0px'),
});

export const MultiBannerSchema = z.object({
  banner_type: z.literal(3),
  position: z.union([z.literal(0), z.literal(1)]),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().optional().default('#FFFFFF'),
  show_device: z.enum(['all', 'mobile', 'desktop']),
  show_arrow: z.boolean().default(true),
  btn_arrow_color: z.string().optional().default('#FFFFFF'),
  font_scale_enabled: z.boolean().optional().default(false),
  font_scale: z.number().min(-100).max(100).optional().default(0),
  multi_config: MultiConfigSchema,
  banner_templates: z.array(MultiBannerTemplateSchema).min(2),
});

export type MultiBanner = z.infer<typeof MultiBannerSchema>;
