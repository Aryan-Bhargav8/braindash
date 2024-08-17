import React, {useEffect} from "react";

export const useOrigin = () => {
  const [IsMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  } , []);
  if (!IsMounted) {
    return "";
  }

  return window.location.origin ?? "";
}