// 'use client';

// import React from 'react';
// import { useUsers } from '@/hooks/useUsers';

// const AdminUserTable = () => {
//   const { users, loading, error } = useUsers();

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border divide-y divide-gray-200 text-sm">
//         <thead className="bg-gray-100 text-left">
//           <tr>
//             <th className="px-4 py-2">User</th>
//             <th className="px-4 py-2">Role</th>
//             <th className="px-4 py-2">Teams</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => {
//             const teamNames = Object.keys(user.teams).length > 0
//               ? Object.entries(user.teams)
//                   .map(([team, roles]) => `${team} (${roles.join(', ')})`)
//                   .join(', ')
//               : 'No Team';

//             return (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{user.name} <br /><span className="text-xs text-gray-500">{user.email}</span></td>
//                 <td className="px-4 py-2">{user.roles.join(', ')}</td>
//                 <td className="px-4 py-2">{teamNames}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUserTable;
