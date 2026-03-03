"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const skills = [
  { name: "Java", category: "Programming" },
  { name: "JavaScript", category: "Programming" },
  { name: "TypeScript", category: "Programming" },
  { name: "Python", category: "Programming" },

  { name: "React.js", category: "Frontend" },
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },

  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },

  { name: "MongoDB", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Firebase", category: "Database" },

  { name: "REST APIs", category: "Integration" },
  { name: "n8n", category: "Automation" },

  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" }
];

const experiences = [
  {
    year: "Nov 2024 - June 2025",
    title: "Web Developer Intern",
    company: "Athang Infotech",
    description:
      "Worked on real-time client projects including booking engine, attendance system, and billing software. Developed the complete frontend for the booking engine and integrated it with backend REST APIs. Built an Organizations module for managing user access across multiple organizations and designed workflow automation solutions to improve operational efficiency.",
  }
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 h-24 w-px bg-gradient-to-b from-transparent to-primary/30" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-primary">
            About Me
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground text-balance">
            Transforming Complex Ideas into
            <span className="text-primary"> Scalable Systems</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            I am a developer focused on building scalable digital systems and
            intelligent automation solutions. I design structured applications
            and workflow automations that streamline operations, improve
            efficiency, and enable businesses to scale with confidence.
          </p>
        </motion.div>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: "50+", label: "Workflows Built" },
            { value: "30+", label: "Happy Clients" },
            { value: "4+", label: "Years Experience" },
            { value: "99%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <AnimatedCard key={stat.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-primary text-glow">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground font-mono">
                  {stat.label}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div> */}

        {/* Skills */}
        <AnimatedCard delay={0.2}>
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Tech Stack
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 text-sm font-mono rounded-lg bg-secondary border border-border/50 text-secondary-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Experience Timeline */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-12 text-center">
            Experience
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {experiences.map((exp, i) => (
              <AnimatedCard key={exp.year} delay={i * 0.15}>
                <div
                  className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-2 w-3 h-3 rounded-full bg-primary glow-teal-sm -translate-x-[5px] md:-translate-x-[6px]" />

                  <div
                    className={`md:w-1/2 pl-8 md:pl-0 ${
                      i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"
                    }`}
                  >
                    <span className="text-xs font-mono text-primary tracking-wider">
                      {exp.year}
                    </span>
                    <h4 className="text-xl font-bold text-foreground mt-1">
                      {exp.title}
                    </h4>
                    <p className="text-sm text-primary/80 font-semibold">
                      {exp.company}
                    </p>
                    <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
