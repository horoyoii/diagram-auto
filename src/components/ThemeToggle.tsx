import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="absolute top-4 left-4 bg-white/10 backdrop-blur border border-white/30 p-2 rounded-xl text-white"
    >
      {dark ? 'Light' : 'Dark'}
    </button>
  )
}
