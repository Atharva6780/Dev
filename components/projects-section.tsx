"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Farm Bazaar – Contract Farming Platform",
    description:
      "Built a decentralized platform enabling farmers and buyers to pre-sell crops before harvesting. Integrated intelligent models for price prediction, yield estimation, and disease detection along with chatbot support and crop recommendation features.",
    tags: ["MERN Stack", "AI/ML", "MongoDB", "React"],
    color: "from-primary/20 to-primary/5",
    link: "#",
    github: "https://github.com/Atharva6780/ContractFarming",
  },
  {
    title: "ForeScape – Event Driven Prediction Market",
    description:
      "Designed a real-time prediction market engine supporting binary and multi-outcome contracts with dynamic pricing. Implemented automated market-making logic and engineered portfolio analytics including P&L tracking and ROI computation.",
    tags: ["MERN Stack", "Real-Time Systems", "Market Engine", "System Design"],
    color: "from-chart-2/20 to-chart-2/5",
    link: "#",
    github: "https://github.com/Atharva6780/ForeScape",
  },
  {
    title: "EcoSynth – AI Powered Multimedia Companion",
    description:
      "Developed a multimedia platform combining text-to-speech, voice cloning, and speech-to-text capabilities. Enabled multilingual dubbing and AI-based real-time content generation.",
    tags: ["Python", "AI/ML", "Speech Processing", "Automation"],
    color: "from-chart-4/20 to-chart-4/5",
    link: "#",
    github: "https://github.com/Atharva6780/PCU_HACKATHON",
  },
  {
    title: "BailEase – AI Powered Legal Support System",
    description:
      "Created an intelligent platform to simplify the bail process for undertrial prisoners. Integrated chatbot assistance and automated eligibility assessment to streamline legal workflows.",
    tags: ["MERN Stack", "AI Integration", "Chatbot", "MongoDB"],
    color: "from-chart-5/20 to-chart-5/5",
    link: "#",
    github: "#",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="group relative rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/40 transition-colors"
      >
        {/* Gradient header */}
        <div
          className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.72_0.19_180/0.15),transparent)]" />
          {/* Floating node decoration */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-40 transition-opacity"
            viewBox="0 0 400 200"
            aria-hidden="true"
          >
            <circle
              cx="80"
              cy="60"
              r="4"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="200"
              cy="40"
              r="4"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="320"
              cy="80"
              r="4"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="140"
              cy="140"
              r="4"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="260"
              cy="160"
              r="4"
              fill="currentColor"
              className="text-primary"
            />
            <line
              x1="80"
              y1="60"
              x2="200"
              y2="40"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1="200"
              y1="40"
              x2="320"
              y2="80"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1="80"
              y1="60"
              x2="140"
              y2="140"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1="200"
              y1="40"
              x2="260"
              y2="160"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1="320"
              y1="80"
              x2="260"
              y2="160"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              href={project.link}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
              aria-label="View live project"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={project.github}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
              aria-label="View source code"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono rounded-full bg-secondary border border-border/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Parallax background element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-primary">
            Portfolio
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground text-balance">
            Selected <span className="text-primary">Projects</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            A collection of recent work spanning automation, web development,
            and full-stack applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
