gsap.registerPlugin(ScrollTrigger);

function initHeroEntrance(containerSelector, itemSelector) {
  gsap.from(itemSelector || `${containerSelector} > *`, {
    y: 32,
    opacity: 0,
    filter: "blur(6px)",
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
    clearProps: "filter",
  });
}

function initLineReveal(headingSelector) {
  const headings = document.querySelectorAll(headingSelector);
  headings.forEach((heading) => {
    const lines = heading.querySelectorAll(".line-inner");
    if (!lines.length) return;
    gsap.from(lines, {
      y: "110%",
      duration: 0.85,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: heading,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });
  });
}

function initParallax(layers) {
  layers.forEach(({ selector, speed }) => {
    const targets = document.querySelectorAll(selector);
    if (!targets.length) return;
    targets.forEach((target) => {
      gsap.to(target, {
        y: () => window.innerHeight * (speed - 1) * -0.35,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: speed,
        },
      });
    });
  });
}

function initSectionReveals() {
  document.querySelectorAll(".reveal-block").forEach((block) => {
    gsap.to(block, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: block,
        start: "top 82%",
        toggleActions: "play none none none",
        onEnter: () => block.classList.add("is-visible"),
      },
    });
  });
}

function initSideRail() {
  const progress = document.getElementById("navProgress");
  const links = Array.from(document.querySelectorAll("[data-section-link]"));
  const sections = Array.from(document.querySelectorAll("[data-section]"));
  if (!progress || !links.length || !sections.length) return;

  function setActiveNavItem(index) {
    links.forEach((link, i) => link.classList.toggle("is-active", i === index));
  }

  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveNavItem(index),
      onEnterBack: () => setActiveNavItem(index),
    });
  });

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      progress.style.height = `${self.progress * 100}%`;
    },
  });
}

function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== item) other.removeAttribute("open");
      });
    });
  });
}

function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initHeroEntrance(".hero-copy", ".hero-copy .js-hero-title, .hero-copy .js-hero-subtitle, .hero-copy .js-hero-cta");
  initLineReveal(".section-label, .section-title");
  initParallax([
    { selector: "[data-parallax-layer='0.6']", speed: 0.6 },
    { selector: "[data-parallax-layer='0.82']", speed: 0.82 },
    { selector: "[data-parallax-layer='1.08']", speed: 1.08 },
  ]);
  initSectionReveals();
  initSideRail();
  initFaq();
  initAnchors();

  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
});
