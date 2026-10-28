
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/portfolio";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const filters = ["All", ...new Set(projects.map((project) => project.category))];

function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    return projects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section id="projects" className="game-gallery">
      <div className="reference-container">
        <motion.header
          data-scroll-reveal="gallery-heading"
          className="gallery-heading"
        >
          <div>
            <span className="eyebrow">MY PROJECTS</span>
            <h2>Games I've worked on.</h2>
            <p>
              A collection of games, interactive experiences, and
              development projects. Select a project to view its details.
            </p>
          </div>

          <span className="gallery-total">
            {String(visibleProjects.length).padStart(2, "0")} PROJECTS
          </span>
        </motion.header>

        <div className="gallery-filters" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="game-grid">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 && (
          <div className="gallery-empty">
            No projects in this category yet.
          </div>
        )}
      </div>

      <ProjectModal
        key={selectedProject?.id ?? "closed"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

export default FeaturedProjects;
