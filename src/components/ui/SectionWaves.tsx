"use client";

interface SectionWavesProps {
  variant?: number;
}

function WavePath({ y = 24, amp = 8 }: { y?: number; amp?: number }) {
  const y1 = y - amp;
  const y2 = y + amp;
  return (
    <path
      d={`M0 ${y} C 100 ${y1} 200 ${y2} 300 ${y} S 500 ${y1} 600 ${y} S 800 ${y2} 900 ${y}`}
      fill="none"
    />
  );
}

export default function SectionWaves({ variant = 0 }: SectionWavesProps) {
  const v = variant % 4;

  return (
    <div className="section-waves" aria-hidden>
      <div
        className={`section-waves-track section-waves-track--a section-waves-track--v${v}`}
      >
        <svg viewBox="0 0 900 48" preserveAspectRatio="none">
          <WavePath y={24} amp={6} />
        </svg>
        <svg viewBox="0 0 900 48" preserveAspectRatio="none">
          <WavePath y={24} amp={6} />
        </svg>
      </div>
      <div
        className={`section-waves-track section-waves-track--b section-waves-track--v${v}`}
      >
        <svg viewBox="0 0 900 48" preserveAspectRatio="none">
          <WavePath y={28} amp={5} />
        </svg>
        <svg viewBox="0 0 900 48" preserveAspectRatio="none">
          <WavePath y={28} amp={5} />
        </svg>
      </div>
    </div>
  );
}
