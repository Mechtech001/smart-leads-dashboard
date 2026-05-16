import { useState, useEffect, useCallback } from 'react';
import { Lead, LeadFilters } from '../types/lead';
import { getLeads } from '../api/leadApi';

export const useLeads = (initialFilters: LeadFilters) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<LeadFilters>(initialFilters);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLeads(filters);
      
      // Since getLeads can return PaginatedResponse or ApiResponse
      if ('pagination' in data) {
        setLeads(data.data as Lead[]);
        setPagination(data.pagination);
      } else {
        setLeads(data.data as Lead[]);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateFilters = (newFilters: Partial<LeadFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 })); // Reset page on filter change
  };

  const setPage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return { leads, pagination, loading, error, filters, updateFilters, setPage, refetch: fetchLeads };
};
