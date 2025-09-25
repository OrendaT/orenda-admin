'use client';

import { useForm } from 'react-hook-form';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { Role } from '@/types/team';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onInvite: (member: FormData) => void;
  sending?: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  teams: string[];
}

const ROLE_OPTIONS: Role[] = ['Admin', 'Manager', 'Member'];
const TEAM_OPTIONS = [
  'Intake',
  'Billing',
  'Credentialing',
  'Clinical',
  'Communication',
  'PriorAuths',
  'Doxy',
];

export default function AddMemberModal({
  open,
  onClose,
  onInvite,
  sending = false,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: 'Member',
      teams: [],
    },
  });

  const [selectedRole, setSelectedRole] = useState<Role>('Member');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const onSubmit = (data: FormData) => {
    if (sending) return;

    const payload: FormData = {
      ...data,
      role: selectedRole,
      teams: selectedTeams,
    };

    onInvite(payload);
    reset();
    setSelectedTeams([]);
    setSelectedRole('Member');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-xl"
      >
        <div className="flex-grow overflow-y-auto p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              Invite New Member
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 hover:bg-gray-100"
              aria-label="Close"
              disabled={sending}
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="text-sm text-gray-700">First name</label>
              <input
                {...register('firstName', {
                  required: 'First name is required',
                })}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                disabled={sending}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm text-gray-700">Last name</label>
              <input
                {...register('lastName', { required: 'Last name is required' })}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                disabled={sending}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">Email address</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                  },
                })}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                disabled={sending}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <fieldset className="mt-[1.5em] rounded-md">
              <p className="mb-[1em] text-sm">Member role</p>
              {ROLE_OPTIONS.map((r) => (
                <div key={r}>
                  <label
                    className="flex cursor-pointer items-center gap-3 py-3"
                    onClick={() => !sending && setSelectedRole(r)}
                  >
                    <input
                      type="radio"
                      value={r}
                      checked={selectedRole === r}
                      readOnly
                      className="sr-only"
                    />
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                        selectedRole === r
                          ? 'border-[#2E0086] bg-[#2E0086]'
                          : 'border-gray-400 bg-white'
                      }`}
                    >
                      {selectedRole === r && (
                        <CheckIcon className="h-3 w-3 text-white" />
                      )}
                    </span>
                    <span className="text-sm text-gray-900">{r}</span>
                  </label>
                </div>
              ))}
            </fieldset>

            {/* Teams Selection */}
            <fieldset className="mt-[2em] rounded-md">
              <p className="mb-[1em] text-sm font-medium text-gray-900">
                Teams
              </p>
              <div className="grid grid-cols-2 gap-3">
                {TEAM_OPTIONS.map((team) => (
                  <label
                    key={team}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={team}
                      checked={selectedTeams.includes(team)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTeams((prev) => [...prev, team]);
                        } else {
                          setSelectedTeams((prev) =>
                            prev.filter((t) => t !== team),
                          );
                        }
                      }}
                      disabled={sending}
                      className="h-4 w-4 rounded border-gray-300 accent-[#2E0086] focus:ring-[#2E0086]"
                    />

                    {team}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        {/* Sticky Footer Button */}
        <div className="border-t px-6 py-4">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-[#2E0086] px-5 py-2 text-sm font-medium text-white hover:bg-[#2E0086] disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={sending}
          >
            {sending ? 'Sending…' : 'Invite member'}
          </button>
        </div>
      </form>
    </div>
  );
}