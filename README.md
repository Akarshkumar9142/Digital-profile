# NFC Digital Identity Portal

A one-page personal identity site for an NFC card. Visitors tap your card, your profile opens in their phone browser, and they can open your social links, call or email you, or save your contact.

Plain HTML, CSS and JavaScript. No build step, no framework, no tracking, no backend.

## Read this first: check your card type

Your card is a **MIFARE Classic S50 (1K)**. That chip is the main risk in this project, not the website.

- **iPhones cannot read MIFARE Classic tags** as NDEF/URL tags, so tapping your card on an iPhone will do nothing.
- **Many Android phones also cannot** (it depends on the phone's NFC chip; phones with NXP chips usually can).
- MIFARE Classic cards are mostly made for door access and are often locked or not NDEF-formatted.

For a card that opens a website on nearly every modern phone, use an **NTAG213, NTAG215 or NTAG216** tag (they cost very little). You can still follow this guide with your S50, but **test it on an iPhone and an Android phone before you rely on it**.

## What is in this folder

| File | What it does |
| --- | --- |
| `profile.js` | **The only file you need to edit.** Name, links, contact details, theme. |
| `index.html` | Page structure. Edit the `<title>` and description only if you like. |
| `style.css` | Look and feel. |
| `script.js` | Builds the page from `profile.js`, the 3D card motion, and the vCard download. |
| `qr.js` | Small QR code generator for the optional QR panel. |
| `favicon.svg` | Browser tab icon. The page replaces it with your initials automatically. |

## 1. Preview on your computer

1. Unzip the folder.
2. Double-click `index.html` to open it in your browser.

If something looks wrong, run a tiny local server instead. Open a terminal in the folder and run:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Until you add real details, the page shows a "Finish setting up" note. That note only appears on your own computer, never on the published site.

## 2. Add your details

Open `profile.js` in any text editor (Notepad, VS Code, TextEdit in plain-text mode) and change the values.

- Anything still containing `YOUR_` is treated as a placeholder and hidden.
- Leave a value as `""` to hide it.
- Links must start with `https://`.
- WhatsApp format: `https://wa.me/919876543210` (country code and number, digits only, no `+` or spaces).
- To hide a social link without deleting it, set `enabled: false`.
- The **Save contact** button appears once you have added a phone, email, website or at least one social link.
- Optional photo: put a square image (about 400x400, JPG or PNG) in the folder, for example `me.jpg`, and set `profileImage: "me.jpg"`. If the file is missing, the monogram is used.

Save the file and refresh the page to see your changes.

## 3. Publish it (free)

Pick one. All three give you an `https://` address.

### Option A: Netlify Drop (quickest, no account tools needed)

1. Go to https://app.netlify.com/drop and sign in.
2. Drag the whole project folder onto the page.
3. Netlify gives you an address like `https://something.netlify.app`. In the site settings you can change the name to something short.

### Option B: GitHub Pages

1. Create a GitHub account and a new **public** repository (for example `my-card`).
2. Upload all files from this folder (**Add file > Upload files**) and commit.
3. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute your site is at `https://YOUR_USERNAME.github.io/my-card/`.

### Option C: Cloudflare Pages

1. In the Cloudflare dashboard open **Workers & Pages > Create > Pages > Upload assets**.
2. Name the project, upload this folder, and deploy.
3. You get an address like `https://my-card.pages.dev`.

## 4. Confirm the final address

1. Open the published address on your phone, using mobile data rather than your home Wi-Fi.
2. Check that the address starts with `https://` and that the page loads with your real details.
3. Tap every link and the Save contact button once.
4. Optional: put the address in `siteUrl` inside `profile.js` and publish again. The Copy link button and QR code will use it. If you leave it empty, they use the page's own https address automatically.

**Choose the address carefully before you write the card.** The card stores only this address. If you later move to a different address, you will have to rewrite the card. Changing your links, name or photo does **not** require rewriting the card; just edit `profile.js` and publish again.

## 5. Write the address to the NFC card

1. Install an NFC writing app, for example **NFC Tools** (free, Android and iPhone).
2. Open it, choose **Write > Add a record > URL / URI**, and enter your full `https://` address.
3. Choose **Write**, then hold the card against the back of your phone until the app confirms.
4. If the app says the tag is read-only, locked, or unsupported, that card cannot be used this way. See the card-type note at the top.
5. Do not use the "lock" or "read-only" option until you have tested the card and are sure the address is final.

## 6. Test with a second phone

1. Turn the screen on and unlock the second phone. Make sure NFC is on (Android: Settings > Connected devices > NFC).
2. Hold the card against the back of the phone, near the top, for one or two seconds.
3. The phone should offer to open your address. Confirm your profile loads and the buttons work.
4. Test on both an iPhone and an Android phone if you can.

## How the buttons work

- **Save contact** builds a standard `.vcf` (vCard 3.0) file in the visitor's browser and downloads it. They open it to add you to their contacts. It contains only what you filled in. It does not include your photo.
- **Call / Email** open the phone dialer or mail app.
- **Copy profile link** copies your public address and tells the visitor honestly whether it worked.
- **QR code** encodes your public address, so someone without an NFC phone can scan it.
- Social links open in a new tab.

## Privacy and tracking

- No analytics, cookies, or tracking. The page sends nothing about visitors anywhere.
- The only outside request is Google Fonts for the typefaces. If it is blocked, the page falls back to your phone's built-in fonts and still works.
- Everything in `profile.js` is public to anyone who has your address. Only add details you want strangers to see.

## Customising a little further

- **Accent colour:** set `theme.accent` in `profile.js` to any 6-digit hex colour, for example `"#7df9ff"`.
- **Sharing preview image:** this version does not include a social preview image, because it needs your final public address. To add one, upload a 1200x630 image and add a `<meta property="og:image" content="https://YOUR-ADDRESS/preview.jpg">` line to `index.html`.
- **Motion:** the card tilts with the mouse on desktop and with a finger drag on phones. It stays still for visitors who have reduced motion turned on in their device settings.

## Credits

Brand icons are from Font Awesome Free (Brands), licensed CC BY 4.0: https://fontawesome.com/license/free
Typefaces: Bricolage Grotesque and Hanken Grotesk (SIL Open Font License) via Google Fonts.
