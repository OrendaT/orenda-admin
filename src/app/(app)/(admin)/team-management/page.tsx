'use client';

import { useState, useEffect } from 'react';
import TeamTable from '@/components/AdminsPermissions/TeamTable';
import TeamHeader from '@/components/TeamHeader';
import AddMemberModal from '@/components/AddMemberModal';
import TeamFilterPanel from '@/components/TeamFilterPanel';
import type { Role, TeamMember, TeamCategory } from '@/types/team';
import api from '@/lib/api/axios';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';

const TEAM_LIST: TeamCategory[] = [
  'Intake',
  'Billing',
  'Credentialing',
  'Clinical',
  'Communication',
  'PriorAuths',
  'Doxy',
];

export default function TeamManagementPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterQuery, setFilterQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Admin' | 'Manager' | 'Member'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const [teamFilter, setTeamFilter] = useState<Partial<Record<TeamCategory, boolean>>>({});
  const [sendingInvite, setSendingInvite] = useState(false);

  // 🔄 Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const session = await getSession();
      if (!session?.access_token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const res = await api.get('/admin/users', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        const users = Array.isArray(res.data) ? res.data : res.data.users || [];

        const mappedUsers = users.map((user: TeamMember) => ({
          ...user,
          name: user.name ?? '',
          teams: TEAM_LIST.reduce((acc, team) => {
            acc[team] = user.teams?.[team];
            return acc;
          }, {} as Record<TeamCategory, string | undefined>),
        }));

        setMembers(mappedUsers);
      } catch (err) {
        const error = err as AxiosError;
        setError(typeof error.response?.data === 'string' ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔎 Filtering
  const filteredMembers = members.filter((m) => {
    const displayName = (m.name || m.email || '').toLowerCase();
    const matchesName = displayName.includes(filterQuery.toLowerCase());

    const matchesRole =
      roleFilter === 'All' ||
      (roleFilter === 'Admin' && m.roles?.includes('Admin')) ||
      (roleFilter === 'Manager' && m.roles?.includes('Manager')) ||
      (roleFilter === 'Member' && m.roles?.includes('Member'));

    const activeTeams = Object.entries(teamFilter).filter(([, v]) => v);
    const matchesTeam =
      activeTeams.length === 0 ||
      activeTeams.every(([team]) => Boolean(m.teams?.[team as TeamCategory]));

    return matchesName && matchesRole && matchesTeam;
  });

  // 🚀 Invite Member
const handleInviteMember = async (newMember: {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  teams: string[];
}) => {
  setSendingInvite(true);
  setError(null);

  try {
    const session = await getSession();
    if (!session?.access_token) throw new Error('No access token found');

    // ✅ Send teams array directly
    const res = await api.post(
      '/admin/users',
      {
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        name: `${newMember.firstName} ${newMember.lastName}`,
        email: newMember.email,
        roles: [newMember.role],
        teams: newMember.teams, // ✅ this is the key
      },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    // ✅ Build teams map for frontend
    const teamAssignments: Record<TeamCategory, string | undefined> = {
      Intake: undefined,
      Billing: undefined,
      Credentialing: undefined,
      Clinical: undefined,
      Communication: undefined,
      PriorAuths: undefined,
      Doxy: undefined,
    };

    for (const team of newMember.teams) {
      teamAssignments[team as TeamCategory] = newMember.role;
    }

    const createdUser: TeamMember = {
      id: res.data.id,
      name: res.data.name ?? `${newMember.firstName} ${newMember.lastName}`,
      email: newMember.email,
      roles: [newMember.role],
      teams: teamAssignments,
    };

    setMembers((prev) => [createdUser, ...prev]);

    toast.success(`Invited ${newMember.email} and added to selected teams`, {
      className: 'border rounded-lg border-green-500',
    });

    setShowAddModal(false);
  } catch (err) {
    const errorMsg =
      err instanceof AxiosError
        ? typeof err.response?.data === 'string'
          ? err.response?.data
          : err.message
        : (err as Error).message;
    setError(errorMsg || 'Failed to invite member');
  } finally {
    setSendingInvite(false);
  }
};

  // 🗑️ Delete Member
  const handleDeleteMember = async (memberId: string) => {
    setError(null);
    const prevMembers = members;
    setMembers((curr) => curr.filter((m) => m.id !== memberId));

    try {
      const session = await getSession();
      if (!session?.access_token) throw new Error('No access token found');

      await api.delete(`/admin/users/${memberId}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
    } catch (err) {
      setMembers(prevMembers);
      const errorMsg =
        err instanceof AxiosError
          ? typeof err.response?.data === 'string'
            ? err.response?.data
            : err.message
          : (err as Error).message;
      setError(errorMsg || 'Failed to delete member');
    }
  };

  if (loading) return <div className="p-6">Loading team members...</div>;

  return (
    <div className="flex">
      <main className="flex-1 p-6">
        <TeamHeader
          onAddMember={() => setShowAddModal(true)}
          onFilterChange={setFilterQuery}
          onRoleFilterChange={setRoleFilter}
          onOpenTeamFilter={() => setShowTeamFilter(true)}
        />

        {error && !sendingInvite && (
          <div className="mb-4 text-red-500">Failed to load or update: {error}</div>
        )}

        <TeamTable members={filteredMembers} setMembers={setMembers} onDelete={handleDeleteMember} />

        <AddMemberModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onInvite={handleInviteMember}
          sending={sendingInvite}
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