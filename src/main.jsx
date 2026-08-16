import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const projects = [
  { id:'nineteen', no: '01', title: 'NINETEEN, ALONE IN JAPAN', type: 'Independent travel film', className: 'project--black', note: '九天盛夏的独自旅行记录：以年轻女性视角观察城市、文化、独处与成长。', role: '独立策划 / 拍摄 / 剪辑', evidence: 'Bilibili · 1,000+ 播放 / 126 点赞', url: 'https://b23.tv/uQBbzMR', time:'[补充项目时间]', learned:'在独自旅行与有限素材中，练习将城市、独处和自我成长组织为具有节奏的影像叙事。', outcome:'独立完成旅行记录、素材组织、叙事结构与后期制作；获得 1,000+ 播放与 126 个点赞。' },
  { id:'feminism', no: '02', title: 'FEMINISM IN TRANSLATION', type: 'Course video / Team leader', className: 'project--paper', note: '讨论语言与翻译如何影响女性形象、身份与话语表达的十分钟影像项目。', role: '主题方向 / 任务分配 / 内容整合 / 最终呈现', evidence: '团队课程项目 · [补充项目时间]', url: 'https://b23.tv/89G5F4R', time:'[补充项目时间]', learned:'在合作中学习如何围绕文化议题建立共同语言，并通过项目管理推进分工与最终呈现。', outcome:'完成约 10 分钟课程视频；项目职责和材料待补充。' },
  { id:'gbaa', no: '03', title: 'GREATER BAY AREA CULTURAL VIDEO', type: 'Team project / Second prize', className: 'project--green', note: '从文化调研到内容呈现的协作影像；作品获校内二等奖。', role: '小组领导 / 协作统筹', evidence: '校内二等奖 · [上传获奖证明]', time:'[补充项目时间]', learned:'学习从文化调研到内容呈现统筹团队协作，并让调研结论落实在影像表达中。', outcome:'作品获校内二等奖；请补充获奖证明与本人具体分工。' },
  { id:'virtual', no: '04', title: 'VIRTUAL IDENTITIES', type: 'Virtual photography / 2024—2026', className: 'project--black', note: '面向角色、服装与世界观的付费游戏摄影委托，探索数字身份与幻想叙事。', role: '构图 / 场景 / 光线 / 后期', evidence: '游戏社区 400+ 点赞 · [上传客户好评截图]', time:'2024—2026', learned:'练习根据客户角色、服装、世界观与情绪需求，建立角色肖像与杂志式构图语言。', outcome:'完成多个付费委托；其中一组作品获游戏社区 400+ 点赞。' },
  { id:'shokz', no: '05', title: 'SHOKZ IN JAPAN', type: 'Cross-cultural marketing research', className: 'project--paper', note: '研究韶音进入日本市场时的文化适配、线下渠道与品牌认知，并提出本土化传播方案。', role: '跨文化研究 / 策略表达', evidence: '[补充本人具体分工]', time:'[补充项目时间]', learned:'将跨文化观察、消费者洞察与传播策略连接到具体市场情境。', outcome:'形成有关本土化营销、O2O 渠道与情感化品牌传播的方案。' },
  { id:'sony', no: '06', title: 'SONY / PERSONAL SOUND BUBBLE', type: 'Product visual presentation', className: 'project--green', note: '围绕 Sony WF-1000XM4 的场景、功能、竞争优势与目标用户建立产品叙事。', role: '产品研究 / 视觉演示', evidence: '[上传演示文稿]', time:'[补充项目时间]', learned:'练习将产品功能、使用场景和目标用户转译为有说服力的视觉展示。', outcome:'完成 Sony WF-1000XM4 产品视觉演示；请上传演示文稿。' },
]

const strengths = [
  ['01', 'VISUAL STORYTELLING', '通过摄影、视频、剪辑、版式与叙事，将人物、文化和身份观察转化为视觉成果。'],
  ['02', 'CROSS-CULTURAL OBSERVATION', '以应用英语学习背景为基础，关注语言与文化语境如何塑造沟通与传播。'],
  ['03', 'PROJECT LEADERSHIP', '在影像项目中完成从概念、组织、协作到最终交付的推进。'],
]

const photoAreas = [
  { id:'virtual-photography', title:'VIRTUAL PHOTOGRAPHY', text:'暗黑时装、幻想叙事、东方美学、超现实色彩与角色肖像。', status:'2024—2026 / 付费委托' },
  { id:'portrait-cosplay', title:'PORTRAIT / COSPLAY', text:'Coser 摄影委托与人物拍摄实践。', status:'[上传作品与成片]' },
  { id:'travel-landscape', title:'TRAVEL & LANDSCAPE', text:'风光、城市、旅行和日常观察：寻找人与空间的关系。', status:'[上传摄影作品]' },
]

const proofItems = [
  ['01', 'BILIBILI DATA', '《19岁女生一个人去日本的九天盛夏》', '1,000+ 播放 / 126 点赞', '[上传带日期的平台数据截图]'],
  ['02', 'COMMUNITY RESPONSE', '游戏摄影系列', '400+ 点赞', '[上传平台截图]'],
  ['03', 'AWARD', '大湾区文化主题视频', '校内二等奖', '[上传获奖证明]'],
  ['04', 'CLIENT PROOF', '游戏摄影付费委托', '真实好评与返图', '[上传客户好评截图 / 返图]'],
]

const virtualImages = []
const virtualCollections = [
  { id:'01', title:'I. VEILED FIGURES', note:'遮蔽、凝视与被观看的虚拟肖像。', files: [] },
  { id:'02', title:'II. FASHION FICTION', note:'角色、服装与杂志式时装叙事。', files: [] },
  { id:'03', title:'III. OTHER WORLDS', note:'幻想世界、场景与数字环境的探索。', files: [] },
  { id:'04', title:'IV. LIGHT STUDIES', note:'光线、色彩与人物情绪的实验。', files: [] },
]

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }
function ScatterText({ text, className = '' }) { return <span className={className}>{Array.from(text).map((letter, index) => <span className="scatter-letter" style={{ '--scatter-x': `${26 + index * 10}px`, '--scatter-y': `${(index % 3 - 1) * 12}px`, '--scatter-r': `${index % 2 ? 8 : -7}deg` }} key={`${letter}-${index}`}>{letter === ' ' ? '\u00A0' : letter}</span>)}</span> }
function SiteCursor({ cursor, overHero, active }) { return <div className={`${active ? 'is-active ' : ''}${overHero ? 'is-hero ' : ''}site-cursor`} style={{ left: cursor.x, top: cursor.y }} aria-hidden="true"><i /><i /><span /><span /><span /></div> }

function PageBack() { return <a className="page-back" href="#about">← BACK TO PORTFOLIO</a> }

function ProfilePage() { return <main className="detail-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className="detail-hero"><p>( WHO I AM )</p><h1>JIAN<br /><em>ZHUOFAN.</em></h1><span>VISUAL STORYTELLER / CROSS-CULTURAL OBSERVER / PROJECT LEADER</span></section><section className="detail-grid"><div><b>BACKGROUND</b><p>广东工商职业技术大学 · 应用英语专业本科生<br />预计 2027 年毕业</p></div><div><b>MY PRACTICE</b><p>我是一名游走于影像创作、视觉设计、跨文化传播与商业思考之间的青年创作者。我关注人物、虚拟身份、女性经验和异文化生活；先观察人与环境之间的关系，再将它们转化为可被看见、理解和传播的视觉作品。</p></div><div><b>WHAT I WANT TO DO</b><p>我希望继续探索艺术与商业之间的可能性：让视觉不止表达自我，也能够创造交流、影响与价值。申请方向包括艺术、创意媒体、传播、文化管理及艺术与商业交叉专业。</p></div></section></main> }
function ContactPage() { return <main className="detail-page contact-page"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#top">← BACK TO HOME</a></header><section className="contact-page__main"><p>( CONTACT )</p><h1>LET'S<br /><em>TALK.</em></h1><div><a href="mailto:kufengchun@gmail.com">kufengchun@gmail.com</a><a href="https://www.instagram.com/kufengchun8/" target="_blank" rel="noreferrer">INSTAGRAM / kufengchun8 <Arrow /></a><a href="https://www.facebook.com/kufengchun1" target="_blank" rel="noreferrer">FACEBOOK / kufengchun1 <Arrow /></a><a href="https://x.com/kufengchun1" target="_blank" rel="noreferrer">X / kufengchun1 <Arrow /></a></div></section></main> }

function CasePage({ project }) { const material = project.id === 'shokz' ? <section className="case-material"><img src="/assets/shokz/media/image2.png" alt="韶音产品视觉素材"/><div><b>SHOKZ / JAPAN MARKET RESEARCH</b><p>小组课程作业：围绕日本市场的文化适配、线下渠道、品牌认知与本土化传播进行研究。</p><a href="/assets/shokz/shokz-research.pptx">DOWNLOAD ORIGINAL PPTX <Arrow /></a></div></section> : project.id === 'sony' ? <section className="case-material case-material--sony"><div><b>SONY WF-1000XM4 / PERSONAL SOUND BUBBLE</b><p>产品视觉演示：从通勤、工作与旅行场景切入，建立“个人声音泡泡”的产品叙事。</p><a href="/assets/sony/sony-presentation.pdf" target="_blank" rel="noreferrer">OPEN ORIGINAL PRESENTATION PDF <Arrow /></a></div><object data="/assets/sony/sony-presentation.pdf#page=1&view=FitH" type="application/pdf" aria-label="Sony 演示文稿 PDF 预览" /></section> : null; return <main className="detail-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className={`case-cover ${project.className}`}><span>{project.no}</span><h1>{project.title}</h1><p>{project.type}</p></section><section className="case-video">{project.url ? <a href={project.url} target="_blank" rel="noreferrer">WATCH / OPEN ORIGINAL VIDEO <Arrow /></a> : <div>PROJECT MATERIAL<br /><small>[ 上传视频、演示稿或项目封面 ]</small></div>}</section>{material}<section className="case-detail"><div><b>PROJECT OVERVIEW</b><p>{project.note}</p></div><div><b>WHEN / CONTEXT</b><p>{project.time}</p></div><div><b>WHAT I DID</b><p>{project.role}</p></div><div><b>WHAT I LEARNED</b><p>{project.learned}</p></div><div><b>OUTCOME / EVIDENCE</b><p>{project.outcome}<br /><br />{project.evidence}</p></div></section></main> }

function ArtworkPage({ file, collection }) { return <main className="detail-page artwork-page"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#gallery/virtual-photography">← BACK TO ARCHIVE</a></header><section className="artwork-stage"><img src={`/assets/virtual/${file}`} alt="Virtual Photography 展览作品"/></section><section className="artwork-text"><p>{collection?.title || 'VIRTUAL PHOTOGRAPHY'}</p><h1>[ WORK TITLE ]</h1><div><b>WORK INTRODUCTION</b><p>[ 在此补充作品简介：角色、造型、场景与创作时间。]</p></div><div><b>SPIRIT / READING</b><p>[ 在此补充精神分析：这件作品所讨论的身份、凝视、情绪或叙事。]</p></div></section></main> }

function SeriesPage({ collection }) { return <main className="detail-page artwork-page"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#gallery/virtual-photography">← BACK TO VIRTUAL PHOTOGRAPHY</a></header><section className="gallery-head"><p>( VIRTUAL PHOTOGRAPHY / SERIES {collection.id} )</p><h1>{collection.title}</h1><span>{collection.note}</span></section><section className="series-works">{collection.files.length ? collection.files.map((file) => <img key={file} loading="lazy" src={`/assets/virtual/${file}`} alt={`${collection.title} 组图`} />) : <><div>[ 上传本系列组图 01 ]</div><div>[ 上传本系列组图 02 ]</div><div>[ 上传本系列组图 03 ]</div></>}</section><section className="artwork-text"><p>SERIES {collection.id}</p><h1>[ SERIES INTRODUCTION ]</h1><div><b>ABOUT THE SERIES</b><p>[ 在此补充这一组作品的创作背景、角色、场景与时间。]</p></div><div><b>SPIRIT / READING</b><p>[ 在此补充系列的精神分析、叙事线索与想讨论的问题。]</p></div></section></main> }

function GalleryPage({ area }) { const isVirtual = area.id === 'virtual-photography'; return <main className="detail-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className="gallery-head"><p>( PHOTOGRAPHY ARCHIVE )</p><h1>{area.title}</h1><span>{area.text}</span></section>{isVirtual ? <section className="series-directory">{virtualCollections.map((collection) => <a href={`#series/${collection.id}`} key={collection.id}><span>{collection.id}</span><h2>{collection.title}</h2><p>{collection.note}</p><b>ENTER SERIES ↗</b></a>)}</section> : <section className="gallery-grid">{Array.from({ length: 8 }, (_, index) => <figure key={index}><div><span>{String(index + 1).padStart(2, '0')}</span><b>[ UPLOAD IMAGE ]</b></div><figcaption>{index === 0 ? area.status : '[ 添加作品标题 / 时间 / 简介 ]'}</figcaption></figure>)}</section>}</main> }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [heroProgress, setHeroProgress] = useState(0)
  const [aboutRevealed, setAboutRevealed] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [overHero, setOverHero] = useState(false)
  const [overImage, setOverImage] = useState(false)
  const [isRushing, setIsRushing] = useState(false)
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => { setLoaded(true) }, [])
  useEffect(() => {
    const updateHero = () => setHeroProgress(Math.min(window.scrollY / window.innerHeight, 1))
    updateHero(); window.addEventListener('scroll', updateHero, { passive: true })
    return () => window.removeEventListener('scroll', updateHero)
  }, [])
  useEffect(() => { const move = (event) => { setCursor({ x: event.clientX, y: event.clientY }); const target = document.elementFromPoint(event.clientX, event.clientY); setOverImage(Boolean(target?.closest('.portrait,.project__art,.photo-area,.lab-collage,.case-material,.gallery-grid figure,.series-works img,.artwork-stage img'))) }; window.addEventListener('pointermove', move); return () => window.removeEventListener('pointermove', move) }, [])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: .12 })
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const about = document.querySelector('#about')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAboutRevealed(true); observer.disconnect() }
    }, { threshold: .16 })
    if (about) observer.observe(about)
    return () => observer.disconnect()
  }, [])
  useEffect(() => { const changeRoute = () => setRoute(window.location.hash); window.addEventListener('hashchange', changeRoute); return () => window.removeEventListener('hashchange', changeRoute) }, [])

  const moveGraphic = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - .5) * 250
    const y = ((event.clientY - rect.top) / rect.height - .5) * 190
    event.currentTarget.style.setProperty('--pointer-x', `${x}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${y}px`)
    event.currentTarget.style.setProperty('--pointer-rotate', `${x / 6}deg`)
  }
  const dropGraphic = (event) => {
    const target = event.currentTarget
    target.style.setProperty('--pointer-y', '86px')
    target.style.setProperty('--pointer-x', '0px')
    target.style.setProperty('--pointer-rotate', '0deg')
    window.setTimeout(() => target.style.setProperty('--pointer-y', '0px'), 520)
  }
  const movePortrait = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--portrait-x', `${((event.clientX - rect.left) / rect.width - .5) * 150}px`)
    event.currentTarget.style.setProperty('--portrait-y', `${((event.clientY - rect.top) / rect.height - .5) * 120}px`)
  }
  const dropPortrait = (event) => {
    const target = event.currentTarget
    target.style.setProperty('--portrait-x', '0px')
    target.style.setProperty('--portrait-y', '62px')
    window.setTimeout(() => target.style.setProperty('--portrait-y', '0px'), 520)
  }

  const caseId = route.replace('#case/', '')
  const activeProject = projects.find((project) => project.id === caseId)
  const galleryId = route.replace('#gallery/', '')
  const activeGallery = photoAreas.find((area) => area.id === galleryId)
  const artFile = route.startsWith('#art/') ? decodeURIComponent(route.replace('#art/', '')) : ''
  const activeArtwork = virtualImages.includes(artFile) ? artFile : null
  const artworkCollection = virtualCollections.find((collection) => collection.files.includes(artFile))
  const seriesId = route.replace('#series/', '')
  const activeSeries = virtualCollections.find((collection) => collection.id === seriesId)
  if (route === '#about-profile') return <><ProfilePage /><SiteCursor cursor={cursor} overHero={false} active={overImage} /></>
  if (route === '#contact-page') return <><ContactPage /><SiteCursor cursor={cursor} overHero={false} active={overImage} /></>
  if (activeProject) return <><CasePage project={activeProject} /><SiteCursor cursor={cursor} overHero={false} active={overImage} /></>
  if (activeGallery) return <><GalleryPage area={activeGallery} /><SiteCursor cursor={cursor} overHero={false} active={overImage} /></>
  if (activeSeries) return <><SeriesPage collection={activeSeries} /><SiteCursor cursor={cursor} overHero={false} active={overImage} /></>
  if (activeArtwork) return <><ArtworkPage file={activeArtwork} collection={artworkCollection} /><SiteCursor cursor={cursor} overHero={false} active={overImage} /></>

  return <main className={loaded ? 'site is-ready' : 'site'} style={{ '--hero-progress': heroProgress, '--acid-opacity': .17 * (1 - heroProgress), '--hero-fade': 1 - heroProgress }}>
    <section className={isRushing ? 'hero hero--mountain is-rushing' : 'hero hero--mountain'} id="top" onPointerEnter={() => setOverHero(true)} onPointerLeave={() => { setOverHero(false); setIsRushing(false) }} onPointerDown={() => setIsRushing(true)} onPointerUp={() => setIsRushing(false)} onPointerCancel={() => setIsRushing(false)}>
      <div className="mountain-scene" aria-hidden="true">
        <svg className="wind wind--far" viewBox="0 0 1600 500" preserveAspectRatio="none"><path d="M-110 92C230 46 600 119 900 64c300-55 500 18 730-18"/><path d="M-90 157c310-46 610 18 910-28 250-38 500 17 810-11"/><path d="M-50 213c230-38 530 18 830-28 250-38 500 17 850-11"/></svg>
        <svg className="mountain mountain--back" viewBox="0 0 3200 920" preserveAspectRatio="none"><path d="M0 920V450c80-78 160-219 260-313C340 74 400 168 480 231c70-63 150-173 250-220 80-47 130 63 210 126 70-63 130-126 200-94 70 31 130-16 200 15 60 31 120 78 180 47 30-16 50 31 60 63v652Z"/><path transform="translate(1600 0)" d="M0 920V450c80-78 160-219 260-313C340 74 400 168 480 231c70-63 150-173 250-220 80-47 130 63 210 126 70-63 130-126 200-94 70 31 130-16 200 15 60 31 120 78 180 47 30-16 50 31 60 63v652Z"/></svg>
        <svg className="mountain mountain--front" viewBox="0 0 3200 920" preserveAspectRatio="none">
          <path d="m-150 946 21-417C-25 458 103 293 237 205c104-71 168 46 265 108 105-90 221-198 332-231 102-33 157 65 234 126 83-53 166-106 244-64 58 41 116 82 157 65l-41 816Z"/>
          <path transform="translate(1600 0)" d="m-150 946 21-417C-25 458 103 293 237 205c104-71 168 46 265 108 105-90 221-198 332-231 102-33 157 65 234 126 83-53 166-106 244-64 58 41 116 82 157 65l-41 816Z"/>
        </svg>
        <div className="hero__vignette" />
      </div>
      <nav className="nav page-width">
        <a className="brand" href="#top">J.Z</a>
        <div className={menuOpen ? 'nav__links is-open' : 'nav__links'}>
          <a href="#about">ABOUT</a><a href="#work">SELECTED WORK</a><a href="#photo">PHOTOGRAPHY</a><a href="#contact">CONTACT</a>
        </div>
        <button className="nav__toggle" aria-label="打开菜单" onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        <a className="nav__contact" href="#contact-page">LET'S TALK</a>
      </nav>
      <div className="hero__body page-width">
        <p className="hero__eyebrow">JIAN ZHUOFAN / VISUAL STORYTELLER / CHINA</p>
        <div className="hero__title"><h1 className="hero__title-main"><ScatterText text="WINDWARD" /></h1><p className="hero__title-sub"><ScatterText text="floating. still. drifting" /></p></div>
        <div className="hero__bottom">
          <p><ScatterText text="Floating Wind" /></p>
          <a href="#work" className="circle-link">SCROLL<br />TO SEE <span>↓</span></a>
        </div>
      </div>
    </section>

    <section className={aboutRevealed ? 'about page-width is-revealed' : 'about page-width'} id="about">
      <div className="section-tag"><span>( 01 )</span><span>ABOUT / PROFILE</span></div>
      <div className="about__grid">
        <a className="portrait" href="#about-profile" aria-label="查看简卓凡个人简介" onPointerMove={movePortrait} onPointerLeave={dropPortrait}><div className="portrait__shape" /><p>JIAN<br />ZHUOFAN</p><span className="portrait__ring">✳</span><small>WHO I AM ↗</small></a>
        <div className="about__content">
          <p className="about__kicker">EMERGING VISUAL STORYTELLER / 2027 GRADUATE</p>
          <h2>影像、文化与<br /><strong>观看方式。</strong></h2>
          <p className="about__text">我习惯先观察人与环境之间的关系，再通过摄影、视频、剪辑、版式和叙事，将这些观察转化为可被看见、理解和传播的视觉作品。我关注的不只是画面是否好看，也关心一件作品如何被理解，并与真实的人产生联系。</p>
          <div className="about__contacts"><a href="mailto:kufengchun@gmail.com">KUFENGCHUN@GMAIL.COM <Arrow /></a><a href="#work">VIEW SELECTED WORK <Arrow /></a></div>
        </div>
      </div>
      <div className="facts"><div><b>2027</b><span>EXPECTED<br />GRADUATION</span></div><div><b>06</b><span>SELECTED<br />CASE STUDIES</span></div><div><b>1K+</b><span>FILM<br />PLAYS</span></div><div><b>400+</b><span>COMMUNITY<br />LIKES</span></div></div>
    </section>

    <section className="works page-width reveal-on-scroll" id="work">
      <div className="section-tag"><span>( 02 )</span><span>SELECTED WORK / 2024—2026</span></div>
      <div className="works__head"><h2>STORIES<br />WITH <em>CONTEXT.</em></h2><p>影像、文化、数字身份与商业表达。<br />每个项目明确标注我的角色与证据。</p></div>
      <div className="project-list">{projects.map((item) => <article className={`project ${item.className} project--${item.id}`} key={item.no}><a className="project__art" href={`#case/${item.id}`} aria-label={`查看 ${item.title} 案例详情`} onPointerMove={moveGraphic} onPointerLeave={dropGraphic}><span className="project__no">{item.no}</span><span className="project__graphic" /><span className="project__word">{item.title}</span><small>OPEN CASE STUDY ↗</small></a><div className="project__meta project__meta--expanded"><div><h3>{item.title}</h3><p>{item.type}</p></div><p>{item.note}</p><p><b>MY ROLE</b><br />{item.role}<br /><br />{item.evidence}</p><a href={`#case/${item.id}`} aria-label={`查看 ${item.title} 案例详情`}><Arrow /></a></div></article>)}</div>
      <a href="#photo" className="all-work">CONTINUE TO PHOTOGRAPHY <Arrow /></a>
    </section>

    <section className="photo-page page-width reveal-on-scroll" id="photo">
      <div className="section-tag"><span>( 03 )</span><span>PHOTOGRAPHY</span></div>
      <div className="works__head"><h2>IMAGE<br /><em>MAKER.</em></h2><p>不是普通游戏截图，而是关于虚拟身份、<br />人物与观看方式的数字影像实验。</p></div>
      <div className="photo-grid">{photoAreas.map((area, index) => <a href={`#gallery/${area.id}`} className={`photo-area photo-area--${index + 1}`} key={area.title}><span>{`0${index + 1}`}</span><div><h3>{area.title}</h3><p>{area.text}</p><small>{area.status}</small></div><strong>OPEN ARCHIVE ↗</strong></a>)}</div>
    </section>

    <section className="proof-page page-width reveal-on-scroll" id="proof">
      <div className="section-tag"><span>( 04 )</span><span>PROCESS &amp; PROOF</span></div>
      <div className="strengths__top"><h2>THE WORK<br /><em>BEHIND IT.</em></h2><p>课程项目、独立制作与付费委托<br />被清晰区分；数据保留来源和待补材料。</p></div>
      <div className="proof-list">{proofItems.map(([no, label, project, result, placeholder]) => <article key={no}><span>{no}</span><p>{label}</p><h3>{project}</h3><strong>{result}</strong><small>{placeholder}</small></article>)}</div>
    </section>

    <section className="lab-page page-width reveal-on-scroll" id="lab">
      <div className="section-tag"><span>( 05 )</span><span>VISUAL LAB</span></div>
      <div className="lab__content"><h2>SKETCHES,<br /><em>NOT FINISHED.</em></h2><div><p>绘画、版式设计、手工作品、混剪练习与日常视觉实验。这些作品不与正式案例混排，而作为持续观察和过程痕迹的档案。</p><p className="placeholder">[ 上传绘画 / 版式 / 手作 / 练习过程 ]</p></div></div>
      <div className="lab-collage"><i /><i /><i /><i /><b>PROCESS<br />OVER<br />POLISH</b></div>
    </section>

    <section className="strengths page-width reveal-on-scroll">
      <div className="section-tag"><span>( 06 )</span><span>WHAT I BRING</span></div>
      <div className="strengths__top"><h2>CREATIVE<br /><em>THINKING.</em></h2><p>将创作表达、受众意识与策略思考<br />连接成完整的工作方式。</p></div>
      <div className="strength-grid">{strengths.map(([n,t,d]) => <article className="strength" key={n}><div><span>{n}</span><Arrow /></div><h3>{t}</h3><p>{d}</p></article>)}</div>
      <div className="skills-line">PHOTOGRAPHY · VIDEO EDITING · VISUAL STORYTELLING · ART DIRECTION · LAYOUT DESIGN · CROSS-CULTURAL RESEARCH · PRESENTATION DESIGN · TEAM LEADERSHIP · CREATIVE STRATEGY · ENGLISH–CHINESE COMMUNICATION</div>
    </section>

    <footer className="footer reveal-on-scroll" id="contact">
      <div className="footer__orb" aria-hidden="true" />
      <div className="page-width footer__inner"><div className="section-tag"><span>( 07 )</span><span>CONTACT</span></div><div className="footer__main"><p>LET’S MAKE SOMETHING THAT<br />DESERVES TO BE SEEN.</p><a href="mailto:kufengchun@gmail.com">EMAIL<span>:</span><br />KUFENGCHUN@<br />GMAIL.COM <Arrow /></a></div><div className="footer__end"><span>© 2026 JIAN ZHUOFAN / ALL RIGHTS RESERVED</span><span>GUANGDONG — HONG KONG</span><a href="#top">BACK TO TOP ↑</a></div></div>
    </footer>
    <SiteCursor cursor={cursor} overHero={overHero} active={overHero || overImage} />
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
