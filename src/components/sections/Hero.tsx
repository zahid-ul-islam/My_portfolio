import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import profilePic from '../../assets/profilePic.jpg';
import cvFile from '../../assets/zahidul_islamCV2.pdf';
import { Download, ArrowRight, Terminal } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { SiReact, SiNodedotjs, SiTypescript, SiNextdotjs, SiNestjs, SiPostgresql, SiMongodb, SiDocker } from 'react-icons/si';

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const LinkedinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      
      {/* Background Animated Tech Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
        
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col space-y-"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <span className="px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium tracking-widest uppercase flex items-center gap-2 w-max shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Terminal size={14} /> System Initialized
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold leading-tight">
            Hi, I'm <br />
            <span className="text-gradient inline-block mt-2">{profileData.name}</span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="text-xl md:text-3xl text-gray-400 font-light h-10">
            <span className="text-white font-medium mr-2">&gt;</span>
            <TypeAnimation
              sequence={[
                'Software Engineer', 1500,
                'Full Stack Developer', 1500,
                'MERN Stack Expert', 1500,
                'Next.js Enthusiast', 1500,
              ]}
              wrapper="span"
              speed={50}
              className="text-white font-bold text-accent"
              repeat={Infinity}
            />
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-gray-400 max-w-lg leading-relaxed text-lg border-l-2 border-primary/50 pl-4 bg-white/[0.02] py-2 rounded-r-lg">
            {profileData.objective}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-6">
            <a
              href="#projects"
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={cvFile}
              download="Zahidul_Islam_CV.pdf"
              className="px-8 py-3.5 rounded-lg glass font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all border border-white/10 hover:border-accent/50 group"
            >
              Download CV
              <Download size={18} className="group-hover:-translate-y-1 transition-transform text-accent" />
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-6 pt-6">
            <SocialIcon href={profileData.socialLinks.github} icon={<GithubIcon />} />
            <SocialIcon href={profileData.socialLinks.linkedin} icon={<LinkedinIcon />} />
          </motion.div>
        </motion.div>

        {/* High-Tech Visual / Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0"
        >
          {/* Core Glow */}
          <div className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-primary to-accent blur-[100px] opacity-60 animate-pulse" />

          {/* Abstract Orbit Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-[450px] h-[450px] rounded-full border-[2px] border-dashed border-primary/30 absolute shadow-[0_0_20px_rgba(139,92,246,0.1)_inset]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="w-[320px] h-[320px] rounded-full border border-secondary/40 absolute"
            />
          </div>

          {/* Orbiting Tech Icons */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* Outer Orbit */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px]"
            >
              {/* Top: React */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-[#61DAFB] shadow-[0_0_15px_rgba(97,218,251,0.5)]">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                  <SiReact size={28} />
                </motion.div>
              </div>
              {/* Right: Node.js */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-[#339933] shadow-[0_0_15px_rgba(51,153,51,0.5)]">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                  <SiNodedotjs size={28} />
                </motion.div>
              </div>
              {/* Bottom: MongoDB */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-[#47A248] shadow-[0_0_15px_rgba(71,162,72,0.5)]">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                  <SiMongodb size={28} />
                </motion.div>
              </div>
              {/* Left: TypeScript */}
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-[#3178C6] shadow-[0_0_15px_rgba(49,120,198,0.5)]">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
                  <SiTypescript size={28} />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Inner Orbit */}
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[320px] h-[320px]"
            >
              {/* Top: Next.js */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 p-2.5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
                  <SiNextdotjs size={24} />
                </motion.div>
              </div>
              {/* Right: PostgreSQL */}
              <div className="absolute top-1/2 -right-5 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-[#4169E1] shadow-[0_0_15px_rgba(65,105,225,0.4)]">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
                  <SiPostgresql size={24} />
                </motion.div>
              </div>
              {/* Bottom: NestJS */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 p-2.5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-[#E0234E] shadow-[0_0_15px_rgba(224,35,78,0.4)]">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
                  <SiNestjs size={24} />
                </motion.div>
              </div>
              {/* Left: Docker */}
              <div className="absolute top-1/2 -left-5 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 text-[#2496ED] shadow-[0_0_15px_rgba(36,150,237,0.4)]">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
                  <SiDocker size={24} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Futuristic Portrait Image */}
          <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full border-[3px] border-transparent bg-gradient-to-tr from-primary via-accent to-secondary p-1 shadow-[0_0_50px_rgba(139,92,246,0.3)] group cursor-pointer overflow-hidden">
            {/* Tech Scanner Line */}
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-[30px] bg-gradient-to-b from-transparent via-accent/40 to-transparent blur-md z-30 pointer-events-none"
            />
            
            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden relative z-10 border-[3px] border-black">
               <img 
                 src={profilePic} 
                 alt="Zahidul Islam" 
                 className="w-full h-full object-cover rounded-full group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700 filter brightness-90 group-hover:brightness-110"
               />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-xl glass hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all duration-300 hover:-translate-y-1 shadow-lg"
    >
      {icon}
    </a>
  );
}

