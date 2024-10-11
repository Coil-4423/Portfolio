// CustomArrow.tsx
import React from 'react';


interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const CustomPrevArrow = ({ className, style, onClick }: ArrowProps) => (
  <div
    className={className}
    // style={{ ...style, display: 'block', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '10px' }}
    onClick={onClick}
  >
    <img src="/left-arrow-backup-2-svgrepo-com.svg" alt="Prev" className='arrow-img'/>
  </div>
);

export const CustomNextArrow = ({ className, style, onClick }: ArrowProps) => (
  <div
    className={className}
    // style={{ ...style, display: 'block', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', padding: '10px' }}
    onClick={onClick}
  >
    <img src="/right-arrow-backup-2-svgrepo-com.svg" alt="Next" className='arrow-img'/>
  </div>
);
