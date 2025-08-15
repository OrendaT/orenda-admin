'use client';

import { useState } from 'react';

type RoleFilter = 'All' | 'Admins' | 'Managers' | 'Team Members';

interface Props {
  onAddMember: () => void;
  onFilterChange: (query: string) => void;
  onRoleFilterChange: (role: RoleFilter) => void;
  onOpenTeamFilter: () => void; // ✅ NEW prop for filter panel
}

export default function TeamHeader({
  onAddMember,
  onFilterChange,
  onRoleFilterChange,
  onOpenTeamFilter,
}: Props) {
  const [search, setSearch] = useState('');
  const [activeRole, setActiveRole] = useState<RoleFilter>('All');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange(value);
  };

  const handleRoleClick = (role: RoleFilter) => {
    setActiveRole(role);
    onRoleFilterChange(role);
  };

  const roles: RoleFilter[] = ['All', 'Admins', 'Managers', 'Team Members'];

  return (
    <div className="mb-[3em]">
      {/* Header Row */}
      <div className="mb-[2rem] flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Team Management</h1>
        <button
          onClick={onAddMember}
          className="rounded bg-[#2E0086] px-4 py-2 text-white transition hover:bg-[#2E0086]"
        >
          + New Member
        </button>
      </div>

      {/* Filter + Search Row */}
      <div className="flex items-center justify-between">
        {/* Role Filters */}
        <div className="flex gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleClick(role)}
              className={`rounded border px-3 py-1 text-sm ${
                activeRole === role
                  ? 'bg-[#2E0086] text-white'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Search + Filter Icon */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="rounded border border-gray-300 px-3 py-1 text-sm"
          />
          <button
            type="button"
            onClick={onOpenTeamFilter} // ✅ Trigger filter panel
            className="flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 hover:bg-gray-100"
          >
            <p className="font-medium text-[.85rem]">Filter</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}