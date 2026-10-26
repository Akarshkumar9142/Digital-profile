/*
  ============================================================
   YOUR PROFILE  -  this is the only file you need to edit.
  ============================================================

  Rules of thumb
  - Keep the quotation marks and commas exactly as they are.
  - Anything still containing "YOUR_" is treated as a placeholder and is
    hidden from the page (and left out of the saved contact).
  - Leave a value as "" (empty) to hide it.
  - Use full links that start with https://
  - After you change this file, save it and refresh the page.
*/
window.PROFILE = {

  /* ---------- Identity ---------- */
  name: "Akarsh kumar",
  initials: "AK",                      // shown on the card; 1-3 characters
  headline: "Your role or headline",   // e.g. "Product designer in Delhi"
  bio: "Write one to three short lines about yourself.",
  status: "",                          // optional badge, e.g. "Open to new projects". "" hides it
  profileImage: "",                    // optional, e.g. "assets/me.jpg" (square, about 400x400). "" uses initials

  /* ---------- Contact ----------
     These feed the Call / Email buttons and the Save Contact file. */
  email: "akarshkumar876@gmail.com",                 // e.g. "name@gmail.com"
  phone: "9142430425",          // with country code, e.g. "+91 98765 43210"
  website: "",                         // e.g. "https://yourname.com"

  location: "New Delhi",                        // e.g. "Ghaziabad, India"
  showLocation: true,                 // set to true to display the location above

  /* ---------- Social links ----------
     key  : picks the icon. Available: instagram, whatsapp, linkedin, facebook,
            github, youtube, x, telegram, snapchat, tiktok
     url  : the full link
     enabled : set to false to hide a link without deleting it
     WhatsApp link format: https://wa.me/919876543210  (country code + number, digits only) */
  socials: [
    { key: "instagram", label: "Instagram", url: "https://www.instagram.com/akarsh.2048", enabled: true },
    { key: "whatsapp",  label: "WhatsApp",  url: "https://wa.me/9142430425",                  enabled: true },
    { key: "linkedin",  label: "LinkedIn",  url: "https://www.linkedin.com/in/akarsh-kumar-a8302b386/?isSelfProfile=true", enabled: true },
    { key: "facebook",  label: "Facebook",  url: "https://www.facebook.com/YOUR_FACEBOOK_USERNAME",     enabled: true },

    // More examples. Replace the placeholder and set enabled: true to show one.
    { key: "github",    label: "GitHub",    url: "https://github.com/Akarshkumar9142",             enabled: true },
    { key: "youtube",   label: "YouTube",   url: "https://www.youtube.com/@YOUR_YOUTUBE_HANDLE",        enabled: false },
    { key: "x",         label: "X",         url: "https://x.com/YOUR_X_USERNAME",                       enabled: false }
  ],

  /* ---------- About (optional) ----------
     The whole section stays hidden while everything below is empty. */
  about: {
    statement: "",                     // a short personal statement
    skills: ["Electronic"],                        // e.g. ["Design", "Photography"]
    interests: [],                     // e.g. ["Cycling", "Chess"]
    projects: []                       // e.g. [{ title: "My project", url: "https://example.com/project" }]
  },

  /* ---------- Theme & features ---------- */
  theme: {
    accent: "#c8ff3d"                  // any 6-digit hex colour, e.g. "#7df9ff" for ice cyan
  },

  features: {
    copyLink: true,                    // "Copy profile link" button
    qrCode: true                       // "Show QR code" button
  },

  /* Optional: your final public address, e.g. "https://yourname.netlify.app/".
     Used for the copy-link button and the QR code. If you leave it empty, the
     page uses its own address when it is opened over https. */
  siteUrl: ""
};
