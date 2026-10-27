
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Gamepad2 } from "lucide-react";
import EngineBadge from "./EngineBadge";
import PlatformTags from "./PlatformTags";

const PROJECT_COVER_INTERVAL_MS = 3000;

function getCoverImages(project) {
  const mediaImages = (project.media || [])
    .filter((item) => typeof item === "string" || item.type === "image")
    .map((item) =>
      typeof item === "string"
        ? { src: item, title: project.name }
        : {
            src: item.src || item.source || item.url || "",
            title: item.title || project.name,
          },
    )
    .filter((item) => item.src);

  if (mediaImages.length) return mediaImages;

  const cover = project.cover || project.image;
  return cover ? [{ src: cover, title: `${project.name} cover` }] : [];
}

function ProjectCard({ project, index, onOpen }) {
  const coverRef = useRef(null);
  const coverImages = useMemo(() => getCoverImages(project), [project]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState(() => new Set());
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const paused = hovered || focusWithin;
  const reducedMotionIndex = coverImages.findIndex(
    (image) => !failedImages.has(image.src),
  );
  const displayIndex = reducedMotion
    ? Math.max(reducedMotionIndex, 0)
    : currentIndex;
  const currentImage = coverImages[displayIndex];
  const currentImageAvailable =
    currentImage && !failedImages.has(currentImage.src);
  const hasAvailableImage = coverImages.some(
    (image) => !failedImages.has(image.src),
  );

  useEffect(() => {
    if (!coverRef.current) return undefined;

    if (typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(coverRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (
      !inView ||
      paused ||
      reducedMotion ||
      coverImages.length < 2 ||
      !hasAvailableImage
    ) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((current) => {
        for (let offset = 1; offset <= coverImages.length; offset += 1) {
          const next = (current + offset) % coverImages.length;
          if (!failedImages.has(coverImages[next].src)) return next;
        }

        return current;
      });
    }, PROJECT_COVER_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [
    coverImages,
    failedImages,
    hasAvailableImage,
    inView,
    paused,
    reducedMotion,
  ]);

  useEffect(() => {
    if (reducedMotion || coverImages.length < 2 || !currentImageAvailable) return;

    for (let offset = 1; offset <= coverImages.length; offset += 1) {
      const next = coverImages[(currentIndex + offset) % coverImages.length];
      if (!failedImages.has(next.src)) {
        const preload = new Image();
        preload.src = next.src;
        break;
      }
    }
  }, [coverImages, currentImageAvailable, currentIndex, failedImages, reducedMotion]);

  const skipFailedImage = (src) => {
    setFailedImages((failed) => new Set(failed).add(src));
    if (currentImage?.src !== src || coverImages.length < 2) return;

    for (let offset = 1; offset < coverImages.length; offset += 1) {
      const next = (currentIndex + offset) % coverImages.length;
      if (coverImages[next].src !== src && !failedImages.has(coverImages[next].src)) {
        setCurrentIndex(next);
        return;
      }
    }
  };

  const handleCoverFocus = () => setFocusWithin(true);
  const handleCoverBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
  };

  return (
    <motion.article
      layout
      className="game-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.2) }}
      whileHover={{ y: -5 }}
    >
      <div
        className="game-card-cover"
        ref={coverRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={handleCoverFocus}
        onBlurCapture={handleCoverBlur}
      >
        {coverImages.map((image, imageIndex) => (
          <img
            className={`project-cover-image${imageIndex === displayIndex && !failedImages.has(image.src) ? " active" : ""}`}
            key={`${image.src}-${imageIndex}`}
            src={image.src}
            alt=""
            aria-hidden="true"
            loading={imageIndex === 0 || imageIndex === displayIndex ? "eager" : "lazy"}
            onError={() => skipFailedImage(image.src)}
          />
        ))}

        {!hasAvailableImage && (
          <div className="game-cover-fallback">
            <Gamepad2 size={38} strokeWidth={1.3} aria-hidden="true" />
            <span>{project.category}</span>
            <strong>{project.name}</strong>
            <small>PREVIEW COMING SOON</small>
          </div>
        )}

        <div className="game-cover-shade" />

        <span className="game-card-category">{project.category}</span>

        <button
          type="button"
          className="game-card-cover-action"
          onClick={() => onOpen(project)}
          aria-label={`View ${project.name}`}
        >
          <span className="game-card-open">
            <ArrowUpRight size={17} />
          </span>
        </button>

        {coverImages.length > 1 && !reducedMotion && (
          <div className="project-cover-dots" aria-label={`${project.name} cover images`}>
            {coverImages.map((image, imageIndex) => (
              <button
                type="button"
                key={`${image.src}-dot`}
                className={imageIndex === currentIndex ? "active" : ""}
                onClick={() => {
                  setCurrentIndex(imageIndex);
                }}
                aria-label={`Show ${project.name} cover ${imageIndex + 1}`}
                aria-pressed={imageIndex === currentIndex}
                disabled={failedImages.has(image.src)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="game-card-info">
        <div className="game-card-meta">
          <EngineBadge engine={project.engine} />
          <span className="game-card-platforms">
            {project.platforms.length ? (
              <PlatformTags platforms={project.platforms} />
            ) : (
              "Platform TBC"
            )}
          </span>
        </div>

        <button
          type="button"
          className="game-card-title"
          onClick={() => onOpen(project)}
        >
          {project.name}
          <ArrowUpRight size={17} />
        </button>

        <p>{project.description}</p>

        <div className="game-card-tags">
          {project.genres.slice(0, 2).map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
