import AdminDashboard from '@/components/AdminDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Responses | Secret Vault for Shreya',
  description: 'View Shreya’s proposal and date answers',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
