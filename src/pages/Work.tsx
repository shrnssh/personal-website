import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { Page, Reveal, SectionHeader } from '../components/Page'
import Timeline from '../components/Timeline'
import { education, experience, skills } from '../data/content'

export default function Work() {
  const categories = Object.keys(skills)
  const [cat, setCat] = useState<string>('All')
  const shown = cat === 'All' ? Object.values(skills).flat() : skills[cat]

  return (
    <Page title="Work">
      <SectionHeader eyebrow="Experience" title="Where I've worked">
        Backend and cloud infrastructure, with a soft spot for observability.
      </SectionHeader>

      <Timeline items={experience} />

      <section className="section">
        <h2 className="h2">Education</h2>
        <div className="grid-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.06} className="card edu">
              <div className="card-icon"><GraduationCap size={18} /></div>
              <span className="mono muted">{e.period}</span>
              <h3>{e.degree}</h3>
              <p>
                <a href={e.url} target="_blank" rel="noreferrer">{e.school}</a>
                <span className="muted"> · {e.location}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="h2">Skills</h2>
        <div className="filters" role="tablist" aria-label="Skill categories">
          {['All', ...categories].map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={`filter ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
              {cat === c && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span>{c}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="tags">
          {shown.map((s) => (
            <motion.span layout key={s} className="tag" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              {s}
            </motion.span>
          ))}
        </motion.div>
      </section>
    </Page>
  )
}
