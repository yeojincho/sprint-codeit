"use client";
import React, {useState} from "react";
import {Checkbox} from "@/components/common/Checkbox";
import {useRouter} from "next/navigation";

type TodoItemProps = {
  id: number;
  name: string;
  isCompleted: boolean;
  onToggle: () => void;
  variant?: "list" | "detail";
  onTextChange?: (value: string) => void;
};

export function TodoItem({id, name, isCompleted, onToggle, variant = "list", onTextChange}: TodoItemProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (variant === "list") router.push(`/items/${id}`);
      }}
      className={`flex items-center w-full px-3 rounded-[24px] border-2 border-[#0F172A] transition-colors cursor-pointer
        ${isCompleted ? "bg-purple-100 text-black" : "bg-white text-black"} ${
        variant === "detail" ? "justify-center h-[64px]" : "h-[50px]"
      }`}
    >
      <Checkbox
        checked={isCompleted}
        onToggle={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      />
      {variant === "detail" ? (
        <input
          value={name}
          className="ml-3 flex-1 bg-transparent outline-none"
          onChange={(e) => onTextChange?.(e.target.value)}
        />
      ) : (
        <span className={`ml-3 text-16-regular ${isCompleted ? "underline text-slate-500" : ""}`}>{name}</span>
      )}
    </div>
  );
}
