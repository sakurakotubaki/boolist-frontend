import axios from 'axios';
import { getAuthHeader } from './auth';

const API_URL = 'http://localhost:8000';

export interface Book {
  id: number;
  title: string;
  description: string;
  owner_id: number;
}

// Books API
export const booksApi = {
  getAll: async (skip = 0, limit = 100) => {
    const response = await axios.get(`${API_URL}/books/?skip=${skip}&limit=${limit}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get(`${API_URL}/books/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  create: async (title: string, description: string) => {
    const response = await axios.post(
      `${API_URL}/books/`,
      { title, description },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  update: async (id: number, title: string, description: string) => {
    const response = await axios.put(
      `${API_URL}/books/${id}`,
      { title, description },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete(`${API_URL}/books/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },
};

// Users API
export const usersApi = {
  getAll: async (skip = 0, limit = 100) => {
    const response = await axios.get(`${API_URL}/users/?skip=${skip}&limit=${limit}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },
};
