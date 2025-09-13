import * as React from "react";

export type SvgIconProps = React.SVGProps<SVGSVGElement> & {className?: string};

export const PlusIcon = ({className, size = "16", strokeWidth = 2, ...props}: SvgIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M2.5 8L14.5 8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <path d="M8.5 14L8.5 2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
);
