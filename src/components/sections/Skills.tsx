import { motion } from 'framer-motion';
import { Cloud } from 'react-icon-cloud';
import { profileData } from '../../data/profile';

const getSlug = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('node.js')) return 'nodedotjs';
  if (s.includes('next.js')) return 'nextdotjs';
  if (s.includes('tailwind')) return 'tailwindcss';
  if (s.includes('express')) return 'express';
  return s.replace(/\s+/g, '');
};

const getHexColor = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes('mongodb')) return '47A248';
  if (s.includes('react')) return '61DAFB';
  if (s.includes('node.js')) return '339933';
  if (s.includes('typescript')) return '3178C6';
  if (s.includes('tailwind')) return '06B6D4';
  if (s.includes('nestjs')) return 'E0234E';
  if (s.includes('postgresql')) return '4169E1';
  if (s.includes('docker')) return '2496ED';
  if (s.includes('gitlab')) return 'FCA121';
  if (s.includes('git') && !s.includes('github') && !s.includes('gitlab')) return 'F05032';
  return 'ffffff';
};

export function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="text-secondary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Main Skills Cloud */}
          <div className="glass-card p-8 flex flex-col items-center justify-center relative min-h-[400px]">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 w-full self-start absolute top-8 left-8 z-10">
              <span className="w-2 h-8 bg-secondary rounded-full block"></span>
              Core Technologies
            </h3>
            
            <div className="w-full h-full flex items-center justify-center mt-8">
              <Cloud
                options={{
                  reverse: true,
                  depth: 1,
                  wheelZoom: false,
                  imageScale: 2,
                  activeCursor: "default",
                  tooltip: "native",
                  initial: [0.05, -0.05],
                  clickToFront: 500,
                  tooltipDelay: 0,
                  outlineColour: "#0000",
                  maxSpeed: 0.02,
                  minSpeed: 0.01,
                  textHeight: 14,
                  textFont: "Raleway, sans-serif",
                  textColour: "#fff",
                  imageMode: "both",
                  imagePosition: "top",
                  imagePadding: 4,
                }}
              >
                {profileData.skills.map((skill, index) => (
                  <a key={index} href="#" title={skill} onClick={(e) => e.preventDefault()} style={{ fontWeight: "bold" }}>
                    <img 
                      src={`https://cdn.simpleicons.org/${getSlug(skill)}/${getHexColor(skill)}`} 
                      alt={skill} 
                      width="42" 
                      height="42" 
                    />
                    {skill}
                  </a>
                ))}
              </Cloud>
            </div>
          </div>

          {/* Other Skills */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-accent rounded-full block"></span>
                Competencies
              </h3>
              <div className="space-y-4">
                {profileData.coreCompetencies.map((comp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-gray-300">{comp}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full block"></span>
                Creative Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {profileData.additionalSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-lg text-sm text-gray-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
