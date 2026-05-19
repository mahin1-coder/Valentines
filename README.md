# 💌 Valentine Web App

A polished, romantic Valentine-themed web experience. Three stages, a runaway No button, confetti on Yes, and a shareable personalised link.

## Features

- **3-Stage Flow** — Landing card → Valentine question → Celebration screen
- **Runaway No button** — Escapes on hover/touch, shrinks after repeated attempts
- **Heart confetti** — Shower of emoji hearts on Yes
- **Floating hearts** — Continuous ambient background animation
- **Personalisation** — Customize recipient name, sender name, and message via the form
- **Shareable URL** — Generates a link with query params so your Valentine opens a pre-personalised version
- **Dark romantic design** — Glassmorphism cards, Playfair Display + Poppins typography, deep purple/rose palette
- **Mobile-friendly** — Responsive layout, touch events handled on the No button

## Run Locally

No build step needed. Just open the file:

```bash
git clone https://github.com/mahin1-coder/Valentines.git
cd Valentines
open index.html   # macOS
# or: xdg-open index.html  (Linux)
# or: start index.html      (Windows)
```

## Deploy to GitHub Pages

1. Go to your repo on GitHub
2. **Settings → Pages**
3. Under *Source*, select **Deploy from a branch** →  / 
4. Click **Save** — your site will be live at 

## URL Personalisation

Append query parameters to pre-fill names and message:

| Param | Description            | Example          |
|-------|------------------------|------------------|
|   | Recipient name         |         |
| | Sender name            |     |
|  | Celebration message    |  |

**Example URL:**
```
https://mahin1-coder.github.io/Valentines/?to=Alex&from=Jordan&msg=You+said+yes!
```

The **Share** button on the celebration screen builds and copies this link automatically.

## File Structure

```
Valentines/
├── index.html          # 3-stage app markup
├── styles.css          # Dark-romantic glassmorphism design
├── script.js           # All interactivity (stages, No escape, confetti, share)
├── breaking-news/      # Redirect page
├── system-check/       # Redirect page
└── README.md
```

## Tech Stack

- Pure HTML / CSS / JavaScript (no frameworks, no build step)
- [Google Fonts](https://fonts.google.com/) — Playfair Display + Poppins
- CSS custom properties, keyframe animations, 
-  /  for the share feature
