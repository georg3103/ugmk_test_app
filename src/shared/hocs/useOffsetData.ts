import { useState, useEffect } from 'react';

type OffsetData = {
  top: number;
  left: number;
  width: number;
  height: number;
}

const useOffsetData = (ref: React.RefObject<HTMLElement>): OffsetData | null => {
  const [offsetData, setOffsetData] = useState<OffsetData | null>(null);

  useEffect(() => {
    const calculateOffsetData = () => {
      if (ref.current?.getBoundingClientRect) {
        console.log(ref.current)
        const { top, left, width, height } = ref.current.getBoundingClientRect();
        setOffsetData({ top, left, width, height });
      }
    };

    calculateOffsetData();

    const handleResize = () => {
      calculateOffsetData();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return offsetData;
};

export default useOffsetData;
