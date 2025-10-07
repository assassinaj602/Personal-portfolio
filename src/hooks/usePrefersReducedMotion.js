import { useEffect, useState } from 'react'
export default function usePrefersReducedMotion(){
  const [reduced, setReduced] = useState(false)
  useEffect(()=>{
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const set = () => setReduced(mq.matches)
    set()
    mq.addEventListener?.('change', set)
    return () => mq.removeEventListener?.('change', set)
  },[])
  return reduced
}
