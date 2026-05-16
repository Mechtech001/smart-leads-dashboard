import React from 'react';
import { LeadStatus, LeadSource } from '../../types/lead';

interface BadgeProps {
  type: 'status' | 'source';
  value: LeadStatus | LeadSource;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  let colorClass = '';

  if (type === 'status') {
    switch (value) {
      case 'New':
        colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        break;
      case 'Contacted':
        colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        break;
      case 'Qualified':
        colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        break;
      case 'Lost':
        colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  } else if (type === 'source') {
    switch (value) {
      case 'Website':
        colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        break;
      case 'Instagram':
        colorClass = 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
        break;
      case 'Referral':
        colorClass = 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {value}
    </span>
  );
};
