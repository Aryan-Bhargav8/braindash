"use client";
import React, {useEffect, useRef} from 'react';
import {useSecretContextValues} from "@/components/providers/secret-content-context-provider";
import {cn} from "@/lib/utils";

const SecretIndicatorFade = ({children, className} : {children: React.ReactNode , className?: string}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contextData = useSecretContextValues();

  useEffect(() => {
    if (!ref.current) return;

    ref.current.onmouseenter = (e) => {
      if (contextData.setMaskSize){
        contextData.setMaskSize(0);
      }
    }

    ref.current.onmouseleave = (e) => {
      if (contextData.setMaskSize){
        contextData.setMaskSize(60);
      }
    }
  }, [contextData]);


  return (
    <div ref={ref} className={cn("block w-fit h-fit", className)}>
      {children}
    </div>
  );
};

export default SecretIndicatorFade;