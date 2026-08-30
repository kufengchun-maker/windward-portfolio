import { useState } from 'react'
import './AccordionGallery.css'

export default function AccordionGallery({ items = [], defaultIndex = 0, className = '' }) {
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), Math.max(items.length - 1, 0)))
  const isPersonalArchive = items.some((item) => item.image?.includes('/personal-'))
  return <><div className={`accordion-gallery ${className}`} role="list" aria-label="Virtual identities cases">
    {items.map((item, index) => {
      const expanded = active === index
      const open = (event) => {
        if (!expanded) { event.preventDefault(); setActive(index) }
      }
      return <a className={expanded ? 'ag-panel ag-panel--active' : 'ag-panel'} href={item.link} key={item.label} role="listitem" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={open}>
        <img src={item.image} alt={item.alt || item.label} />
        <span className="ag-panel__shade" />
        <span className="ag-panel__caption"><i /> <b>{item.no}</b><strong>{item.label}</strong><em>{item.meta}</em></span>
      </a>
    })}
  </div>{isPersonalArchive && <p className="ag-archive-data">PERSONAL ARCHIVE · 五件新增个人创作累计获得 242 LIKES / 94 COMMENTS / 4 SAVES</p>}</>
}
