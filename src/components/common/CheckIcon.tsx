import * as React from "react";

type SvgIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
};

export const CheckIcon = ({
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
    <path
      d="M2.95654 7L7.45654 11.5L14.9565 4"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
