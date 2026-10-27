
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import EngineBadge from "./EngineBadge";
import PlatformTags from "./PlatformTags";
import { personalInfo } from "../data/portfolio";

function getMedia(project) {
  const items = (project.media || []).map((item) => {
    if (typeof item === "string") {
      return { type: "image", src: item };
    }

    return {
      type: item.type || "image",
      src: item.src || item.source || item.url || "",
      title: item.title || project.name,
    };
  });

  const cover = project.cover || project.image;
  if (cover && !items.some((item) => item.src === cover)) {
    items.unshift({
      type: "image",
      src: cover,
      title: project.name,
    });
  }

  return items.filter((item) => item.src);
}

function ProjectModal({ project, onClose }) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [failedMedia, setFailedMedia] = useState(() => new Set());

  const media = useMemo(
    () => (project ? getMedia(project) : []),
    [project]
  );

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();

      if (event.key === "ArrowRight") {
        setMediaIndex((current) =>
          media.length ? (current + 1) % media.length : 0
        );
      }

      if (event.key === "ArrowLeft") {
        setMediaIndex((current) =>
          media.length ? (current - 1 + media.length) % media.length : 0
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, media.length, onClose]);

  if (!project) return null;

  const currentMedia = media[mediaIndex];

  const isVideo =
    currentMedia?.type === "video" ||
    currentMedia?.type === "youtube" ||
    currentMedia?.src.includes("youtube.com/embed/") ||
    currentMedia?.src.includes("youtu.be/");

  const videoUrl = currentMedia?.src.includes("watch?v=")
    ? `https://www.youtube-nocookie.com/embed/${
        new URL(currentMedia.src).searchParams.get("v")
      }`
    : currentMedia?.src.includes("youtu.be/")
      ? `https://www.youtube-nocookie.com/embed/${
          currentMedia.src.split("youtu.be/")[1].split(/[?&]/)[0]
        }`
      : currentMedia?.src;

  return (
    <AnimatePresence>
      <motion.div
        className="game-modal-backdrop"
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.section
          className="game-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} project details`}
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.25 }}
        >
          <header className="game-modal-header">
            <div>
              <span className="eyebrow">{project.category}</span>
              <h2>{project.name}</h2>
            </div>

            <button
              type="button"
              className="game-modal-close"
              onClick={onClose}
              aria-label="Close project details"
            >
              <X size={21} />
            </button>
          </header>

          <div className="game-modal-layout">
            <div className="game-modal-gallery">
              <div className="game-modal-stage">
                {currentMedia && isVideo ? (
                  <iframe
                    src={videoUrl}
                    title={`${project.name} project video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : currentMedia && !failedMedia.has(currentMedia.src) ? (
                  <img
                    src={currentMedia.src}
                    alt={currentMedia.title}
                    onError={() =>
                      setFailedMedia((failed) => new Set(failed).add(currentMedia.src))
                    }
                  />
                ) : currentMedia ? (
                  <div className="game-modal-no-media" role="img" aria-label={`${currentMedia.title} unavailable`}>
                    <strong>Screenshot unavailable</strong>
                  </div>
                ) : (
                  <div className="game-modal-no-media">
                    <span className="modal-placeholder-mark" aria-hidden="true">{personalInfo.initials}</span>
                    <strong>Project media coming soon</strong>
                    <span>Screenshots or video will appear here when available.</span>
                  </div>
                )}
              </div>

              {media.length > 1 && (
                <div className="game-modal-media-controls">
                  <button
                    type="button"
                    onClick={() =>
                      setMediaIndex((mediaIndex - 1 + media.length) % media.length)
                    }
                    aria-label="Previous media"
                  >
                    <ArrowLeft size={17} />
                  </button>

                  <span>
                    {mediaIndex + 1} / {media.length}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setMediaIndex((mediaIndex + 1) % media.length)
                    }
                    aria-label="Next media"
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}

              {media.length > 1 && (
                <div className="game-modal-thumbnails">
                  {media.map((item, index) => (
                    <button
                      type="button"
                      key={`${item.src}-${index}`}
                      className={mediaIndex === index ? "active" : ""}
                      onClick={() => setMediaIndex(index)}
                      aria-label={`Show media ${index + 1}`}
                    >
                      {item.type === "video" || item.type === "youtube" ? (
                        <span>VIDEO</span>
                      ) : (
                        <img
                          src={item.src}
                          alt=""
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="game-modal-details">
              <span className="eyebrow">PROJECT OVERVIEW</span>
              <p>{project.description}</p>

              <div className="game-modal-detail-block">
                <h3>Engine</h3>
                <EngineBadge engine={project.engine} />
              </div>

              <div className="game-modal-detail-block">
                <h3>Platform</h3>
                <div className="game-card-tags">
                  {project.platforms.length ? (
                    <PlatformTags platforms={project.platforms} />
                  ) : (
                    <span>Not specified</span>
                  )}
                </div>
              </div>

              <div className="game-modal-detail-block">
                <h3>Genres</h3>
                <div className="game-card-tags">
                  {project.genres.map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
                </div>
              </div>

              <div className="game-modal-detail-block">
                <h3>Technologies</h3>
                <div className="game-card-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <div className="game-modal-detail-block">
                <h3>Features</h3>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="reference-button"
                >
                  {link.label}
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProjectModal;
