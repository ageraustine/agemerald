# AG Emerald — Website

Static marketing site for AG Emerald Limited (Nairobi real estate), built for GitHub Pages.

## Pages
- `index.html` — Home
- `about.html` — About / mission, vision, values
- `services.html` — Full service detail (Sales, Rentals & Management, Facilities Management, Accounting)
- `properties.html` — Property types & neighbourhoods
- `contact.html` — Contact details

## Deploying to GitHub Pages
1. Create a new GitHub repository (e.g. `agemerald-website`).
2. Push the contents of this folder to the repo's default branch (`main`).
3. In the repo: **Settings → Pages → Build and deployment → Source** = "Deploy from a branch", branch = `main`, folder = `/ (root)`.
4. Save — GitHub will publish at `https://<your-username>.github.io/agemerald-website/`.
5. Optional custom domain (agemerald.co.ke): add a `CNAME` file at the repo root containing just the domain, and point your DNS A/ALIAS records to GitHub Pages per GitHub's docs, then set the domain in the Pages settings.

No build step, no backend — plain HTML/CSS/JS. Contact links are honest `mailto:`, `tel:` and `wa.me` links (no fake form backend, since GitHub Pages is static).
