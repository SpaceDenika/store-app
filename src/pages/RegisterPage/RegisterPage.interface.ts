import z from 'zod';

export const registerSchema = z.object({
  email: z.email('Неверный адрес электронной почты'),
  password: z.string().min(5, 'Слишком короткий размер: пароль должен содержать не менее 5 символов.'),
  name: z.string().min(2, 'Слишком короткий размер: имя должно содержать не менее 2 символов.'),
});

export type RegisterRawFieldsType = z.input<typeof registerSchema>;

export interface IRegisterFormState {
  error: string | null;
  errorFields?: Partial<Record<keyof RegisterRawFieldsType, string>>;
  fields?: Record<keyof RegisterRawFieldsType, FormDataEntryValue>;
  success: boolean;
}
