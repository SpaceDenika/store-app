export interface IActionState {
  error: string | null;
  fieldErrors?: {
    email?: string;
    password?: string;
  };
  fields?: Record<string, string | File | null>;
  success: boolean;
}
