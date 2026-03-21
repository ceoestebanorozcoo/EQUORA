export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: 'admin';
  createdAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  createdAt: Date;
}

export interface IProduct {
  _id: string;
  name: string;
  category: ICategory | string;
  price: number;
  images: string[];
  description: string;
  productCode: string;
  stockStatus: 'available' | 'soldout';
  createdAt: Date;
}

export interface IVerificationCode {
  _id: string;
  email: string;
  code: string;
  type: 'password-reset' | 'change-email' | 'change-password';
  expiresAt: Date;
  createdAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
