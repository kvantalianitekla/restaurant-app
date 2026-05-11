export interface SignUpDto {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: 'MALE' | 'FEMALE';
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}
