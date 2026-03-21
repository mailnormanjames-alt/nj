'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Cursor from '@/components/Cursor'
import Preloader from '@/components/Preloader'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import ContactForm from '@/components/ContactForm'
import ScrollReveal from '@/components/ScrollReveal'

// ─── IMAGE CONFIG ──────────────────────────────────────────────────────────────
// To add your photos, place them in /public/images/ and update these paths.
// Set hasImage: true once the file is added.
// All images should be JPG or WebP for best performance.

const HERO_IMAGE = {
  src: '/images/hero.jpg',
  alt: 'Norman James — Hero',
  hasImage: true , // set to true after adding hero.jpg
}

const CATEGORIES = [
  { id: 'portrait',    label: 'Portrait',    src: '/images/cat-portrait.jpg',    hasImage: true },
  { id: 'editorial',   label: 'Editorial',   src: '/images/cat-editorial.jpg',   hasImage: true },
  { id: 'fashion',     label: 'Fashion',     src: '/images/cat-fashion.jpg',     hasImage: true },
  { id: 'lifestyle',  label: 'Lifestyle', src: '/images/cat-lifestyle.jpg',   hasImage: true },
]

const WORKS = [
  {
    num: 'No.01', cat: 'Portrait',
    title: ['Before the', 'mask returns'],
    desc: 'A study in stillness. Shot over two days in natural light — no direction, no posing. Just presence and the moment before self-consciousness returns.',
    src: '/images/work-01.jpg', hasImage: true,
  },
  {
    num: 'No.02', cat: 'Editorial',
    title: ['What light', 'cannot hide'],
    desc: 'A six-page editorial exploring texture, shadow, and the quiet tension between subject and space. Published in collaboration with studio Noir, London.',
    src: '/images/work-02.jpg', hasImage: true,
  },
  {
    num: 'No.03', cat: 'Fashion',
    title: ['The body', 'as language'],
    desc: 'Movement captured mid-thought. A fashion series that refuses stillness — every frame taken between poses, in the breath between directions.',
    src: '/images/work-03.jpg', hasImage: true,
  },
  {
    num: 'No.04', cat: 'Lifestyle',
    title: ['Ordinary', 'extraordinary'],
    desc: 'Everyday moments rendered cinematic. A lifestyle series built on the belief that the most compelling images live in the unremarkable hours.',
    src: '/images/work-04.jpg', hasImage: true,
  },
  {
    num: 'No.05', cat: 'Portrait',
    title: ['She looked once,', 'never again'],
    desc: 'A single-session portrait study. Soft light, no retouching, no second takes. The camera found what words never could.',
    src: '/images/work-05.jpg', hasImage: true,
  },
]

const ABOUT_IMAGE = {
  src: '/images/about-portrait.jpg',
  alt: 'Norman James',
  hasImage: true, // set to true after adding about-portrait.jpg
}

// ──────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)

  const handlePreloaderDone = () => {
    setLoaded(true)
    if (heroRef.current) heroRef.current.classList.add('revealed')
  }

  // Parallax on work rows
  useEffect(() => {
    if (!loaded) return
    const rows = document.querySelectorAll('.work-row')
    rows.forEach((row) => {
      const img = row.querySelector('.work-img')
      if (!img) return
      row.addEventListener('mousemove', (e) => {
        const r = row.getBoundingClientRect()
        img.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 8}px,${((e.clientY - r.top) / r.height - 0.5) * 14}px)`
        img.style.transition = 'transform .1s'
      })
      row.addEventListener('mouseleave', () => {
        img.style.transform = ''
        img.style.transition = 'transform .6s'
      })
    })
  }, [loaded])

  const scrollSeg = Array(8).fill(null)

  return (
    <>
      <Cursor />
      <Preloader onDone={handlePreloaderDone} />
      <Sidebar />
      <TopBar />
      <ScrollReveal />

      <main className="main">

        {/* ── HERO ───────────────────────────────────── */}
        <section id="hero" ref={heroRef} className="hero">
          <div className="hero-film">
            <div className="hero-film-l" />
            <div className="hero-film-r">
              {HERO_IMAGE.hasImage ? (
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  priority
                  quality={95}
                  className="hero-img"
                  sizes="100vw"
                />
              ) : (
                <span className="hero-img-ph">Add hero.jpg</span>
              )}
            </div>
          </div>
          <div className="hero-divider" />

          <div className="scene-info">
            <span><strong>NJ</strong> — 001</span>
            <span>Portrait / Editorial</span>
            <span>Est. 2013</span>
          </div>

          <div className="hero-scroll">Scroll</div>

          <div className="hero-type">
            <div className="ht-row">
              <span className="ht-word">The</span>
              <span className="ht-num">Portrait &amp; Editorial</span>
            </div>
            <div className="ht-row"><span className="ht-word">Face</span></div>
            <div className="ht-row"><span className="ht-word">Never</span></div>
            <div className="ht-row"><span className="ht-word serif">lies.</span></div>
          </div>

          <div className="hero-sub">
            <p className="hero-sub-desc">
              Photography that finds the unrepeatable moment — before the mask goes back on. Commissions open.
            </p>
            <a className="hero-sub-cta" href="#works">View Work</a>
          </div>
        </section>

        {/* ── UNDER CONSTRUCTION SCROLLER ────────────── */}
        <div className="under-strip">
          <div className="under-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="under-seg" aria-hidden={copy === 1 ? 'true' : undefined}>
                {scrollSeg.map((_, i) => (
                  <span key={i}>
                    <span className="under-txt">
                      {i % 2 === 0 ? 'Site under construction' : 'Coming soon'}
                    </span>
                    <span className="under-star" style={{ marginLeft: 24 }}>✦</span>
                    &nbsp;&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── EXPLORE THE WORK ───────────────────────── */}
        <section id="explore" className="explore">
          <div className="explore-header sr">
            <h2 className="explore-title">
              Explore
              <em>the work</em>
            </h2>
            <p className="explore-sub">Four disciplines.<br />One consistent eye.</p>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.id} className={`cat-card sr d${i + 1}`}>
                <div className="cat-card-bg">
                  {cat.hasImage ? (
                    <Image
                      src={cat.src}
                      alt={cat.label}
                      fill
                      quality={90}
                      className="cat-card-img"
                      sizes="(max-width:900px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="cat-card-ph">{cat.src.split('/').pop()}</div>
                  )}
                </div>
                <div className="cat-card-overlay">
                  <span className="cat-card-label">
                    {cat.hasImage ? 'View Series' : 'Add images'}
                  </span>
                  <h3 className="cat-card-name">{cat.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SELECTED WORKS ─────────────────────────── */}
        <section id="works" className="works">
          <div className="works-head">
            <h2 className="works-head-title sr">Selected Work</h2>
            <span className="works-head-meta sr d2">2019 — 2025</span>
          </div>
          {WORKS.map((w, i) => (
            <div key={w.num} className={`work-row sr${i > 0 ? ` d${i}` : ''}`}>
              <div className="work-n"><span>{w.num}</span></div>
              <div className="work-info">
                <span className="work-cat">{w.cat}</span>
                <h3 className="work-title">
                  {w.title[0]}<br /><em>{w.title[1]}</em>
                </h3>
                <p className="work-desc">{w.desc}</p>
              </div>
              <div className="work-img-col">
                <div className="work-img">
                  {w.hasImage ? (
                    <Image src={w.src} alt={w.title.join(' ')} fill quality={90} className="work-img-actual" sizes="(max-width:900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className="work-img-ph">{w.src.split('/').pop()}</div>
                  )}
                  <div className="work-img-bar" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── QUOTE ──────────────────────────────────── */}
        <div className="mid-quote">
          <span className="mq-label sr">Method</span>
          <div>
            <p className="mq-text sr d1">
              &ldquo;I work in the gap between what people show and what they cannot hide.&rdquo;
            </p>
            <span className="mq-attr sr d2">— Norman James</span>
          </div>
        </div>

        {/* ── ABOUT ──────────────────────────────────── */}
        <section id="about" className="about">
          <div className="about-l">
            <p className="about-eye sr">About</p>
            <h2 className="about-title sr d1">
              Norman<span>James</span>
            </h2>
            <div className="about-text sr d2">
              <p>
                Norman James is a portrait and editorial photographer working at the intersection
                of intimacy and craft. His images are built slowly — in the space between direction
                and accident, between what a subject intends and what the light reveals.
              </p>
              <p>
                His work spans editorial commissions, personal portraiture, and long-form documentary
                projects. He shoots on film and digital, bringing the same unhurried attention to both.
              </p>
              <p>
                Available for editorial assignments, brand collaborations, and private portrait
                commissions worldwide.
              </p>
            </div>
            <a href="#contact" className="about-link sr d3">
              Commission a project
              <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
                <path d="M1 4h18M14 1l5 3-5 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="about-r sr d1">
            <div className="about-img">
              {ABOUT_IMAGE.hasImage ? (
                <Image
                  src={ABOUT_IMAGE.src}
                  alt={ABOUT_IMAGE.alt}
                  fill
                  quality={90}
                  className="about-img-photo"
                  sizes="(max-width:768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="about-img-ph">about-portrait.jpg</div>
              )}
              <div className="about-img-rule" />
            </div>
            <div className="about-stats">
              <div className="astat"><div className="astat-n">12+</div><div className="astat-l">Years active</div></div>
              <div className="astat"><div className="astat-n">4</div><div className="astat-l">Disciplines</div></div>
              <div className="astat"><div className="astat-n">Film</div><div className="astat-l">&amp; Digital</div></div>
              <div className="astat"><div className="astat-n">Global</div><div className="astat-l">Commissions</div></div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ────────────────────────────────── */}
        <section id="contact" className="contact">
          <div className="ct-top">
            <span className="ct-label sr">Commissions &amp; Enquiries</span>
            <div className="ct-avail sr">Currently available<br />for new work</div>
          </div>
          <div className="ct-heading sr">
            <div className="ch-row">Let&apos;s</div>
            <div className="ch-row">Make</div>
            <div className="ch-row"><em>something</em></div>
            <div className="ch-row">Real.</div>
          </div>
          <ContactForm />
        </section>

        {/* ── INSTAGRAM STRIP ────────────────────────── */}
        <section className="insta-section">
          <div className="insta-header sr">
            <h2 className="insta-title">Connect <em>With Us</em></h2>
            <a href="https://instagram.com/normanjames" target="_blank" rel="noopener noreferrer" className="insta-handle">@normanjames</a>
          </div>
          <div className="insta-strip">
            {[1,2,3,4,5,6,7,8].map((n) => (
              <a key={n} href="https://instagram.com/normanjames" target="_blank" rel="noopener noreferrer" className="insta-item">
                <Image
                  src={`/images/instagram-1__${n}_.jpg`}
                  alt={`Norman James Instagram ${n}`}
                  fill
                  quality={90}
                  className="insta-img"
                  sizes="25vw"
                />
                <div className="insta-overlay">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────── */}
        <footer className="footer">
          <span className="ft-copy">&copy; 2025 Norman James — All Rights Reserved</span>
          <span className="ft-logo">NJ</span>
        </footer>

      </main>
    </>
  )
}
