import { Lead } from '../../types/lead';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../utils/formatDate';

interface LeadRowProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

export function LeadRow({ lead, onClick }: LeadRowProps) {
  return (
    <tr
      onClick={() => onClick(lead)}
      className="cursor-pointer border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
        {lead.name}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {lead.email}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm">
        <Badge type="status" value={lead.status} />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm">
        <Badge type="source" value={lead.source} />
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {formatDate(lead.createdAt)}
      </td>
    </tr>
  );
};
