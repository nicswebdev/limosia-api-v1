export type GoogleUserDetail = {
  email: string;
  is_email_verified: boolean;
  f_name: string;
  l_name: string;
  password: string;
};

export type AuthUserExpress = {
  id?: number;
  email?: string;
  role?: string;
};
