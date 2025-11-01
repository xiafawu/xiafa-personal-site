# Personal Website

A modern, interactive one-page personal website built with **Zola** (Rust-based static site generator). Inspired by [rsms.me](https://rsms.me/about/).

## Features

- ✨ **Modern & Clean Design** - Minimal aesthetic with smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Interactive Elements** - Smooth scrolling, hover effects, and animations
- 🌓 **Dark Mode Support** - Automatically adapts to system preferences
- ⚡ **Zola Powered** - Fast Rust-based static site generator, single binary
- ♿ **Accessible** - Keyboard navigation and semantic HTML

## Prerequisites

- **Zola** - Download from [getzola.org](https://www.getzola.org/) or install via:
  ```bash
  # macOS
  brew install zola
  
  # Linux/Other
  # Download from https://github.com/getzola/zola/releases
  ```

## Getting Started

### Installation

1. Install Zola (see above)

2. Clone or download this repository

### Local Development

1. Start the Zola server:
```bash
zola serve
```

2. Open your browser and navigate to `http://127.0.0.1:1111`

3. Zola will automatically regenerate when you make changes to files

### Build for Production

```bash
zola build
```

The static site will be in the `public/` directory.

## Customization

1. **Update Site Configuration** - Edit `config.toml`:
   - Change site `title`, `description`, and `base_url`
   - Update author information under `[extra.author]`
   - Configure social links under `[extra.social]`
   - Customize hero section under `[extra.hero]`

2. **Update About Content** - Edit `content/_index.md`:
   - Replace placeholder text in the About section
   - Write in Markdown for easy formatting

3. **Add Research Projects** - Edit `data/projects.toml`:
   - Add or modify research/project entries
   - Each project needs: `title`, `year`, `description`, and optional `link`

4. **Customize Styling** - Edit `static/css/styles.css`:
   - Modify CSS variables in the `:root` selector
   - Adjust color schemes for light/dark modes

## Project Structure

```
.
├── config.toml           # Zola configuration
├── data/
│   └── projects.toml     # Research projects data
├── templates/
│   ├── base.html         # Base layout template
│   ├── index.html        # Index page template
│   ├── contact.html      # Contact section
│   ├── footer.html       # Footer component
│   ├── hero.html         # Hero section
│   └── nav.html          # Navigation component
├── content/
│   └── _index.md         # Main page content
├── static/
│   ├── css/
│   │   └── styles.css    # All styles
│   └── js/
│       └── script.js     # Interactive features
└── README.md             # This file
```

## Deployment

### GitHub Pages

**Option 1: GitHub Actions (Recommended)**

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Zola
        uses: shalzz/zola-deploy-action@v0.18.0
        with:
          build-only: true
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

2. Push your code to GitHub
3. GitHub Actions will automatically build and deploy

**Option 2: Build locally and push `public/` folder**

1. Build the site: `zola build`
2. Copy contents of `public/` to `gh-pages` branch
3. GitHub Pages will serve from that branch

### Other Platforms

- **Netlify** - Connect your Git repository, set build command: `zola build`, publish directory: `public`
- **Vercel** - Connect repository, set build command: `zola build`, output directory: `public`
- **Cloudflare Pages** - Connect repository, build command: `zola build`, output directory: `public`

## Zola Tips

- **Live Reload**: Zola automatically rebuilds on file changes when running `zola serve`
- **Markdown**: Write content in Markdown (`.md`) files for easier editing
- **Data Files**: Use `data/*.toml` for structured content (like projects)
- **Templates**: Reusable components go in `templates/`
- **Static Assets**: CSS, JS, images go in `static/`

## Customization Guide

### Adding a New Project

Edit `data/projects.toml`:

```toml
[[projects]]
title = "My New Project"
year = "2024"
description = "Project description here"
link = "https://example.com"  # Optional
```

### Changing Colors

Edit `static/css/styles.css` and modify the CSS variables:

```css
:root {
    --color-accent: #0066cc;
    /* ... other colors */
}
```

### Updating Social Links

Edit `config.toml`:

```toml
[extra.social]
email = "your.email@example.com"
github = "https://github.com/yourusername"
# ... etc
```

## Why Zola?

- 🚀 **Fast** - Written in Rust, builds are extremely fast
- 📦 **Single Binary** - No dependencies, just download and run
- 🎯 **Simple** - Clean configuration with TOML
- 📝 **Markdown** - Easy content authoring
- 🔧 **Flexible** - Tera templating engine (similar to Jekyll's Liquid)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The design uses CSS custom properties for easy theming
- Supports wide color gamut displays (P3) when available
- Includes reduced motion support for accessibility
- Mobile menu automatically closes when a link is clicked
- All interactive features work without JavaScript dependencies (graceful degradation)

## License

Feel free to use this template for your own personal website!

---

Built with Zola (Rust), inspired by rsms.me.