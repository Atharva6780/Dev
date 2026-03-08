"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Zap,
  Star,
  ArrowRight,
  Check,
  Mail,
  Database,
  BarChart3,
  Bot,
  Globe,
  Shield,
} from "lucide-react";

const categories = [
  "All",
  "Lead Gen",
  "CRM",
  "AI",
  "E-commerce",
  "Social Media",
];

const products = [
  {
    id: 1,
    title: "AI Lead Qualifier",
    description:
      "Automatically scores and qualifies leads using AI. Routes hot leads to your CRM, sends nurture sequences to warm leads, and filters out noise.",
    price: 49,
    originalPrice: 79,
    category: "Lead Gen",
    rating: 4.9,
    reviews: 23,
    icon: Bot,
    features: [
      "GPT-4 Integration",
      "CRM Auto-Sync",
      "Lead Scoring",
      "Email Sequences",
    ],
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "CRM Pipeline Sync",
    description:
      "Keep HubSpot, Salesforce, and Notion databases perfectly synchronized. Real-time bi-directional sync with conflict resolution.",
    price: 39,
    originalPrice: null,
    category: "CRM",
    rating: 4.8,
    reviews: 18,
    icon: Database,
    features: [
      "Bi-directional Sync",
      "Conflict Resolution",
      "Real-time Updates",
      "Error Logging",
    ],
    badge: null,
  },
  {
    id: 3,
    title: "Social Media Autopilot",
    description:
      "Schedule, post, and analyze content across all major platforms. AI-generated captions and optimal posting time detection.",
    price: 59,
    originalPrice: 89,
    category: "Social Media",
    rating: 4.7,
    reviews: 31,
    icon: Globe,
    features: [
      "Multi-Platform",
      "AI Captions",
      "Analytics",
      "Smart Scheduling",
    ],
    badge: "Popular",
  },
  {
    id: 4,
    title: "E-commerce Order Flow",
    description:
      "End-to-end order processing automation. From payment confirmation to shipping notification with inventory updates and accounting sync.",
    price: 69,
    originalPrice: null,
    category: "E-commerce",
    rating: 5.0,
    reviews: 12,
    icon: ShoppingCart,
    features: [
      "Order Processing",
      "Inventory Sync",
      "Shipping Alerts",
      "Accounting",
    ],
    badge: null,
  },
  {
    id: 5,
    title: "AI Content Generator",
    description:
      "Generate blog posts, social media content, and newsletters from a single content brief. Supports multiple tones and formats.",
    price: 44,
    originalPrice: 69,
    category: "AI",
    rating: 4.6,
    reviews: 27,
    icon: Zap,
    features: [
      "Multi-Format",
      "Custom Tones",
      "SEO Optimized",
      "Bulk Generation",
    ],
    badge: "New",
  },
  {
    id: 6,
    title: "Analytics Reporter",
    description:
      "Automated weekly and monthly reports pulling from Google Analytics, Stripe, and your database. Beautiful PDF and Slack summaries.",
    price: 34,
    originalPrice: null,
    category: "E-commerce",
    rating: 4.8,
    reviews: 15,
    icon: BarChart3,
    features: ["PDF Reports", "Slack Summaries", "Multi-Source", "Scheduled"],
    badge: null,
  },
  {
    id: 7,
    title: "Email Outreach Engine",
    description:
      "Cold outreach automation with personalized emails, follow-up sequences, and response tracking. Integrates with any SMTP provider.",
    price: 54,
    originalPrice: 79,
    category: "Lead Gen",
    rating: 4.9,
    reviews: 20,
    icon: Mail,
    features: [
      "Personalization",
      "Follow-ups",
      "Response Tracking",
      "A/B Testing",
    ],
    badge: "Best Seller",
  },
  {
    id: 8,
    title: "Security Alert System",
    description:
      "Monitor your infrastructure and get instant alerts for downtime, security threats, or unusual activity. Multi-channel notifications.",
    price: 29,
    originalPrice: null,
    category: "CRM",
    rating: 4.7,
    reviews: 9,
    icon: Shield,
    features: [
      "Real-time Monitoring",
      "Multi-Channel",
      "Custom Rules",
      "Incident Log",
    ],
    badge: null,
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = product.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      layout
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="group relative h-full flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/40 transition-all"
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
              {product.badge}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="p-6 pb-0">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>

          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-primary shrink-0" />
                <span className="text-xs text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity glow-teal-sm"
          >
            Buy Now
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section ref={sectionRef} id="products" className="relative py-32 px-6">
      {/* Decorative */}
      <div className="absolute left-1/2 top-0 h-24 w-px bg-gradient-to-b from-transparent to-primary/30" />
      <div className="absolute left-0 top-1/3 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-primary">
            Marketplace
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground text-balance">
            Premium <span className="text-primary">n8n Workflows</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Battle-tested automation workflows ready to deploy. Each workflow
            comes with documentation, setup guide, and lifetime updates.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-mono rounded-full border transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary glow-teal-sm"
                  : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-12 text-center glow-teal"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            Let's Build Something Great
          </h3>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {
              "I create custom automation workflows and modern websites tailored to your needs. Let's bring your ideas to life and build solutions that save time, improve efficiency, and grow your business."
            }
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            {"Let's Talk"}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
