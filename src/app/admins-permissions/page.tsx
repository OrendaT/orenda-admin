// app/admins-permissions/page.tsx

import React from 'react';
import AdminsPermissionsPage from '@/components/AdminsPermissions'; // This will be the main component we'll build


export const metadata = {
  title: 'Admins & Permissions | Orenda',
  description: 'Manage users and their permissions in the Orenda platform',
};

export default function AdminsPermissionsRoute() {
  return <AdminsPermissionsPage />;
}