# portfolio-komakech-stephen

Source for **[komakech-stephen.github.io](https://komakech-stephen.github.io)** — the personal site of Komakech Stephen (Cybersecurity Professional & Quality Assurance Executive, Uganda).

Static site: HTML / CSS / JavaScript, no framework, no build step. Deployed via GitHub Pages from `main`.

---

## What's here

| Route | What it is |
|---|---|
| [`/`](https://komakech-stephen.github.io/) | Homepage — about, expertise, portfolio, certifications, tech stack, career timeline, contact, interactive terminal |
| [`/about/`](https://komakech-stephen.github.io/about/) | About page with detailed biography |
| [`/blog/`](https://komakech-stephen.github.io/blog/) | Writing on cybersecurity, network security, and quality assurance |
| [`/resume/`](https://komakech-stephen.github.io/resume/) | HTML resume (PDF version in `assets/resume/`) |
| [`/404.html`](https://komakech-stephen.github.io/404.html) | Branded 404 page |

---

## Stack

- **HTML / CSS / vanilla JS.** One stylesheet (`css/style.css`, ~2,300 lines), one behavior file (`js/main.js`, ~830 lines).
- **No framework, no bundler, no build step.** Edit a file, push, GitHub Pages serves it.
- **No backend.** The contact form posts to [Formspree](https://formspree.io); the interactive terminal runs entirely in the browser.
- **Privacy-friendly analytics** via [Plausible](https://plausible.io) — no cookies, no personal data collected.
- **hCaptcha** on the contact form to discourage bot submissions.

---

## Local preview

The site is fully static, so opening `index.html` in a browser works for most things. For better fidelity (relative paths between routes, the `/blog/` and `/demo/` sub-paths), run a one-line local server:

```bash
git clone https://github.com/Komakech-Stephen/portfolio-komakech-stephen.git
cd portfolio-komakech-stephen
python3 -m http.server 8000
# visit http://localhost:8000
```

---

## Deployment

GitHub Pages auto-deploys on push to `main`. The `CNAME` file maps the apex domain `komakech-stephen.github.io` to the Pages site; DNS is managed externally.

`sitemap.xml` and `robots.txt` are published at the site root; an RSS feed lives at `/blog/feed.xml`.

---

## Upload to GitHub

### 1. Create a new GitHub repository

- Go to [github.com/new](https://github.com/new)
- Repository name: `portfolio-komakech-stephen` (or your preferred name)
- Set to **Public** (required for GitHub Pages free tier)
- **Do NOT** initialize with README, .gitignore, or license (you already have these)
- Click "Create repository"

### 2. Initialize git and push your project

```bash
# Navigate to your project directory
cd /home/cybercon/Desktop/portfolio-Komakech-Stephen

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - Portfolio website"

# Add your GitHub repository as remote
git remote add origin https://github.com/Komakech-Stephen/portfolio-komakech-stephen.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Your GitHub username is already configured as `Komakech-Stephen`.**

### 3. Enable GitHub Pages

- Go to your repository on GitHub
- Click **Settings** tab
- Click **Pages** in the left sidebar
- Under **Source**, select:
  - **Branch:** `main`
  - **Folder:** `/ (root)`
- Click **Save**

Your site will be available at: `https://Komakech-Stephen.github.io/portfolio-komakech-stephen/`

### 4. Custom domain (optional)

If you want to use `komakech-stephen.github.io`:

- Rename your repository to `portfolio-komakech-stephen` (if different)
- The `CNAME` file in your project already points to `komakech-stephen.github.io`
- In GitHub Pages settings, add your custom domain under **Custom domain**
- Update your DNS settings to point to GitHub Pages

### 5. Verify deployment

- Wait 1-2 minutes for GitHub Pages to build
- Visit your URL to verify the site is live
- Check the **Actions** tab in GitHub to see deployment status

### Quick Commands Summary

```bash
cd /home/cybercon/Desktop/portfolio-Komakech-Stephen
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Komakech-Stephen/portfolio-komakech-stephen.git
git branch -M main
git push -u origin main
```

Your portfolio will be live on GitHub Pages after the push completes!

---

## Remove Old GitHub Repository

### Option 1: Delete via GitHub website (recommended)

1. Go to the repository you want to delete
2. Click the **Settings** tab
3. Scroll to the bottom of the page
4. Find the **Danger Zone** section
5. Click **Delete this repository**
6. You'll be asked to:
   - Type the repository name to confirm
   - Type your GitHub password
7. Click **I understand the consequences, delete this repository**

⚠️ **Warning:** This action is permanent and cannot be undone.

### Option 2: Delete via GitHub CLI

```bash
gh repo delete Komakech-Stephens.github.io
```

### Option 3: Delete via Git command line

```bash
# First, remove the remote from your local copy
cd ~/Desktop/Scholarship/portfolio/Komakech-Stephen.github.io
git remote remove origin

# Then delete the repository on GitHub (you'll need to use the website or CLI)
```

### Important Notes

- **Back up first:** If you need any code from the old repository, clone it locally before deleting
- **GitHub Pages:** If the old site was using GitHub Pages, the custom domain settings may need to be updated in your new repository
- **DNS settings:** If you had a custom domain, update DNS to point to your new repository
- **Starred/watched:** If others starred your old repo, they'll lose access

### After Deletion

If you want to use the same repository name for your new portfolio:

1. Delete the old repository first
2. Create a new repository with the same name
3. Push your new project to it

The repository will be immediately available for reuse.

---

## Interactive Terminal

The homepage features an interactive terminal that displays information about:
- **whoami** - Personal profile and background
- **skills** - Technical skill tree with proficiency levels
- **certs** - Professional certifications (Google IT Support, Diploma in Cybersecurity, UN training, CompTIA)
- **experience** - Career timeline (Quality Assurance, UN ICT Operations, Cybersecurity)
- **redteam** - Cybersecurity methodology
- **soc** - Security operations and tools
- **education** - Academic background (BSc Networking & Cybersecurity at ISBAT University, BSc Chemical Engineering at Kyambogo University)
- **contact** - Contact information
- **github** - GitHub profile link

Try commands like `help`, `whoami`, `skills`, or `experience` in the terminal on the homepage.

---

## Accessibility

The site passes WCAG 2.1 AA on the basics:

- Semantic landmarks (`<main>`, `<nav>`, `<footer>`) on every page
- "Skip to content" link on every page
- Visible keyboard focus ring (`:focus-visible`) sitewide
- Body text contrast ≥ 4.5:1 against both background tones
- Heading hierarchy with no skipped levels
- Form labels properly associated with inputs

The interactive terminal features proper keyboard navigation, command history (arrow keys), and clickable command suggestions.

---

## Repo structure

```
portfolio-komakech-stephen/
├── index.html                          # homepage with interactive terminal
├── 404.html                            # branded 404
├── CNAME                               # apex domain mapping
├── sitemap.xml  /  robots.txt          # SEO
├── css/style.css                       # single stylesheet
├── js/main.js                          # single behavior file with terminal logic
├── assets/
│   ├── images/                         # profile + OG card
│   └── resume/                         # downloadable PDF
├── about/
│   └── index.html                      # about page
├── blog/
│   ├── index.html
│   ├── feed.xml
│   └── posts/                          # individual posts
└── resume/                             # HTML resume
```

---

## Contact

📧 `cybercon.UG@proton.me` · 💼 [LinkedIn](https://linkedin.com/in/komakech-stephen-7835b2117) · 🌐 [komakech-stephen.github.io](https://komakech-stephen.github.io)
