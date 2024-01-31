export interface IProfile {
  id: number;
  email: string;
  passwordHash: string;
  address: string | null;
  name: string;
  restoreToken: string | null;
  phone: number | null;
}