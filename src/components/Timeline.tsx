import { MapPin } from 'lucide-react'
import type { Experience } from '../data/content'
import { motion } from 'framer-motion'

function Point({ p }: { p: Experience['points'][number] }) {
  if (typeof p === 'string') return <>{p}</>
  const [before, after] = p.text.split('{link}')
  return (
    <>
      {before}
      <a href={p.link.href} target="_blank" rel="noreferrer">{p.link.label}</a>
      {after}
    </>
  )
}

export default function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="timeline">
      {items.map((x, i) => (
        <motion.li
          key={x.role + x.org}
          className="timeline-item card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-head">
              <div>
                <h3>{x.role}</h3>
                <p className="org">
                  {x.orgUrl ? <a href={x.orgUrl} target="_blank" rel="noreferrer">{x.org}</a> : x.org}
                </p>
              </div>
              <div className="meta">
                <span className="mono">{x.period}</span>
                {x.location && <span className="muted"><MapPin size={12} /> {x.location}</span>}
              </div>
            </div>
            {x.previousRoles?.map((r) => (
              <div key={r.role + r.period} className="prev-role">
                <span>{r.role}</span>
                <span className="mono muted">{r.period}</span>
              </div>
            ))}
            <ul className="points">
              {x.points.map((p, j) => (
                <li key={j}><Point p={p} /></li>
              ))}
            </ul>
        </motion.li>
      ))}
    </ol>
  )
}
