'use client';

import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Role, TeamMember } from '@/types/team';

interface ChangeRoleModalProps {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onSave: (newRole: Role) => void;
}

const ROLE_OPTIONS: Role[] = ['Admin', 'Manager', 'Team Member'];

export default function ChangeRoleModal({
  open,
  member,
  onClose,
  onSave,
}: ChangeRoleModalProps) {
  // ✅ Hooks must be called unconditionally
  const [role, setRole] = useState<Role>('Team Member');

  useEffect(() => {
    if (member) {
      setRole(member.role);
    }
  }, [member]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', onEsc);
    }
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  // ✅ Safe conditional render AFTER hooks
  if (!open || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Change role</h2>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Role options */}
        <fieldset className="rounded-md border border-gray-200">
          {ROLE_OPTIONS.map((r) => (
            <div key={r}>
              <label
                className="flex cursor-pointer items-center gap-3 px-3 py-3"
                onClick={() => setRole(r)}
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={role === r}
                  className="sr-only"
                />
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                    role === r ? 'border-[#2E0086] bg-[#2E0086]' : 'border-gray-400 bg-white'
                  }`}
                >
                  {role === r && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-gray-900">{r}</span>
              </label>
              <div className="h-px bg-gray-200" />
            </div>
          ))}
        </fieldset>

        {/* Done button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => onSave(role)}
            className="rounded bg-[#2E0086] px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}