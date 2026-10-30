/* =============================================================================
   main.js — renders the page from SITE_CONTENT and wires up all effects
   ========================================================================== */
(function () {
  "use strict";
  const C = window.SITE_CONTENT;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

  /* ---- Image slot helper: renders a real image OR a labelled placeholder -- */
  function imgSlot(src, caption, modifier = "") {
    if (src) return `<div class="img-slot ${modifier}"><img src="${esc(src)}" alt="${esc(caption || "")}" loading="lazy"></div>`;
    return `<div class="img-slot ${modifier}">
      <div class="img-slot__placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.6"/><path d="m21 15-5-5L5 21"/></svg>
        <span>${esc(caption || "Image slot")}</span>
      </div>
    </div>`;
  }

  /* ---- Build the whole page ------------------------------------------------ */
  function render() {
    document.title = C.meta.siteTitle || C.meta.name;
    $$("[data-name]").forEach(el => el.textContent = C.meta.name);
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

    $("#top").innerHTML = [
      heroHTML(), aboutHTML(), capabilitiesHTML(), highlightsHTML(),
      workHTML(), videosHTML(), archiveHTML(), contactHTML()
    ].join("");

    wireInteractions();
    initReveal();
    initCounters();
  }

  /* ---- Sections ------------------------------------------------------------ */
  function heroHTML() {
    const h = C.hero;
    const lines = h.headlineLines.map(l => `<span>${esc(l)}</span>`).join("");
    const stats = h.stats.map((s, i) => `
      <div class="stat reveal" data-delay="${i}">
        <div class="stat__value" data-count="${esc(s.value)}">${esc(s.value)}<span class="suffix">${esc(s.suffix || "")}</span></div>
        <div class="stat__label">${esc(s.label)}</div>
      </div>`).join("");
    return `
    <section class="hero" id="hero">
      <div class="hero__inner">
        <div class="hero__kicker reveal">${esc(h.kicker)}</div>
        <h1 class="hero__title reveal" data-delay="1">${lines}</h1>
        <p class="hero__sub reveal" data-delay="2">${esc(h.subline)}</p>
        <div class="hero__cta reveal" data-delay="3">
          <a href="${esc(h.primaryCta.target)}" class="btn btn--primary" data-cursor="link" data-magnetic data-ripple>${esc(h.primaryCta.label)}</a>
          <a href="${esc(h.secondaryCta.target)}" class="btn btn--ghost" data-cursor="link" data-magnetic data-ripple>${esc(h.secondaryCta.label)}</a>
        </div>
        <div class="hero__stats">${stats}</div>
      </div>
    </section>`;
  }

  function aboutHTML() {
    const a = C.about;
    return `
    <section class="section-pad" id="about">
      <div class="wrap ${a.image ? "about__grid" : "about__solo"}">
        ${a.image ? `<div class="reveal">${imgSlot(a.image, a.imageCaption)}</div>` : ""}
        <div class="about__text reveal" data-delay="1">
          <div class="eyebrow">${esc(a.heading)}</div>
          ${a.paragraphs.map(p => `<p>${esc(p)}</p>`).join("")}
          <div class="chips">${a.highlights.map(c => `<span class="chip">${esc(c)}</span>`).join("")}</div>
        </div>
      </div>
    </section>`;
  }

  function capabilitiesHTML() {
    const c = C.capabilities;
    const cards = c.items.map((it, i) => `
      <article class="cap-card reveal" data-delay="${i % 4}" data-cap tabindex="0" role="button" aria-expanded="false">
        <div class="cap-card__icon">${esc(it.icon || "◆")}</div>
        <h3 class="cap-card__title">${esc(it.title)}</h3>
        <p class="cap-card__summary">${esc(it.summary)}</p>
        <div class="cap-card__details"><ul>${it.details.map(d => `<li>${esc(d)}</li>`).join("")}</ul></div>
        <div class="cap-card__foot">
          ${it.stat ? `<div class="cap-card__stat"><b data-count="${esc(it.stat.value)}">${esc(it.stat.value)}</b><span class="suffix">${esc(it.stat.suffix || "")}</span><small>${esc(it.stat.label)}</small></div>` : "<div></div>"}
          <div class="cap-card__more">Details <span>⌄</span></div>
        </div>
      </article>`).join("");
    return `
    <section class="section-pad" id="capabilities">
      <div class="wrap">
        <div class="reveal"><div class="eyebrow">${esc(c.heading)}</div>
        <h2 class="section-title">${esc(c.heading)}</h2>
        <p class="section-intro">${esc(c.intro)}</p></div>
        <div class="cap__grid">${cards}</div>
      </div>
    </section>`;
  }

  /* Highlights: alternating image / text rows for the headline skills */
  function highlightsHTML() {
    const h = C.highlights;
    if (!h) return "";
    const rows = h.items.map((it, i) => `
      <article class="hl-row ${i % 2 ? "hl-row--flip" : ""}">
        <div class="hl-row__img reveal" data-tilt data-lightbox-single="${esc(it.image)}">${imgSlot(it.image, it.title)}</div>
        <div class="hl-row__text reveal" data-delay="1">
          <div class="work-card__cat">${esc(it.kicker)}</div>
          <h3 class="hl-row__title">${esc(it.title)}</h3>
          <p class="hl-row__intro">${esc(it.intro)}</p>
          <ul class="hl-row__points">${it.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
          ${it.cta ? `<a href="${esc(it.cta.target)}" class="hl-row__cta" data-cursor="link">${esc(it.cta.label)} →</a>` : ""}
        </div>
      </article>`).join("");
    return `
    <section class="section-pad" id="highlights">
      <div class="wrap">
        <div class="reveal"><div class="eyebrow">Highlights</div>
        <h2 class="section-title">${esc(h.heading)}</h2>
        <p class="section-intro">${esc(h.intro)}</p></div>
        <div class="hl__list">${rows}</div>
      </div>
    </section>`;
  }

  function workHTML() {
    const w = C.work;
    const cards = w.items.map((it, i) => `
      <article class="work-card reveal" data-delay="${i % 3}" data-tilt ${it.video ? `data-video="${esc(it.video)}"` : it.image ? `data-lightbox-single="${esc(it.image)}"` : ""}>
        ${imgSlot(it.image, it.title, "work-card__img")}
        ${it.video ? `<span class="work-card__zoom" aria-hidden="true">▶</span>` : it.image ? `<span class="work-card__zoom" aria-hidden="true">⤢</span>` : ""}
        <div class="work-card__body">
          <div class="work-card__cat">${esc(it.category)}</div>
          <h3 class="work-card__title">${esc(it.title)}</h3>
          <p class="work-card__blurb">${esc(it.blurb)}</p>
          <div class="tags">${(it.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </article>`).join("");
    return `
    <section class="section-pad" id="work">
      <div class="wrap">
        <div class="reveal"><div class="eyebrow">Portfolio</div>
        <h2 class="section-title">${esc(w.heading)}</h2>
        <p class="section-intro">${esc(w.intro)}</p></div>
        <div class="work__grid">${cards}</div>
      </div>
    </section>`;
  }

  /* Video content: each card opens its video in the lightbox */
  function videosHTML() {
    const v = C.videos;
    if (!v || !v.items.length) return "";
    const cards = v.items.map((it, i) => {
      const poster = it.poster || (it.youtube ? `https://img.youtube.com/vi/${it.youtube}/hqdefault.jpg` : "");
      return `
      <article class="video-card reveal" data-delay="${i % 3}" tabindex="0" role="button"
        data-video="${esc(it.src || "")}" data-youtube="${esc(it.youtube || "")}" data-vimeo="${esc(it.vimeo || "")}">
        <div class="video-card__img">${imgSlot(poster, it.title)}<span class="video-card__play" aria-hidden="true">▶</span></div>
        <div class="work-card__body">
          <div class="work-card__cat">${esc(it.category || "")}</div>
          <h3 class="work-card__title">${esc(it.title)}</h3>
          ${it.blurb ? `<p class="work-card__blurb">${esc(it.blurb)}</p>` : ""}
        </div>
      </article>`;
    }).join("");
    return `
    <section class="section-pad" id="videos">
      <div class="wrap">
        <div class="reveal"><div class="eyebrow">Watch</div>
        <h2 class="section-title">${esc(v.heading)}</h2>
        <p class="section-intro">${esc(v.intro)}</p></div>
        <div class="work__grid">${cards}</div>
      </div>
    </section>`;
  }

  function archiveHTML() {
    const a = C.archive;
    if (!a) return "";
    const cards = a.decks.map((d, i) => `
      <article class="deck-card reveal" data-delay="${i % 4}" data-deck="${esc(d.slug)}" data-count-slides="${d.count}" tabindex="0" role="button">
        <div class="deck-card__img">${imgSlot(d.cover, d.title)}<span class="deck-card__badge">${d.count} slides</span></div>
        <div class="deck-card__body">
          <span class="deck-card__year">${esc(d.year)}</span>
          <h3 class="deck-card__title">${esc(d.title)}</h3>
          <span class="deck-card__cta">Browse slides →</span>
        </div>
      </article>`).join("");
    return `
    <section class="section-pad" id="archive">
      <div class="wrap">
        <div class="reveal"><div class="eyebrow">Track record</div>
        <h2 class="section-title">${esc(a.heading)}</h2>
        <p class="section-intro">${esc(a.intro)}</p></div>
        <div class="deck__grid">${cards}</div>
      </div>
    </section>`;
  }

  /* Home-page teaser that invites people over to the Beyond page */
  function beyondTeaserHTML() {
    const b = C.beyond;
    return `
    <section class="section-pad personal" id="personal">
      <div class="wrap beyond-teaser reveal">
        <div>
          <div class="eyebrow">${esc(b.heading)}</div>
          <h2 class="section-title">${esc(b.tagline)}</h2>
          <p class="section-intro">${esc(b.intro)}</p>
          <a href="beyond.html" class="btn btn--primary" data-cursor="link" data-magnetic data-ripple style="margin-top:28px">Step into my world →</a>
        </div>
        <div class="beyond-teaser__emojis" aria-hidden="true">
          ${b.slideshows.map(s => `<span class="beyond-emoji" title="${esc(s.title)}">${esc(s.icon)}</span>`).join("")}
        </div>
      </div>
    </section>`;
  }

  /* ---- BEYOND PAGE (beyond.html) ------------------------------------------ */
  function slideshowHTML(sh, i) {
    const slides = sh.slides.map((s, idx) => `
      <figure class="slide ${idx === 0 ? "is-active" : ""}" data-slide="${idx}">
        ${imgSlot(s.image, s.caption, "slide__img")}
        ${s.caption ? `<figcaption class="slide__cap">${esc(s.caption)}</figcaption>` : ""}
      </figure>`).join("");
    const dots = sh.slides.map((_, idx) =>
      `<button class="slideshow__dot ${idx === 0 ? "is-active" : ""}" data-goto="${idx}" aria-label="Slide ${idx + 1}"></button>`).join("");
    return `
    <div class="slideshow reveal" data-slideshow data-delay="${i % 3}">
      <div class="slideshow__head">
        <span class="slideshow__icon">${esc(sh.icon)}</span>
        <div><h3 class="slideshow__title">${esc(sh.title)}</h3><p class="slideshow__cap">${esc(sh.caption)}</p></div>
      </div>
      <div class="slideshow__stage">
        ${slides}
        <button class="slideshow__nav prev" data-dir="-1" aria-label="Previous">‹</button>
        <button class="slideshow__nav next" data-dir="1" aria-label="Next">›</button>
      </div>
      <div class="slideshow__dots">${dots}</div>
    </div>`;
  }

  function renderBeyond() {
    document.title = "Dakotah Howes — Beyond Work";
    $$("[data-name]").forEach(el => el.textContent = C.meta.name);
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
    const b = C.beyond;
    const skills = b.skills.map(col => `
      <div class="skills-col reveal">
        <h4 class="skills-col__title">${esc(col.group)}</h4>
        <div class="chips">${col.items.map(it => `<span class="chip">${esc(it)}</span>`).join("")}</div>
      </div>`).join("");
    $("#beyond-content").innerHTML = `
      <section class="beyond-hero">
        <div class="wrap">
          <a href="index.html" class="beyond-back reveal" data-cursor="link">← Back to portfolio</a>
          <div class="eyebrow reveal">${esc(b.heading)}</div>
          <h1 class="beyond-hero__title reveal" data-delay="1">${esc(b.tagline)}</h1>
          <p class="beyond-hero__intro reveal" data-delay="2">${esc(b.intro)}</p>
        </div>
      </section>
      <section class="section-pad">
        <div class="wrap about__grid">
          <div class="reveal">${imgSlot(b.portrait, b.portraitCaption)}</div>
          <div class="about__text reveal" data-delay="1">
            <div class="eyebrow">My story</div>
            ${b.backstory.map(p => `<p>${esc(p)}</p>`).join("")}
          </div>
        </div>
      </section>
      <section class="section-pad" style="padding-top:0">
        <div class="wrap">
          <div class="reveal"><div class="eyebrow">Skills</div><h2 class="section-title">What I'm good at</h2></div>
          <div class="skills-grid">${skills}</div>
        </div>
      </section>
      <section class="section-pad personal" style="padding-top:0">
        <div class="wrap">
          <div class="reveal"><div class="eyebrow">Life in pictures</div>
          <h2 class="section-title">A few of my worlds</h2>
          <p class="section-intro">Add your own photos in <code>assets/img/</code> and list them in <code>content.js</code>.</p></div>
          <div class="slideshow-grid">${b.slideshows.map(slideshowHTML).join("")}</div>
        </div>
      </section>`;
    wireInteractions();
    wireSlideshows();
    initReveal();
  }

  function wireSlideshows() {
    $$("[data-slideshow]").forEach(sh => {
      const slides = $$(".slide", sh), dots = $$(".slideshow__dot", sh);
      let idx = 0, timer = null;
      const go = (n) => {
        idx = (n + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
        dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
      };
      const start = () => { if (slides.length > 1) timer = setInterval(() => go(idx + 1), 4500); };
      const reset = () => { clearInterval(timer); start(); };
      $$(".slideshow__nav", sh).forEach(btn => btn.addEventListener("click", () => { go(idx + (+btn.getAttribute("data-dir"))); reset(); }));
      dots.forEach(d => d.addEventListener("click", () => { go(+d.getAttribute("data-goto")); reset(); }));
      sh.addEventListener("mouseenter", () => clearInterval(timer));
      sh.addEventListener("mouseleave", start);
      start();
      const imgs = slides.map(s => s.querySelector("img")?.getAttribute("src")).filter(Boolean);
      if (imgs.length) slides.forEach((s, i) => s.addEventListener("click", () => openLightbox(imgs, i)));
    });
  }

  function contactHTML() {
    const c = C.contact;
    const copyVal = (l) => l.label === "Email" ? c.email : l.url;
    const links = C.meta.links.filter(l => l.url).map(l => l.open
      ? `<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener" data-cursor="link" data-magnetic data-ripple>${esc(l.label)}</a>`
      : `<button class="btn btn--ghost" data-cursor="link" data-magnetic data-ripple data-copy="${esc(copyVal(l))}" data-copy-label="${esc(l.label)}">${esc(l.label)}</button>`).join("");
    return `
    <section class="section-pad contact" id="contact">
      <div class="wrap">
        <div class="reveal">
          <div class="eyebrow" style="justify-content:center">${esc(c.heading)}</div>
          <h2 class="contact__title">Let's<br>work together</h2>
          <button class="contact__email" data-cursor="link" data-copy="${esc(c.email)}" data-copy-label="Email">${esc(c.email)}</button>
          ${c.whatsapp ? `<p class="contact__hint">WhatsApp ${esc(c.whatsapp)}</p>` : ""}
          <div class="contact__actions">${links}</div>
          <p class="contact__hint">Click the email to copy it, or message me on WhatsApp ✨</p>
        </div>
      </div>
    </section>`;
  }

  /* ---- Lightbox ------------------------------------------------------------ */
  const LB = { images: [], idx: 0, el: null };
  function buildLightbox() {
    const el = document.createElement("div");
    el.className = "lightbox"; el.id = "lightbox"; el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <button class="lightbox__close" aria-label="Close">✕</button>
      <button class="lightbox__nav lightbox__prev" aria-label="Previous">‹</button>
      <figure class="lightbox__stage"><img class="lightbox__img" alt=""><div class="lightbox__media"></div><figcaption class="lightbox__counter"></figcaption></figure>
      <button class="lightbox__nav lightbox__next" aria-label="Next">›</button>`;
    document.body.appendChild(el);
    el.addEventListener("click", e => { if (e.target === el || e.target.classList.contains("lightbox__close")) closeLightbox(); });
    $(".lightbox__prev", el).addEventListener("click", e => { e.stopPropagation(); step(-1); });
    $(".lightbox__next", el).addEventListener("click", e => { e.stopPropagation(); step(1); });
    LB.el = el;
  }
  function openLightbox(images, idx = 0) {
    if (!LB.el) buildLightbox();
    LB.el.classList.remove("is-video");
    LB.images = images; LB.idx = idx;
    LB.el.classList.toggle("is-single", images.length <= 1);
    showLB(); LB.el.classList.add("is-open"); LB.el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function openVideo({ src, youtube, vimeo }) {
    if (!LB.el) buildLightbox();
    const media = $(".lightbox__media", LB.el);
    if (youtube) media.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtube)}?autoplay=1&rel=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    else if (vimeo) media.innerHTML = `<iframe src="https://player.vimeo.com/video/${encodeURIComponent(vimeo)}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    else media.innerHTML = `<video src="${esc(src)}" controls autoplay playsinline></video>`;
    $(".lightbox__counter", LB.el).textContent = "";
    LB.el.classList.add("is-video", "is-single", "is-open"); LB.el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!LB.el) return;
    $(".lightbox__media", LB.el).innerHTML = "";
    LB.el.classList.remove("is-open"); LB.el.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(d) { LB.idx = (LB.idx + d + LB.images.length) % LB.images.length; showLB(); }
  function showLB() {
    const img = $(".lightbox__img", LB.el);
    img.style.opacity = 0;
    const src = LB.images[LB.idx];
    const pre = new Image();
    pre.onload = () => { img.src = src; img.style.opacity = 1; };
    pre.src = src;
    $(".lightbox__counter", LB.el).textContent = LB.images.length > 1 ? `${LB.idx + 1} / ${LB.images.length}` : "";
  }
  function deckImages(slug, count) {
    return Array.from({ length: count }, (_, i) => `assets/img/decks/${slug}/slide-${String(i + 1).padStart(2, "0")}.jpg`);
  }

  /* ---- Interactions -------------------------------------------------------- */
  function wireInteractions() {
    // Expandable capability cards
    $$("[data-cap]").forEach(card => {
      const toggle = () => { card.classList.toggle("is-open"); card.setAttribute("aria-expanded", card.classList.contains("is-open")); };
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--cx", `${e.clientX - r.left}px`);
        card.style.setProperty("--cy", `${e.clientY - r.top}px`);
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });

    // Accordion (personal)
    $$("[data-acc]").forEach(item => {
      const head = $(".acc-head", item);
      const toggle = () => { item.classList.toggle("is-open"); head.setAttribute("aria-expanded", item.classList.contains("is-open")); };
      head.addEventListener("click", toggle);
      head.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    });

    // Work-card tilt + click-to-zoom
    $$("[data-tilt]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
      const video = el.getAttribute("data-video");
      if (video) el.addEventListener("click", () => openVideo({ src: video }));
      const single = el.getAttribute("data-lightbox-single");
      if (single) el.addEventListener("click", () => openLightbox([single], 0));
    });

    // Video cards → play in the lightbox
    $$(".video-card").forEach(el => {
      const open = () => openVideo({ src: el.dataset.video, youtube: el.dataset.youtube, vimeo: el.dataset.vimeo });
      el.addEventListener("click", open);
      el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });

    // Archive decks → open full slide gallery
    $$("[data-deck]").forEach(el => {
      const open = () => openLightbox(deckImages(el.getAttribute("data-deck"), +el.getAttribute("data-count-slides")), 0);
      el.addEventListener("click", open);
      el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });

    // Ripple on buttons
    $$("[data-ripple]").forEach(btn => {
      btn.addEventListener("click", e => {
        const r = btn.getBoundingClientRect();
        const s = document.createElement("span");
        s.className = "ripple";
        const size = Math.max(r.width, r.height);
        s.style.width = s.style.height = size + "px";
        s.style.left = (e.clientX - r.left - size / 2) + "px";
        s.style.top  = (e.clientY - r.top  - size / 2) + "px";
        btn.appendChild(s);
        setTimeout(() => s.remove(), 600);
      });
    });

    // Magnetic buttons
    $$("[data-magnetic]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width/2) * 0.25}px, ${(e.clientY - r.top - r.height/2) * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });

    // Copy-to-clipboard
    $$("[data-copy]").forEach(el => {
      el.addEventListener("click", async () => {
        const val = el.getAttribute("data-copy");
        const label = el.getAttribute("data-copy-label") || "Copied";
        try {
          await navigator.clipboard.writeText(val);
          showToast(`${label} copied ✓`);
          const r = el.getBoundingClientRect();
          confettiBurst(r.left + r.width / 2, r.top + r.height / 2, ["#e11d2a", "#f0b429", "#ff4d58"]);
        } catch (e) {
          showToast(`Copy this: ${val}`);
        }
      });
    });
  }

  /* ---- Toast, confetti, hearts (delight) ---------------------------------- */
  function showToast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("is-in"));
    setTimeout(() => { t.classList.remove("is-in"); setTimeout(() => t.remove(), 300); }, 1800);
  }
  function confettiBurst(x, y, colors) {
    colors = colors || ["#e11d2a", "#f0b429", "#ffffff", "#ff4d58"];
    for (let i = 0; i < 28; i++) {
      const s = document.createElement("span");
      s.className = "confetti";
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.background = colors[i % colors.length];
      const ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 90;
      s.style.setProperty("--tx", (Math.cos(ang) * dist) + "px");
      s.style.setProperty("--ty", (Math.sin(ang) * dist - 30) + "px");
      s.style.setProperty("--rot", (Math.random() * 540 - 270) + "deg");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 950);
    }
  }
  function emojiBurst(x, y, emoji) {
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.className = "emoji-pop"; s.textContent = emoji;
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.setProperty("--tx", (Math.random() * 160 - 80) + "px");
      s.style.setProperty("--ty", (-60 - Math.random() * 120) + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1100);
    }
  }

  /* ---- Reveal on scroll ---------------------------------------------------- */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(el => io.observe(el));
  }

  /* ---- Animated number counters (keeps thousands separators) --------------- */
  function initCounters() {
    const fmt = (n, dec, comma) => {
      const v = dec ? n.toFixed(dec) : String(Math.round(n));
      return comma ? Number(v).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) : v;
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target, raw = el.getAttribute("data-count");
        const num = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
        const prefix = String(raw).match(/^[^0-9.]*/)[0];
        if (!isNaN(num) && el.childNodes[0]) {
          const dur = 1300, t0 = performance.now();
          const dec = String(raw).includes(".") ? 1 : 0;
          const comma = String(raw).includes(",");
          const step = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            const val = num * (1 - Math.pow(1 - p, 3));
            el.childNodes[0].nodeValue = prefix + fmt(val, dec, comma);
            if (p < 1) requestAnimationFrame(step);
            else el.childNodes[0].nodeValue = prefix + fmt(num, dec, comma);
          };
          requestAnimationFrame(step);
        }
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(el => io.observe(el));
  }

  /* ---- Global effects (cursor, nav, background, progress, keys) ------------ */
  function initGlobal() {
    const cursor = $("#cursor"), dot = $("#cursor-dot");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = mx + "px"; dot.style.top = my + "px"; }
      document.body.style.setProperty("--mx", (mx / innerWidth * 100) + "%");
      document.body.style.setProperty("--my", (my / innerHeight * 100) + "%");
    });
    (function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      if (cursor) { cursor.style.left = cx + "px"; cursor.style.top = cy + "px"; }
      requestAnimationFrame(loop);
    })();
    const HOVER = '[data-cursor="link"], a, button, [data-cap], [data-deck], [data-tilt], .video-card, [data-slideshow] .slide, .slideshow__nav, .slideshow__dot, .beyond-emoji';
    document.addEventListener("mouseover", e => {
      if (e.target.closest(HOVER)) cursor && cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest(HOVER)) cursor && cursor.classList.remove("is-hover");
    });

    const nav = $("#nav"), prog = $("#scroll-progress");
    const sections = ["about","capabilities","highlights","work","videos","archive","contact"];
    addEventListener("scroll", () => {
      const st = scrollY, h = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle("is-scrolled", st > 20);
      if (prog) prog.style.width = (st / h * 100) + "%";
      let active = "";
      sections.forEach(id => { const el = $("#" + id); if (el && el.getBoundingClientRect().top < innerHeight * 0.4) active = id; });
      $$(".nav__links a").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + active));
    }, { passive: true });

    // Theme toggle — remembered between visits
    const tgl = $("#theme-toggle");
    const setIcon = () => {
      const ic = tgl && tgl.querySelector(".nav__toggle-icon");
      if (ic) ic.textContent = document.documentElement.getAttribute("data-theme") === "light" ? "☀" : "☾";
    };
    setIcon();
    tgl && tgl.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      setIcon();
      showToast(next === "light" ? "Light mode ☀" : "Dark mode ☾");
    });

    const burger = $("#nav-burger"), links = $("#nav-links");
    burger && burger.addEventListener("click", () => links.classList.toggle("is-open"));
    $$("#nav-links a").forEach(a => a.addEventListener("click", () => links.classList.remove("is-open")));

    // Easter eggs — reward the curious
    const mark = $(".nav__mark");
    if (mark) mark.addEventListener("click", () => {
      const r = mark.getBoundingClientRect();
      confettiBurst(r.left + r.width / 2, r.top + r.height / 2);
      showToast("👋 Hey there — thanks for exploring!");
    });
    const accent = $(".hero__title span:last-child");
    if (accent) {
      accent.style.cursor = "pointer";
      accent.setAttribute("title", "go on, click me");
      accent.addEventListener("click", e => emojiBurst(e.clientX, e.clientY, "❤"));
    }

    // Keyboard controls for lightbox
    addEventListener("keydown", e => {
      if (!LB.el || !LB.el.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
  }

  /* ---- Boot ---------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    if (!C) {
      const host = $("#top") || $("#beyond-content");
      if (host) host.innerHTML = "<p style='padding:120px 24px'>content.js failed to load.</p>";
      return;
    }
    if ($("#beyond-content")) renderBeyond();
    else render();
    initGlobal();
  });
})();
