import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Briefcase, FlaskConical, Home, Search, SunMoon } from 'lucide-react'
import { profile } from '../data/content'
import { GitHubIcon, LinkedInIcon, XIcon } from './Icons'

type Action = { id: string; label: string; group: string; icon: ReactNode; run: () => void }

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const actions: Action[] = useMemo(() => {
    const ext = (url: string) => () => window.open(url, '_blank', 'noopener')
    return [
      { id: 'home', label: 'Home', group: 'Pages', icon: <Home size={16} />, run: () => navigate('/') },
      { id: 'work', label: 'Work', group: 'Pages', icon: <Briefcase size={16} />, run: () => navigate('/work') },
      { id: 'research', label: 'Research', group: 'Pages', icon: <FlaskConical size={16} />, run: () => navigate('/research') },
      { id: 'theme', label: 'Toggle light / dark', group: 'Actions', icon: <SunMoon size={16} />, run: () => window.dispatchEvent(new Event('toggle-theme')) },
      { id: 'li', label: 'LinkedIn', group: 'Elsewhere', icon: <LinkedInIcon size={16} />, run: ext(profile.socials.linkedin) },
      { id: 'gh', label: 'GitHub', group: 'Elsewhere', icon: <GitHubIcon size={16} />, run: ext(profile.socials.github) },
      { id: 'x', label: 'X / Twitter', group: 'Elsewhere', icon: <XIcon size={16} />, run: ext(profile.socials.x) },
    ]
  }, [navigate])

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const run = (a?: Action) => {
    if (!a) return
    setOpen(false)
    a.run()
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      run(filtered[active])
    }
  }

  let lastGroup = ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="palette-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-search">
              <Search size={16} />
              <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onInputKey} placeholder="Where to?" aria-label="Search commands" />
              <kbd>esc</kbd>
            </div>
            <ul className="palette-list" role="listbox">
              {filtered.length === 0 && <li className="palette-empty">No matches</li>}
              {filtered.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null
                lastGroup = a.group
                return (
                  <li key={a.id}>
                    {header && <div className="palette-group">{header}</div>}
                    <button
                      role="option"
                      aria-selected={i === active}
                      className={`palette-item ${i === active ? 'active' : ''}`}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(a)}
                    >
                      {a.icon}
                      <span>{a.label}</span>
                      <ArrowRight size={14} className="palette-arrow" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
