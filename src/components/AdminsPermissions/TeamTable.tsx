// src/components/TeamTable.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import ToggleSwitch from '../ui/ToggleSwitch';
import ChangeRoleModal from '../ChangeRoleModal';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import type { TeamMember, TeamCategory, Role } from '@/types/team';

interface Props {
  members: TeamMember[];
  setMembers: (members: TeamMember[]) => void;
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

export default function TeamTable({ members, setMembers }: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click
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

  // Close menu on Escape
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMenuId(null);
    if (openMenuId) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [openMenuId]);

  const toggleTeam = (memberId: string, team: TeamCategory) => {
    const updated = members.map(m =>
      m.id === memberId
        ? { ...m, teams: { ...m.teams, [team]: !m.teams?.[team] } }
        : m
    );
    setMembers(updated);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
    setOpenMenuId(null);
  };

  const handleChangeRoleClick = (memberId: string) => {
    const m = members.find(x => x.id === memberId) || null;
    setEditingMember(m);
    setOpenMenuId(null);
  };

  const handleSaveRole = (newRole: Role) => {
    if (!editingMember) return;
    const updated = members.map(m =>
      m.id === editingMember.id ? { ...m, role: newRole } : m
    );
    setMembers(updated);
    setEditingMember(null);
  };

  return (
    <>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left font-normal text-[.8rem]">Name</th>
            <th className="p-2 text-left font-normal text-[.8rem]">Role</th>
            {teamCategories.map(team => (
              <th key={team} className="p-2 text-center font-normal text-[.8rem]">
                {team}
              </th>
            ))}
            <th className="p-2 text-right" />
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id} className="border-t">
              <td className="p-2 font-normal text-[.8rem]">{member.name}</td>
              <td className="p-2 font-normal text-[.8rem]">{member.role}</td>

              {teamCategories.map(team => (
                <td key={team} className="p-2 text-center">
                  <ToggleSwitch
                    isOn={!!member.teams?.[team]}
                    onToggle={() => toggleTeam(member.id, team)}
                  />
                </td>
              ))}

              {/* Actions cell */}
              <td className="relative p-2 text-right">
                <button
                  onClick={() =>
                    setOpenMenuId(prev => (prev === member.id ? null : member.id))
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
                      onClick={() => handleRemoveMember(member.id)}
                      className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      Remove member
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ChangeRoleModal
        open={!!editingMember}
        member={editingMember}
        onClose={() => setEditingMember(null)}
        onSave={handleSaveRole}
      />
    </>
  );
}