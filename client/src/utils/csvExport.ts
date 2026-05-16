import { Lead } from '../types/lead';

export const exportToCSV = (leads: Lead[]) => {
  const headers = ['Name', 'Email', 'Status', 'Source', 'Created At'];
  let rows = [];
  for (let i = 0; i < leads.length; i++) {
    const l = leads[i];
    rows.push([
      l.name,
      l.email,
      l.status,
      l.source,
      new Date(l.createdAt).toLocaleDateString()
    ]);
  }

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'leads.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
