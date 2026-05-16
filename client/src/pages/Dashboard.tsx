import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { useLeads } from '../hooks/useLeads';
import { useAuthStore } from '../store/authStore';
import { FilterBar } from '../components/leads/FilterBar';
import { LeadTable } from '../components/leads/LeadTable';
import { Pagination } from '../components/leads/Pagination';
import { LeadModal } from '../components/leads/LeadModal';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Lead } from '../types/lead';
import { exportToCSV } from '../utils/csvExport';
import { getLeads } from '../api/leadApi';

export function Dashboard() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const {
    leads,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    setPage,
    refetch,
  } = useLeads({ sort: 'latest' });

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'view' | 'edit' | 'create';
    lead: Lead | null;
  }>({
    isOpen: false,
    mode: 'view',
    lead: null,
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleRowClick = (lead: Lead) => {
    setModalState({ isOpen: true, mode: 'view', lead });
  };

  const handleCreateClick = () => {
    setModalState({ isOpen: true, mode: 'create', lead: null });
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const data = await getLeads({ ...filters, limit: 'all' });
      exportToCSV(data.data as Lead[]);
    } catch (err) {
      console.error('Failed to export leads', err);
      alert('Failed to export leads. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Leads Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track your smart leads efficiently.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={handleExport}
            isLoading={isExporting}
            className="flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </Button>
          {isAdmin && (
            <Button
              onClick={handleCreateClick}
              className="flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Lead</span>
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
        <FilterBar filters={filters} onFilterChange={updateFilters} />

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
            {error}
          </div>
        )}

        {loading && !leads.length ? (
          <Spinner />
        ) : leads.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            <LeadTable leads={leads} onRowClick={handleRowClick} />
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              itemsPerPage={pagination.limit}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      <LeadModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        lead={modalState.lead}
        mode={modalState.mode}
        setMode={(mode) => setModalState({ ...modalState, mode })}
        onSuccess={refetch}
      />
    </div>
  );
};
