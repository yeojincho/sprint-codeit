"use client";

import React from "react";
import clsx from "clsx";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // ⬅ 추가
};

export function Input({value, onChange, placeholder = "내용을 입력하세요", type = "text", onKeyDown}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={clsx(
        "w-full h-[54px]",
        "rounded-[24px]",
        "border-2 border-[#0F172A]",
        "shadow-[4px_4px_0_#0F172A]",
        "px-4 text-16-regular",
        "bg-gray-100",
        "focus:outline-none focus:ring-[#0F172A]"
      )}
    />
  );
}
