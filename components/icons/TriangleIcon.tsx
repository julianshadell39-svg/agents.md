import React from "react";

interface TriangleIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function TriangleIcon({
  className = "",
  size = 64,
  color = "currentColor",
}: TriangleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <polygon points="50,8 96,92 4,92" fill={color} />
    </svg>
  );
}
