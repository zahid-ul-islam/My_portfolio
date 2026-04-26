import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { Code, Layout, Server } from 'lucide-react';

export function About() {
  const cards = [
    {
      title: "Frontend Development",
      description: "Crafting beautiful, responsive, and dynamic user interfaces using React, Tailwind, and Framer Motion.",
      icon: <Layout className="w-8 h-8 text-primary" />,
      delay: 0.2
    },
    {
      title: "Backend Architecture",
      description: "Building scalable APIs and robust server-side applications with Node.js, NestJS, and PostgreSQL.",
      icon: <Server className="w-8 h-8 text-secondary" />,
      delay: 0.4
    },
    {
      title: "Full-Stack Integration",
      description: "Seamlessly connecting front-to-back with modern tools like Prisma, Docker, and Next.js.",
      icon: <Code className="w-8 h-8 text-accent" />,
      delay: 0.6
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story telling text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-gray-300 text-lg leading-relaxed"
          >
            <p>
              Hi there! I'm <strong className="text-white">Zahidul Islam</strong>, better known as Fahim. I'm a passionate Full-Stack Developer with a deep love for creating interactive, visually stunning, and highly functional web applications.
            </p>
            <p>
              My journey into web development started with a curiosity for how things work behind the scenes. Since then, I've honed my skills across the entire stack—from designing beautiful interfaces to architecting robust databases.
            </p>
            <p>
              I believe that great software is a blend of clean code, intuitive design, and seamless user experience. When I'm not coding, I enjoy exploring new technologies and pushing the boundaries of what's possible on the web.
            </p>
            
            <div className="pt-6 grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium text-xl mb-2">Education</h4>
                <p className="text-sm">Post Graduate & Graduate in CSE from Comilla University</p>
              </div>
              <div>
                <h4 className="text-white font-medium text-xl mb-2">Experience</h4>
                <p className="text-sm">{profileData.experience}</p>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6, delay: card.delay }}
                className="glass-card p-6 flex gap-6 items-start hover:border-primary/50 transition-colors group"
              >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
