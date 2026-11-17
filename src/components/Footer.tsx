import { profile } from '../data/content'
import { GitHubIcon, LinkedInIcon, XIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div className="socials">
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
          <a href={profile.socials.x} target="_blank" rel="noreferrer" aria-label="X"><XIcon /></a>
        </div>
      </div>
    </footer>
  )
}
