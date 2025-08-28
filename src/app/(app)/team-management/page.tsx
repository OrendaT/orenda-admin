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

const TEAM_LIST: TeamCategory[] = [
  'Intake',
  'Billing',
  'Credentialing',
  'Clinical',
  'Comms',
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
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        const users = Array.isArray(res.data) ? res.data : res.data.users || [];

        // ✅ Use backend `name` directly, fallback optional
        const mappedUsers = users.map((user: TeamMember) => ({
          ...user,
          name: user.name ?? '', // trust backend's name
        }));

        setMembers(mappedUsers);
      } catch (err) {
        const error = err as AxiosError;
        setError(
          typeof error.response?.data === 'string'
            ? error.response.data
            : error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredMembers = Array.isArray(members)
    ? members.filter((m) => {
        const displayName = (m.name || m.email || '').toLowerCase();
        const matchesName = displayName.includes(filterQuery.toLowerCase());

        const matchesRole =
          roleFilter === 'All' ||
          (roleFilter === 'Admin' &&
            Array.isArray(m.roles) &&
            m.roles.includes('Admin')) ||
          (roleFilter === 'Manager' &&
            Array.isArray(m.roles) &&
            m.roles.includes('Manager')) ||
          (roleFilter === 'Member' &&
            Array.isArray(m.roles) &&
            m.roles.includes('Member'));

        const activeTeams = Object.entries(teamFilter).filter(([, v]) => v);
        const matchesTeam =
          activeTeams.length === 0 ||
          activeTeams.every(([team]) => m.teams?.[team as TeamCategory]);

        return matchesName && matchesRole && matchesTeam;
      })
    : [];

  const mapRoleToBackend = (role: Role): 'Admin' | 'Manager' | 'Provider' | 'Member' => {
    switch (role) {
      case 'Admin':
      case 'Manager':
        return role;
      case 'Member':
        return 'Member';
      default:
        return 'Member';
    }
  };

  
  const handleInviteMember = async (newMember: {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  }) => {
    setSendingInvite(true);
    setError(null);

    try {
      const session = await getSession();
      if (!session?.access_token) {
        throw new Error('No access token found');
      }

      const res = await api.post(
        '/admin/users',
        {
          firstName: newMember.firstName,
          lastName: newMember.lastName,
          name: `${newMember.firstName} ${newMember.lastName}`,
          email: newMember.email,
          roles: [mapRoleToBackend(newMember.role)],
          teams: {},
        },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );

      // ✅ Use backend response name if returned, otherwise local form data
      const createdUser: TeamMember = {
        ...res.data,
        name: res.data.name ?? `${newMember.firstName} ${newMember.lastName}`,
        roles: res.data.roles?.length
          ? res.data.roles
          : [mapRoleToBackend(newMember.role)],
        teams: TEAM_LIST.reduce((acc, team) => {
          acc[team] = false;
          return acc;
        }, {} as Record<TeamCategory, boolean>),
      };

      setMembers((prev) => [createdUser, ...prev]);
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

  // NEW: delete handler
  const handleDeleteMember = async (memberId: string) => {
    setError(null);

    // optimistic update
    const prevMembers = members;
    setMembers((curr) => curr.filter((m) => m.id !== memberId));

    try {
      const session = await getSession();
      if (!session?.access_token) {
        throw new Error('No access token found');
      }

      await api.delete(`/admin/users/${memberId}`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
    } catch (err) {
      // revert on failure
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

  if (loading) {
    return <div className="p-6">Loading team members...</div>;
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

        {error && !sendingInvite && (
          <div className="mb-4 text-red-500">
            Failed to load or update: {error}
          </div>
        )}

        <TeamTable
          members={filteredMembers}
          setMembers={setMembers}
          onDelete={handleDeleteMember}
        />

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