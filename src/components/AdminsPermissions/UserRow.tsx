// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { FiMoreVertical } from 'react-icons/fi';
// import UserActionMenu from './UserActionMenu';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';

// // import { User } from '@/types/user';
// // import { useRoles } from '@/hooks/useRoles';
// import Image from 'next/image';
// import { UserData } from '@/types';

// // import { ROLE_PERMISSIONS, Role } from '@/types/user';


// // import ChangeRoleModal from './ChangeRoleModal';
// // import DeleteUserModal from './DeleteUserModal';
// // import SendMessageModal from './SendMessageModal';

// interface UserRowProps {
//   user: UserData;
// }

// // type UIPermission = 'Add contents' | 'Edit contents' | 'Approve contents' | 'All controls';

// // const getUIPermission = (role: Role): UIPermission => {
// //   const rolePermissions = ROLE_PERMISSIONS[role] || [];

// //   if (
// //     rolePermissions.length >= 4 &&
// //     rolePermissions.includes('create_user') &&
// //     rolePermissions.includes('edit_user') &&
// //     rolePermissions.includes('view_all')
// //   ) {
// //     return 'All controls';
// //   }

// //   if (rolePermissions.includes('view_all') || rolePermissions.includes('manage_providers')) {
// //     return 'Approve contents';
// //   }

// //   if (rolePermissions.includes('edit_user')) {
// //     return 'Edit contents';
// //   }

// //   if (rolePermissions.includes('create_user')) {
// //     return 'Add contents';
// //   }

// //   return 'Add contents';
// // };

// // const getRoleFromUIPermission = (permission: UIPermission): Role => {
// //   switch (permission) {
// //     case 'All controls':
// //       return 'Admin';
// //     case 'Approve contents':
// //       return 'Manager';
// //     case 'Edit contents':
// //       return 'Manager';
// //     case 'Add contents':
// //       return 'Provider';
// //     default:
// //       return 'Provider';
// //   }
// // };

// const UserRow: React.FC<UserRowProps> = ({ user }) => {
//   const [isActionMenuOpen, setIsActionMenuOpen] = useState<boolean>(false);
//   // const [isPermissionDropdownOpen, setIsPermissionDropdownOpen] = useState<boolean>(false);
//   // const [isUpdatingPermissions, setIsUpdatingPermissions] = useState<boolean>(false);

//   // const [showChangeRoleModal, setShowChangeRoleModal] = useState<boolean>(false);
//   // const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
//   // const [showMessageModal, setShowMessageModal] = useState<boolean>(false);

//   // const [localSelectedPermission, setLocalSelectedPermission] = useState<UIPermission>(getUIPermission(user.role));

//   const actionMenuRef = useRef<HTMLDivElement>(null);
//   const permissionDropdownRef = useRef<HTMLDivElement>(null);

//   // const getInitials = (firstName?: string, lastName?: string, name?: string): string => {
//   //   if (firstName && lastName) {
//   //     return `${firstName[0]}${lastName[0]}`.toUpperCase();
//   //   }
//   //   if (name) {
//   //     return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
//   //   }
//   //   return '?';
//   // };

//   const displayName = user.name || 'NO NAME';

//   // const allUIPermissions: UIPermission[] = ['Add contents', 'Edit contents', 'Approve contents', 'All controls'];

//   // const handlePermissionChange = async (permission: UIPermission, isChecked: boolean) => {
//   //   if (!isChecked) return;
//   //   // setLocalSelectedPermission(permission);
//   //   // const newRole = getRoleFromUIPermission(permission);
//   //   // if (newRole !== user.role) {
//   //   //   setIsUpdatingPermissions(true);
//   //   //   try {
//   //   //     await changeUserRole(user.id, newRole);
//   //   //   } catch (error) {
//   //   //     console.error('Failed to update permissions:', error);
//   //   //     setLocalSelectedPermission(getUIPermission(user.role));
//   //   //   } finally {
//   //   //     setIsUpdatingPermissions(false);
//   //   //   }
//   //   // }
//   // };

//   const handleChangeRole = () => {
//     // setShowChangeRoleModal(true);
//   };

//   const handleDeleteUser = () => {
//     // setShowDeleteConfirm(true);
//   };

//   const handleSendMessage = () => {
//     // setShowMessageModal(true);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
//         setIsActionMenuOpen(false);
//       }
//       // if (permissionDropdownRef.current && !permissionDropdownRef.current.contains(event.target as Node)) {
//       //   setIsPermissionDropdownOpen(false);
//       // }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   let teams = '';

//   for (const key in user.teams) {
//     if (user.teams.hasOwnProperty(key)) {
//       teams += `${key}  => ${user.teams[key]}, `;
//     }
//   }

//   return (
//     <>
//       <div className="grid grid-cols-12 p-4 border-b items-center hover:bg-gray-50">
//         <div className="col-span-4 flex items-center gap-3">
//           <Avatar className="h-10 w-10 bg-purple-100 text-purple-800">
//             {user.avatar ? (
//               <Image
//                 src={user.avatar}
//                 alt={displayName}
//                 width={40}
//                 height={40}
//                 className="h-full w-full object-cover rounded-full"
//               />
//             ) : (
//               <AvatarFallback className="bg-purple-100 text-purple-800 font-medium">
//                 {/* {getInitials(user.name.split(" ")[0], user.name.split(" ")[1])} */}
//               </AvatarFallback>
//             )}
//           </Avatar>
//           <div>
//             <div className="font-medium text-[13.4px] text-gray-900">
//               {displayName}
//               {user.isCurrentUser && <span className="text-gray-500 ml-1">(You)</span>}
//             </div>
//             <div className="text-[11.9px] text-gray-500">{user.email}</div>
//           </div>
//         </div>

//         <div className="col-span-3">
//           <span className="text-gray-900 text-[13px]">{user.roles.join(',')}</span>
//         </div>

//         <div className="col-span-4" ref={permissionDropdownRef}>
//           <div className="relative">{teams}</div>
//         </div>

//         <div className="col-span-1 relative" ref={actionMenuRef}>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 rounded-full hover:bg-gray-100"
//             onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
//           >
//             <FiMoreVertical className="h-4 w-4" />
//           </Button>

//           {isActionMenuOpen && (
//             <UserActionMenu
//               user={user}
//               onClose={() => setIsActionMenuOpen(false)}
//               onChangeRole={handleChangeRole}
//               onDeleteUser={handleDeleteUser}
//               onSendMessage={handleSendMessage}
//             />
//           )}
//         </div>
//       </div>

//       {/* {showChangeRoleModal && (
//         <ChangeRoleModal
//           user={user}
//           isOpen={showChangeRoleModal}
//           onClose={() => setShowChangeRoleModal(false)}
//         />
//       )}

//       {showDeleteConfirm && (
//         <DeleteUserModal
//           user={user}
//           isOpen={showDeleteConfirm}
//           onClose={() => setShowDeleteConfirm(false)}
//         />
//       )}

//       {showMessageModal && (
//         <SendMessageModal
//           user={user}
//           isOpen={showMessageModal}
//           onClose={() => setShowMessageModal(false)}
//         />
//       )} */}
//     </>
//   );
// };

// export default UserRow;






'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import UserActionMenu from './UserActionMenu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TableRow, TableCell } from '@/components/ui/table';
import { UserData } from '@/types';

import TeamBadge from './TeamBadge';


interface UserRowProps {
  user: UserData;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const displayName = user.name || 'NO NAME';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setIsActionMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let teams = '';
  for (const key in user.teams) {
    if (user.teams.hasOwnProperty(key)) {
      teams += `${key} => ${user.teams[key]}, `;
    }
  }

  const handleChangeRole = () => {};
  const handleDeleteUser = () => {};
  const handleSendMessage = () => {};

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-purple-100 text-purple-800">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={displayName}
                width={40}
                height={40}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <AvatarFallback className="bg-purple-100 text-purple-800 font-medium">
                {/* Fallback initials if needed */}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="font-medium text-[13.4px] text-gray-900">
              {displayName}
              {user.isCurrentUser && <span className="text-gray-500 ml-1">(You)</span>}
            </div>
            <div className="text-[11.9px] text-gray-500">{user.email}</div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <span className="text-gray-900 text-[13px]">{user.roles.join(', ')}</span>
      </TableCell>

      <TableCell>
         <TeamBadge teams={user.teams} />
      </TableCell>

      <TableCell className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-100"
          onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
        >
          <FiMoreVertical className="h-4 w-4" />
        </Button>

        {isActionMenuOpen && (
          <div ref={actionMenuRef}>
            <UserActionMenu
              user={user}
              onClose={() => setIsActionMenuOpen(false)}
              onChangeRole={handleChangeRole}
              onDeleteUser={handleDeleteUser}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;