/* Projects, project details, resume view, and hash navigation. */
(() => {
  "use strict";

  const profile = window.PROFILE || {};
  const portfolio = window.PORTFOLIO_DATA || {};
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const views = {
    home: $("home-view"),
    projects: $("projects-view"),
    resume: $("resume-view")
  };
  const clean = (value) => typeof value === "string" && value.trim() && !value.includes("YOUR_") && !/^(Your role|Write one to)/i.test(value.trim()) ? value.trim() : "";
  const node = (tag, className, value) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined) el.textContent = value;
    return el;
  };
  const validUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch (_) { return ""; }
  };
  const assetUrl = (value) => {
    if (typeof value !== "string" || !value.trim() || value.trim().startsWith("//")) return "";
    try {
      const url = new URL(value.trim(), document.baseURI);
      return ["https:", "http:", "file:"].includes(url.protocol) ? url.href : "";
    } catch (_) { return ""; }
  };
  const list = (items) => Array.isArray(items) ? items.map(clean).filter(Boolean) : [];

  function setView(view, shouldScroll = true) {
    if (!views[view]) view = "home";
    Object.entries(views).forEach(([name, el]) => { el.hidden = name !== view; });
    document.querySelectorAll("[data-view-link]").forEach((link) => {
      if (link.dataset.viewLink === view) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.title = view === "projects" ? "Projects · Digital identity" : view === "resume" ? "CV / Resume · Digital identity" : "Digital identity";
    if (shouldScroll) window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
  }

  function routeFromHash() {
    const route = location.hash.slice(1);
    setView(route === "projects" || route === "resume" ? route : "home", false);
  }

  document.querySelectorAll("[data-view-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const view = link.dataset.viewLink;
      if (location.hash !== "#" + view) history.pushState(null, "", "#" + view);
      setView(view);
    });
  });
  document.querySelectorAll('.back-link[href="#home"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      history.pushState(null, "", "#home");
      setView("home");
    });
  });
  window.addEventListener("popstate", routeFromHash);
  window.addEventListener("hashchange", routeFromHash);

  const projects = Array.isArray(portfolio.projects) ? portfolio.projects.filter((project) => project && clean(project.title)) : null;
  const grid = $("project-grid");
  const dialog = $("project-dialog");
  const detailHost = $("project-detail-content");

  function actionLink(label, url) {
    const safeUrl = validUrl(url);
    if (!safeUrl) return null;
    const link = node("a", "chip-btn project-action", label);
    link.href = safeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function makeProjectArt() {
    const art = node("div", "project-visual");
    art.setAttribute("aria-hidden", "true");
    art.innerHTML = '<div class="project-visual__glow"></div><div class="project-visual__card"><span class="project-visual__waves">)))</span><span class="project-visual__initials">AK</span><span class="project-visual__line"></span></div><span class="project-visual__orbit"></span>';
    return art;
  }

  function openDetails(project, focusOverview = false) {
    detailHost.replaceChildren();
    const heading = node("h2", "detail-title", project.title);
    heading.id = "detail-title";
    detailHost.append(heading);
    detailHost.append(node("p", "project-category", clean(project.category) || "Project"));
    const sections = [
      ["Overview", clean(project.description)],
      ["Problem", clean(project.problem)],
      ["Proposed solution", clean(project.solution)]
    ];
    sections.forEach(([title, text]) => {
      if (!text) return;
      const section = node("section", "detail-section");
      if (title === "Overview") section.id = "detail-overview";
      section.append(node("h3", "", title), node("p", "", text));
      detailHost.append(section);
    });
    const features = list(project.features);
    if (features.length) {
      const section = node("section", "detail-section");
      section.append(node("h3", "", "Key features"));
      const ul = node("ul", "detail-list");
      features.forEach((item) => ul.append(node("li", "", item)));
      section.append(ul);
      detailHost.append(section);
    }
    [["Technologies", list(project.technologies)], ["Hardware", list(project.hardware)]].forEach(([title, items]) => {
      if (!items.length) return;
      const section = node("section", "detail-section");
      section.append(node("h3", "", title));
      const chips = node("ul", "chips detail-chips");
      items.forEach((item) => chips.append(node("li", "", item)));
      section.append(chips);
      detailHost.append(section);
    });
    const contribution = clean(project.contribution);
    const contributionSection = node("section", "detail-section");
    contributionSection.append(node("h3", "", "My contribution"), node("p", contribution ? "" : "content-placeholder", contribution || "Add your project contribution here when ready."));
    detailHost.append(contributionSection);

    const screenshots = Array.isArray(project.screenshots) ? project.screenshots.filter((item) => item && assetUrl(item.src)) : [];
    const screenshotSection = node("section", "detail-section");
    screenshotSection.append(node("h3", "", "Screenshots"));
    if (screenshots.length) {
      const gallery = node("div", "detail-gallery");
      screenshots.forEach((item) => {
        const figure = node("figure", "");
        const img = document.createElement("img");
        img.src = assetUrl(item.src);
        img.alt = clean(item.alt) || project.title + " screenshot";
        img.loading = "lazy";
        figure.append(img);
        if (clean(item.caption)) figure.append(node("figcaption", "", clean(item.caption)));
        gallery.append(figure);
      });
      screenshotSection.append(gallery);
    } else {
      screenshotSection.append(node("p", "content-placeholder", "No project screenshots have been added yet."));
    }
    detailHost.append(screenshotSection);

    const actions = node("div", "detail-actions");
    const demo = actionLink("Live Demo ↗", project.demoUrl);
    const github = actionLink("GitHub ↗", project.githubUrl);
    if (demo) actions.append(demo);
    if (github) actions.append(github);
    if (actions.childElementCount) detailHost.append(actions);
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    if (focusOverview) window.setTimeout(() => $("detail-overview")?.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" }), 0);
  }

  if (!projects) {
    $("projects-error").hidden = false;
  } else if (!projects.length) {
    $("projects-empty").hidden = false;
  } else {
    projects.forEach((project) => {
      const card = node("article", "project-card");
      card.append(makeProjectArt());
      const body = node("div", "project-card__body");
      body.append(node("p", "project-category", clean(project.category) || "Project"));
      body.append(node("h2", "project-card__title", clean(project.title)));
      body.append(node("h3", "project-card__label", "About the Project"));
      body.append(node("p", "project-card__description", clean(project.description) || "Project description coming soon."));
      const tech = list(project.technologies);
      if (tech.length) {
        const chips = node("ul", "chips project-tech");
        tech.forEach((item) => chips.append(node("li", "", item)));
        body.append(chips);
      }
      const actions = node("div", "project-card__actions");
      const about = node("button", "chip-btn project-action", "About the Project");
      about.type = "button";
      about.addEventListener("click", () => openDetails(project, true));
      actions.append(about);
      const details = node("button", "btn btn--primary", "View Details");
      details.type = "button";
      details.addEventListener("click", () => openDetails(project));
      actions.append(details);
      const github = actionLink("Project Link ↗", project.githubUrl);
      if (github) actions.append(github);
      const demo = actionLink("Live Demo ↗", project.demoUrl);
      if (demo) actions.append(demo);
      body.append(actions);
      card.append(body);
      grid.append(card);
    });
  }

  document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  });

  function resumeBlock(title, content, placeholderText) {
    const section = node("section", "resume-block");
    section.append(node("h2", "resume-block__title", title));
    if (content) section.append(content);
    else section.append(node("p", "content-placeholder", placeholderText));
    return section;
  }

  const name = clean(profile.name) || "Name not added";
  $("resume-title").textContent = name;
  $("resume-monogram").textContent = clean(profile.initials) || name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const role = clean(profile.headline);
  if (role) { $("resume-role").textContent = role; $("resume-role").hidden = false; }
  const contacts = [];
  const email = clean(profile.email);
  const phone = clean(profile.phone);
  const location = profile.showLocation === true ? clean(profile.location) : "";
  if (email) {
    const link = node("a", "", email);
    link.href = "mailto:" + email;
    contacts.push(link);
  }
  if (phone) {
    const link = node("a", "", phone);
    link.href = "tel:" + phone.replace(/[^+\d]/g, "");
    contacts.push(link);
  }
  if (location) contacts.push(node("span", "", location));
  contacts.forEach((item, index) => {
    if (index) $("resume-contact").append(node("span", "resume-contact__dot", "·"));
    $("resume-contact").append(item);
  });

  const resumeContent = $("resume-content");
  const summary = clean(profile.about && profile.about.statement) || clean(profile.bio);
  resumeContent.append(resumeBlock("Professional summary", summary ? node("p", "resume-copy", summary) : null, "Add a professional summary to profile.js when you are ready."));
  const skills = list(profile.about && profile.about.skills);
  if (skills.length) {
    const chips = node("ul", "chips resume-skills");
    skills.forEach((skill) => chips.append(node("li", "", skill)));
    resumeContent.append(resumeBlock("Skills", chips, "Add verified skills to profile.js."));
  } else {
    resumeContent.append(resumeBlock("Skills", null, "Add verified skills to profile.js."));
  }

  const projectList = projects && projects.length ? node("ul", "resume-projects") : null;
  if (projectList) projects.forEach((project) => {
    const item = node("li", "resume-project");
    item.append(node("h3", "", clean(project.title)));
    item.append(node("p", "", clean(project.description) || ""));
    projectList.append(item);
  });
  resumeContent.append(resumeBlock("Projects", projectList, "Add projects to portfolio-data.js."));
  resumeContent.append(resumeBlock("Education", null, "Education details have not been added yet."));
  resumeContent.append(resumeBlock("Experience", null, "Experience details have not been added yet."));
  resumeContent.append(resumeBlock("Certifications", null, "Certification details have not been added yet."));

  const pdfPath = validUrl(portfolio.resumePdf) || (typeof portfolio.resumePdf === "string" && portfolio.resumePdf.trim() ? portfolio.resumePdf.trim() : "");
  const pdfButton = $("cv-download");
  if (pdfPath) {
    fetch(pdfPath, { method: "HEAD" }).then((response) => {
      if (!response.ok) throw new Error("PDF unavailable");
      pdfButton.disabled = false;
      $("cv-pdf-note").textContent = "Your CV PDF is ready to download.";
      pdfButton.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = pdfPath;
        link.download = "Akarsh_Kumar_CV.pdf";
        document.body.append(link);
        link.click();
        link.remove();
      });
    }).catch(() => {
      $("cv-pdf-note").textContent = "The configured CV PDF was not found. Add the real file at the path set in portfolio-data.js.";
    });
  }
  $("print-resume").addEventListener("click", () => window.print());

  routeFromHash();
})();
