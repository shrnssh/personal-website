import { Link } from 'react-router-dom'
import { Page } from '../components/Page'

export default function NotFound() {
  return (
    <Page title="Not found">
      <section className="notfound">
        <span className="mono gradient-text big">404</span>
        <h1>This page wandered off.</h1>
        <p className="lede">Try the menu, or press <kbd>⌘</kbd> <kbd>K</kbd>.</p>
        <Link to="/" className="btn btn-primary">Back home</Link>
      </section>
    </Page>
  )
}
