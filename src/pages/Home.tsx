import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Clock, FlaskConical, Mountain } from 'lucide-react'
import { Page, Reveal } from '../components/Page'
import { GitHubIcon, LinkedInIcon, XIcon } from '../components/Icons'
import { experience, profile, publications, skills } from '../data/content'

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="gradient-text"
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-60%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function LocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15_000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="chip">
      <span className="pulse" /> <Clock size={13} /> {time} in the Bay Area
    </span>
  )
}

export default function Home() {
  const current = experience[0]

  return (
    <Page>
      <section className="hero">
        <div className="hero-copy">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <LocalTime />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            Hey, I'm Sharan.
            <br />
            <RotatingRole />
          </motion.h1>
          <motion.p className="lede" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}>
            {profile.intro}
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.5 }}>
            <Link to="/work" className="btn btn-primary">
              See my work <ArrowUpRight size={16} />
            </Link>
            <div className="socials">
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon size={20} /></a>
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon size={20} /></a>
              <a href={profile.socials.x} target="_blank" rel="noreferrer" aria-label="X"><XIcon size={20} /></a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="portrait"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotate: -2, scale: 1.02 }}
        >
          <div className="portrait-ring" />
          <img src={profile.photo} alt="Portrait of Sharan Seshadri" />
        </motion.div>
      </section>

      <section className="bento">
        <Reveal className="card bento-item bento-wide">
          <Link to="/work" className="card-link">
            <div className="card-icon"><Briefcase size={18} /></div>
            <span className="eyebrow">Currently</span>
            <h3>{current.role} @ {current.org}</h3>
            <p className="muted">{current.summary}</p>
            <ArrowUpRight className="card-arrow" size={18} />
          </Link>
        </Reveal>
        <Reveal className="card bento-item" delay={0.06}>
          <Link to="/research" className="card-link">
            <div className="card-icon"><FlaskConical size={18} /></div>
            <span className="eyebrow">Research</span>
            <h3>{publications.length} publications</h3>
            <p className="muted">BMVC and NeurIPS workshop papers on knowledge distillation and ML tooling.</p>
            <ArrowUpRight className="card-arrow" size={18} />
          </Link>
        </Reveal>
        <Reveal className="card bento-item" delay={0.12}>
          <div className="card-icon"><Mountain size={18} /></div>
          <span className="eyebrow">Off the clock</span>
          <p className="muted">{profile.offTheClock}</p>
        </Reveal>
        <Reveal className="card bento-item bento-wide marquee-card" delay={0.18}>
          <span className="eyebrow">Toolbox</span>
          <div className="toolbox">
            {Object.entries(skills).map(([group, items], row) => {
              // Repeat short lists so each track is wide enough to loop seamlessly.
              const base = Array.from({ length: Math.ceil(8 / items.length) }, () => items).flat()
              return (
                <div key={group} className="toolbox-row">
                  <span className="toolbox-label mono">{group}</span>
                  <div className="marquee" aria-label={`${group}: ${items.join(', ')}`}>
                    <div
                      className={`marquee-track ${row % 2 ? 'reverse' : ''}`}
                      style={{ animationDuration: `${28 + row * 6}s` }}
                      aria-hidden="true"
                    >
                      {[...base, ...base].map((s, i) => (
                        <span key={i} className="tag">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </section>
    </Page>
  )
}
