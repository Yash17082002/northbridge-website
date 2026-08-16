# Northbridge Website — Deployment Guide

This guide walks you through everything you need to get **northbridge-website** online. It assumes you're not a developer. Every step is written to be followed verbatim.

---

## What you're deploying

The `northbridge-website` folder is a **static website**. That means:

- No servers to run, no databases to set up
- No `npm install`, no build step, no Docker
- Everything is plain HTML, CSS, and JavaScript
- It can be hosted **free** on multiple platforms

You have five folders and files that must stay together:

```
northbridge-website/
├── index.html                    ← the main page
├── styles.css                    ← all styling
├── assets/
│   ├── logo.svg                  ← the Northbridge logo
│   └── network-background.mp4    ← video used in the matching section
├── data/
│   └── professors.js             ← professor database (40 entries)
├── js/
│   ├── main.js                   ← interactivity, animations, modals
│   └── matching-engine.js        ← the matching algorithm
└── DEPLOYMENT_GUIDE.md           ← this file (you can delete before deploying)
```

---

## Step 1 — Test it locally on your Mac / laptop first

Before putting anything online, confirm the site works on your own machine.

### Option A — Simplest (works on any computer)

1. Open the `northbridge-website` folder
2. Double-click `index.html`
3. It opens in your default browser

**Warning:** Some browsers (especially Chrome) block JavaScript files when opened this way. If the animated background is blank or the matching engine doesn't work, use Option B instead.

### Option B — Run a tiny local server (recommended, 2 minutes)

**On Mac:**

1. Open the **Terminal** app (press `Cmd + Space`, type "terminal", press Enter)
2. Copy-paste this, replacing `PATH` with the actual location of the folder:
   ```
   cd PATH/northbridge-website
   ```
   To get the path easily: drag the folder from Finder into the Terminal window after typing `cd `. Press Enter.
3. Then paste this:
   ```
   python3 -m http.server 8000
   ```
   Press Enter. You'll see a line like `Serving HTTP on ...`
4. Open your browser and go to: `http://localhost:8000`
5. When you're done testing, go back to Terminal and press `Ctrl + C` to stop the server

**On Windows:**

1. Open **PowerShell** (press Windows key, type "powershell", press Enter)
2. `cd` into the folder the same way (drag folder into window after typing `cd `)
3. Type:
   ```
   python -m http.server 8000
   ```
4. Open browser to `http://localhost:8000`

If you don't have Python installed on Windows, install it free from `python.org/downloads/` first — during install, tick the box that says "Add Python to PATH".

### What to check while testing

- The hero page loads with the animated dark background
- Clicking any menu item scrolls smoothly to the right section
- On the "Find a Professor" section, click a chip like "Battery thermal management" and click **Analyse Problem** — you should see 5 professor cards appear with match scores
- Click one of the "Three Ways In" cards (Open Challenge, Guided Search, Encrypted Matching) — a form modal should open
- Scroll to the very bottom — the footer should show 4 columns and the tagline

If everything works locally, you're ready to publish.

---

## Step 2 — Choose where to host the site

You have three good options, all **free**:

| Platform | Best for | Custom domain? | Difficulty |
|---|---|---|---|
| **GitHub Pages** | The default, most portable, most credible | Yes, free | Easiest |
| **Netlify** | Drag-and-drop simplicity, forms work out of the box | Yes, free | Very easy |
| **Vercel** | Very fast global CDN, good if you'll add features later | Yes, free | Easy |

**My recommendation: start with Netlify.** It's the fastest to get online (literally 60 seconds), and it handles contact form submissions for you without any extra setup. You can always migrate later.

If you want maximum credibility with corporate clients (a `.github.io` URL looks a bit developer-y), get a proper domain (Step 6 below) — that works with all three.

---

## Step 3A — Deploy to Netlify (recommended, 60 seconds)

1. Go to **netlify.com/drop** in your browser (that's `https://app.netlify.com/drop`)
2. In another window, open your file explorer / Finder and find the `northbridge-website` folder
3. **Drag the whole folder** onto the big drop zone on the Netlify page
4. Wait 20–30 seconds. Netlify will assign you a random URL like `wonderful-panda-a1b2c3.netlify.app`
5. Click that URL. Your site is live.

**To rename it to something sensible:**
1. On the Netlify page, click **"Site settings"** → **"Change site name"**
2. Change it to something like `northbridge-india` → your URL becomes `northbridge-india.netlify.app`

**To update the site later:**
1. Make your changes to the local files
2. Go back to `netlify.com/drop` and drag the folder again
3. Or, in your existing site's dashboard, click **"Deploys"** → drag the folder into the "Need to update your site?" area

**Enable forms:**
The site currently shows a confirmation message when someone fills a form, but the data isn't sent anywhere. To capture form submissions:
1. In your Netlify dashboard, click **Forms** in the top menu
2. Netlify auto-detects HTML forms — I've noted below how to enable this properly if you need it (Step 8)

---

## Step 3B — Deploy to GitHub Pages (more control, ~10 minutes)

Use this if you want your site's source code in version control (recommended for the long run).

**One-time setup:**

1. Go to **github.com** and create a free account if you don't have one
2. Once logged in, click the **`+`** in the top-right → **New repository**
3. Name it `northbridge-website` (or whatever you like — this becomes part of the URL)
4. Set it to **Public**
5. Tick **"Add a README file"**
6. Click **Create repository**

**Upload your files:**

1. On the new repository page, click the **"Add file"** dropdown → **"Upload files"**
2. Open your `northbridge-website` folder on your computer
3. **Select every file and folder inside it** (not the folder itself — the contents), and drag them all onto the GitHub page
4. Wait for the upload progress bar to complete (the video file is ~3 MB, so it takes a few seconds)
5. Scroll down, add a commit message like *"Initial deploy"* and click **Commit changes**

**Turn on GitHub Pages:**

1. In the same repository, click the **Settings** tab (top nav bar)
2. In the left sidebar, click **Pages**
3. Under **"Build and deployment"** → **Source**, choose **"Deploy from a branch"**
4. Under **Branch**, choose `main` and `/ (root)` and click **Save**
5. Wait 1–2 minutes. Refresh the page. You'll see a message like *"Your site is live at https://YOURNAME.github.io/northbridge-website/"*
6. Click the URL. Site's live.

**To update the site later:**
1. Go to your repository on github.com
2. Navigate to the file you want to change (e.g. `data/professors.js`)
3. Click the pencil icon (top-right of the file view)
4. Make your edits, scroll down, add a commit message, click **Commit changes**
5. GitHub Pages redeploys automatically in ~1 minute

---

## Step 3C — Deploy to Vercel (also 60 seconds)

1. Go to **vercel.com** and sign up (you can sign in with GitHub if you have it)
2. Click **"Add New..."** → **"Project"**
3. If you already uploaded to GitHub (Step 3B), select that repo and click **Deploy** — done
4. Otherwise, use their drag-and-drop: click **"Deploy without Git"** at the bottom and drop your folder

You get a URL like `northbridge-website.vercel.app`

---

## Step 4 — Verify everything works online

Go to your new URL (whichever platform you chose) and check:

1. **Hero animation** — the particle network animation is running in the background
2. **Fonts** — the headline uses a serif font (Georgia / EB Garamond) with italics on "inside India's universities"
3. **Matching engine** — click "Battery thermal management" chip, click **Analyse Problem**, wait 2 seconds, see 5 cards with match scores
4. **Forms** — click "Publish a Challenge" — the modal should open with the form
5. **Mobile** — open the URL on your phone. The layout should adapt, hamburger menu icon should appear
6. **HTTPS** — the URL should start with `https://` (all 3 platforms give you free HTTPS automatically)

If anything doesn't work, check the browser console: right-click → **Inspect** → **Console** tab. Any error messages there will tell you what's wrong.

---

## Step 5 — (Optional) Point your own domain at the site

If you buy a domain like `northbridge.in`, here's how to hook it up.

**Buy a domain:**
- **Namecheap** (namecheap.com) — good for `.com`, `.io`, `.ai`
- **GoDaddy** (godaddy.com) — good for `.in` domains
- Expect to pay ₹700–₹1,500/year for `.in` or `.com`, more for `.ai` (~₹8,000/year)

**Connect it to Netlify (easiest):**

1. In your Netlify site dashboard → **Domain settings** → **Add custom domain**
2. Type your domain (e.g. `northbridge.in`) and click Verify → Add domain
3. Netlify shows you either 2 A records or a CNAME record to add
4. Log into your domain registrar (Namecheap/GoDaddy) and paste those DNS records
5. Wait 1–24 hours for DNS to propagate. Your custom domain works.

**Connect it to GitHub Pages:**

1. In your GitHub repo → **Settings** → **Pages** → **Custom domain**
2. Type your domain, click **Save**
3. GitHub tells you to add DNS records with your registrar:
   - `A` records pointing to GitHub's IP addresses (Github will list them)
   - Or a `CNAME` record pointing to `YOURNAME.github.io`
4. Add those, wait, done. Tick **"Enforce HTTPS"** once it's available (usually within a few hours).

---

## Step 6 — Make the contact forms actually work

Right now, when someone fills a form and clicks submit, they see a success message — but **the form data goes nowhere**. It's a UI-only demo.

To actually receive form submissions to your email, pick one of these:

**Option A — Netlify Forms (only if hosted on Netlify)**

1. In `index.html`, find each `<form>` tag inside a modal (there are 5 modals)
2. Add `netlify` and `name="the-form-name"` to each `<form>` opening tag:
   ```html
   <form netlify name="open-challenge">
   ```
3. Redeploy. In your Netlify dashboard → **Forms**, you'll see submissions appear.

*Note: my current build has the modals rendered dynamically via JavaScript, so this needs a small tweak — the forms need to be present in the HTML at build time for Netlify to detect them. See "Form fix for Netlify" appendix at the bottom.*

**Option B — Formspree (works on any host)**

1. Sign up at **formspree.io** (free tier: 50 submissions/month)
2. Create a new form. Formspree gives you an endpoint URL like `https://formspree.io/f/xyzabc`
3. In `js/main.js`, find the `ModalController` section and locate the form submission code (look for `handleSubmit` or the button that says "Publish Challenge"). Replace the "show success" logic with a `fetch()` call to your Formspree endpoint.
4. Or use their AJAX example from their docs.

**Option C — Google Sheets via Google Apps Script (free, unlimited)**

Slightly more setup but gives you a spreadsheet you can filter and sort. Search *"submit HTML form to Google Sheets Apps Script"* for step-by-step guides — the pattern is:
1. Create a new Google Sheet
2. Tools → Apps Script → paste a small `doPost()` function
3. Deploy as web app, get a URL
4. `POST` your form data to that URL from `main.js`

---

## Step 7 — Turn on analytics

To see who visits and what they click:

**Plausible** (privacy-friendly, paid ~$9/month):
- Sign up at plausible.io
- They give you a `<script>` tag
- Paste it in `index.html` just before `</head>`

**Google Analytics 4** (free):
- Sign up at analytics.google.com
- Create a property for your site
- Google gives you a `<script>` tag
- Paste it in `index.html` just before `</head>`

---

## Step 8 — Ongoing maintenance

### Add or edit a professor

1. Open `data/professors.js` in any text editor (VS Code, Sublime, or even TextEdit / Notepad)
2. Copy an existing entry and modify the fields:
   - `id` — a unique short string, e.g. `iitb_newprof`
   - `name` — full name with Prof. prefix
   - `institution` — must match one of the tier definitions in `js/matching-engine.js`
   - `primaryDomains` — an array of domain keys from `DOMAIN_METADATA`
   - `keywords` — free-form list of research keywords the engine uses to match
   - `profileUrl` — link to the professor's institutional page (used for the "Verify on institutional page" link)
3. Save, redeploy (drag folder to Netlify again, or commit to GitHub)

### Change colours or fonts

Open `styles.css`. The very first block starting with `:root {` defines all the design tokens:

```css
:root {
  --bg-primary: #050505;
  --accent: #D6B56A;
  --text-primary: #F4F1E9;
  --font-display: 'EB Garamond', Georgia, serif;
  --font-editorial: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Cambria', Georgia, serif;
  ...
}
```

Change these values and the whole site updates. Redeploy.

### Change the hero headline or any copy

All text lives in `index.html`. Search for the text you want to change, edit it directly, save, redeploy.

### Update the professor matching weights

Open `js/matching-engine.js`. Find the `SCORING_WEIGHTS` constant at the top:

```js
const SCORING_WEIGHTS = {
  research: 0.30,      // domain overlap
  keyword: 0.20,       // keyword overlap
  method: 0.15,
  industry: 0.10,
  publication: 0.10,
  institution: 0.05,
  crossDomain: 0.05,
  availability: 0.05
};
```

The weights must sum to 1.0. Change these to reflect what you value more.

### Add more example problem chips

In `index.html`, search for `class="match-example-chips"`. You'll see 6 chips defined. Add another `<button class="match-chip" data-example="myexample">...`, then in `js/main.js` search for `EXAMPLE_PROBLEMS` and add `myexample: "your problem text here"` to that object.

---

## Step 9 — Performance check

After going live, run a **Lighthouse** audit:

1. Open the site in Chrome
2. Right-click anywhere → **Inspect**
3. Click the **Lighthouse** tab
4. Click **Analyze page load**

You should see scores of 90+ across Performance, Accessibility, Best Practices, and SEO. If not, tell me and I'll help optimize.

---

## Common issues and fixes

**"The video background isn't playing."**
→ Some browsers block auto-playing videos with sound. My video has no audio track so this shouldn't happen, but if it does, the site falls back to just the dark background — no visual break.

**"The particle animation is slow / laggy."**
→ On very old devices this can happen. The animation respects the browser's `prefers-reduced-motion` setting, so users who've toggled that in their OS see a static background.

**"Google Fonts aren't loading, text looks like Times New Roman."**
→ Check your internet connection when opening the page. The site loads EB Garamond and Cormorant Garamond from Google Fonts. If someone is offline, Georgia (a system font) is the fallback and looks 90% as good.

**"Deployment fails on Netlify with an error."**
→ Almost always: you dragged the wrong folder. You need to drag either the `northbridge-website` folder itself, OR the contents. Not the parent folder that contains `northbridge-website`.

**"The match cards look weird on my phone."**
→ Try refreshing. If still weird, tell me your phone model and browser — I've tested on iOS Safari and Chrome for Android but there may be edge cases.

**"I want to hide the demo dataset disclaimer."**
→ In `index.html`, search for `runs on a small demo dataset` and delete or edit that sentence.

---

## Appendix — Form fix for Netlify

If you want Netlify Forms to work, the forms need to be present as static HTML at build time (not dynamically injected by JavaScript, which is how my current build handles them).

Quick fix: at the very bottom of `index.html`, just before `</body>`, add a hidden version of each form with `netlify` attributes:

```html
<!-- Netlify form detection (hidden) -->
<form name="open-challenge" netlify hidden>
  <input type="text" name="company" />
  <input type="text" name="project-title" />
  <textarea name="problem"></textarea>
  <input type="text" name="timeline" />
  <input type="email" name="email" />
</form>

<form name="guided-search" netlify hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="what-you-need"></textarea>
</form>

<form name="encrypted-match" netlify hidden>
  <input type="text" name="company" />
  <input type="text" name="contact-name" />
  <input type="email" name="email" />
  <textarea name="brief"></textarea>
</form>

<form name="professor-apply" netlify hidden>
  <input type="text" name="name" />
  <input type="text" name="institution" />
  <input type="email" name="email" />
  <textarea name="research-areas"></textarea>
</form>

<form name="contact" netlify hidden>
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
</form>
```

Then update `js/main.js` to also `POST` submissions to Netlify's form endpoint (their docs at `docs.netlify.com/forms/setup/` show the AJAX pattern).

---

## Cost summary

| Item | Cost |
|---|---|
| Hosting (Netlify / GitHub Pages / Vercel) | **Free** |
| HTTPS / SSL certificate | **Free** (auto) |
| `northbridge.in` domain | ~₹700/year |
| `northbridge.com` domain | ~₹1,200/year |
| Netlify Forms (up to 100 submissions/mo) | **Free** |
| Formspree (up to 50 submissions/mo) | **Free** |
| Plausible analytics | ~₹700/month |
| Google Analytics | **Free** |
| **Minimum viable** | **~₹60/month** (just domain) |
| **Fully loaded** | **~₹800/month** |

---

## When you hit a wall

If a step above doesn't work as described, common causes:

1. **File was renamed accidentally** — check that `index.html` is spelled exactly right (all lowercase)
2. **Files were unzipped into a subfolder** — sometimes Mac creates `northbridge-website/northbridge-website/`. Make sure you're deploying the folder with `index.html` directly inside it
3. **Browser caching** — after redeployment, do a hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + F5` (Windows)

That's it. Go live.
