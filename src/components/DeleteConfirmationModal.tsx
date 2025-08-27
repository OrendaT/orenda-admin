'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmationModalProps {
  open: boolean;
  memberName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  open,
  memberName,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        {/* header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Remove Member</h2>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* content */}
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to remove <strong>{memberName}</strong>?<br />
          This action cannot be undone.
        </p>

        {/* footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Remove member
          </button>
        </div>
      </div>
    </div>
  );
}