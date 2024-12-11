import { useEffect, useRef } from 'react';

const useIdleTimer = ( onIdle:()=>void,idleTime:number) => {
  const idleLimit = idleTime; // 30 minutes in milliseconds
  const idleTimerRef:any = useRef(null);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      onIdle();
    }, idleLimit);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    const resetEvents = () => resetIdleTimer();

    events.forEach(event => {
      window.addEventListener(event, resetEvents);
    });

    // Initialize the timer for the first time
    resetIdleTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetEvents);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return null;
};

export default useIdleTimer;