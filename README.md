# Norman James — Portfolio

## Quick Start

```bash
npm
npm run dev
# Open http://localhost:3000
```

---

## Deploy to Vercel (3 steps)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "init"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/norman-james.git
git push -u origin main
```

### 2. Import on Vercel
1. Go to **vercel.com** → New Project
2. Click **Import** next to your GitHub repo
3. Leave all settings as default (Next.js is auto-detected)
4. Click **Deploy**

That's it. Vercel auto-deploys every time you push to GitHub.

### 3. Custom Domain (optional)
Vercel Dashboard → Your Project → Settings → Domains → Add `normanjames.com`

---

## How to Add Images

### Where to put them
All images go in the `/public/images/` folder.

### File names (exact — case sensitive)
```
public/
  images/
    hero.jpg              ← right half of the hero section
    cat-portrait.jpg      ← Portrait category card
    cat-editorial.jpg     ← Editorial category card
    cat-fashion.jpg       ← Fashion category card
    cat-documentary.jpg   ← Documentary category card
    work-01.jpg           ← Selected Works row 1
    work-02.jpg           ← Selected Works row 2
    work-03.jpg           ← Selected Works row 3
    work-04.jpg           ← Selected Works row 4
    about-portrait.jpg    ← About section photo
```

### After adding each image
Open `app/page.jsx` and find the image config at the top of the file.
Change `hasImage: false` to `hasImage: true` for each image you've added:

```js
// BEFORE
const HERO_IMAGE = {
  src: '/images/hero.jpg',
  alt: 'Norman James — Hero',
  hasImage: false,   // ← placeholder shown
}

// AFTER
const HERO_IMAGE = {
  src: '/images/hero.jpg',
  alt: 'Norman James — Hero',
  hasImage: true,    // ← your photo now shows
}
```

Same for works — find the WORKS array and flip `hasImage: true`, then update the title and description:

```js
{
  num: 'No.01', cat: 'Portrait',
  title: ['Silence', 'in the studio'],   // ← your real title
  desc: 'A 3-day shoot with dancer Elena Morse in north London.',
  src: '/images/work-01.jpg',
  hasImage: true,   // ← flip this
},
```

### Recommended image sizes
| Image             | Aspect ratio | Recommended size  |
|-------------------|--------------|-------------------|
| hero.jpg          | Free         | 1200 × 1600px+    |
| cat-*.jpg         | 3:4 portrait | 800 × 1067px      |
| work-01–04.jpg    | 3:4 portrait | 800 × 1067px      |
| about-portrait.jpg| 2:3 portrait | 800 × 1200px      |

### Format
- Use **JPG** or **WebP** (WebP is smaller and faster)
- Keep files under 1MB — Next.js will auto-optimise them on Vercel
- Don't use spaces in filenames

---

## Project Structure
```
norman-james/
├── app/
│   ├── globals.css       ← all styles
│   ├── layout.jsx        ← HTML shell + metadata
│   └── page.jsx          ← entire site (edit images & content here)
├── components/
│   ├── Cursor.jsx        ← crosshair cursor
│   ├── Preloader.jsx     ← loading screen
│   ├── Sidebar.jsx       ← left nav bar
│   ├── TopBar.jsx        ← top info bar + live clock
│   ├── ContactForm.jsx   ← contact form
│   └── ScrollReveal.jsx  ← scroll animations
├── public/
│   └── images/           ← PUT YOUR PHOTOS HERE
├── next.config.js
└── package.json
```

---

## Updating Content

All text content is in `app/page.jsx`. Look for these sections:

- **WORKS array** — titles, descriptions, categories for each project row
- **CATEGORIES array** — the 4 Explore cards
- **About section** — find the `<p>` tags inside `about-text`
- **Contact email** — search for `hello@normanjames.com` and replace
- **Social links** — find `ct-soc` links and add your real URLs

---

## Contact Form (live emails)

The form currently shows a success state on submit. To actually receive emails:

1. Sign up at **formspree.io** (free)
2. Create a form → copy your endpoint URL
3. In `components/ContactForm.jsx`, replace the `handleSubmit` function:

```js
const handleSubmit = async (e) => {
  e.preventDefault()
  setSending(true)
  const data = new FormData(e.target)
  await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  })
  setSent(true)
}
```
