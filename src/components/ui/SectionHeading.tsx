"use client";

import Hover3D from "@/components/ui/Hover3D";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}

export default function SectionHeading({
  children,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Tag
      className={`font-heading text-3xl font-bold md:text-4xl ${className}`}
    >
      <Hover3D className="inline-block">
        <span className="gradient-text">{children}</span>
      </Hover3D>
    </Tag>
  );
}
