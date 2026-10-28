import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import {
  createScrollReveal,
  getUserNavigationCount,
  refreshScrollTriggers,
  scrollToSection,
} from "./scrollRevealAnimation";

const REVEAL_SELECTOR = "[data-scroll-reveal]";

function waitForImages() {
  const images = [...document.images];
  images.forEach((image) => {
    image.loading = "eager";
  });

  return Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve();

      return new Promise((resolve) => {
        const settle = () => resolve();
        image.addEventListener("load", settle, { once: true });
        image.addEventListener("error", settle, { once: true });
      });
    }),
  );
}

function ScrollReveal() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const navigationCountAtMount = getUserNavigationCount();
    let context;
    let windowLoadHandled = false;
    let hashAlignment = 0;

    const initialize = () => {
      if (reducedMotion.matches || context) return;

      context = gsap.context(() => {
        document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
          if (!element.matches(".game-card")) createScrollReveal(element);
        });
      });
      refreshScrollTriggers();
    };

    const disable = () => {
      context?.revert();
      context = undefined;
    };

    initialize();

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        disable();
      } else {
        initialize();
      }
    };
    const handleImageLoad = (event) => {
      if (context && event.target instanceof HTMLImageElement) {
        refreshScrollTriggers();
      }
    };
    const alignHashTarget = async (hash, navigationCount) => {
      const currentAlignment = ++hashAlignment;
      if (!hash) return;

      await document.fonts.ready;
      await waitForImages();
      await new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(resolve);
        });
      });

      if (
        currentAlignment !== hashAlignment ||
        window.location.hash !== hash ||
        getUserNavigationCount() !== navigationCount
      ) {
        return;
      }

      const target = document.getElementById(hash.slice(1));
      if (target) scrollToSection(target, { instant: true });
    };
    const handleWindowLoad = () => {
      if (windowLoadHandled) return;
      windowLoadHandled = true;

      const navigationCount = getUserNavigationCount();
      if (navigationCount !== navigationCountAtMount) {
        refreshScrollTriggers();
        return;
      }

      const hash = window.location.hash;
      if (hash) {
        alignHashTarget(hash, navigationCountAtMount);
      } else {
        refreshScrollTriggers();
      }
    };
    const handleHashChange = () => {
      alignHashTarget(window.location.hash, getUserNavigationCount());
    };

    reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    document.addEventListener("load", handleImageLoad, true);
    window.addEventListener("load", handleWindowLoad);
    window.addEventListener("hashchange", handleHashChange);
    if (document.readyState === "complete") handleWindowLoad();

    return () => {
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      document.removeEventListener("load", handleImageLoad, true);
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("hashchange", handleHashChange);
      hashAlignment += 1;
      disable();
    };
  }, []);

  return null;
}

export default ScrollReveal;
