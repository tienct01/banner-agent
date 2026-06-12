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
  enable_schedule: z.boolean().nullable().default(false),
  from_date: z.string().nullable(),
  to_date: z.string().nullable(),
  enable_visibility_date: z.boolean().nullable().default(false),
  enable_to_date: z.boolean().nullable().default(false),
  enable_fixed_time: z.boolean().nullable().default(false),
  fixed_time: FixedTimeSchema.nullable(),
});

export const MultiBannerTemplateSchema = z.object({
  template: z.literal(5),
  banner_text: z.string(),
  content_order: z.string().default('text,action'),
  content_gap: z.number().min(0).max(200).nullable().default(16),
  bg_type: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  bg_color: z.string().nullable().default('#006BFF'),
  bg_gradient: z.string().nullable(),
  bg_opacity: z.number().min(0).max(100).nullable().default(100),
  bg_img_url_s3: z.string().nullable().default(''),
  bg_size: z.enum(['cover', 'contain', 'auto']).nullable().default('auto'),
  bg_preset: z.number().nullable().default(0),
  font_family: z.string().default(''),
  font_url: z.string().nullable().default(''),
  act_type: z
    .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
    .nullable()
    .default(3),
  act_text: z.string().nullable(),
  btn_style: z.number().int().min(0).max(8).nullable().default(2),
  act_content_color: z.string().nullable().default('#000000'),
  btn_text_color: z.string().nullable().default('#FFFFFF'),
  bg_padding: z.number().max(100).nullable().default(12),
  bg_padding_bottom: z.number().max(100).nullable().default(12),
  bg_padding_left: z.number().max(100).nullable().default(0),
  bg_padding_right: z.number().max(100).nullable().default(0),
  mobile_padding_enabled: z.boolean().nullable().default(true),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).nullable().default('12px 0px 12px 0px'),
  border_width: z.string().nullable().default('0px 0px 0px 0px'),
  border_color: z.string().nullable().default('#000000'),
  border_style: z.number().int().min(0).max(7).nullable().default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).nullable().default('0px 0px 0px 0px'),
  enable_coupon: z.boolean().nullable().default(false),
  coupon_code: z.string().nullable().default(''),
  coupon_source: z.number().nullable().default(0),
  discount_id: z.string().nullable().default(''),
  btn_copy: BtnCopySchema.nullable(),
  discount_style: DiscountStyleSchema.nullable(),
  button_styles: ButtonStylesSchema.nullable(),
  auto_apply_discount: z.boolean().nullable().default(false),
  slide_config: SlideConfigSchema.nullable(),
  countdown_start_time: z.string().nullable(),
  countdown_end_time: z.string().nullable(),
  act_timer_end: z.number().nullable().default(1),
  timer_color: z.string().nullable(),
  trans_countdown: z.string().nullable(),
  font_size_countdown: z.number().nullable().default(20),
  countdown_type: z.number().nullable().default(0),
  countdown_format: z
    .enum(['dd:hh:mm:ss', 'hh:mm', 'dd:hh:mm', 'hh:mm:ss', 'mm:ss'])
    .nullable()
    .default('dd:hh:mm:ss'),
  countdown_daily: z.string().nullable(),
  countdown_interval: z
    .object({
      start_time: z.string(),
      countdown_length: z.object({ days: z.number(), hours: z.number(), minutes: z.number() }),
      break_length: z.object({ days: z.number(), hours: z.number(), minutes: z.number() }),
    })
    .nullable(),
  countdown_evergreen: z
    .object({ days: z.number(), hours: z.number(), minutes: z.number() })
    .nullable(),
  digit_style: z.number().min(0).max(3).nullable().default(0),
});

export const MultiConfigSchema = z.object({
  transition: z.union([z.literal(0), z.literal(1)]),
  duration: z.number().min(1).max(30),
  pause_on_hover: z.boolean(),
  slider_order: z.array(z.number()),
  bg_padding: z.number().max(100).nullable().default(12),
  bg_padding_bottom: z.number().max(100).nullable().default(12),
  bg_padding_left: z.number().max(100).nullable().default(20),
  bg_padding_right: z.number().max(100).nullable().default(20),
  mobile_padding_enabled: z.boolean().nullable().default(true),
  mb_bg_padding: z.string().regex(/^\d+px \d+px \d+px \d+px$/).nullable(),
  border_width: z.string().nullable().default('0px 0px 0px 0px'),
  border_color: z.string().nullable().default('#000000'),
  border_style: z.number().int().min(0).max(7).nullable().default(0),
  border_radius: z.string().regex(/^\d+px \d+px \d+px \d+px$/).nullable().default('0px 0px 0px 0px'),
});

export const MultiBannerSchema = z.object({
  banner_type: z.literal(3),
  position: z.union([z.literal(0), z.literal(1)]),
  name: z.string(),
  close_button: z.boolean(),
  btn_close_color: z.string().nullable().default('#FFFFFF'),
  show_device: z.enum(['all', 'mobile', 'desktop']),
  show_arrow: z.boolean().default(true),
  btn_arrow_color: z.string().nullable().default('#FFFFFF'),
  font_scale_enabled: z.boolean().nullable().default(false),
  font_scale: z.number().min(-100).max(100).nullable().default(0),
  multi_config: MultiConfigSchema,
  banner_templates: z.array(MultiBannerTemplateSchema).min(2),
});

export type MultiBanner = z.infer<typeof MultiBannerSchema>;
