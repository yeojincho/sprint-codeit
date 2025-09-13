import React from "react";
import clsx from "clsx";

import {PlusIcon} from "@/components/common/PlusIcon";
import {CheckIcon} from "@/components/common/CheckIcon";
import {XIcon} from "@/components/common/XIcon";

type ButtonType = "add" | "edit" | "delete";
type ButtonState = "default" | "active";
type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  strokeWidth?: number;
};
type IconComponent = React.ComponentType<SvgIconProps>;

type ButtonProps = {
  type: ButtonType;
  state?: ButtonState; // delete일 경우 항상 default
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: IconComponent; // 외부 SVG 컴포넌트 주입
  iconClassName?: string; // 아이콘 크기/색
  iconStrokeWidth?: number; // 선 두께
  gapClassName?: string; // 아이콘과 텍스트 간격
};

const styles: Record<ButtonType, Record<ButtonState, string>> = {
  add: {
    default: "bg-gray-100 text-slate-900 hover:bg-slate-200",
    active: "bg-purple-500 text-white hover:bg-violet-500",
  },
  edit: {
    default: "bg-gray-100 text-slate-900 hover:bg-slate-200",
    active: "bg-green-300 text-slate-900 hover:bg-lime-400",
  },
  delete: {
    default: "bg-rose-500 text-white hover:bg-rose-600",
    active: "",
  },
};

// 타입별 기본 아이콘 (필요 없으면 제거 가능)
const DefaultIcon: Record<ButtonType, IconComponent> = {
  add: PlusIcon,
  edit: CheckIcon,
  delete: XIcon,
};

export function Button({
  type,
  state = "default",
  onClick,
  children,
  disabled = false,
  icon,
  iconClassName = "w-4 h-4 text-white",
  iconStrokeWidth = 2,
  gapClassName = "mr-1",
}: ButtonProps) {
  const variant = type === "delete" ? "default" : state;
  const Icon = icon ?? DefaultIcon[type];
  const isIconOnly = !children;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className={clsx(
        "inline-flex items-center justify-center border-2 border-[#0F172A] rounded-[24px] shadow-[4px_4px_0_#0F172A] cursor-pointer",
        "w-[54px] h-[52px] md:w-[164px] md:h-[52px]",
        styles[type][variant],
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {Icon && (
        <Icon
          className={clsx(
            // 모바일에서는 margin 제거 + 아이콘 크기만
            "w-5 h-5 md:w-4 md:h-4",
            // gap도 md 이상일 때만 적용
            "md:mr-2",
            iconClassName
          )}
          strokeWidth={iconStrokeWidth}
        />
      )}
      <span className="hidden md:inline">{children}</span>
    </button>
  );
}
