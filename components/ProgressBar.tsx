import React from 'react';

type Props = {
  progress: number; // 0 - 100
  active?: boolean;
};

export default function ProgressBar({ progress, active }: Props) {
  return (
    <div style={{
      flex: 1,
      height: 3,
      background: 'rgba(255,255,255,0.25)',
      margin: '0 4px',
      borderRadius: 2,
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: active ? 'white' : 'rgba(255,255,255,0.6)',
        transition: active ? 'width 0.2s linear' : 'width 0.2s ease'
      }} />
    </div>
  );
}
