"use client";

import React, {useEffect, useRef, useState} from 'react';
import {motion, useMotionTemplate, useMotionValue, useTransform} from "framer-motion";
import {useSecretContextValues} from "@/components/providers/secret-content-context-provider";
import {useWindowSize} from "@/hooks/use-window-size";
import {className} from "postcss-selector-parser";
import {useMaskPosition} from "@/hooks/use-mask-position";

const SecretContentIndicator = (
  {color} : {color?: string}
) => {

  const ref = useRef<HTMLDivElement>(null);

  const {transformedX , transformedY, contextData} = useMaskPosition(ref);

  const size = useMotionTemplate`${contextData.MaskSize ?? 50}px`;
  const X = useMotionTemplate`${transformedX}px`;
  const Y = useMotionTemplate`${transformedY}px`;

  return (
    <div className="absolute top-0 left-0 w-[100%] h-[100%] overflow-hidden pointer-events-none" ref={ref}>
      <motion.div
        style={{
          position: "absolute",
          width: size,
          height: size,
          backgroundColor: `${color ?? "#007af3"}`,
          borderRadius: "100%",
          x: X,
          y: Y,
        }}
      />
    </div>
  );
};

export default SecretContentIndicator;