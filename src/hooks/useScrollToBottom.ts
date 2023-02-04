import { useEffect, RefObject } from 'react'

export function useScrollToBottom<T extends HTMLElement>(
  ref: RefObject<T>,
  deps: unknown[] = [],
) {
  useEffect(() => {
    if (ref.current === null) return
    const scrollHeight = ref.current.scrollHeight
    const height = ref.current.clientHeight
    const maxScrollTop = scrollHeight - height
    ref.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }, deps)
}
