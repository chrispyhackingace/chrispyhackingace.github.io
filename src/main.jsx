import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

// enable smooth scrolling class for the body
if (typeof document !== 'undefined') {
  document.body.classList.add('smooth-scroll-enabled')
}
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// JS-based smooth scrolling for anchors (handles sticky header offsets reliably)
if (typeof window !== 'undefined') {
  const headerSelector = '.site-header'

  function getHeaderHeight() {
    const header = document.querySelector(headerSelector)
    if (!header) return 0
    return header.getBoundingClientRect().height
  }

  function scrollToHash(hash) {
    if (!hash) return
    const id = hash.replace('#','')
    const el = document.getElementById(id) || document.querySelector(`a[name="${id}"]`)
    if (!el) return
    const headerHeight = getHeaderHeight()
    const rect = el.getBoundingClientRect()
    const top = rect.top + window.scrollY - headerHeight - 12 // small gap
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Create a playful nav-hover overlay used for header navigation animations
  let navOverlay = document.getElementById('nav-hover-overlay')
  if (!navOverlay) {
    navOverlay = document.createElement('div')
    navOverlay.id = 'nav-hover-overlay'
    navOverlay.className = 'nav-hover-overlay'
    navOverlay.innerHTML = `<div class="overlay-inner"><div class="overlay-text">404 Not Found</div></div>`
    document.body.appendChild(navOverlay)
  }

  function showNavOverlay(cb){
    if(!navOverlay) return cb && cb()
    const textEl = navOverlay.querySelector('.overlay-text')
    if(!textEl) return cb && cb()
    // show first message
    navOverlay.classList.remove('play')
    navOverlay.classList.add('visible')
    textEl.textContent = '404 Not Found'
    // after a short pause, change to 'Just kidding' / 'jk'
    setTimeout(()=>{
      textEl.textContent = 'Just kidding'
    }, 550)
    // after showing both messages, trigger the swipe animation
    setTimeout(()=>{
      // start swipe animation
      navOverlay.classList.remove('visible')
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      navOverlay.offsetWidth
      navOverlay.classList.add('play')
      const onEnd = (e) => {
        if (e.target !== navOverlay) return
        navOverlay.removeEventListener('animationend', onEnd)
        // cleanup and callback
        navOverlay.classList.remove('play')
        textEl.textContent = ''
        cb && cb()
      }
      navOverlay.addEventListener('animationend', onEnd)
    }, 1200)
  }

  // Pin/Unpin name-overlay so it stays fixed while the profile picture is visible,
  // then allows scrolling away only after the picture is off-screen. Wait for
  // React to render the nodes if they don't exist yet.
  (function(){
    if(!('IntersectionObserver' in window)) return
    let obs = null
    function attachObservers(){
      const profile = document.querySelector('.profile-sticker')
      const nameOverlay = document.querySelector('.name-overlay')
      if(!profile || !nameOverlay) return false
      // clean previous
      if(obs) obs.disconnect()
      obs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting && e.intersectionRatio > 0){
            nameOverlay.classList.add('visible')
          } else {
            nameOverlay.classList.remove('visible')
          }
        })
      }, { root: null, threshold: 0.01 })
      obs.observe(profile)
      // initial state
      const rect = profile.getBoundingClientRect()
  if(rect.top < window.innerHeight && rect.bottom > 0) nameOverlay.classList.add('visible')
      return true
    }

    // Try immediately; if not present, observe DOM mutations for a short while
    if(attachObservers()) return
    let mo = null
    let tries = 0
    const maxTries = 40
    function checkSoon(){
      tries += 1
      if(attachObservers()){
        if(mo) mo.disconnect()
        return
      }
      if(tries >= maxTries){
        if(mo) mo.disconnect()
        return
      }
      setTimeout(checkSoon, 120)
    }
    try{
      mo = new MutationObserver(()=>{ if(attachObservers()){ if(mo) mo.disconnect() } })
      mo.observe(document.body, { childList: true, subtree: true })
    }catch(err){ }
    // fallback polling
    setTimeout(checkSoon, 120)
  })()

  // Intercept clicks on same-page anchors. We intentionally do NOT set the
  // listener to passive so we can call `preventDefault()` and avoid the
  // browser's instant jump to the hash target.
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a')
    if (!a) return
    const href = a.getAttribute('href')
    if (!href) return

    // ignore links that aren't anchors at all
    // Accept forms: '#id', '/#id', 'http(s)://host/...#id'
    const url = (() => {
      try {
        // If href is absolute, this will parse; if relative, we resolve against current location
        return new URL(href, window.location.href)
      } catch (err) {
        return null
      }
    })()
    if (!url) return

    // Only handle same-origin links that include a hash
    if (url.origin !== window.location.origin) return
    if (!url.hash) return

    // allow hrefs that are just '#' to behave normally
    if (url.hash === '#') return

    // same-page anchor — prevent default and smooth-scroll
    e.preventDefault()
    // update the address bar without causing a jump
    try { history.pushState(null, '', url.pathname + url.search + url.hash) } catch (err) {}
    // If this is a header nav anchor, show the playful overlay first then scroll
    if (a.closest && a.closest('.site-header')) {
      showNavOverlay(()=> scrollToHash(url.hash))
    } else {
      scrollToHash(url.hash)
    }
  })

  // On initial load, if there's a hash in the URL, scroll to it (after mount)
  window.addEventListener('load', () => {
    if (window.location.hash) {
      // slight delay to ensure layout is ready
      setTimeout(() => scrollToHash(window.location.hash), 50)
    }
  })

  // Handle back/forward navigation to hashes
  window.addEventListener('popstate', () => {
    if (window.location.hash) {
      // a small timeout helps ensure elements are in place
      setTimeout(() => scrollToHash(window.location.hash), 10)
    } else {
      // if no hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
}

// Toggle header 'scrolled' class to animate blur/opacity smoothly
if (typeof window !== 'undefined') {
  const header = document.querySelector('.site-header')
  function updateHeaderScrolled() {
    if (!header) return
    const scrolled = window.scrollY > 24
    header.classList.toggle('scrolled', scrolled)
  }
  window.addEventListener('scroll', () => {
    // throttle via requestAnimationFrame for smoothness
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(updateHeaderScrolled)
    } else {
      updateHeaderScrolled()
    }
  }, { passive: true })
  // initial state
  updateHeaderScrolled()
}

// --- Parallax and slower scrolling control ---
if (typeof window !== 'undefined') {
  // Parallax: robust detector and update loop. Elements with data-parallax-speed move at different rates.
  let parallaxElements = []
  function collectParallax(){
    parallaxElements = Array.from(document.querySelectorAll('[data-parallax-speed]'))
  }
  collectParallax()
  function updateParallax(){
    const scrollY = window.scrollY
    // NOTE: per-user request: disable varied parallax speeds. We keep the
    // element collection to avoid breaking other code, but we no-op transform
    // updates here so headings and content rely on CSS sticky behavior.
    parallaxElements.forEach(el=>{
      // Clear any inline transform left from previous behavior so CSS positioning
      // (e.g., position: sticky) can take effect predictably.
      if(el && el.style && el.style.transform) el.style.transform = ''
    })
  }
  // (parallax updates are handled in rafUpdate below which also runs pin updates)

  // Recollect parallax elements when DOM changes (simple MutationObserver)
  try{
    const mo = new MutationObserver(()=>{ collectParallax(); collectPins(); })
    mo.observe(document.body, { childList: true, subtree: true })
  }catch(err){}

  // --- Pinning: elements with data-parallax-pin="..." will stay visually pinned until their container scrolls past ---
  let pinElements = []
  function collectPins(){
    pinElements = Array.from(document.querySelectorAll('[data-parallax-pin]')).map(el=>{
      const scope = el.getAttribute('data-parallax-pin') || 'container'
      // find the nearest ancestor matching 'section' or '.inner' or fallback to parent
      let container = el.closest('section') || el.closest('.inner') || el.parentElement
      return { el, scope, container }
    })
  }
  collectPins()

  function updatePins(){
    const vh = window.innerHeight
    pinElements.forEach(({el, container})=>{
      if(!container) return
      const contRect = container.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      // When the top of the container is above the viewport and the bottom of the container is below the top of the viewport + some offset,
      // keep the element visually at a pinned Y position (we choose its current top offset).
      const headerH = (document.querySelector('.site-header')||{getBoundingClientRect:()=>({height:0})}).getBoundingClientRect().height
      const pinStart = Math.max(contRect.top, headerH)
      const pinEnd = contRect.bottom
      if(contRect.top <= headerH && contRect.bottom > headerH + elRect.height){
        // pinned: compute Y so element appears at headerH (just below header)
        const targetY = headerH - elRect.top
        el.style.transform = `translate3d(0, ${Math.round(targetY)}px, 0)`
        el.style.position = 'relative'
        el.style.willChange = 'transform'
      } else {
        // release to normal parallax behavior — clear the inline transform so updateParallax can set it
        // but only if the element has an inline transform previously set by pinning
        if(el.style && el.style.transform){
          el.style.transform = ''
        }
      }
    })
  }

  // call updatePins alongside parallax updates
  function rafUpdate(){ updateParallax(); updatePins() }
  window.addEventListener('scroll', () => {
    if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(rafUpdate)
    else { updateParallax(); updatePins() }
  }, { passive: true })
  window.addEventListener('resize', ()=>{ collectParallax(); collectPins(); updateParallax(); updatePins() })

  // Inertia slow-scroll: a lightweight scroller that accumulates wheel deltas and decays over time for smooth prolonged scrolling.
  (function(){
    const enabled = true
    if(!enabled) return
    let velocity = 0
    let frame = null
  // Make the scrolling feel much slower and longer-lived:
  const decay = 0.985 // closer to 1 so velocity decays slowly
  const maxVelocity = 12000 // allow long momentum when user scrolls
    let isPointerOverInput = false

    window.addEventListener('pointerover', (e)=>{
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) isPointerOverInput = true
      else isPointerOverInput = false
    })

    function step(){
      if(Math.abs(velocity) < 0.05){ velocity = 0; frame = null; return }
      // apply a gentle fraction each frame so scroll progresses slowly
      window.scrollBy({ top: velocity * 0.9, left: 0, behavior: 'auto' })
      velocity *= decay
      frame = requestAnimationFrame(step)
    }

    window.addEventListener('wheel', (e)=>{
      if (isPointerOverInput) return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      // Add the wheel delta to velocity; invert sign so wheel down scrolls down
  // Very small contribution per wheel tick to slow down responsiveness
  const contribution = e.deltaY * 0.12
  velocity += contribution
      // clamp
      velocity = Math.max(Math.min(velocity, maxVelocity), -maxVelocity)
      if(!frame) frame = requestAnimationFrame(step)
      e.preventDefault()
    }, { passive: false })
  })()

  // Simple AudioPlayer helper exposed to window for now
  (function(){
    const aud = new Audio()
    aud.loop = false
    let playlist = []
    let idx = 0
    function play(){ if (playlist.length===0) return; aud.src = playlist[idx]; aud.play().catch(()=>{}) }
    function pause(){ aud.pause() }
    function next(){ if (playlist.length===0) return; idx = (idx+1)%playlist.length; play() }
    function prev(){ if (playlist.length===0) return; idx = (idx-1+playlist.length)%playlist.length; play() }
    function set(list){ playlist = list.slice(); idx = 0 }
    window.AudioPlayer = { play, pause, next, prev, set }
  })()
}
