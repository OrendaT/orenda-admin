'use client';

import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Role, TeamMember } from '@/types/team';
import useAxios from '@/lib/api/axios-client';
import { useSession } from 'next-auth/react';

interface ChangeRoleModalProps {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onSuccess?: (newRoles: Role[]) => void;
}

const ROLE_OPTIONS: Role[] = ['Admin', 'Manager', 'Member'];

export default function ChangeRoleModal({
  open,
  member,
  onClose,
  onSuccess,
}: ChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<Role>('Member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { axios } = useAxios();
  const { data: session, status } = useSession();

  // Sync role selection when modal opens with a member
  useEffect(() => {
    if (member) {
      setSelectedRole(
        (Array.isArray(member.roles) && member.roles[0] as Role) || 'Member'
      );
    }
  }, [member]);

  // Close modal on Esc
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', onEsc);
    }
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const handleSave = async () => {
    if (!member) return;

    if (status !== 'authenticated' || !session?.access_token) {
      setError('Session is still loading. Please wait...');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.patch(
        `/admin/users/${member.id}`,
        { roles: [selectedRole] },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      // ✅ Send the updated roles back to parent
      onSuccess?.([selectedRole]);
      onClose();
    } catch (err) {
      console.error('❌ Failed to update role:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!open || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-role-title"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="change-role-title"
            className="text-base font-semibold text-gray-900"
          >
            Change role
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <fieldset className="rounded-md border border-gray-200">
          {ROLE_OPTIONS.map((r, idx) => (
            <div key={r}>
              <label
                className="flex cursor-pointer items-center gap-3 px-3 py-3"
                onClick={() => setSelectedRole(r)}
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={selectedRole === r}
                  className="sr-only"
                  readOnly
                />
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                    selectedRole === r
                      ? 'border-[#2E0086] bg-[#2E0086]'
                      : 'border-gray-400 bg-white'
                  }`}
                >
                  {selectedRole === r && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-gray-900">{r}</span>
              </label>
              {idx !== ROLE_OPTIONS.length - 1 && (
                <div className="h-px bg-gray-200" />
              )}
            </div>
          ))}
        </fieldset>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            disabled={loading || status !== 'authenticated'}
            className="rounded bg-[#2E0086] px-5 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}