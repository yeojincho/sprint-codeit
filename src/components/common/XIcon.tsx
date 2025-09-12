import * as React from "react";

export type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
};

export const XIcon = ({
  className,
  size = 16, // ✅ 기본 16px
  strokeWidth = 2,
  ...props
}: SvgIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M4.5 4L12.5 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M12.5 4L4.5 12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);
