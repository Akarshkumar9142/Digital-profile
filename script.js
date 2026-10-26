/*
  Reads profile.js and builds the page. No network requests, no tracking,
  nothing is sent anywhere. Only edit this file if you want to change behaviour.
*/
(() => {
  "use strict";

  const P = window.PROFILE;
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;

  /* ---------- Brand icons (Font Awesome Free Brands, CC BY 4.0) ---------- */
  const BRANDS = {"instagram":{"vb":"0 0 448 512","d":"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"},"whatsapp":{"vb":"0 0 448 512","d":"M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"},"linkedin":{"vb":"0 0 448 512","d":"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"},"facebook":{"vb":"0 0 320 512","d":"M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"},"github":{"vb":"0 0 496 512","d":"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},"youtube":{"vb":"0 0 576 512","d":"M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"},"x":{"vb":"0 0 512 512","d":"M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"},"telegram":{"vb":"0 0 496 512","d":"M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"},"snapchat":{"vb":"0 0 512 512","d":"M496.926,366.6c-3.373-9.176-9.8-14.086-17.112-18.153-1.376-.806-2.641-1.451-3.72-1.947-2.182-1.128-4.414-2.22-6.634-3.373-22.8-12.09-40.609-27.341-52.959-45.42a102.889,102.889,0,0,1-9.089-16.12c-1.054-3.013-1-4.724-.248-6.287a10.221,10.221,0,0,1,2.914-3.038c3.918-2.591,7.96-5.22,10.7-6.993,4.885-3.162,8.754-5.667,11.246-7.44,9.362-6.547,15.909-13.5,20-21.278a42.371,42.371,0,0,0,2.1-35.191c-6.2-16.318-21.613-26.449-40.287-26.449a55.543,55.543,0,0,0-11.718,1.24c-1.029.224-2.059.459-3.063.72.174-11.16-.074-22.94-1.066-34.534-3.522-40.758-17.794-62.123-32.674-79.16A130.167,130.167,0,0,0,332.1,36.443C309.515,23.547,283.91,17,256,17S202.6,23.547,180,36.443a129.735,129.735,0,0,0-33.281,26.783c-14.88,17.038-29.152,38.44-32.673,79.161-.992,11.594-1.24,23.435-1.079,34.533-1-.26-2.021-.5-3.051-.719a55.461,55.461,0,0,0-11.717-1.24c-18.687,0-34.125,10.131-40.3,26.449a42.423,42.423,0,0,0,2.046,35.228c4.105,7.774,10.652,14.731,20.014,21.278,2.48,1.736,6.361,4.24,11.246,7.44,2.641,1.711,6.5,4.216,10.28,6.72a11.054,11.054,0,0,1,3.3,3.311c.794,1.624.818,3.373-.36,6.6a102.02,102.02,0,0,1-8.94,15.785c-12.077,17.669-29.363,32.648-51.434,44.639C32.355,348.608,20.2,352.75,15.069,366.7c-3.868,10.528-1.339,22.506,8.494,32.6a49.137,49.137,0,0,0,12.4,9.387,134.337,134.337,0,0,0,30.342,12.139,20.024,20.024,0,0,1,6.126,2.741c3.583,3.137,3.075,7.861,7.849,14.78a34.468,34.468,0,0,0,8.977,9.127c10.019,6.919,21.278,7.353,33.207,7.811,10.776.41,22.989.881,36.939,5.481,5.778,1.91,11.78,5.605,18.736,9.92C194.842,480.951,217.707,495,255.973,495s61.292-14.123,78.118-24.428c6.907-4.24,12.872-7.9,18.489-9.758,13.949-4.613,26.163-5.072,36.939-5.481,11.928-.459,23.187-.893,33.206-7.812a34.584,34.584,0,0,0,10.218-11.16c3.434-5.84,3.348-9.919,6.572-12.771a18.971,18.971,0,0,1,5.753-2.629A134.893,134.893,0,0,0,476.02,408.71a48.344,48.344,0,0,0,13.019-10.193l.124-.149C498.389,388.5,500.708,376.867,496.926,366.6Zm-34.013,18.277c-20.745,11.458-34.533,10.23-45.259,17.137-9.114,5.865-3.72,18.513-10.342,23.076-8.134,5.617-32.177-.4-63.239,9.858-25.618,8.469-41.961,32.822-88.038,32.822s-62.036-24.3-88.076-32.884c-31-10.255-55.092-4.241-63.239-9.858-6.609-4.563-1.24-17.211-10.341-23.076-10.739-6.907-24.527-5.679-45.26-17.075-13.206-7.291-5.716-11.8-1.314-13.937,75.143-36.381,87.133-92.552,87.666-96.719.645-5.046,1.364-9.014-4.191-14.148-5.369-4.96-29.189-19.7-35.8-24.316-10.937-7.638-15.748-15.264-12.2-24.638,2.48-6.485,8.531-8.928,14.879-8.928a27.643,27.643,0,0,1,5.965.67c12,2.6,23.659,8.617,30.392,10.242a10.749,10.749,0,0,0,2.48.335c3.6,0,4.86-1.811,4.612-5.927-.768-13.132-2.628-38.725-.558-62.644,2.84-32.909,13.442-49.215,26.04-63.636,6.051-6.932,34.484-36.976,88.857-36.976s82.88,29.92,88.931,36.827c12.611,14.421,23.225,30.727,26.04,63.636,2.071,23.919.285,49.525-.558,62.644-.285,4.327,1.017,5.927,4.613,5.927a10.648,10.648,0,0,0,2.48-.335c6.745-1.624,18.4-7.638,30.4-10.242a27.641,27.641,0,0,1,5.964-.67c6.386,0,12.4,2.48,14.88,8.928,3.546,9.374-1.24,17-12.189,24.639-6.609,4.612-30.429,19.343-35.8,24.315-5.568,5.134-4.836,9.1-4.191,14.149.533,4.228,12.511,60.4,87.666,96.718C468.629,373.011,476.119,377.524,462.913,384.877Z"},"tiktok":{"vb":"0 0 448 512","d":"M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"}};

  const ICON_GLOBE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>';
  const ICON_MAIL = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
  const ICON_LINK = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>';
  const EXT = '<svg class="ext" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  const brandIcon = (key) => {
    const b = BRANDS[key];
    if (b) return '<svg viewBox="' + b.vb + '" aria-hidden="true" focusable="false"><path d="' + b.d + '"/></svg>';
    return key === "website" ? ICON_GLOBE : key === "email" ? ICON_MAIL : ICON_LINK;
  };

  /* ---------- Helpers ---------- */
  const PLACEHOLDER = /YOUR[_ -]|YOURNUMBER|XXXX/i;
  const text = (v) => (typeof v === "string" ? v.trim() : "");
  const real = (v) => text(v) !== "" && !PLACEHOLDER.test(v);

  // Only plain web links are accepted, so a typo can never become a script link.
  const webUrl = (v) => {
    if (!real(v)) return "";
    try {
      const u = new URL(text(v));
      return u.protocol === "https:" || u.protocol === "http:" ? u.href : "";
    } catch (e) { return ""; }
  };
  const cleanPhone = (v) => (real(v) ? text(v).replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "") : "");
  const cleanEmail = (v) => (real(v) && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(text(v)) ? text(v) : "");
  const hostOf = (href) => { try { return new URL(href).hostname.replace(/^www\./, ""); } catch (e) { return ""; } };
  const initialsOf = (name) => name.split(/\s+/).filter(Boolean).map((w) => Array.from(w)[0]).slice(0, 2).join("").toUpperCase();

  if (!P) {
    document.body.insertAdjacentHTML("afterbegin", '<p class="nojs">profile.js did not load. Check that the file is next to index.html.</p>');
    return;
  }

  const name = text(P.name) || "Your Name";
  const initials = (text(P.initials) || initialsOf(name)).slice(0, 3);
  const headline = text(P.headline) || text(P.role);
  const email = cleanEmail(P.email);
  const phone = cleanPhone(P.phone);
  const website = webUrl(P.website);

  const socials = (Array.isArray(P.socials) ? P.socials : [])
    .filter((s) => s && s.enabled !== false)
    .map((s) => ({ key: text(s.key).toLowerCase(), label: text(s.label), url: webUrl(s.url) }))
    .filter((s) => s.url && s.label);
  const linkItems = socials.slice();
  if (website) linkItems.push({ key: "website", label: "Website", url: website });

  /* ---------- Theme ---------- */
  const accent = P.theme && /^#[0-9a-f]{6}$/i.test(text(P.theme.accent)) ? text(P.theme.accent) : "#c8ff3d";
  if (accent !== "#c8ff3d") {
    const n = parseInt(accent.slice(1), 16);
    const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--on-accent", L > 0.35 ? "#0b0c0e" : "#ffffff");
  }

  /* ---------- Page metadata ---------- */
  const title = headline ? name + " | " + headline : name;
  document.title = title;
  const setMeta = (sel, val) => { const el = document.querySelector(sel); if (el) el.setAttribute("content", val); };
  const description = text(P.bio) || "Contact details and links for " + name + ".";
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);

  const safeInitials = initials.replace(/[^\p{L}\p{N}]/gu, "");
  if (safeInitials) {
    const fav = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#0b0c0e"/><text x="32" y="43" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="' + (safeInitials.length > 2 ? 22 : 28) + '" fill="' + accent + '">' + safeInitials + "</text></svg>";
    const icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(fav));
  }

  /* ---------- Identity + card ---------- */
  $("name").textContent = name;
  $("headline").textContent = headline;
  $("headline").hidden = !headline;
  $("bio").textContent = text(P.bio);
  $("bio").hidden = !text(P.bio);
  $("card-name").textContent = name;
  $("card-role").textContent = headline;
  $("card-mono").textContent = initials;
  if (initials.length > 2) $("card-mono").classList.add("mono--3");

  const photoSrc = text(P.profileImage);
  if (photoSrc) {
    const img = $("card-photo");
    img.addEventListener("load", () => { img.hidden = false; $("card-mono").hidden = true; });
    img.addEventListener("error", () => { img.hidden = true; });  // falls back to the monogram
    img.src = photoSrc;
  }

  if (real(P.status)) { $("status-text").textContent = text(P.status); $("status").hidden = false; }
  if (P.showLocation === true && real(P.location)) { $("where").textContent = text(P.location); $("where").hidden = false; }

  /* ---------- Actions ---------- */
  const callBtn = $("call"), mailBtn = $("email");
  if (phone) { callBtn.href = "tel:" + phone; callBtn.hidden = false; }
  if (email) { mailBtn.href = "mailto:" + email; mailBtn.hidden = false; }
  if (phone && !email) callBtn.classList.add("btn--wide");
  if (email && !phone) mailBtn.classList.add("btn--wide");

  const notice = $("notice");
  let noticeTimer = 0;
  const say = (msg, tone) => {
    notice.textContent = msg;
    if (tone) notice.setAttribute("data-tone", tone); else notice.removeAttribute("data-tone");
    clearTimeout(noticeTimer);
    if (msg) noticeTimer = setTimeout(() => { notice.textContent = ""; }, 6000);
  };

  /* ---------- Link rows ---------- */
  const addRow = (ul, item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "link";
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", item.label + " (opens in a new tab)");
    const ico = document.createElement("span");
    ico.className = "ico";
    ico.innerHTML = brandIcon(item.key);
    const txt = document.createElement("span");
    txt.className = "txt";
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = item.label;
    const sub = document.createElement("span");
    sub.className = "sub";
    sub.textContent = hostOf(item.url);
    txt.append(label, sub);
    a.append(ico, txt);
    a.insertAdjacentHTML("beforeend", EXT);
    li.appendChild(a);
    ul.appendChild(li);
  };

  if (linkItems.length) {
    const ul = $("links");
    linkItems.forEach((it) => addRow(ul, it));
    $("connect").hidden = false;
  }

  /* ---------- About (hidden while empty) ---------- */
  const A = P.about || {};
  const strings = (arr) => (Array.isArray(arr) ? arr.map(text).filter((s) => s && !PLACEHOLDER.test(s)) : []);
  const statement = real(A.statement) ? text(A.statement) : "";
  const skills = strings(A.skills);
  const interests = strings(A.interests);
  const projects = (Array.isArray(A.projects) ? A.projects : [])
    .map((p) => ({ key: "link", label: text(p && p.title), url: webUrl(p && p.url) }))
    .filter((p) => p.label && p.url);

  const fillChips = (id, items) => {
    if (!items.length) return;
    const g = $(id);
    const ul = g.querySelector("ul");
    items.forEach((s) => { const li = document.createElement("li"); li.textContent = s; ul.appendChild(li); });
    g.hidden = false;
  };
  if (statement) { $("about-statement").textContent = statement; $("about-statement").hidden = false; }
  fillChips("about-skills", skills);
  fillChips("about-interests", interests);
  if (projects.length) {
    const g = $("about-projects");
    projects.forEach((p) => addRow(g.querySelector("ul"), p));
    g.hidden = false;
  }
  if (statement || skills.length || interests.length || projects.length) $("about").hidden = false;

  /* ---------- Local preview hint ---------- */
  const host = location.hostname;
  const isLocal = location.protocol === "file:" || host === "localhost" || host === "127.0.0.1" || host === "[::1]" ||
    /\.local$/.test(host) || /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);
  if (isLocal && !linkItems.length && !phone && !email) $("setup").hidden = false;

  /* ---------- Save contact (.vcf, vCard 3.0, generated in the browser) ---------- */
  const escText = (v) => String(v).replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
  const noCtl = (v) => String(v).replace(/[\u0000-\u001f\u007f]/g, " ").trim();

  // Fold lines longer than 75 bytes (RFC 2425), never splitting a character
  const enc = new TextEncoder();
  const fold = (line) => {
    if (enc.encode(line).length <= 75) return line;
    const parts = [];
    let cur = "", bytes = 0, limit = 75;
    for (const ch of line) {
      const b = enc.encode(ch).length;
      if (bytes + b > limit) { parts.push(cur); cur = ""; bytes = 0; limit = 74; }
      cur += ch; bytes += b;
    }
    parts.push(cur);
    return parts.join("\r\n ");
  };

  const buildVCard = () => {
    const words = name.split(/\s+/).filter(Boolean);
    const family = words.length > 1 ? words[words.length - 1] : "";
    const given = words.length > 1 ? words.slice(0, -1).join(" ") : name;
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:" + escText(family) + ";" + escText(given) + ";;;",
      "FN:" + escText(name)
    ];
    if (headline) lines.push("TITLE:" + escText(headline));
    if (phone) lines.push("TEL;TYPE=CELL:" + noCtl(phone));
    if (email) lines.push("EMAIL;TYPE=INTERNET:" + noCtl(email));
    if (website) lines.push("URL:" + noCtl(website));
    socials.forEach((s, i) => {
      lines.push("item" + (i + 1) + ".URL:" + noCtl(s.url));
      lines.push("item" + (i + 1) + ".X-ABLabel:" + escText(s.label));
    });
    lines.push("END:VCARD");
    return lines.map(fold).join("\r\n") + "\r\n";
  };

  // A contact with only a name is useless, so the button waits for real details.
  if (!(phone || email || website || socials.length)) $("save-contact").hidden = true;

  $("save-contact").addEventListener("click", () => {
    try {
      const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const slug = name.normalize("NFKD").replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "contact";
      a.href = url;
      a.download = slug + ".vcf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      say("Contact file created. Open the download to add it to your contacts.");
    } catch (e) {
      say("The contact file could not be created in this browser. Try another browser.", "error");
    }
  });

  /* ---------- Share: copy link + QR ---------- */
  const f = P.features || {};
  const canonical = (() => {
    const set = webUrl(P.siteUrl);
    if (set) return set;
    if (location.protocol === "https:" && !isLocal) {
      return location.origin + location.pathname.replace(/index\.html$/, "");
    }
    return "";
  })();

  if (canonical) {
    if (f.copyLink !== false) $("copy-link").hidden = false;
    if (f.qrCode !== false && window.QR && window.QR.svg(canonical)) $("qr-toggle").hidden = false;
    if (!$("copy-link").hidden || !$("qr-toggle").hidden) $("tools").hidden = false;
  }

  const copyText = async (value) => {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(value); return true; }
    } catch (e) { /* fall through to the older method */ }
    try {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch (e) { return false; }
  };
  $("copy-link").addEventListener("click", async () => {
    const ok = await copyText(canonical);
    if (ok) say("Profile link copied.");
    else say("Copying was blocked by this browser. Select and copy: " + canonical, "error");
  });

  const qrBtn = $("qr-toggle"), qrPanel = $("qr-panel");
  qrBtn.addEventListener("click", () => {
    const open = qrPanel.hidden;
    if (open && !$("qr-tile").firstChild) {
      $("qr-tile").innerHTML = window.QR.svg(canonical);
      $("qr-url").textContent = canonical;
    }
    qrPanel.hidden = !open;
    qrBtn.setAttribute("aria-expanded", String(open));
    qrBtn.querySelector("span").textContent = open ? "Hide QR code" : "Show QR code";
  });

  /* ---------- 3D card motion ---------- */
  const stage = $("stage"), tilt = $("tilt"), card = $("card");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const REST = { x: 4, y: -8 }, MAX = 15;
  const cur = { x: REST.x, y: REST.y }, tgt = { x: REST.x, y: REST.y };
  let raf = 0, pressed = false;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const paint = () => {
    tilt.style.transform = "rotateX(" + cur.x.toFixed(2) + "deg) rotateY(" + cur.y.toFixed(2) + "deg)" + (pressed ? " scale3d(.985,.985,.985)" : "");
    const nx = clamp((cur.y - REST.y) / MAX, -1, 1), ny = clamp(-(cur.x - REST.x) / MAX, -1, 1);
    card.style.setProperty("--mx", (50 + nx * 45).toFixed(1) + "%");
    card.style.setProperty("--my", (50 + ny * 45).toFixed(1) + "%");
    card.style.setProperty("--gx", (50 + nx * 40).toFixed(1) + "%");
  };
  const frame = () => {
    raf = 0;
    cur.x += (tgt.x - cur.x) * 0.1;
    cur.y += (tgt.y - cur.y) * 0.1;
    if (Math.abs(tgt.x - cur.x) < 0.02 && Math.abs(tgt.y - cur.y) < 0.02) { cur.x = tgt.x; cur.y = tgt.y; paint(); return; }
    paint();
    raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(frame); };
  const aim = (nx, ny) => {            // nx, ny in -1..1 (pointer position relative to centre)
    tgt.x = REST.x - clamp(ny, -1, 1) * MAX;
    tgt.y = REST.y + clamp(nx, -1, 1) * MAX;
    kick();
  };
  const relax = () => { tgt.x = REST.x; tgt.y = REST.y; kick(); };

  const onMouse = (e) => {
    if (e.pointerType !== "mouse" || reduce.matches) return;
    const r = stage.getBoundingClientRect();
    aim((e.clientX - (r.left + r.width / 2)) / (window.innerWidth * 0.45),
        (e.clientY - (r.top + r.height / 2)) / (window.innerHeight * 0.45));
  };
  const onDrag = (e) => {
    if (e.pointerType === "mouse" || !pressed || reduce.matches) return;
    const r = stage.getBoundingClientRect();
    aim((e.clientX - (r.left + r.width / 2)) / (r.width / 2),
        (e.clientY - (r.top + r.height / 2)) / (r.height / 2));
  };
  const release = () => { if (pressed) { pressed = false; relax(); paint(); } };

  const startMotion = () => {
    paint();
    window.addEventListener("pointermove", onMouse, { passive: true });
    document.documentElement.addEventListener("mouseleave", relax);
    stage.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse" && !reduce.matches) { pressed = true; paint(); } });
    stage.addEventListener("pointermove", onDrag, { passive: true });
    ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => stage.addEventListener(ev, (e) => { if (e.pointerType !== "mouse") release(); }));
  };
  startMotion();

  const applyReduce = () => { if (reduce.matches) { tgt.x = cur.x = REST.x; tgt.y = cur.y = REST.y; pressed = false; paint(); } };
  applyReduce();
  if (reduce.addEventListener) reduce.addEventListener("change", applyReduce);

  document.addEventListener("visibilitychange", () => {
    root.classList.toggle("is-paused", document.hidden);
    if (!document.hidden) kick();
  });

  /* Gentle magnetic pull on the main button (mouse only) */
  const save = $("save-contact");
  save.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || reduce.matches) return;
    const r = save.getBoundingClientRect();
    save.style.setProperty("--bx", clamp((e.clientX - (r.left + r.width / 2)) * 0.06, -6, 6).toFixed(1) + "px");
    save.style.setProperty("--by", clamp((e.clientY - (r.top + r.height / 2)) * 0.12, -4, 4).toFixed(1) + "px");
  });
  save.addEventListener("pointerleave", () => { save.style.removeProperty("--bx"); save.style.removeProperty("--by"); });
})();
