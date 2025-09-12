"use client";
import React from "react";

type CheckboxProps = {
  checked: boolean;
  onToggle: () => void;
};

export function Checkbox({checked, onToggle}: CheckboxProps) {
  return (
    <button onClick={onToggle} className="flex items-center justify-center cursor-pointer" aria-pressed={checked}>
      {checked ? (
        // ✅ 체크된 상태 아이콘
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#7C3AED" />
          <path
            d="M8 16.2857L13.8182 22L24 12"
            stroke="#FEFCE8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // ✅ 미체크 상태 아이콘
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" fill="#FEFCE8" stroke="#0F172A" strokeWidth="2" />
        </svg>
      )}
    </button>
  );
}
