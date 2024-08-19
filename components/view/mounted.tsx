"use client";

import React, {ReactNode, useEffect} from 'react';

const Mounted = (
  { children }: {
    children: ReactNode;
  },
) => {
  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {children}
    </>
  );
};

export default Mounted;