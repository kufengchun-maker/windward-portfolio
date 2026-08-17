import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ScrollExpand from './components/ScrollExpand'
import AccordionGallery from './components/AccordionGallery'
import Ferrofluid from './components/Ferrofluid'
import './style.css'

const EROSION_FLUID_COLORS = ['#ffffff', '#ffffff', '#ffffff']

const projects = [
  { id:'nineteen', no: '01', title: 'NINETEEN, ALONE IN JAPAN', type: 'Independent travel film', className: 'project--black', note: '九天盛夏的独自旅行记录：以年轻女性视角观察城市、文化、独处与成长。', role: '独立策划 / 拍摄 / 剪辑', evidence: 'Bilibili · 1,000+ 播放 / 126 点赞', url: 'https://b23.tv/uQBbzMR', time:'2024.08.30', learned:'在独自旅行与有限素材中，练习将城市、独处和自我成长组织为具有节奏的影像叙事。', outcome:'独立完成旅行记录、素材组织、叙事结构与后期制作；获得 1,000+ 播放与 126 个点赞。' },
  { id:'feminism', no: '02', title: 'FEMINISM IN TRANSLATION', type: 'Course video / Team leader', className: 'project--paper', note: '讨论语言与翻译如何影响女性形象、身份与话语表达的十分钟影像项目。', role: '主题方向 / 任务分配 / 内容整合 / 最终呈现', evidence: '课程影像项目 · 2026.04.21 发布', url: 'https://b23.tv/89G5F4R', time:'2026.04.21', learned:'在合作中学习如何围绕文化议题建立共同语言，并通过项目管理推进分工与最终呈现。', outcome:'完成约 10 分钟课程视频，讨论语言与翻译如何影响女性形象、身份与话语表达。' },
  { id:'gbaa', no: '03', title: 'GREATER BAY AREA CULTURAL VIDEO', type: 'Team project / Third prize', className: 'project--green', note: '从文化调研到内容呈现的协作影像；作品获校内三等奖。', role: '小组组织与领导 / 分工统筹 / 影像剪辑', evidence: '校内三等奖 · 获奖名单见案例页', time:'2025.06', learned:'学习将文化调研、团队协作与内容呈现连成同一条工作链，并让研究素材真正服务于影像叙事。', outcome:'负责组织、领导和分工，指导两位组员收集文献文本、剪辑所需的图片与视频，并完成最终剪辑；作品获校内三等奖。' },
  { id:'virtual', no: '04', title: 'VIRTUAL IDENTITIES', type: 'Virtual photography / 2024—2026', className: 'project--black', note: '面向角色、服装与世界观的付费游戏摄影委托，探索数字身份与幻想叙事。', role: '构图 / 场景 / 光线 / 后期', evidence: '第二个案例《少女暴君》· 2026.01.17 · 55 喜欢 / 18 评论 / 0 收藏', time:'2024—2026', learned:'练习根据客户角色、服装、世界观与情绪需求，建立角色肖像与杂志式构图语言。', outcome:'完成多个付费委托；首个案例《花》获得 212 喜欢、17 条评论与 6 次收藏；第二个案例《少女暴君》获得 55 喜欢与 18 条评论。' },
  { id:'shokz', no: '05', title: 'SHOKZ IN JAPAN', type: 'Cross-cultural marketing research', className: 'project--paper', note: '研究韶音进入日本市场时的文化适配、线下渠道与品牌认知，并提出本土化传播方案。', role: '跨文化研究 / 策略表达', evidence: '[补充本人具体分工]', time:'[补充项目时间]', learned:'将跨文化观察、消费者洞察与传播策略连接到具体市场情境。', outcome:'形成有关本土化营销、O2O 渠道与情感化品牌传播的方案。' },
  { id:'sony', no: '06', title: 'SONY / PERSONAL SOUND BUBBLE', type: 'Product visual presentation', className: 'project--green', note: '围绕 Sony WF-1000XM4 的场景、功能、竞争优势与目标用户建立产品叙事。', role: '产品研究 / 视觉演示', evidence: '[上传演示文稿]', time:'[补充项目时间]', learned:'练习将产品功能、使用场景和目标用户转译为有说服力的视觉展示。', outcome:'完成 Sony WF-1000XM4 产品视觉演示；请上传演示文稿。' },
  { id:'fellowship', no: '07', title: 'ROOTED FUTURES', type: 'Research fellowship / Cross-cultural education', className: 'project--fellowship', note: '将乡村振兴、人工智能时代的传播变革与跨国公益教育，收束为一组持续发生的社会观察与协作实践。', role: '项目参与 / 研究写作 / 课程制作 / 线上教学', evidence: '优秀营员 · 项目证书 · NGO Certificate · 课程论文（未发表）', time:'2025—2026', learned:'在社会议题、研究方法和实际协作之间建立连接，让抽象的文化与传播问题落实为可交付的内容。', outcome:'完成多个研究与教育协作项目，并保留证书、课程材料与论文作为过程证据。' },
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
  ['03', 'AWARD', '大湾区文化主题视频', '校内三等奖', '获奖名单已收录于案例页'],
  ['04', 'CLIENT PROOF', '游戏摄影付费委托', '真实好评与返图', '[上传客户好评截图 / 返图]'],
]

const virtualImages = []
const virtualCollections = [
  { id:'01', title:'花 / FLOWERS', note:'一组以红色花朵、蝴蝶与占卜意象构成的虚拟肖像。2025.11.13', files: ['flower-01.jpg', 'flower-02.jpg', 'flower-03.jpg', 'flower-04.jpg'] },
  { id:'02', title:'少女暴君 / THE GIRL TYRANT', note:'一组关于甜美、权力与虚拟角色姿态的时装肖像。2026.01.17', files: ['tyrant-01.jpg', 'tyrant-02.jpg', 'tyrant-03.jpg', 'tyrant-04.jpg'] },
  { id:'03', title:'毒 / POISON', note:'网、刺、荧光绿与柔软皮肤：一组关于吸引、束缚和危险欲望的虚拟肖像。', files: ['poison-01.jpg', 'poison-02.jpg', 'poison-03.jpg', 'poison-04.jpg', 'poison-05.jpg'] },
  { id:'04', title:'IV. [ ARCHIVE IN PROGRESS ]', note:'预留给下一组虚拟摄影作品。', files: [] },
  { id:'05', title:'蚀 / EROSION', note:'关于人、消融与被侵蚀：无路可退时，被迫或主动加入这场灾难。银色遍布世界的每个地方——你也要加入吗？', files: ['erosion-01.jpg'] },
]

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }
function ScatterText({ text, className = '' }) { return <span className={className}>{Array.from(text).map((letter, index) => <span className="scatter-letter" style={{ '--scatter-x': `${26 + index * 10}px`, '--scatter-y': `${(index % 3 - 1) * 12}px`, '--scatter-r': `${index % 2 ? 8 : -7}deg` }} key={`${letter}-${index}`}>{letter === ' ' ? '\u00A0' : letter}</span>)}</span> }
function BouncyText({ text }) { return <>{Array.from(text).map((letter, index) => <span className="about__letter" key={`${letter}-${index}`}>{letter}</span>)}</> }
function SiteCursor({ cursor, overHero, active }) { return <div className={`${active ? 'is-active ' : ''}${overHero ? 'is-hero ' : ''}site-cursor`} style={{ left: cursor.x, top: cursor.y }} aria-hidden="true"><i /><i /><span /><span /><span /></div> }

function PageBack() { return <a className="page-back" href="#about">← BACK TO PORTFOLIO</a> }

function ProfilePage() { return <main className="detail-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className="detail-hero"><p>( WHO I AM )</p><h1>JIAN<br /><em>ZHUOFAN.</em></h1><span>VISUAL STORYTELLER / CROSS-CULTURAL OBSERVER / PROJECT LEADER</span></section><section className="detail-grid"><div><b>BACKGROUND</b><p>广东工商职业技术大学 · 应用英语专业本科生<br />预计 2027 年毕业</p></div><div><b>MY PRACTICE</b><p>我是一名游走于影像创作、视觉设计、跨文化传播与商业思考之间的青年创作者。我关注人物、虚拟身份、女性经验和异文化生活；先观察人与环境之间的关系，再将它们转化为可被看见、理解和传播的视觉作品。</p></div><div><b>WHAT I WANT TO DO</b><p>我希望继续探索艺术与商业之间的可能性：让视觉不止表达自我，也能够创造交流、影响与价值。申请方向包括艺术、创意媒体、传播、文化管理及艺术与商业交叉专业。</p></div></section></main> }
function ContactPage() { return <main className="detail-page contact-page"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#top">← BACK TO HOME</a></header><section className="contact-page__main"><p>( CONTACT )</p><h1>LET'S<br /><em>TALK.</em></h1><div><a href="mailto:kufengchun@gmail.com">kufengchun@gmail.com</a><a href="https://www.instagram.com/kufengchun8/" target="_blank" rel="noreferrer">INSTAGRAM / kufengchun8 <Arrow /></a><a href="https://www.facebook.com/kufengchun1" target="_blank" rel="noreferrer">FACEBOOK / kufengchun1 <Arrow /></a><a href="https://x.com/kufengchun1" target="_blank" rel="noreferrer">X / kufengchun1 <Arrow /></a></div></section></main> }
function SketchbookPage() { return <main className="detail-page sketchbook-page"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#lab">← BACK TO SKETCHES</a></header><section className="gallery-head"><p>( PERSONAL ARCHIVE )</p><h1>PROCESS<br />TRACES.</h1><span>绘画、版式、手作、混剪与日常视觉实验：不追求完成度，而保留思考发生的痕迹。</span></section><section className="sketchbook-grid"><div>01<br /><b>DRAWING NOTES</b></div><div>02<br /><b>LAYOUT STUDIES</b></div><div>03<br /><b>HANDMADE OBJECTS</b></div><div>04<br /><b>EDITING TESTS</b></div></section></main> }

const virtualIdentityCases = [
  { no:'01', label:'花 / FLOWERS', meta:'2025.11.13 · 212 LIKES / 17 COMMENTS', image:'/assets/virtual-identities/flower-data.jpg', link:'#series/01', alt:'花，网络发表数据' },
  { no:'02', label:'少女暴君 / THE GIRL TYRANT', meta:'2026.01.17 · 55 LIKES / 18 COMMENTS / 0 SAVES', image:'/assets/virtual-identities/tyrant-cover.jpg', link:'#series/02', alt:'少女暴君，网络发表图片与数据' },
]
function VirtualIdentitiesCase({ project }) { return <main className="detail-page virtual-identities-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className={`case-cover ${project.className}`}><span>{project.no}</span><h1>{project.title}</h1><p>{project.type}</p></section><section className="identity-intro"><p>( CLIENT PUBLICATIONS / DATA )</p><h2>IDENTITY IS<br /><em>ALWAYS IN MOTION.</em></h2><span>将客户公开发表的图像与反馈，整理为持续增长的虚拟身份档案。</span></section><AccordionGallery items={virtualIdentityCases} defaultIndex={0} /><section className="case-detail"><div><b>PROJECT OVERVIEW</b><p>{project.note}</p></div><div><b>WHAT I DID</b><p>{project.role}</p></div><div><b>OUTCOME / EVIDENCE</b><p>{project.outcome}<br /><br />{project.evidence}</p></div></section></main> }
function RootedFuturesCase({ project }) { const chapters = [['01','ART, DESIGN & RURAL REVITALISATION','参与“艺术设计与乡村振兴”相关项目，在地方文化、设计介入与社会更新的语境中学习研究与协作。','优秀营员 / 项目证书 / [待补充另一项证明]'],['02','COMMUNICATION IN THE AI ERA','参与“人工智能时代的传播变革”项目，并以论文形式完成结课作业；论文尚未发表，已进行知网查重。','研究写作 / 课程论文 / 知网查重'],['03','SRI LANKA NGO ONLINE TEACHING','参与斯里兰卡 NGO 线上支教，完成线上课程录制、PPT 制作与教学协作，并取得 NGO Certificate。','NGO Certificate / PPT 制作 / 网课录制']]; return <main className="detail-page rooted-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className="rooted-cover"><span>07 / RESEARCH · EDUCATION · FIELD</span><h1>ROOTED<br /><em>FUTURES.</em></h1><p>From rural imagination to AI-era communication, and across-border education.</p><i aria-hidden="true" /></section><section className="rooted-manifesto"><p>( A BIG CASE WITH SMALL MOVEMENTS )</p><h2>LEARNING IS NOT<br />A QUIET <em>THING.</em></h2><span>我把证书、论文、课程与协作经验视为仍在生长的过程档案，而不是静止的履历。</span></section><section className="rooted-chapters">{chapters.map(([no,title,text,proof]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p><b>{proof}</b><i aria-hidden="true" /></article>)}</section><section className="case-detail"><div><b>PROJECT OVERVIEW</b><p>{project.note}</p></div><div><b>WHAT I DID</b><p>{project.role}</p></div><div><b>WHAT I LEARNED</b><p>{project.learned}</p></div><div><b>OUTCOME / EVIDENCE</b><p>{project.outcome}<br /><br />{project.evidence}</p></div></section></main> }

function CasePage({ project }) {
  if (project.id === 'virtual') return <VirtualIdentitiesCase project={project} />
  if (project.id === 'fellowship') return <RootedFuturesCase project={project} />
  const material = project.id === 'shokz' ? <section className="case-material"><img src="/assets/shokz/media/image2.png" alt="韶音产品视觉素材"/><div><b>SHOKZ / JAPAN MARKET RESEARCH</b><p>小组课程作业：围绕日本市场的文化适配、线下渠道、品牌认知与本土化传播进行研究。</p><a href="/assets/shokz/shokz-research.pptx">DOWNLOAD ORIGINAL PPTX <Arrow /></a></div></section> : project.id === 'sony' ? <section className="case-material case-material--sony"><div><b>SONY WF-1000XM4 / PERSONAL SOUND BUBBLE</b><p>产品视觉演示：从通勤、工作与旅行场景切入，建立“个人声音泡泡”的产品叙事。</p><a href="/assets/sony/sony-presentation.pdf" target="_blank" rel="noreferrer">OPEN ORIGINAL PRESENTATION PDF <Arrow /></a></div><object data="/assets/sony/sony-presentation.pdf#page=1&view=FitH" type="application/pdf" aria-label="Sony 演示文稿 PDF 预览" /></section> : project.id === 'gbaa' ? <section className="case-material case-material--gbaa"><video controls preload="metadata" poster="/assets/gbaa/award-list.jpg"><source src="/assets/gbaa/cultural-video.mp4" type="video/mp4" /></video><div><b>AWARD / CAMPUS CULTURAL VIDEO COMPETITION</b><p>作品《足迹新章》获校内三等奖。下方为获奖名单原图。</p><img src="/assets/gbaa/award-list.jpg" alt="校内获奖名单" /></div></section> : project.id === 'virtual' ? <section className="case-material case-material--virtual"><img src="/assets/virtual-identities/tyrant-cover.jpg" alt="《少女暴君》虚拟身份案例"/><div><b>NEW CASE / 少女暴君</b><p>一则关于甜美、权力与虚拟角色姿态的数字身份实验。</p><a href="#series/02">OPEN THE GIRL TYRANT SERIES <Arrow /></a></div></section> : null
  return <main className="detail-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className={`case-cover ${project.className}`}><span>{project.no}</span><h1>{project.title}</h1><p>{project.type}</p></section><section className="case-video">{project.url ? <a href={project.url} target="_blank" rel="noreferrer">WATCH / OPEN ORIGINAL VIDEO <Arrow /></a> : project.id === 'gbaa' ? <a href="/assets/gbaa/cultural-video.mp4" target="_blank" rel="noreferrer">WATCH PROJECT VIDEO <Arrow /></a> : <div>PROJECT MATERIAL<br /><small>[ 上传视频、演示稿或项目封面 ]</small></div>}</section>{material}<section className="case-detail"><div><b>PROJECT OVERVIEW</b><p>{project.note}</p></div><div><b>WHEN / CONTEXT</b><p>{project.time}</p></div><div><b>WHAT I DID</b><p>{project.role}</p></div><div><b>WHAT I LEARNED</b><p>{project.learned}</p></div><div><b>OUTCOME / EVIDENCE</b><p>{project.outcome}<br /><br />{project.evidence}</p></div></section></main>
}

function ArtworkPage({ file, collection }) { return <main className="detail-page artwork-page"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#gallery/virtual-photography">← BACK TO ARCHIVE</a></header><section className="artwork-stage"><img src={`/assets/virtual/${file}`} alt="Virtual Photography 展览作品"/></section><section className="artwork-text"><p>{collection?.title || 'VIRTUAL PHOTOGRAPHY'}</p><h1>[ WORK TITLE ]</h1><div><b>WORK INTRODUCTION</b><p>[ 在此补充作品简介：角色、造型、场景与创作时间。]</p></div><div><b>SPIRIT / READING</b><p>[ 在此补充精神分析：这件作品所讨论的身份、凝视、情绪或叙事。]</p></div></section></main> }

function ErosionArtwork({ source }) { const [active, setActive] = useState(false); const [ripples, setRipples] = useState([]); const last = useRef({ x: -999, y: -999 }); const position = event => { const rect = event.currentTarget.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; event.currentTarget.style.setProperty('--reveal-x', `${x}px`); event.currentTarget.style.setProperty('--reveal-y', `${y}px`); return { x, y } }; const disturb = event => { const { x, y } = position(event); if (Math.hypot(x - last.current.x, y - last.current.y) < 78) return; last.current = { x, y }; const id = `${Date.now()}-${x}`; setRipples(items => [...items.slice(-1), { id, x, y }]); window.setTimeout(() => setRipples(items => items.filter(item => item.id !== id)), 800) }; const enter = event => { position(event); setActive(true); disturb(event) }; return <div className={`erosion-stage__art erosion-artwork${active ? ' is-active' : ''}`} onPointerEnter={enter} onPointerMove={disturb} onPointerLeave={() => setActive(false)}><img className="erosion-artwork__base" src={source} alt="蚀 / Erosion" /><img className="erosion-artwork__color" src={source} alt="" aria-hidden="true" />{ripples.map(ripple => <i key={ripple.id} className="erosion-artwork__ripple" style={{ left: ripple.x, top: ripple.y }} />)}</div> }

function ErosionPage({ collection }) { const source = `/assets/virtual/${collection.files[0]}`; const [ripples, setRipples] = useState([]); const last = useRef({ x: -999, y: -999 }); const rippleBackground = event => { if (event.target.closest('.erosion-artwork')) return; const rect = event.currentTarget.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; if (Math.hypot(x - last.current.x, y - last.current.y) < 180) return; last.current = { x, y }; const id = `${Date.now()}-${x}`; setRipples([{ id, x, y }]); window.setTimeout(() => setRipples(items => items.filter(item => item.id !== id)), 950) }; return <main className="detail-page erosion-page"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#gallery/virtual-photography">← BACK TO VIRTUAL PHOTOGRAPHY</a></header><section className="erosion-stage" onPointerMove={rippleBackground}><Ferrofluid className="erosion-stage__fluid" dpr={1} colors={EROSION_FLUID_COLORS} speed={0.4} scale={1.9} turbulence={0.8} fluidity={0.09} rimWidth={0.4} sharpness={1} shimmer={2} glow={1.8} flowDirection="down" opacity={1} mouseInteraction mouseStrength={1} mouseRadius={0.3} />{ripples.map(ripple => <i key={ripple.id} className="erosion-stage__ripple" style={{ left: ripple.x, top: ripple.y }} />)}<div className="erosion-stage__info"><span>( 05 / VIRTUAL PHOTOGRAPHY )</span><h1>蚀<br /><em>EROSION.</em></h1><p>MOVE THE CURSOR<br />TO DISTURB THE SURFACE</p></div><ErosionArtwork source={source} /></section><section className="artwork-text"><p>EROSION / 05</p><h1>蚀</h1><div><b>WORK INTRODUCTION</b><p>关于人、消融与被侵蚀：无路可退时，被迫或主动加入这场灾难。</p></div><div><b>SPIRIT / READING</b><p>银色遍布世界的每个地方。灾难不再只是远处的景观，而成为每个人必须回应的邀请——你也要加入吗？</p></div></section></main> }

function FlowerCarousel({ files }) { const [active, setActive] = useState(0); const move = direction => setActive(index => (index + direction + files.length) % files.length); useEffect(() => { const onKey = event => { if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1) }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [files.length]); return <section className="flower-carousel" aria-label="花系列左右切换展览"><div className="flower-carousel__slides">{files.map((file, index) => { let offset = index - active; if (offset > files.length / 2) offset -= files.length; if (offset < -files.length / 2) offset += files.length; return <figure key={file} className={offset === 0 ? 'is-active' : offset < 0 ? 'is-left' : 'is-right'}><ScrollExpand src={`/assets/virtual/${file}`} alt={`花，虚拟摄影组图 ${index + 1}`} title={index === 0 ? '花' : ''} scrollHint="SCROLL TO EXPAND" startWidth={42} startHeight={58} startRadius={0} endRadius={0} mediaZoom={1.16} scrollDistance={.58} holdDistance={0} smoothing={.08} overlayScrim={.3} className="flower-carousel__expand" /></figure> })}</div><button className="flower-carousel__control flower-carousel__control--prev" onClick={() => move(-1)} aria-label="上一张">←</button><button className="flower-carousel__control flower-carousel__control--next" onClick={() => move(1)} aria-label="下一张">→</button><div className="flower-carousel__meta"><span>FLOWERS / {String(active + 1).padStart(2, '0')}</span><b>2025.11.13</b></div></section> }

function SeriesPage({ collection }) {
  if (collection.id === '05') return <ErosionPage collection={collection} />
  const isFlowers = collection.id === '01'
  if (isFlowers) {
    const flowerFiles = ['flower-01.jpg', 'flower-03.jpg', 'flower-02.jpg', 'flower-04.jpg']
    return <main className="detail-page artwork-page flower-exhibition"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#gallery/virtual-photography">← BACK TO VIRTUAL PHOTOGRAPHY</a></header><FlowerCarousel files={flowerFiles} /><section className="artwork-text"><p>FLOWERS / 01</p><h1>花</h1><div><b>ABOUT THE SERIES</b><p>一组以红色花朵、蝴蝶与占卜意象构成的虚拟肖像。</p></div><div><b>SPIRIT / READING</b><p>柔软与锋利、被观看与自我编织，在同一张面孔上同时生长。</p></div></section></main>
  }
  return <main className="detail-page artwork-page"><header><a className="brand" href="#top">J.Z</a><a className="page-back" href="#gallery/virtual-photography">← BACK TO VIRTUAL PHOTOGRAPHY</a></header><section className="gallery-head"><p>( VIRTUAL PHOTOGRAPHY / SERIES {collection.id} )</p><h1>{collection.title}</h1><span>{collection.note}</span></section><section className="series-works">{collection.files.length ? collection.files.map((file) => <img key={file} loading="lazy" src={`/assets/virtual/${file}`} alt={`${collection.title} 组图`} />) : <><div>[ 上传本系列组图 01 ]</div><div>[ 上传本系列组图 02 ]</div><div>[ 上传本系列组图 03 ]</div></>}</section><section className="artwork-text"><p>SERIES {collection.id}</p><h1>[ SERIES INTRODUCTION ]</h1><div><b>ABOUT THE SERIES</b><p>[ 在此补充这一组作品的创作背景、角色、场景与时间。]</p></div><div><b>SPIRIT / READING</b><p>[ 在此补充系列的精神分析、叙事线索与想讨论的问题。]</p></div></section></main>
}

function TravelLandscapePage({ area }) { const [selected, setSelected] = useState(null); const groups = [{ no:'01', title:'CITY DRIFT / 城市漂流', note:'街道、建筑、夜色与人在城市中的移动。', images:[{ src:'/assets/travel/city-drift-01.jpg', alt:'函馆街道的夜色' },{ src:'/assets/travel/city-drift-02.jpg', alt:'京都街道与远处的城市天际线' }] },{ no:'02', title:'MOUNTAIN LINE / 山的轮廓', note:'远景、地形与行进途中被切开的地平线。' },{ no:'03', title:'WATER EDGE / 水的边界', note:'海、湖、雨与潮汐留下的反光和距离。' },{ no:'04', title:'PASSING DAYS / 经过的日常', note:'旅行之外，仍在发生的光线、天气与片刻。' }]; useEffect(() => { const close = event => event.key === 'Escape' && setSelected(null); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, []); return <main className="detail-page travel-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className="gallery-head"><p>( PHOTOGRAPHY ARCHIVE )</p><h1>{area.title}</h1><span>{area.text}</span></section><section className="travel-groups">{groups.map((group) => <article className="travel-group" key={group.no}><header><span>{group.no}</span><h2>{group.title}</h2><p>{group.note}</p></header><div className="travel-group__images">{group.images ? group.images.map((image, index) => <button className="travel-photo" type="button" key={image.src} onClick={() => setSelected(image)} aria-label={`查看图片：${image.alt}`}><img src={image.src} alt={image.alt} /><span>{group.no} / {String(index + 1).padStart(2, '0')}</span><b>VIEW DETAIL ↗</b></button>) : Array.from({ length: 3 }, (_, index) => <figure key={index}><span>{group.no} / {String(index + 1).padStart(2, '0')}</span><b>[ UPLOAD TRAVEL IMAGE ]</b></figure>)}</div></article>)}</section>{selected ? <div className="travel-lightbox" role="dialog" aria-modal="true" aria-label="图片详情" onClick={() => setSelected(null)}><button type="button" className="travel-lightbox__close" onClick={() => setSelected(null)} aria-label="关闭图片详情">×</button><img src={selected.src} alt={selected.alt} onClick={event => event.stopPropagation()} /><p>{selected.alt}</p></div> : null}</main> }

function GalleryPage({ area }) { const isVirtual = area.id === 'virtual-photography'; if (area.id === 'travel-landscape') return <TravelLandscapePage area={area} />; return <main className="detail-page"><header><a className="brand" href="#top">J.Z</a><PageBack /></header><section className="gallery-head"><p>( PHOTOGRAPHY ARCHIVE )</p><h1>{area.title}</h1><span>{area.text}</span></section>{isVirtual ? <section className="series-directory">{virtualCollections.map((collection) => <a href={`#series/${collection.id}`} key={collection.id}><span>{collection.id}</span><h2>{collection.title}</h2><p>{collection.note}</p><b>ENTER SERIES ↗</b></a>)}</section> : <section className="gallery-grid">{Array.from({ length: 8 }, (_, index) => <figure key={index}><div><span>{String(index + 1).padStart(2, '0')}</span><b>[ UPLOAD IMAGE ]</b></div><figcaption>{index === 0 ? area.status : '[ 添加作品标题 / 时间 / 简介 ]'}</figcaption></figure>)}</section>}</main> }

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
  useEffect(() => { const move = (event) => { setCursor({ x: event.clientX, y: event.clientY }); const target = document.elementFromPoint(event.clientX, event.clientY); setOverImage(Boolean(target?.closest('.portrait,.project__art,.photo-area,.lab-collage,.case-material,.gallery-grid figure,.series-works img,.artwork-stage img,.flower-carousel__expand'))) }; window.addEventListener('pointermove', move); return () => window.removeEventListener('pointermove', move) }, [])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: .12 })
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [route])
  useEffect(() => {
    const about = document.querySelector('#about')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAboutRevealed(true); observer.disconnect() }
    }, { threshold: .16 })
    if (about) observer.observe(about)
    return () => observer.disconnect()
  }, [])
  useEffect(() => { const changeRoute = () => setRoute(window.location.hash); window.addEventListener('hashchange', changeRoute); window.addEventListener('pageshow', changeRoute); return () => { window.removeEventListener('hashchange', changeRoute); window.removeEventListener('pageshow', changeRoute) } }, [])
  useEffect(() => { const timer = window.setTimeout(() => { if (route === '#top' || !route) window.scrollTo({ top: 0, behavior: 'auto' }); else if (['#about', '#work', '#photo', '#proof', '#contact'].includes(route)) document.querySelector(route)?.scrollIntoView({ block: 'start' }) }, 0); return () => window.clearTimeout(timer) }, [route])

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
  if (route === '#sketches') return <><SketchbookPage /><SiteCursor cursor={cursor} overHero={false} active={overImage} /></>
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
        <div className="acid-disc" />
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
          <h2><BouncyText text="影像、文化与" /><br /><strong><BouncyText text="观看方式。" /></strong></h2>
          <p className="about__text">我习惯先观察人与环境之间的关系，再通过摄影、视频、剪辑、版式和叙事，将这些观察转化为可被看见、理解和传播的视觉作品。我关注的不只是画面是否好看，也关心一件作品如何被理解，并与真实的人产生联系。</p>
          <div className="about__contacts"><a href="mailto:kufengchun@gmail.com">KUFENGCHUN@GMAIL.COM <Arrow /></a><a href="#work">VIEW SELECTED WORK <Arrow /></a></div>
        </div>
      </div>
      <div className="facts"><div><b>2027</b><span>EXPECTED<br />GRADUATION</span></div><div><b>06</b><span>SELECTED<br />CASE STUDIES</span></div><div><b>1K+</b><span>FILM<br />PLAYS</span></div><div><b>400+</b><span>COMMUNITY<br />LIKES</span></div></div>
    </section>

    <section className="works page-width reveal-on-scroll" id="work">
      <div className="section-tag"><span>( 02 )</span><span>SELECTED WORK / 2024—2026</span></div>
      <div className="works__head"><h2>STORIES<br />WITH <em>CONTEXT.</em></h2><p>影像、文化、数字身份与商业表达。<br />每个项目明确标注我的角色与证据。</p></div>
      <div className="project-list">{projects.map((item) => <article className={`project ${item.className} project--${item.id}`} key={item.no}><a className="project__art" href={`#case/${item.id}`} aria-label={`查看 ${item.title} 案例详情`} onPointerMove={moveGraphic} onPointerLeave={dropGraphic}><span className="project__no">{item.no}</span><span className="project__graphic" /><span className="project__word">{item.id === 'sony' ? <>SONY /<br />PERSONAL SOUND BUBBLE</> : item.title}</span><small>OPEN CASE STUDY ↗</small></a><div className="project__meta project__meta--expanded"><div><h3>{item.title}</h3><p>{item.type}</p></div><p>{item.note}</p><p><b>MY ROLE</b><br />{item.role}<br /><br />{item.evidence}</p><a href={`#case/${item.id}`} aria-label={`查看 ${item.title} 案例详情`}><Arrow /></a></div></article>)}</div>
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
      <a className="lab-collage" href="#sketches" aria-label="打开个人过程痕迹作品档案"><i /><i /><i /><i /><b>PROCESS<br />OVER<br />POLISH</b></a>
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
