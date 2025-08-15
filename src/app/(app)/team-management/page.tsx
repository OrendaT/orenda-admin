'use client';

import { useState, useEffect } from 'react';
import TeamTable from '@/components/AdminsPermissions/TeamTable';
import TeamHeader from '@/components/TeamHeader';
import AddMemberModal from '@/components/AddMemberModal';
import TeamFilterPanel from '@/components/TeamFilterPanel';
import type { Role, TeamMember, TeamCategory } from '@/types/team';
import useAxios from '@/lib/api/axios-client';
import { USERS_EP } from '@/lib/api/endpoints';

// You can keep initialMembers as a fallback if needed:
const initialMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sitora Mirsoatova',
    role: 'Manager',
    teams: { Billing: true, Clinical: true, Comms: true },
  },
  {
    id: '2',
    name: 'Samuel Steeth',
    role: 'Admin',
    teams: { Intake: true, Billing: true, Clinical: true, Comms: true },
  },
  {
    id: '3',
    name: 'Mike Ross',
    role: 'Team Member',
    teams: { Comms: true },
  },
];

export default function TeamManagementPage() {
  const { axios } = useAxios();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterQuery, setFilterQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Admins' | 'Managers' | 'Team Members'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const [teamFilter, setTeamFilter] = useState<Partial<Record<TeamCategory, boolean>>>({});

  // 🔹 Fetch members from backend on mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(USERS_EP.ALL_USERS); 
        // Adjust mapping according to actual API response
        const formatted: TeamMember[] = res.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          role: user.roles?.[0] || 'Team Member',
          teams: user.teams || {}
        }));
        setMembers(formatted);
      } catch (error) {
        console.error('Error fetching members, showing fallback:', error);
        setMembers(initialMembers);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [axios]);

  const filteredMembers = members.filter((m) => {
    const matchesName = m.name.toLowerCase().includes(filterQuery.toLowerCase());

    const matchesRole =
      roleFilter === 'All' ||
      (roleFilter === 'Admins' && m.role === 'Admin') ||
      (roleFilter === 'Managers' && m.role === 'Manager') ||
      (roleFilter === 'Team Members' && m.role === 'Team Member');

    const activeTeams = Object.entries(teamFilter).filter(([, v]) => v);

    const matchesTeam =
      activeTeams.length === 0 ||
      activeTeams.every(([team]) => m.teams[team as TeamCategory]);

    return matchesName && matchesRole && matchesTeam;
  });

  const handleInviteMember = (newMember: {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  }) => {
    const fullName = `${newMember.firstName} ${newMember.lastName}`;
    const newEntry: TeamMember = {
      id: Date.now().toString(),
      name: fullName,
      role: newMember.role,
      teams: {},
    };
    setMembers((prev) => [...prev, newEntry]);
  };

  if (loading) {
    return <div className="p-6">Loading members...</div>;
  }

  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <TeamHeader
          onAddMember={() => setShowAddModal(true)}
          onFilterChange={setFilterQuery}
          onRoleFilterChange={setRoleFilter}
          onOpenTeamFilter={() => setShowTeamFilter(true)}
        />

        <TeamTable members={filteredMembers} setMembers={setMembers} />

        <AddMemberModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onInvite={handleInviteMember}
        />

        <TeamFilterPanel
          open={showTeamFilter}
          selected={teamFilter}
          onClose={() => setShowTeamFilter(false)}
          onApply={(next) => {
            setTeamFilter(next);
            setShowTeamFilter(false);
          }}
        />
      </main>
    </div>
  );
}