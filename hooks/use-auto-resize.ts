import React, {useRef} from "react";

export const useAutoResize = (
) => {

  const adjustHeight = (el: any) => {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };

  const onInput = (e: any) => {
    adjustHeight(e.target);
  };

  const ref = useRef();

  const fitToSize = () => {
    if (ref.current){
      (ref.current as any).style.height = 'auto';
      (ref.current as any).style.height = (ref.current as any).scrollHeight + 'px';
    }
  };
  return {ref , fitToSize  , onInput};
}