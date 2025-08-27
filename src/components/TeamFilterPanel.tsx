'use client';

import { useEffect, useMemo, useState } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { TeamCategory } from '@/types/team';

interface Props {
  open: boolean;
  selected: Partial<Record<TeamCategory, boolean>>;
  onClose: () => void;
  onApply: (next: Partial<Record<TeamCategory, boolean>>) => void;
}

const TEAM_CATEGORIES: TeamCategory[] = [
  'Intake',
  'Billing',
  'Credentialing',
  'Clinical',
  'Communication',
  // 'PriorAuths',
  'Doxy',
];

export default function TeamFilterPanel({
  open,
  selected,
  onClose,
  onApply,
}: Props) {
  const [local, setLocal] = useState<Partial<Record<TeamCategory, boolean>>>({});

  // Sync local state when panel opens with current selected filters
  useEffect(() => {
    if (open) setLocal(selected);
  }, [open, selected]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const toggle = (team: TeamCategory) => {
    setLocal((prev) => ({ ...prev, [team]: !prev?.[team] }));
  };

  const clearAll = () => {
    const cleared: Partial<Record<TeamCategory, boolean>> = {};
    setLocal(cleared);
  };

  const anySelected = useMemo(
    () => TEAM_CATEGORIES.some((t) => !!local[t]),
    [local]
  );

  // ✅ Hooks are all above this conditional
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">
            Filter by teams
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Checkbox list */}
        <fieldset className="rounded-md">
          {TEAM_CATEGORIES.map((team) => {
            const checked = !!local[team];
            return (
              <div key={team}>
                <label
                  className="flex cursor-pointer items-center justify-between  py-3"
                  onClick={() => toggle(team)}
                >
                  <div className="flex items-center gap-3">
                    {/* Custom checkbox */}
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
                        checked
                          ? 'border-purple-600 bg-purple-600'
                          : 'border-gray-400 bg-white'
                      }`}
                    >
                      {checked && <CheckIcon className="h-3 w-3 text-white" />}
                    </span>
                    <span className="text-sm text-gray-900">{team} team</span>
                  </div>
                </label>  
              </div>
              
            );
          })}
        </fieldset>

        <div className="h-px mt-3 bg-gray-200" />

        {/* Actions */}
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={clearAll}
            className="text-sm text-gray-600 hover:underline"
          >
            Clear all
          </button>

          <button
            type="button"
            onClick={() => onApply(local)}
            className="rounded bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}