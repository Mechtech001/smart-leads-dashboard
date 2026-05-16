import axiosInstance from './axiosInstance';
import { ApiResponse } from '../types/api';
import { User } from '../types/user';

interface AuthResponse {
  user: User;
  token: string;
}

export async function login(data: any) {
  const res = await axiosInstance.post('/auth/login', data);
  return res.data;
}

export async function register(data: any) {
  const res = await axiosInstance.post('/auth/register', data);
  return res.data;
}
