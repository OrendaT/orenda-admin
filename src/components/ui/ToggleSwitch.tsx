'use client';

import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

export default function ToggleSwitch({ isOn, onToggle }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        isOn ? 'bg-[#2E0086]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isOn ? 'translate-x-4' : 'translate-x-1'
        }`}
      />
    </button>
  );
}