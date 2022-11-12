import React from "react";
//  import { useEffect } from "react";
export function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const useScript = (url, onload) => {
  React.useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.onload = onload;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [url, onload]);
};

export class Utils {
  
static images={
  glasses:require("../Images/glasses.png")
}
}