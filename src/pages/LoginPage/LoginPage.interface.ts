import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Неверный адрес электронной почты'),
  password: z.string().min(5, 'Слишком короткий размер: пароль должен содержать не менее 5 символов.'),
});

export type LoginRawFieldsType = z.input<typeof loginSchema>;

export interface ILoginFormState {
  error: string | null;
  errorFields?: Partial<Record<keyof LoginRawFieldsType, string>>;
  fields?: Record<keyof LoginRawFieldsType, FormDataEntryValue>;
  success: boolean;
}
