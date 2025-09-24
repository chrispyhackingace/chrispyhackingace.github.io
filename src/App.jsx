import React from 'react'
import sentences from './data/sentences'
import profileImg from './assets/chris.jpg'

const Icon = ({name, className=''})=>{
  const icons = {
    github: (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.26-1.68-1.26-1.68-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.74.4-1.23.73-1.51-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.17-3.1-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 2.87-.39c.98 0 1.97.13 2.87.39 2.19-1.5 3.15-1.18 3.15-1.18.62 1.58.23 2.74.11 3.03.73.81 1.17 1.84 1.17 3.1 0 4.43-2.71 5.4-5.29 5.68.41.35.77 1.03.77 2.08 0 1.5-.01 2.71-.01 3.08 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>),
    linkedin: (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48s.88 1.98 1.98 1.98A1.99 1.99 0 0 0 6.96 5.48C6.96 4.38 6.08 3.5 4.98 3.5zM3.5 8.98H6.4v11.52H3.5V8.98zM8.5 8.98h2.8v1.57h.04c.39-.73 1.34-1.5 2.76-1.5 2.95 0 3.5 1.94 3.5 4.46v6.99h-2.9v-6.19c0-1.48-.03-3.39-2.07-3.39-2.07 0-2.39 1.62-2.39 3.29v6.29H8.5V8.98z"/></svg>),
    twitter: (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23 4.56c-.8.35-1.66.59-2.56.7a4.48 4.48 0 0 0-7.64 3.06c0 .35.04.7.12 1.03-3.73-.18-7.04-1.97-9.26-4.68-.39.67-.61 1.45-.61 2.28 0 1.57.8 2.95 2.01 3.76-.74-.02-1.44-.23-2.05-.58v.06c0 2.2 1.56 4.04 3.63 4.46-.38.1-.78.15-1.19.15-.29 0-.58-.03-.86-.08.58 1.83 2.27 3.16 4.27 3.2A9.02 9.02 0 0 1 1.9 19.54 12.73 12.73 0 0 0 7.29 21c8.76 0 13.56-7.25 13.56-13.54l-.01-.62c.93-.67 1.73-1.5 2.37-2.45z"/></svg>),
    mail: (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>),
    resume: (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM13 3.5L18.5 9H13V3.5zM8 13h8v2H8v-2zm0-4h8v2H8V9z"/></svg>)
  ,spotify: (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 14.64c-.2.32-.58.42-.9.22-2.5-1.52-5.64-1.86-9.34-1.02-.36.09-.74-.13-.83-.5-.1-.36.13-.74.5-.83 4.06-.88 7.6-.5 10.46 1.18.32.2.42.58.21.95zM17 11.4c-.25.4-.74.54-1.14.28-2.87-1.86-7.26-2.4-10.66-1.31-.44.13-.9-.11-1.04-.56-.13-.44.11-.9.56-1.04C7.04 8.22 11.78 8.9 15.2 10.9c.41.26.56.8.3 1.5zM16.86 8.28c-.31.5-.96.67-1.47.36-2.92-1.83-7.82-2.07-10.64-1.14-.53.19-1.1-.08-1.3-.61-.19-.52.08-1.1.61-1.3 3.35-1.19 8.74-.88 12.07 1.36.49.31.65 1.06.37 1.33z"/></svg>)
  ,discord: (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 3H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14l2 2V4a1 1 0 0 0-1-1zM8.5 12.5c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2zm7 0c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2zM7 16v-1.5c1.1.2 2.2.3 3.5.3s2.4-.1 3.5-.3V16c0 .6-.5 1-1 1H8c-.5 0-1-.4-1-1z"/></svg>)
  ,instagram: (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm5.2-.9a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1z"/></svg>)
  }
  const icon = icons[name]
  if(!icon) return null
  return <span className={className} aria-hidden="true">{icon}</span>
}

// Configure your real social URLs here
const SOCIAL_LINKS = {
  github: 'https://github.com/chrispyhackingace',
  linkedin: 'https://www.linkedin.com/in/cren2010',
  mail: 'mailto:christopherren81@gmail.com',
  spotify: 'https://open.spotify.com/user/31edtu3ucenlcni75tawpxvs3tbm?si=4c1e4bb21b4142e0',
  discord: 'https://discord.com/users/706203796774322278',
  instagram: 'https://www.instagram.com/chrysolysis/',
}

/* Optional: override built-in SVG icons with custom images (PNG/SVG/JPG).
   Example: place files in `public/socials/instagram.png` and set '/socials/instagram.png'
   Leave a key undefined or empty to use the built-in SVG.
*/
const SOCIAL_ICON_OVERRIDES = {
  instagram: '/socials/instagram.png',
  discord: '/socials/discord.png',
  spotify: '/socials/spotify.png'
}

const Header = ()=> (
  <header className="site-header">
    <div className="inner">
      <div className="brand" aria-hidden="true"></div>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#timeline">Experience</a>
      </nav>
    </div>
  </header>
)

const Socials = ()=> {
  const items = ["github","linkedin","spotify","discord","instagram","twitter","mail","resume"]
  return (
    <div className="socials">
      {items.map(key=>{
        const href = SOCIAL_LINKS[key]
        if(!href) return null
        const isExternal = href.startsWith('http')
        const props = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}
        const override = SOCIAL_ICON_OVERRIDES[key]
        const iconElement = override ? (
          <img src={override} alt={`${key} icon`} className="social-icon-img" />
        ) : (
          <Icon name={key} />
        )
        return (
          <a key={key} href={href} title={key} aria-label={key} {...props}>
            {iconElement}
          </a>
        )
      })}
    </div>
  )
}

// Hero removed per request

const AudioPlayer = ()=>{
  // Simple UI that uses window.AudioPlayer helper defined in main.jsx
  const [playing, setPlaying] = React.useState(false)
  React.useEffect(()=>{
    // Example: set an empty playlist by default; user can override in console
    if(window.AudioPlayer) window.AudioPlayer.set([])
  },[])
  return (
    <div className="audio-player" role="region" aria-label="Background music">
      <button onClick={()=>{ if(!window.AudioPlayer) return; if(playing){ window.AudioPlayer.pause(); setPlaying(false) } else { window.AudioPlayer.play(); setPlaying(true) } }} aria-pressed={playing}>{playing ? '⏸' : '▶'}</button>
      <div className="playlist">Load tracks via <code>window.AudioPlayer.set(['./music/track1.mp3','./music/track2.mp3'])</code></div>
    </div>
  )
}

const Hero = ()=> (
  <section className="hero-compact">
      <div className="inner hero-compact-inner">
      <div className="hero-left">
        <div className="profile-and-name">
          <div className="up">
            <div className="profile-sticker" data-parallax-speed="0.01"><img src={profileImg} alt="profile"/></div>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <div className="cube-wrap">
          <div className="neon-cube" aria-hidden="true">
            <div className="face f1"/>
            <div className="face f2"/>
            <div className="face f3"/>
            <div className="face f4"/>
            <div className="face f5"/>
            <div className="face f6"/>
          </div>
        </div>
        <div className="name-overlay">
          <div className="name">Hi, I'm <span className="accent">Chris.</span></div>
          <div className="hero-blurb">aka chrysolysis, chrispyhackingace, chrispyhackerace.</div>
          <div className="hero-blurb">I build stuff. Sometimes it even works!</div>
          <div className="social-row overlay-socials"><Socials /></div>
        </div>
      </div>
    </div>
    <AudioPlayer />
  </section>
)

const About = () => {
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    try {
      const idx = Math.floor(Math.random() * sentences.length)
      setText(sentences[idx])
    } catch (err) {
      setText(
        "Over the years I've worked on frontend, tooling, and backend systems. I like small utilities that save time and well-designed developer experiences."
      )
    }
  }, [])

  return (
    <section id="about" className="section about up">
      <div className="inner">
        {/* Left column: stack heading and the short about sentence */}
        <div className="left-col">
          <div className="stickyexp">
            <h2>
              <a href="#about">about me</a>
            </h2>
          </div>
        </div>
        {/* Right column: tech stack */}
        <div className="flex-1 right-col up2">
          <div className="about-sentence up2">
            <p>{text}</p>
          </div>
          <h3>Tech stack</h3>
          <div className="tech-grid">
            {[
              'JavaScript',
              'TypeScript',
              'React',
              'Node.js',
              'Python',
              'Django',
              'Flask',
              'Java',
              'Svelte',
              'C',
              'C++',
              'C#',
              'R'
            ].map((t, i) => (
              <div
                key={t}
                className="tech"
                data-parallax-speed={`${0.03 + (i % 3) * 0.008}`}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Projects = ()=> {
  // Explicit list of 8 projects so you can edit id/title/desc/img in-place.
  const projects = [
  { id: 'proj-1', title: 'mustangly', blurb: 'Calendly clone built with React and Node.js.', img: '/projects/workinprogress.png' },
  { id: 'proj-2', title: 'hackWWP', blurb: 'Hackathon website and interface.', img: '/projects/workinprogress.png' },
  { id: 'proj-3', title: 'golfplusplus', blurb: 'Inspired by Golf (the poker game) and a play on C++, this poker engine is supposedly powered by AI and ML, although it is not very good at its job.', img: '/projects/workinprogress.png' },
  { id: 'proj-4', title: 'sciotrainer', blurb: 'Scibowl, Scioly, and NOSB trainer inspired by AMCTrivial.', img: '/projects/workinprogress.png' },
  { id: 'proj-5', title: 'diskord1?!', blurb: 'Discord message compiler.', img: '/projects/discord.png' },
  { id: 'proj-6', title: 'steve', blurb: 'Self-driving car, built around an Arduino Mega 2560.', img: '/projects/workinprogress.png' }
  ]

  return (
    <section id="projects" className="section about up3">
      <div className="left-col stickyexp">
        <h2><a href="#projects">projects</a></h2>
      </div>

      <div className="inner left-col up3">
        <div className="projects-grid projectup">
          {projects.map((p)=> (
            <article key={p.id} className="proj">
              <div className="proj-meta" style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <div style={{fontSize:'0.8rem',opacity:0.8}}>{p.id}</div>
                <div style={{fontWeight:700}}>{p.title}</div>
              </div>
              <div className="proj-image">
                <img src={p.img} alt={`${p.title} preview`} onError={(e)=>{ e.currentTarget.style.opacity = '0'; }} />
              </div>
              <p>{p.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const timelineEntries = [
  {
    id: 'nxtlvl',
    title: 'Co-Founder & Head Tutor',
    org: 'NXTLVL Tutoring · Self-employed',
    date: 'Jun 2025 — Present',
    location: 'Hybrid',
    desc: `Co-founder and Head Tutor at NXTLVL Tutoring, a STEM tutoring organization committed to making deep, rigorous learning accessible to all students. It offers personalized instruction in mathematics, physics, and computer science, helping learners at all levels build lasting understanding through logic, clarity, and curiosity. Whether supporting students seeking academic confidence or those pursuing enrichment and competition, NXTLVL Tutoring combines classical thinking with modern strategies to empower every learner to think critically, solve creatively, and grow intellectually.`,
    type: 'experience',
    logo: '',
    links: {}
    },
  {
    id: 'mki',
    title: 'Travel Team Programmer',
    org: 'The MidKnight Inventors (FRC 1923)',
    date: 'Sep 2024 — Present',
    location: 'Hybrid',
    desc: `Programmed competition robots in Java as part of an FRC robotics team, gaining hands-on experience with state machine architecture and real-time control systems. Developed and tested subsystems using WPILib in VSCode, contributing to the robot's autonomous and teleoperated performance. Also participated in scouting efforts by collecting and analyzing data on opposing teams to inform match strategy and alliance decisions.`,
    type: 'experience',
    logo: '',
    links: {}
  },
  {
    id: 'mustang-math',
    title: 'Team Member',
    org: 'Mustang Math',
    date: 'Jun 2025 — Sep 2025',
    location: '',
    desc: `Spent a summer writing problems, creating a tournament, and creating a rigorous math curriculum.`,
    type: 'experience',
    logo: '',
    links: {}
  },
  {
    id: 'asdan',
    title: 'ASDAN 2025 Test Coordinator',
    org: 'ASDAN',
    date: 'Jun 2025',
    location: '',
    desc: `Wrote over 25 problems, reviewed problems written by peers, and gave suggestions for Math Kangaroo China collaboration.`,
    type: 'experience',
    logo: '',
    links: {}
  },
  {
    id: 'wwppc',
    title: 'WWPIT Problem Tester',
    org: 'West Windsor-Plainsboro Programming Competitions',
    date: 'Apr 2025',
    location: 'Remote',
    desc: `Served as a problem tester for the West Windsor-Plainsboro Informatics Tournament (WWPIT), reviewing and testing contest problems for correctness, clarity, and appropriate difficulty levels. Provided constructive feedback to problemsetters to refine both logic and test cases.`,
    type: 'volunteer',
    logo: '',
    links: {}
  },
  {
    id: 'wwppc',
    title: 'Junior Organizer - Outreach/Logistics & Webdev',
    org: 'West Windsor-Plainsboro',
    date: 'Feb 2025 — Apr 2025',
    location: 'Hybrid',
    desc: `Contributed to both the frontend and backend development of the contest website, actively enhancing the user interface to improve accessibility and user experience. Collaborated with team members on UI/UX improvements and feature implementation. Took initiative in outreach efforts by contacting multiple corporations for sponsorships, helping the team raise $700 in cash, $300 in contest merchandise, and more than $2000 in X-Camp lesson credits.`,
    type: 'experience',
    logo: '',
    links: {}
  },
  {
    id: 'prism',
    title: 'PRISM Coordinator',
    org: 'West Windsor - Plainsboro Regional School District',
    date: 'Sep 2022 — Jun 2024',
    location: 'On-site',
    desc: `Collaborated with the PRISM facilitator at Thomas Grover Middle School to develop and implement comprehensive lesson plans for the Maker Ambassadors track, focusing on hands-on STEM education and mentorship. Led instructional sessions, guided students through maker-based projects, and supported the development of their technical and creative problem-solving skills. Directed the program under Mr. Justin Dolcimascolo-Garrett, earning more than 100 service hours.`,
    type: 'experience',
    logo: '',
    links: {}
  },
  // Volunteer entries
  {
    id: 'aylus',
    title: 'Student Volunteer',
    org: 'Alliance of Youth Leaders in the United States',
    date: 'Aug 2024 — Present',
    location: '',
    desc: `Active member of AYLUS, participating in youth-led volunteer initiatives aimed at serving the local community. Contributed to projects including educational outreach, cultural events, and service activities across the Greater Princeton area to promote leadership and civic responsibility.`,
    type: 'volunteer',
    logo: '',
    links: {}
  },
  {
    id: 'fll',
    title: 'Registered FLL Youth Mentor',
    org: 'FIRST',
    date: 'Sep 2024 — Mar 2025',
    location: '',
    desc: `As a volunteer mentor for FIRST LEGO League, guided and supported young students exploring STEM concepts through hands-on robotics challenges. Helped foster teamwork, problem-solving, and creativity while encouraging a passion for engineering and innovation.`,
    type: 'volunteer',
    logo: '',
    links: {}
  },
  {
    id: 'stem',
    title: 'Mathematics & Coding Tutor',
    org: 'Students of STEM Corporation',
    date: 'May 2025 — Present',
    location: '',
    desc: `Tutor students in mathematics (pre-algebra to geometry) and basic programming (Python, Scratch) both in-person and online using a project-based approach that emphasizes conceptual understanding and real-world applications.`,
    type: 'volunteer',
    logo: '',
    links: {}
  },
  {
    id: 'upchieve',
    title: 'Academic Coach',
    org: 'UPchieve',
    date: 'May 2025 — Present',
    location: '',
    desc: `Provide free, on-demand math, science, and SAT tutoring to underserved high school students through UPchieve’s virtual platform. Support academic growth by offering personalized guidance and fostering student confidence.`,
    type: 'volunteer',
    logo: '',
    links: {}
  }
]

// --- Timeline helpers: parse human dates and split current vs past ---
const monthMap = {
  Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
}

function parseMonthYear(str){
  if(!str) return null
  // match e.g. 'Jun 2025' or 'Jun 2025 to Present'
  const m = str.match(/([A-Za-z]{3})\s+(\d{4})/)
  if(!m) return null
  const mon = m[1]
  const year = parseInt(m[2],10)
  const month = monthMap[mon] ?? 0
  return new Date(year, month, 1)
}

function splitRange(dateStr){
  if(!dateStr) return { start: null, end: null }
  // split on common dash characters
  const parts = dateStr.split(/–|—|-|to/).map(s=>s.trim())
  if(parts.length === 1){
    const single = parts[0]
    const start = parseMonthYear(single)
    return { start, end: start }
  }
  const start = parseMonthYear(parts[0])
  const endRaw = parts.slice(1).join(' ')
  const isPresent = /present/i.test(endRaw)
  const end = isPresent ? null : parseMonthYear(endRaw)
  return { start, end }
}

// classify entries: current = has 'Present' in date or end is null; past = otherwise
// Rebuild entries with parsed dates and without tags; split by type (experience/volunteer)
const entriesWithParsed = timelineEntries.map(e=>{
  const range = splitRange(e.date)
  return Object.assign({}, e, { _start: range.start, _end: range.end })
})

function sortCurrent(a,b){
  const aStart = a._start ? a._start.getTime() : 0
  const bStart = b._start ? b._start.getTime() : 0
  return bStart - aStart
}

function sortPast(a,b){
  const aEnd = a._end ? a._end.getTime() : (a._start ? a._start.getTime() : 0)
  const bEnd = b._end ? b._end.getTime() : (b._start ? b._start.getTime() : 0)
  return bEnd - aEnd
}

const experienceEntries = entriesWithParsed.filter(e=> e.type === 'experience')
const volunteerEntries = entriesWithParsed.filter(e=> e.type === 'volunteer')

const experienceCurrent = experienceEntries.filter(e=> /present/i.test(e.date) || e._end === null).sort(sortCurrent)
const experiencePast = experienceEntries.filter(e=> !(/present/i.test(e.date) || e._end === null)).sort(sortPast)

const volunteerCurrent = volunteerEntries.filter(e=> /present/i.test(e.date) || e._end === null).sort(sortCurrent)
const volunteerPast = volunteerEntries.filter(e=> !(/present/i.test(e.date) || e._end === null)).sort(sortPast)

// Collapsible entry component
function CollapsibleEntry({entry}){
  const [open, setOpen] = React.useState(false)
  const previewLimit = 180
  const needsCollapse = entry.desc && entry.desc.length > previewLimit
  const preview = needsCollapse ? entry.desc.slice(0,previewLimit).trim() + '…' : entry.desc

  // Try to auto-load a logo from `/logos/{entry.id}.png` when no explicit
  // `entry.logo` is provided. We preload the image to detect existence so the
  // placeholder is shown only when the image is not available.
  const [logoUrl, setLogoUrl] = React.useState(entry.logo || '')
  const [logoLoaded, setLogoLoaded] = React.useState(Boolean(entry.logo))

  React.useEffect(()=>{
    if(entry.logo){
      setLogoUrl(entry.logo)
      setLogoLoaded(true)
      return
    }
  let isMounted = true
  const candidate = `/logos/${entry.id}.png`
  const img = new Image()
  img.onload = ()=>{ if(isMounted){ setLogoUrl(candidate); setLogoLoaded(true) } }
  img.onerror = ()=>{ if(isMounted){ setLogoLoaded(false) } }
  img.src = candidate
  return ()=>{ isMounted = false }
  },[entry.logo, entry.id])
  return (
    <div className="timeline-item">
      <div className="timeline-time">{entry.date}</div>
      <div className="timeline-body">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          {/* reserved slot for company logo; priority: explicit entry.logo -> /logos/{id}.png -> placeholder */}
          {logoLoaded && logoUrl ? (
            <img src={logoUrl} alt="logo" style={{width:48,height:48,objectFit:'contain'}}/>
          ) : (
            <div className="timeline-logo" aria-hidden="true" title="Company logo placeholder"></div>
          )}
          <div>
            <strong>{entry.title}</strong>
            <div className="muted">{entry.org}{entry.location ? ` — ${entry.location}` : ''}</div>
          </div>
        </div>
        <p style={{marginTop:10}}>{open ? entry.desc : preview}</p>
        {needsCollapse && (
          <button className="btn ghost small" onClick={()=>setOpen(!open)} aria-expanded={open} style={{marginTop:6}}>
            {open ? 'Show less' : 'Read more'}
          </button>
        )}
        {/* links rendering if provided */}
        {entry.links && Object.keys(entry.links).length > 0 && (
          <div className="proj-links" style={{marginTop:8}}>
            {entry.links.website ? <a href={entry.links.website} target="_blank" rel="noopener noreferrer">Website</a> : null}
            {entry.links.repo ? <a href={entry.links.repo} target="_blank" rel="noopener noreferrer">Repo</a> : null}
          </div>
        )}
      </div>
    </div>
  )
}

const Timeline = ()=> (
  <section id="timeline" className="section about">
    <div className="left-col stickyexp">
        <h2><a href="#timeline">experience</a></h2>
    </div>
    <div className="inner right-col up3">
      {experienceCurrent.length > 0 && (
        <div className="timeline-block right-col">
          <h3 data-parallax-speed="0.002">Current positions</h3>
          <div className="timeline-list">
            {experienceCurrent.map((e,i)=> <div key={e.id} data-parallax-speed={`${0.04 + (i%3)*0.012}`}><CollapsibleEntry entry={e} /></div>)}
          </div>
        </div>
      )}

      {experiencePast.length > 0 && (
        <div className="timeline-block right-col">
          <h3 data-parallax-speed="0.002">Past positions</h3>
          <div className="timeline-list">
            {experiencePast.map((e,i)=> <div key={e.id} data-parallax-speed={`${0.035 + (i%3)*0.01}`}><CollapsibleEntry entry={e} /></div>)}
          </div>
        </div>
      )}
      {volunteerCurrent.length > 0 && (
        <div className="timeline-block right-col">
          <h3 data-parallax-speed="0.002">Current volunteer positions</h3>
          <div className="timeline-list">
            {volunteerCurrent.map((e,i)=> <div key={e.id} data-parallax-speed={`${0.035 + (i%3)*0.01}`}><CollapsibleEntry entry={e} /></div>)}
          </div>
        </div>
      )}

      {volunteerPast.length > 0 && (
        <div className="timeline-block right-col">
          <h3 data-parallax-speed="0.002">Past volunteer positions</h3>
          <div className="timeline-list">
            {volunteerPast.map((e,i)=> <div key={e.id} data-parallax-speed={`${0.03 + (i%3)*0.01}`}><CollapsibleEntry entry={e} /></div>)}
          </div>
        </div>
      )}
    </div>
  </section>
)

const Footer = ()=> (
  <footer className="site-footer">
    <div className="inner">© {new Date().getFullYear()} Christopher Ren</div>
  </footer>
)

export default function App(){
  return (
    <div className="app">
      <div className="ornaments" aria-hidden="true">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      <Header />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
