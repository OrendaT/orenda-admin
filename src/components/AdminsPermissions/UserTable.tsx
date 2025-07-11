// 'use client';

// import React from 'react';
// import UserRow from './UserRow';
// // import { Button } from '@/components/ui/button';
// // import { FiSearch, FiFilter } from 'react-icons/fi';
// // import Pagination from './Pagination';
// // import { UserData } from '@/types';
// // import { cn } from '@/lib/utils';
// import { useAllUsers } from '@/hooks/useUsers';

// // interface UserTableProps {
// //   users: UserData[];
// //   isPending: boolean;
// //   isError: boolean;
// // }

// const UserTable: React.FC = () => {
//   const { data, isPending } = useAllUsers();

//   return (
//     <div className="w-full min-w-[900px] bg-[#F6F6F6] shadow-sm overflow-x-auto">
//       {/* Table headers */}
//       <div className="grid grid-cols-12 p-4 text-sm text-gray-500 border-b">
//         <div className="col-span-4">User</div>
//         <div className="col-span-3">Role</div>
//         <div className="col-span-4">Team</div>
//         <div className="col-span-1"></div>
//       </div>

//       {/* Table body with loading, empty, or populated state */}
//       {isPending ? (
//         <div className="p-8 flex justify-center">Loading...</div>
//       ) : data?.length === 0 ? (
//         <div className="p-8 text-center text-gray-500">No users found.</div>
//       ) : (
//         data?.map((user) => <UserRow key={user.id} user={user} />)
//       )}

//       {/* Pagination controls */}
//       {/* {totalPages > 1 && (
//         <div className="p-4 border-t">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={onPageChange}
//           />
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default UserTable;




'use client';

import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import UserRow from './UserRow';
import { useAllUsers } from '@/hooks/useUsers';

const UserTable: React.FC = () => {
  const { data, isPending } = useAllUsers();

  return (
    <div className="w-full min-w-[700px] bg-[#F6F6F6] shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Team</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={4} className="p-8 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="p-8 text-center text-gray-500">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            data?.map((user) => <UserRow key={user.id} user={user} />)
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
