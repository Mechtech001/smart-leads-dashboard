import axiosInstance from './axiosInstance';
import { Lead, LeadFilters } from '../types/lead';
import { ApiResponse, PaginatedResponse } from '../types/api';

export async function getLeads(filters: LeadFilters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== '') {
      params.append(key, String(value));
    }
  }

  const res = await axiosInstance.get(`/leads?${params.toString()}`);
  return res.data;
}

export const getLead = async (id: string) => {
  let res = await axiosInstance.get(`/leads/${id}`);
  return res.data;
};

export async function createLead(data: Partial<Lead>) {
  let res = await axiosInstance.post('/leads', data);
  return res.data;
}

export async function updateLead(id: string, data: Partial<Lead>) {
  let res = await axiosInstance.put(`/leads/${id}`, data);
  return res.data;
}

export async function deleteLead(id: string) {
  let res = await axiosInstance.delete(`/leads/${id}`);
  return res.data;
}
