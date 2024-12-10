import { jwtVerify, SignJWT } from 'jose';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface User {
  id: number;
  username: string;
  email: string;
  books: any[];
}

export async function signIn(username: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, 
      new URLSearchParams({
        username,
        password,
      }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return access_token;
  } catch (error) {
    throw new Error('Authentication failed');
  }
}

export async function signUp(username: string, email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
}

export function signOut() {
  localStorage.removeItem('token');
}

export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

export function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
