import { useEffect } from 'react';

const useScript:any = (url:string, loadHandler:any, errorHandler:any) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.onload = loadHandler;
    script.onerror = errorHandler;
    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url, loadHandler]);
};

export default useScript;