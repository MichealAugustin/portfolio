import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let refreshFrame = 0;
let sectionNavigationActive = false;
let refreshPending = false;
let activeNavigationCleanup;
let forcedRevealSection;
let userNavigationCount = 0;

export function markUserNavigation() {
  userNavigationCount += 1;
}

export function getUserNavigationCount() {
  return userNavigationCount;
}

function getRevealFrom(element) {
  const revealType = element.dataset.scrollReveal;
  const journeyItem = element.classList.contains("journey-item");
  let x = 0;
  let y = 30;
  let scale = 1;

  if (revealType === "from-left") {
    x = journeyItem ? -30 : -24;
    y = 0;
  } else if (revealType === "from-right") {
    x = journeyItem ? 30 : 24;
    y = 0;
  } else if (revealType === "scale") {
    y = 0;
    scale = 0.94;
  } else if (revealType === "gallery-heading") {
    y = 20;
  } else if (revealType === "contact-content") {
    y = 24;
  } else if (revealType === "featured-game-panel") {
    y = 28;
  } else if (revealType === "project-card") {
    y = 18;
  }

  return { opacity: 0, x, y, scale };
}

function clearForcedReveal() {
  if (!forcedRevealSection) return;

  forcedRevealSection.removeAttribute("data-anchor-revealed");
  forcedRevealSection = undefined;
  window.removeEventListener("wheel", clearForcedReveal);
  window.removeEventListener("touchmove", clearForcedReveal);
  window.removeEventListener("keydown", clearForcedReveal);
}

function setScrollTopInstant(targetY) {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  document.scrollingElement.scrollTop = targetY;
  root.style.scrollBehavior = previousScrollBehavior;
}

export function createScrollReveal(element) {
  const bounds = element.getBoundingClientRect();
  if (bounds.top < window.innerHeight || bounds.bottom <= 0) return null;

  const delay = Number(element.dataset.revealDelay);
  const startPercent = element.matches(".skill-group, .game-card")
    ? 95
    : Number.isFinite(delay)
      ? Math.max(84, 92 - delay / 50)
      : 90;

  return gsap.fromTo(
    element,
    getRevealFrom(element),
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: `top ${startPercent}%`,
        end: "top 70%",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
      immediateRender: false,
    },
  );
}

export function completeRevealsThroughSection(section) {
  clearForcedReveal();
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;

  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.trigger instanceof Element &&
      trigger.trigger.getBoundingClientRect().top + window.scrollY <= sectionTop &&
      trigger.animation
    ) {
      trigger.animation.progress(1);
    }
  });

  section.querySelectorAll("[data-scroll-reveal]").forEach((element) => {
    gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 });
  });
  section.setAttribute("data-anchor-revealed", "");
  forcedRevealSection = section;
  window.addEventListener("wheel", clearForcedReveal, { passive: true });
  window.addEventListener("touchmove", clearForcedReveal, { passive: true });
  window.addEventListener("keydown", clearForcedReveal);
}

export function scrollToSection(section, { instant = false } = {}) {
  activeNavigationCleanup?.();
  activeNavigationCleanup = undefined;
  sectionNavigationActive = false;

  if (refreshFrame) {
    window.cancelAnimationFrame(refreshFrame);
    refreshFrame = 0;
  }
  refreshPending = false;
  ScrollTrigger.refresh();

  const navHeight = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
  );
  const targetY =
    section.getBoundingClientRect().top + window.scrollY - navHeight;

  if (
    instant ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Math.abs(window.scrollY - targetY) < 1
  ) {
    setScrollTopInstant(targetY);
    completeRevealsThroughSection(section);
    return;
  }

  let settleTimeout;
  let fallbackTimeout;
  let finished = false;
  const finishNavigation = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(settleTimeout);
    window.clearTimeout(fallbackTimeout);
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("scrollend", finishNavigation);

    sectionNavigationActive = false;
    activeNavigationCleanup = undefined;
    if (refreshPending) {
      refreshPending = false;
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }

    const finalTargetY =
      section.getBoundingClientRect().top + window.scrollY - navHeight;
    if (Math.abs(window.scrollY - finalTargetY) > 1) {
      setScrollTopInstant(finalTargetY);
    }

    completeRevealsThroughSection(section);
  };
  const handleScroll = () => {
    window.clearTimeout(settleTimeout);
    settleTimeout = window.setTimeout(finishNavigation, 150);
  };

  activeNavigationCleanup = () => {
    window.clearTimeout(settleTimeout);
    window.clearTimeout(fallbackTimeout);
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("scrollend", finishNavigation);
    finished = true;
  };
  sectionNavigationActive = true;
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("scrollend", finishNavigation, { once: true });
  fallbackTimeout = window.setTimeout(finishNavigation, 2200);
  window.scrollTo({ top: targetY, behavior: "smooth" });
}

export function refreshScrollTriggers() {
  if (sectionNavigationActive) {
    refreshPending = true;
    return;
  }

  if (refreshFrame) return;

  refreshFrame = window.requestAnimationFrame(() => {
    refreshFrame = 0;
    ScrollTrigger.refresh();
    ScrollTrigger.update();
  });
}
