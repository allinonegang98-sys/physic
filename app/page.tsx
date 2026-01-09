"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, useScroll, useTransform, useInView, useSpring, useMotionValue, 
  AnimatePresence, PanInfo 
} from "framer-motion";
import { 
  Menu, X, Phone, CheckCircle, ArrowRight, Zap, 
  BookOpen, TrendingUp, Send, User, Book, MapPin, 
  Sparkles, Trophy, Sun, Moon, Calendar, Clock
} from "lucide-react";

// ==========================================
// 1. CONFIGURATION & IMAGES
// ==========================================

const CONFIG = {
  waNumber: "919827067941", 
  videoFile: "/demo.mp4", 
  targetDate: "2026-04-01T10:00:00", 
};

const IMAGES = {
  logo: "/logo.jpeg",
  heroMain: "/amitsaxena.png",
  toppers2024: "/topper.jpeg",
  results2025: "/list1.jpeg",
  groupPhoto: "/celebration.jpeg",
  results11th: "/list2.jpeg",
  gallery1: "/ccg1.jpeg",
  gallery2: "/list3.jpeg",
};

// ==========================================
// 2. HELPER COMPONENTS
// ==========================================

// --- ANIMATED THEME TOGGLE ---
const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-white/5 shadow-sm"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

// --- COUNTDOWN TIMER ---
const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const difference = target - now;
      if (difference <= 0) { clearInterval(interval); } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3 md:gap-4 my-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 p-3 rounded-xl min-w-[70px] shadow-sm">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{String(value).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-bold">{unit}</span>
        </div>
      ))}
    </div>
  );
};

// --- TYPEWRITER ---
const Typewriter = ({ words, delay = 3000 }: { words: string[], delay?: number }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), delay);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt((Math.random() * 350).toString())));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, delay]);

  return (
    <span className="inline-block">
      {words[index].substring(0, subIndex)}
      <span className={`inline-block w-[3px] h-[1em] bg-cyan-500 ml-1 align-middle ${blink ? "opacity-100" : "opacity-0"}`}></span>
    </span>
  );
};

// --- SMART NOTIFICATION ---
const FloatingNotification = () => {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (count >= 4) return;
    const timer = setTimeout(() => {
      setVisible(true);
      setCount((prev) => prev + 1);
      setTimeout(() => setVisible(false), 5000);
    }, 20000); 
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-24 left-6 z-40 bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-cyan-500/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[300px]"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center">
            <User className="text-white w-5 h-5" />
          </div>
          <div>
            <p className="text-slate-900 dark:text-white text-xs font-bold">New Student Enrolled!</p>
            <p className="text-slate-500 dark:text-slate-400 text-[10px]">Just now • 11th Class Physics</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

export default function ASPICoachingWebsite() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openWhatsApp = (msg: string) => {
    const url = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#020617] dark:text-slate-100 selection:bg-cyan-500 selection:text-white`}>
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-[#020617]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-3" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur rounded-full opacity-20 dark:opacity-50"></div>
              <img src={IMAGES.logo} alt="ASPI Logo" className="relative w-10 h-10 object-contain bg-white rounded-full p-0.5" />
            </div>
            <div className="leading-tight font-bold text-slate-900 dark:text-white tracking-tight">
              ASPI <span className="text-cyan-500">.</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {["Home", "Results", "Courses", "Gallery"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-500 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <ThemeToggle />
             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openWhatsApp("Hello Sir, I want to book a demo class.")} className="px-6 py-2.5 bg-cyan-500 text-white dark:text-black rounded-full font-bold text-sm shadow-lg hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors">
               Book Demo
             </motion.button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
             <ThemeToggle />
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-900 dark:text-white">
                {mobileMenuOpen ? <X /> : <Menu />}
             </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 shadow-xl p-6 flex flex-col gap-4 md:hidden">
            {["Home", "Results", "Courses", "Gallery", "Enroll"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-slate-600 dark:text-slate-300 font-medium py-2 border-b border-slate-100 dark:border-white/5 hover:text-cyan-500">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center pt-32 pb-24 lg:pt-0 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
           <motion.div animate={{ scale: [1, 1.5, 1], x: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="pt-8 order-2 lg:order-1">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm dark:bg-cyan-950/30 dark:border-cyan-500/30 dark:shadow-none backdrop-blur-md mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]">#1 Physics Institute</span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.0] mb-6 tracking-tight">
              MASTER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 animate-gradient">
                PHYSICS WITH
              </span> <br />
              <span className="text-cyan-500">
                <Typewriter words={["AMIT SAXENA", "THE MENTOR", "THE WIZARD"]} />
              </span>
            </h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-lg leading-relaxed font-medium">
              Forget boring lectures. Experience Physics with <strong>visualizations</strong>, <strong>experiments</strong>, and <strong>high-energy</strong> classes.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} /> New Batch Starting In:
              </p>
              <CountdownTimer targetDate={CONFIG.targetDate} />
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })} 
                className="px-8 py-4 bg-cyan-500 text-white dark:text-black rounded-xl font-black shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <Zap size={20} className="fill-current"/> JOIN THE SQUAD
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="#courses" 
                className="px-8 py-4 bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-white/10 flex items-center gap-2 shadow-sm dark:shadow-none"
              >
                View Batches <ArrowRight size={18}/>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="relative flex justify-center perspective-1000 mt-10 lg:mt-0 order-1 lg:order-2">
             <TiltCard className="w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white dark:border-white/5 shadow-2xl dark:shadow-[0_0_50px_-15px_rgba(6,182,212,0.3)] bg-white dark:bg-slate-900 relative group">
               <img src={IMAGES.heroMain} alt="Amit Saxena" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 filter saturate-100 contrast-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-block px-3 py-1 rounded-md bg-cyan-500 text-white dark:text-black text-[10px] font-black mb-3 shadow-lg tracking-wider">DIRECTOR</div>
                  <h3 className="text-3xl font-black text-white mb-1">Amit Saxena</h3>
                  <p className="text-sm text-cyan-300 dark:text-cyan-400 font-medium">Physics Mentor & Guide</p>
               </div>
             </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* --- RESULTS SECTION (SWIPE SLIDER) --- */}
      <section id="results" className="py-24 bg-white dark:bg-[#020617] relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2">
                  HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">FAME</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400">Swipe to see our champions.</p>
              </div>
            </div>
          </ScrollReveal>
          <ResultSlider images={[ IMAGES.results2025, IMAGES.results11th, IMAGES.toppers2024, IMAGES.groupPhoto ]} />
        </div>
      </section>

      {/* --- VIDEO SECTION --- */}
      <section className="py-24 bg-slate-100 dark:bg-slate-950/50 overflow-hidden relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles size={12} /> The Vibe
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              NOT YOUR <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">TYPICAL CLASS</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">
              We don't just write on the board. We visualize, we simulate, and we solve. Check out the energy inside the classroom.
            </p>
          </ScrollReveal>
          <div className="flex justify-center lg:justify-end">
            <TiltCard className="relative w-[300px] md:w-[320px] aspect-[9/16] rounded-[2.5rem] border-[8px] border-white dark:border-slate-900 bg-black shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity">
                <source src={CONFIG.videoFile} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                 <p className="text-white/90 text-xs font-bold">@amit_saxena_physics</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 bg-white dark:bg-[#020617] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">LIFE AT <span className="text-cyan-500">ASPI</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            <ScrollReveal className="col-span-2 row-span-2 h-full">
              <div className="w-full h-full rounded-3xl overflow-hidden relative group">
                <img src={IMAGES.groupPhoto} alt="Group" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                   <h3 className="text-xl font-bold text-white">Celebrations</h3>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal className="col-span-1 row-span-1 h-full">
              <div className="w-full h-full rounded-3xl overflow-hidden relative group bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5">
                <img src={IMAGES.toppers2024} alt="Toppers" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all" />
              </div>
            </ScrollReveal>
            <ScrollReveal className="col-span-1 row-span-2 h-full">
              <div className="w-full h-full rounded-3xl overflow-hidden relative group bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-500/20">
                <img src={IMAGES.results2025} alt="List" className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-overlay opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                   <Trophy className="text-cyan-600 dark:text-cyan-400 mb-2" size={32} />
                   <h4 className="font-bold text-cyan-900 dark:text-cyan-100">Consistent Results</h4>
                </div>
              </div>
            </ScrollReveal>
             <ScrollReveal className="col-span-1 row-span-1 h-full">
              <div className="w-full h-full rounded-3xl overflow-hidden relative group">
                <img src={IMAGES.gallery1} alt="Class" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- COURSES SECTION --- */}
      <section id="courses" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">CHOOSE YOUR <span className="text-cyan-500">BATCH</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
             <CourseCardModern 
               title="Foundation" 
               subtitle="11th + 12th"
               badge="BOARDS + JEE" 
               accentColor="blue"
               icon={<BookOpen size={24} />}
               features={["NCERT Deep Dive", "Concept Visualization", "Board Writing Practice"]}
               delay={0.1}
               onEnroll={() => openWhatsApp("I want to enroll for Foundation Batch")}
             />
             <div className="md:-mt-6"> 
               <CourseCardModern 
                 title="Target" 
                 subtitle="JEE & NEET"
                 badge="DROPPER / 12+" 
                 accentColor="cyan"
                 icon={<Zap size={24} />}
                 features={["Short Trick Mastery", "Daily DPPs & Analysis", "High-Speed Test Series"]}
                 highlighted={true}
                 delay={0.2}
                 onEnroll={() => openWhatsApp("I want to enroll for JEE/NEET Batch")}
               />
             </div>
             <CourseCardModern 
               title="Crash Course" 
               subtitle="Last Mile"
               badge="RANK BOOSTER" 
               accentColor="purple"
               icon={<TrendingUp size={24} />}
               features={["Problem Solving Focus", "Personalized Strategy", "Advanced Level Qs"]}
               delay={0.3}
               onEnroll={() => openWhatsApp("I want to enroll for Crash Course")}
             />
          </div>
        </div>
      </section>

      {/* --- ENROLLMENT FORM --- */}
      <section id="enroll" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-cyan-50 dark:from-[#020617] dark:to-cyan-950/20"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-white/10 relative overflow-hidden">
              <div className="text-center mb-10 relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Join the Revolution</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Fill this out. We'll start your journey.</p>
              </div>
              <EnrollmentForm waNumber={CONFIG.waNumber} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-500 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
           <div className="text-center md:text-left">
             <h3 className="text-white font-bold text-lg mb-1 tracking-tight">ASPI Ujjain</h3>
             <p>No. 1 Institute for Physics. Building concepts, creating toppers.</p>
           </div>
           <div className="text-center md:text-right">
             <p className="text-white font-bold mb-1">+91 98270-67941</p>
             <p className="flex items-center gap-2 justify-center md:justify-end"><MapPin size={14}/> Freeganj, Ujjain</p>
           </div>
        </div>
      </footer>

      {/* --- FLOATING ELEMENTS --- */}
      <FloatingNotification />
      
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
         <motion.a 
           href={`tel:${CONFIG.waNumber}`} 
           whileHover={{ scale: 1.1 }} 
           whileTap={{ scale: 0.9 }}
           className="w-14 h-14 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full flex items-center justify-center shadow-lg font-bold border border-slate-200 dark:border-slate-700"
         >
           <Phone size={24} />
         </motion.a>
         <motion.button 
           onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })} 
           whileHover={{ scale: 1.1 }} 
           whileTap={{ scale: 0.9 }}
           className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center text-white dark:text-black shadow-lg shadow-cyan-500/30 font-bold border border-white/20"
         >
           <Calendar size={24} />
         </motion.button>
      </div>

    </div>
  );
}

// ==========================================
// 4. SUB-COMPONENTS
// ==========================================

const ResultSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  // Swipe Logic
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      setIndex((prev) => (prev + 1) % images.length);
    } else {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">
      {/* Swipe Area Wrapper */}
      <motion.div
        className="absolute inset-0 z-30 touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ opacity: 0 }}
        onDragEnd={(e, { offset, velocity }: PanInfo) => {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
          }
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {images.map((img, i) => {
          const position = (i - index + images.length) % images.length;
          const isActive = position === 0;
          const isNext = position === 1;
          const isPrev = position === images.length - 1;
          
          let zIndex = 0; let opacity = 0; let x = "0%"; let scale = 0.8;
          if (isActive) { zIndex = 10; opacity = 1; x = "0%"; scale = 1; } 
          else if (isNext) { zIndex = 5; opacity = 0.3; x = "60%"; scale = 0.8; } 
          else if (isPrev) { zIndex = 5; opacity = 0.3; x = "-60%"; scale = 0.8; }

          return (
            <motion.div 
              key={i} 
              initial={false} 
              animate={{ x, scale, opacity, zIndex }} 
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }} 
              className="absolute top-0 w-[80%] md:w-[60%] h-full rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-slate-900 pointer-events-none"
            >
              <img src={img} alt={`Result ${i}`} className="w-full h-full object-contain bg-white dark:bg-slate-950" />
            </motion.div>
          );
        })}
      </div>
      
      {/* Navigation Buttons */}
      <button onClick={() => paginate(-1)} className="absolute left-0 md:-left-12 z-40 p-3 rounded-full bg-white/80 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 transition-all shadow-md"><ArrowRight className="rotate-180" size={24} /></button>
      <button onClick={() => paginate(1)} className="absolute right-0 md:-right-12 z-40 p-3 rounded-full bg-white/80 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 transition-all shadow-md"><ArrowRight size={24} /></button>
    </div>
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }
  return (
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX: useTransform(mouseY, [-0.5, 0.5], [10, -10]), rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]), transformStyle: "preserve-3d" }} className={className}>
      <div style={{ transform: "translateZ(50px)" }} className="h-full w-full">{children}</div>
    </motion.div>
  );
};

const ScrollReveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

const CourseCardModern = ({ title, subtitle, badge, accentColor, icon, features, highlighted, onEnroll, delay }: any) => {
  const colors: any = {
    blue: { border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/5", glow: "shadow-blue-500/20" },
    cyan: { border: "border-cyan-500/50", text: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10", glow: "shadow-cyan-500/30" },
    purple: { border: "border-purple-500/30", text: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/5", glow: "shadow-purple-500/20" },
  };
  const c = colors[accentColor];
  return (
    <ScrollReveal delay={delay} className="h-full">
      <motion.div whileHover={{ y: -10 }} className={`relative p-8 rounded-3xl border ${c.bg} backdrop-blur-xl transition-all duration-300 h-full flex flex-col ${c.border} ${highlighted ? "shadow-2xl scale-105 z-10 " + c.glow : "shadow-lg hover:border-slate-300 dark:hover:border-white/20"}`}>
        {highlighted && <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl rounded-tr-2xl uppercase tracking-widest">Best Value</div>}
        <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 ${c.text} flex items-center justify-center mb-6 shadow-sm`}>{icon}</div>
        <span className={`inline-block px-3 py-1 rounded-md bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${c.text} text-[10px] font-black uppercase tracking-wider w-fit mb-4`}>{badge}</span>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-0">{title}</h3>
        <p className="text-slate-600 dark:text-slate-500 font-medium mb-6">{subtitle}</p>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-6"></div>
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((f:string, i:number) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 font-medium text-sm"><CheckCircle size={16} className={`${c.text} shrink-0 mt-0.5`} /> {f}</li>
          ))}
        </ul>
        <button onClick={onEnroll} className={`w-full py-4 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-700 border border-white/5 transition-all mt-auto flex items-center justify-center gap-2 group`}>
          Join Batch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
        </button>
      </motion.div>
    </ScrollReveal>
  )
}

const EnrollmentForm = ({ waNumber }: { waNumber: string }) => {
  const [formData, setFormData] = useState({ name: "", classNum: "", city: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.name || !formData.classNum) return alert("Please fill details");
    const message = `*New Admission Inquiry*\n\nName: ${formData.name}\nClass: ${formData.classNum}\nCity: ${formData.city || "Ujjain"}\n\nI want to book a demo class.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Student Name</label>
          <div className="relative">
             <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
             <input type="text" placeholder="Enter Name" className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 rounded-xl focus:ring-1 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 transition-all font-medium" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Class</label>
          <div className="relative">
             <Book className="absolute left-4 top-3.5 text-slate-400" size={18} />
             <select className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 rounded-xl focus:ring-1 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white appearance-none cursor-pointer transition-all font-medium" onChange={e => setFormData({...formData, classNum: e.target.value})}>
               <option value="">Select Option</option>
               <option value="11th Physics">11th Physics</option>
               <option value="12th Physics">12th Physics</option>
               <option value="JEE/NEET">JEE / NEET</option>
             </select>
          </div>
        </div>
      </div>
      <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">City</label>
          <input type="text" placeholder="Ujjain" className="w-full px-4 py-3 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 rounded-xl focus:ring-1 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 transition-all font-medium" onChange={e => setFormData({...formData, city: e.target.value})} />
      </div>
      <button type="submit" className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2">
        <Send size={18} /> Start Application
      </button>
    </form>
  );
}

// Animation Variants (using 'as any' to prevent strict type errors)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as any;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
} as any;