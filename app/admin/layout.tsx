import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/actions/users/getCurrentUser';

import { Role } from '@prisma/client';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const response = await getCurrentUser();

  if (response?.data?.role !== Role.ADMIN) {
    redirect('/');
  }

  return (
    {children}
  )
}