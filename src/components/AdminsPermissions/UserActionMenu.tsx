// // components/AdminsPermissions/UserActionMenu.tsx

// import React from 'react';
// // import { User } from '@/types/user';
// import { UserData } from '@/types';

// interface UserActionMenuProps {
//   user: UserData;
//   onClose: () => void;
//   // Add callback functions as props
//   onChangeRole: () => void;
//   onDeleteUser: () => void;
//   // onSendMessage: () => void;
// }

// const UserActionMenu: React.FC<UserActionMenuProps> = ({ 
//   onClose, 
//   onChangeRole,
//   onDeleteUser,
//   // onSendMessage
// }) => {
//   const handleAction = (action: () => void) => {
//     onClose(); 
//     action(); 
//   };
  
//   return (
//     <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//       <div className="py-1" role="menu" aria-orientation="vertical">
//         <button
//           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           onClick={() => handleAction(onChangeRole)}
//         >
//           Change role
//         </button>
//         {/* <button
//           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           onClick={() => handleAction(onSendMessage)}
//         >
//           Send Message
//         </button> */}
//         <button
//           className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//           onClick={() => handleAction(onDeleteUser)}
//         >
//           Delete user
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserActionMenu;