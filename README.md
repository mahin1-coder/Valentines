# Valentine Page

A little web page that asks someone to be your Valentine. The No button runs away when you try to click it, and clicking Yes triggers a confetti explosion.

Live: https://mahin1-coder.github.io/Valentines/

---

## How it works

1. Open the page — it shows a card addressed to whoever you send it to
2. They hit "Open Your Valentine"
3. The No button escapes every time they try to click it (it shrinks too)
4. When they finally click Yes, hearts and confetti rain down

You can personalise the names and message using the form on the landing screen, then hit Share to get a custom link to send them.

## Run it locally

Just clone and open the file — no install, no build step:

```
git clone https://github.com/mahin1-coder/Valentines.git
cd Valentines
open index.html
```

## Custom links

Add `?to=Name&from=Name&msg=Your+message` to the URL and it pre-fills everything:

```
https://mahin1-coder.github.io/Valentines/?to=Mahin&from=Someone&msg=Happy+Valentines
```

## Deploy (GitHub Pages)

Settings → Pages → Branch: main / (root) → Save.
Takes about a minute to go live.
