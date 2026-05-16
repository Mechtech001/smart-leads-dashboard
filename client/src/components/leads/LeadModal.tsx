import { useState } from 'react';
import { Lead } from '../../types/lead';
import { Modal } from '../ui/Modal';
import { LeadForm } from './LeadForm';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuthStore } from '../../store/authStore';
import { createLead, updateLead, deleteLead } from '../../api/leadApi';
import { formatDate } from '../../utils/formatDate';

type ModalMode = 'view' | 'edit' | 'create';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  mode: ModalMode;
  setMode: (mode: ModalMode) => void;
  onSuccess: () => void;
}

export function LeadModal({
  isOpen,
  onClose,
  lead,
  mode,
  setMode,
  onSuccess,
}: LeadModalProps) {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (data: any) => {
    try {
      setIsLoading(true);
      setError(null);
      if (mode === 'create') {
        await createLead(data);
      } else if (mode === 'edit' && lead) {
        await updateLead(lead._id, data);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!lead || !window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      setIsLoading(true);
      setError(null);
      await deleteLead(lead._id);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete lead');
    } finally {
      setIsLoading(false);
    }
  };

  const titleMap = {
    view: 'Lead Details',
    edit: 'Edit Lead',
    create: 'Add New Lead',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleMap[mode]}>
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
          {error}
        </div>
      )}

      {mode === 'view' && lead ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{lead.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{lead.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
              <div className="mt-1">
                <Badge type="status" value={lead.status} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Source</p>
              <div className="mt-1">
                <Badge type="source" value={lead.source} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {formatDate(lead.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated</p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {formatDate(lead.updatedAt)}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4 dark:border-gray-700">
            {isAdmin && (
              <>
                <Button variant="danger" onClick={handleDelete} isLoading={isLoading}>
                  Delete
                </Button>
                <Button onClick={() => setMode('edit')}>
                  Edit
                </Button>
              </>
            )}
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <LeadForm
          initialData={mode === 'edit' && lead ? lead : undefined}
          onSubmit={submitForm}
          isLoading={isLoading}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
};
