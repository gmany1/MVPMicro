import { z } from 'zod';

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const registerSchema = z.object({
  fullName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  whatsapp: z.string()
    .regex(phoneRegex, 'Número de WhatsApp inválido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  storeName: z.string()
    .min(2, 'El nombre de la tienda debe tener al menos 2 caracteres')
    .max(30, 'El nombre de la tienda no puede exceder 30 caracteres')
    .regex(/^[a-zA-Z0-9-]+$/, 'Solo letras, números y guiones permitidos')
});

export const loginSchema = z.object({
  whatsapp: z.string()
    .regex(phoneRegex, 'Número de WhatsApp inválido'),
  password: z.string()
    .min(1, 'La contraseña es requerida')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;