import { ArrowUpRight, FileText } from 'lucide-react'
import { Page, Reveal, SectionHeader } from '../components/Page'
import Timeline from '../components/Timeline'
import { academic, publications } from '../data/content'

export default function Research() {
  return (
    <Page title="Research">
      <SectionHeader eyebrow="Research" title="Papers & academic work">
        Before industry, I worked on computer vision and knowledge distillation at CMU and IISc.
      </SectionHeader>

      <div className="grid-2">
        {publications.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="card pub">
            <a href={p.url} target="_blank" rel="noreferrer" className="card-link">
              <div className="pub-top">
                <div className="card-icon"><FileText size={18} /></div>
                <span className="mono muted">{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="muted">{p.venue}</p>
              <span className="pub-cta">Read paper <ArrowUpRight size={14} /></span>
            </a>
          </Reveal>
        ))}
      </div>

      <section className="section">
        <h2 className="h2">Academic experience</h2>
        <Timeline items={academic} />
      </section>
    </Page>
  )
}
