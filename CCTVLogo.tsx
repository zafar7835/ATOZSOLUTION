import React from "react";

interface CCTVLogoProps {
  className?: string;
  fill?: string;
}

export default function CCTVLogo({
  className = "w-6 h-6",
  fill = "currentColor",
}: CCTVLogoProps) {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      {/* Wall Bracket & Arm Base Plate (Standard Pill Shape on Left) */}
      <rect x="32" y="630" width="148" height="332" rx="42" />

      {/* Curved 90-degree Arm with uniform mathematical thickness of 114px */}
      <path d="M 140 754 L 282 754 A 60 60 0 0 1 342 694 L 342 660 L 456 660 L 456 754 A 114 114 0 0 1 342 868 L 140 868 Z" />

      {/* Swivel Collar Base (centered above the arm's top mouth at X=399, Y=660) */}
      <rect x="319" y="626" width="160" height="26" rx="13" />

      {/* Flare Curved Swivel Neck merging seamlessly into the bottom of the camera cylinder */}
      <path d="M 342 626 C 342 590, 355 540, 365 520 L 433 550 C 443 570, 456 590, 456 626 Z" />

      {/* Rotated Camera Bullet Body & Visor (Rotated at exactly 22 degrees for perfect DOWN-RIGHT slant) */}
      <g transform="translate(570, 390) rotate(22)">
        {/* Main Sleek Bullet Camera Cylinder with Slanted front lens cut */}
        <path d="M -250 -100 L 230 -100 L 170 100 L -250 100 A 100 100 0 0 1 -250 -100 Z" />

        {/* Outer visor shield wrapping around top and back of cylinder */}
        <path d="M -250 -35 C -268 -70, -260 -148, -210 -148 L 255 -148 C 282 -148, 296 -128, 290 -112 C 286 -104, 276 -112, 258 -112 L -210 -112 C -236 -112, -245 -80, -242 -35 Z" />

        {/* Slanted Lens face Bezel showing white outer ring & solid red camera aperture center */}
        <g transform="translate(200, 0) rotate(16.7)">
          <ellipse cx="0" cy="0" rx="42" ry="104.4" fill="#ffffff" />
          <ellipse cx="0" cy="0" rx="34" ry="94" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}
