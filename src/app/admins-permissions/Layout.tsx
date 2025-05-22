// app/admins-permissions/layout.tsx

import React from 'react';

export default function AdminsPermissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {/* Any layout elements specific to the admins section */}
      {children}
    </div>
  );
}