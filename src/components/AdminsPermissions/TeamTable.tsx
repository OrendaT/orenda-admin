'use client';

import { useEffect, useRef, useState } from 'react';
import ToggleSwitch from '../ui/ToggleSwitch';
import ChangeRoleModal from '../ChangeRoleModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import type { TeamMember, TeamCategory, Role } from '@/types/team';
import api from '@/lib/api/axios';

interface Props {
  members: TeamMember[];
  setMembers: (members: TeamMember[]) => void;
  onDelete: (memberId: string) => void;
}

const teamCategories: TeamCategory[] = [
  'Intake',
  'Billing',
  'Credentialing',
  'Clinical',
  'Comms',
  'PriorAuths',
  'Doxy',
];

export default function TeamTable({ members, setMembers, onDelete }: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Added this
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!openMenuId) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [openMenuId]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMenuId(null);
    if (openMenuId) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [openMenuId]);

  const toggleTeam = (memberId: string, team: TeamCategory) => {
    const updated = members.map((m) =>
      m.id === memberId
        ? { ...m, teams: { ...m.teams, [team]: !m.teams?.[team] } }
        : m,
    );
    setMembers(updated);
  };

  const handleDeleteClick = (member: TeamMember) => {
    setMemberToDelete(member);
    setOpenMenuId(null);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      onDelete(memberToDelete.id);
      setMemberToDelete(null);
    }
  };

  const handleChangeRoleClick = (memberId: string) => {
    const m = members.find((x) => x.id === memberId) || null;
    setEditingMember(m);
    setIsModalOpen(true); // ✅ Open the modal
    setOpenMenuId(null);
  };

  const handleClose = () => {
    setEditingMember(null);
    setIsModalOpen(false);
  };

  const refreshTeamList = async () => {
    if (!editingMember) return;

    try {
      const response = await api.get('/api/v1/admin/users'); // ✅ Replace with your actual fetch logic
      const updatedMembers = response.data; // ✅ Adjust based on your API response shape
      setMembers(updatedMembers);
    } catch (err) {
      console.error('Failed to refresh team list:', err);
    }
  };

  return (
    <>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left text-[.8rem] font-normal">Name</th>
            <th className="p-2 text-left text-[.8rem] font-normal">Role</th>
            {teamCategories.map((team) => (
              <th
                key={team}
                className="p-2 text-center text-[.8rem] font-normal"
              >
                {team}
              </th>
            ))}
            <th className="p-2 text-right" />
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-t">
              <td className="p-2 text-[.8rem] font-normal">
                {member.name || member.email}
              </td>
              <td className="p-2 text-[.8rem] font-normal">
                {Array.isArray(member.roles) ? member.roles.join(', ') : '—'}
              </td>

              {teamCategories.map((team) => (
                <td key={team} className="p-2 text-center">
                  <ToggleSwitch
                    isOn={!!member.teams?.[team]}
                    onToggle={() => toggleTeam(member.id, team)}
                  />
                </td>
              ))}

              <td className="relative p-2 text-right">
                <button
                  onClick={() =>
                    setOpenMenuId((prev) =>
                      prev === member.id ? null : member.id,
                    )
                  }
                  className="inline-flex items-center rounded p-1 hover:bg-gray-100"
                  aria-haspopup="menu"
                  aria-expanded={openMenuId === member.id}
                  aria-label="Open actions"
                >
                  <EllipsisHorizontalIcon className="h-5 w-5 text-gray-600" />
                </button>

                {openMenuId === member.id && (
                  <div
                    ref={menuRef}
                    role="menu"
                    className="absolute right-2 z-20 mt-2 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
                  >
                    <button
                      role="menuitem"
                      onClick={() => handleChangeRoleClick(member.id)}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Change role
                    </button>
                    <button
                      role="menuitem"
                      onClick={() => handleDeleteClick(member)}
                      className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete member
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ChangeRoleModal
        open={isModalOpen}
        member={editingMember}
        onClose={handleClose}
        onSuccess={refreshTeamList}
      />

      <DeleteConfirmationModal
        open={!!memberToDelete}
        memberName={memberToDelete?.name || memberToDelete?.email}
        onClose={() => setMemberToDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}