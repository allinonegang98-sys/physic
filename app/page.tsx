"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";
import { 
  Menu, X, Phone, CheckCircle, ArrowRight, Zap, 
  BookOpen, TrendingUp, Send, User, Book, MapPin, Clock, Calendar
} from "lucide-react";

// ==========================================
// 1. CONFIGURATION
// ==========================================

const CONFIG = {
  waNumber: "919827067941", 
  videoFile: "/video.mp4", 
  targetDate: "2026-04-01T10:00:00", // DATE FOR TIMER (YYYY-MM-DD)
};

const IMAGES = {
  // Use /filename.extension (No "public" in the path)
  logo: "/logo.jpeg", 
  heroMain: "/amitsaxena.png", 
  
  // Toppers & Results
  toppers2024: "/topper.jpeg",  // Using topper.jpeg from your list
  results2025: "/list1.jpeg",   // Using list1.jpeg
  groupPhoto: "/celebration.jpeg", // Using celebration.jpeg
  results11th: "/list2.jpeg",   // Using list2.jpeg
  
  // Gallery Images (Using the ones you uploaded)
  gallery1: "/ccg1.jpeg",
  gallery2: "/list3.jpeg",
 
};

const CONTENT = {
  hero: {
    badge: "No. 1 Institute in Ujjain",
    titleLine1: "Amit Saxena",
    titleLine2: "Physics Institute",
    subtitle: "The trusted choice for District Toppers. Specializing in 11th, 12th (CBSE & MP Board), JEE & NEET.",
  },
};

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export default function ASPICoachingWebsite() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroBgY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);

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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-white/5 py-3" : "bg-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/amitsaxena.png" alt="ASPI Logo" className="w-10 h-10 object-contain bg-white rounded-full p-0.5" />
            <div className="leading-tight font-bold text-white">
              Amit Saxena <br/> <span className="text-xs font-normal text-indigo-400">Physics Institute</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {["Home", "Gallery", "Results", "Courses"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          <div className="hidden md:block">
             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => openWhatsApp("Hello Sir, I want to book a demo class.")} className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-colors">
               Call Now
             </motion.button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 shadow-xl p-6 flex flex-col gap-4 md:hidden">
            {["Home", "Gallery", "Results", "Courses", "Enroll"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-slate-300 font-medium py-2 border-b border-white/5 hover:text-indigo-400">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </motion.nav>

      {/* --- HERO SECTION (FILLED GAP + TIMER) --- */}
      <section id="home" className="relative min-h-[95vh] flex items-center pt-32 pb-24 lg:pt-0 overflow-hidden bg-slate-950">
        
        {/* 1. ANIMATED BACKGROUND PARTICLES (Fills the empty void) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px]" />
           <motion.div animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
           
           {/* Floating Icons */}
           <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/3 left-[15%] text-slate-800 opacity-20">
              <Zap size={120} />
           </motion.div>
           <motion.div animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-1/3 left-[40%] text-slate-800 opacity-20">
              <BookOpen size={80} />
           </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="pt-8">
            
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-md mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">{CONTENT.hero.badge}</span>
            </motion.div>
            
            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              <AnimatedText text={CONTENT.hero.titleLine1} />
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-300% animate-gradient pb-2">
                {CONTENT.hero.titleLine2}
              </span>
            </h1>
            
            {/* Subtitle */}
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              {CONTENT.hero.subtitle}
            </motion.p>
            
            {/* --- NEW: COUNTDOWN TIMER (Fills Gap) --- */}
            <motion.div variants={fadeInUp} className="mb-8">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Clock size={14} /> New Batch Starting In:
              </p>
              <CountdownTimer targetDate={CONFIG.targetDate} />
            </motion.div>

            {/* --- NEW: STATS ROW (Fills Gap) --- */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 mb-10 border-l-2 border-indigo-500/30 pl-6 bg-white/5 rounded-r-xl py-2 pr-4 backdrop-blur-sm w-fit">
              <div>
                <div className="text-2xl font-black text-white">15+</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Years Exp.</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">20+</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Toppers</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">1k+</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Selections</div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })} 
                className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:bg-slate-200 transition-all flex items-center gap-2"
              >
                <Zap size={20} className="text-indigo-600 fill-indigo-600"/> Start Learning
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="#courses" 
                className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 backdrop-blur-md flex items-center gap-2"
              >
                Explore Batches <ArrowRight size={18}/>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="relative flex justify-center perspective-1000 mt-10 lg:mt-0">
             <TiltCard className="w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white/5 shadow-2xl shadow-indigo-500/20 bg-slate-900 relative group">
               <img src={IMAGES.heroMain} alt="Amit Saxena Sir" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-block px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold mb-3 shadow-lg">DIRECTOR</div>
                  <h3 className="text-3xl font-bold text-white mb-1">Amit Saxena Sir</h3>
                  <p className="text-sm text-indigo-300 font-medium">Physics Mentor & Guide</p>
               </div>
             </TiltCard>
          </motion.div>
        </div>

        {/* --- INFINITE SCROLLING MARQUEE (Grounds the section) --- */}
        <div className="absolute bottom-0 left-0 right-0 bg-indigo-950/50 border-t border-white/5 backdrop-blur-md overflow-hidden py-3 z-20">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }} 
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="flex whitespace-nowrap gap-12 text-sm font-bold text-indigo-300 uppercase tracking-widest"
           >
             {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span> ADMISSIONS OPEN FOR 2026 
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> NEW BATCHES STARTING SOON
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span> JEE MAIN RESULTS OUT
                </span>
             ))}
           </motion.div>
        </div>
      </section>
{/* --- RESULTS SECTION (SWIPE SLIDER) --- */}
      <section id="results" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">FAME</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Consistent Top Ranks in Ujjain. Our results speak louder than words.
              </p>
            </div>
          </ScrollReveal>

          {/* THE SLIDER */}
          <ResultSlider images={[
             IMAGES.results2025, // Class 12 List
             IMAGES.results11th, // Class 11 List
             IMAGES.toppers2024, // Toppers Poster
             IMAGES.groupPhoto   // Celebration/Group
          ]} />
          
        </div>
      </section>
      {/* --- VIDEO SECTION (Reel Style) --- */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Text Content */}
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/20">
              🎬 Watch the Vibe
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              CLASSROOM <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                EXPERIENCE
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              See how we make Physics come alive. From visual derivations to interactive doubt sessions, get a sneak peek into our daily learning environment.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span> LIVE RECORDING
              </div>
              <div className="h-4 w-px bg-slate-700"></div>
              <div>INSTAGRAM REEL</div>
            </div>
          </ScrollReveal>

          {/* Phone Mockup Video Player */}
          <div className="flex justify-center lg:justify-end">
            <TiltCard className="relative w-[300px] md:w-[320px] aspect-[9/16] rounded-[2.5rem] border-[8px] border-slate-800 bg-slate-950 shadow-2xl shadow-indigo-500/20 overflow-hidden group">
              {/* iPhone Notch Simulation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
              
              {/* The Video */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              >
                {/* Ensure your file is at public/intro.mp4 */}
                <source src={CONFIG.videoFile} type="video/mp4" />
              </video>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Overlay Text inside video */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="flex items-center gap-2 mb-2">
                   <img src={IMAGES.logo} className="w-8 h-8 rounded-full bg-white p-0.5" alt="Logo"/>
                   <span className="text-white font-bold text-sm shadow-black drop-shadow-md">@amit_saxena_physics</span>
                </div>
                <p className="text-white/90 text-xs">Building concepts, creating toppers. Join the league! 🚀 #Physics #Ujjain</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION (MASONRY + TILT) --- */}
      <section id="gallery" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">LIFE AT <span className="text-indigo-500">ASPI</span></h2>
            <p className="text-slate-400">Moments of pride, dedication, and success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Item */}
            <ScrollReveal className="md:col-span-2 md:row-span-2">
              <TiltCard className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative group">
                <img src={IMAGES.groupPhoto} alt="Group" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-end p-8">
                  <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform">Grand Success Party</h3>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Tall Item */}
            <ScrollReveal className="md:row-span-2">
              <TiltCard className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative group">
                <img src={IMAGES.toppers2024} alt="Toppers" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">District Toppers</h3>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Regular Items */}
            <ScrollReveal>
              <TiltCard className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative group">
                <img src={IMAGES.results2025} alt="Results" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal>
              <TiltCard className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative group">
                <img src={IMAGES.results11th} alt="11th Results" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </TiltCard>
            </ScrollReveal>
            
             <ScrollReveal className="md:col-span-2">
              <TiltCard className="w-full h-full rounded-3xl overflow-hidden border border-white/10 relative group">
                <img src={IMAGES.gallery1} alt="Classroom" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold border border-white/30">View All Photos</span>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- COURSES SECTION --- */}
      <section id="courses" className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">OUR <span className="text-indigo-500">BATCHES</span></h2>
            <p className="text-slate-400 text-lg">Select your target. We provide the ammunition.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <CourseCardModern 
               title="11th + 12th Foundation" 
               badge="CBSE & MP Board" 
               accentColor="blue"
               icon={<BookOpen size={24} />}
               features={["NCERT Deep Dive", "Concept Visualization", "Board Writing Practice"]}
               delay={0.1}
               onEnroll={() => openWhatsApp("Hello Sir, I want to enroll for the 11th + 12th Foundation Batch.")}
             />
             <div className="md:-mt-8 md:mb-8"> 
               <CourseCardModern 
                 title="JEE & NEET Ultimate" 
                 badge="Competitive Focus" 
                 accentColor="orange"
                 icon={<Zap size={24} />}
                 features={["Short Trick Mastery", "Daily DPPs & Analysis", "High-Speed Test Series"]}
                 highlighted={true}
                 delay={0.2}
                 onEnroll={() => openWhatsApp("Hello Sir, I want to enroll for the JEE & NEET Ultimate Batch.")}
               />
             </div>
             <CourseCardModern 
               title="Dropper's Intensive" 
               badge="Rank Booster" 
               accentColor="purple"
               icon={<TrendingUp size={24} />}
               features={["Problem Solving Focus", "Personalized Strategy", "Advanced Level Qs"]}
               delay={0.3}
               onEnroll={() => openWhatsApp("Hello Sir, I want to enroll for the Dropper's Intensive Batch.")}
             />
          </div>
        </div>
      </section>

      {/* --- ENROLLMENT FORM --- */}
      <section id="enroll" className="py-24 bg-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white">Quick Admission Form</h2>
                <p className="text-slate-400 mt-2">Fill this out and we will open WhatsApp with your details instantly.</p>
              </div>
              <EnrollmentForm waNumber={CONFIG.waNumber} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
           <div className="text-center md:text-left">
             <h3 className="text-white font-bold text-lg mb-1">ASPI Ujjain</h3>
             <p>No. 1 Institute for Physics. Building concepts, creating toppers.</p>
           </div>
           <div className="text-center md:text-right">
             <p className="text-white font-bold mb-1">+91 98270-67941</p>
             <p className="flex items-center gap-2 justify-center md:justify-end"><MapPin size={14}/> Near Lunger Petrol Pump, Freeganj, Ujjain</p>
           </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-white/5 text-xs opacity-40">
           © 2026 Amit Saxena Physics Institute.
        </div>
      </footer>
{/* --- FLOATING ACTION BUTTONS (Right Side) --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
         {/* Call Button */}
         <motion.a 
           href={`tel:${CONFIG.waNumber}`} 
           whileHover={{ scale: 1.1 }} 
           whileTap={{ scale: 0.9 }}
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 1 }}
           className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-600/40 border border-white/20 relative group"
         >
           <Phone size={24} className="fill-white" />
           {/* Tooltip */}
           <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
             Call Sir
           </span>
         </motion.a>

         {/* Book Demo Button */}
         <motion.button 
           onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })} 
           whileHover={{ scale: 1.1 }} 
           whileTap={{ scale: 0.9 }}
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 1.1 }}
           className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 shadow-lg shadow-yellow-400/30 font-bold border border-white/20 relative group"
         >
           <Calendar size={24} />
           {/* Tooltip */}
           <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
             Book Demo
           </span>
         </motion.button>
      </div>
    </div>
  );
}

// ==========================================
// 3. HELPER & ANIMATION COMPONENTS
// ==========================================

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const difference = target - now;
      
      if (difference <= 0) {
        clearInterval(interval);
      } else {
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
    <div className="flex gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center bg-slate-800/50 backdrop-blur-sm border border-white/10 p-3 rounded-xl min-w-[70px]">
          <span className="text-2xl font-bold text-white">{String(value).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase text-slate-400 font-bold">{unit}</span>
        </div>
      ))}
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
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

const ScrollReveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div 
      ref={ref} 
      className={className}
      initial={{ opacity: 0, y: 50 }} 
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} 
      transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

const AnimatedText = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  const container = { hidden: { opacity: 0 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.04 * i } }) };
  const child = { visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } }, hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 200 } } };
  return (
    <motion.span variants={container} initial="hidden" animate="visible" className="block">
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block">{letter === " " ? "\u00A0" : letter}</motion.span>
      ))}
    </motion.span>
  );
};

const CourseCardModern = ({ title, badge, accentColor, icon, features, highlighted, onEnroll, delay }: any) => {
  const colors: any = {
    blue: { border: "border-slate-700", text: "text-blue-400", badgeBg: "bg-blue-900/30", glow: "shadow-blue-500/10" },
    orange: { border: "border-orange-500/50", text: "text-orange-400", badgeBg: "bg-orange-900/30", glow: "shadow-orange-500/20" },
    purple: { border: "border-slate-700", text: "text-purple-400", badgeBg: "bg-purple-900/30", glow: "shadow-purple-500/10" },
  };
  const c = colors[accentColor];
  
  return (
    <ScrollReveal delay={delay} className="h-full">
      <motion.div 
        whileHover={{ y: -10 }} 
        className={`relative p-8 rounded-[2rem] border bg-slate-900/50 backdrop-blur-sm transition-all duration-300 h-full flex flex-col ${c.border} ${highlighted ? "shadow-2xl scale-105 z-10 " + c.glow : "shadow-lg hover:border-white/20"}`}
      >
        {highlighted && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">Most Popular</div>}
        
        <div className={`w-12 h-12 rounded-xl ${c.badgeBg} ${c.text} flex items-center justify-center mb-6`}>{icon}</div>
        <span className={`inline-block px-3 py-1 rounded-full ${c.badgeBg} ${c.text} text-xs font-bold uppercase tracking-wider w-fit mb-4`}>{badge}</span>
        <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
        
        <ul className="space-y-4 mb-8 flex-grow">
          {features.map((f:string, i:number) => (
            <li key={i} className="flex items-start gap-3 text-slate-400 font-medium text-sm">
              <CheckCircle size={18} className={`${c.text} shrink-0`} /> {f}
            </li>
          ))}
        </ul>
        
        <button 
          onClick={onEnroll} 
          className={`w-full py-4 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all mt-auto flex items-center justify-center gap-2 group`}
        >
          Enroll Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-400 ml-1">Student Name</label>
          <div className="relative">
             <User className="absolute left-4 top-3.5 text-slate-500" size={20} />
             <input type="text" placeholder="Aditya Gupta" className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder:text-slate-600 transition-all" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-400 ml-1">Class / Course</label>
          <div className="relative">
             <Book className="absolute left-4 top-3.5 text-slate-500" size={20} />
             <select className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-white appearance-none cursor-pointer transition-all" onChange={e => setFormData({...formData, classNum: e.target.value})}>
               <option value="">Select Class</option>
               <option value="11th Physics">11th Physics</option>
               <option value="12th Physics">12th Physics</option>
               <option value="JEE/NEET">JEE / NEET</option>
             </select>
          </div>
        </div>
      </div>
      <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-400 ml-1">City</label>
          <input type="text" placeholder="Ujjain" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder:text-slate-600 transition-all" onChange={e => setFormData({...formData, city: e.target.value})} />
      </div>
      <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
        <Send size={20} /> Send Inquiry on WhatsApp
      </button>
    </form>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};
// --- NEW SLIDER COMPONENT ---
const ResultSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">
      {/* Images Stack */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {images.map((img, i) => {
          // Logic to determine position relative to active index
          const position = (i - index + images.length) % images.length;
          const isActive = position === 0;
          const isNext = position === 1;
          const isPrev = position === images.length - 1;
          
          let zIndex = 0;
          let opacity = 0;
          let x = "0%";
          let scale = 0.8;

          if (isActive) {
            zIndex = 10;
            opacity = 1;
            x = "0%";
            scale = 1;
          } else if (isNext) {
            zIndex = 5;
            opacity = 0.4;
            x = "50%";
            scale = 0.8;
          } else if (isPrev) {
            zIndex = 5;
            opacity = 0.4;
            x = "-50%";
            scale = 0.8;
          }

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ x, scale, opacity, zIndex }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="absolute top-0 w-[80%] md:w-[60%] h-full rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl shadow-black/50 bg-slate-900"
            >
              <img src={img} alt={`Result ${i}`} className="w-full h-full object-contain bg-slate-950" />
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <button 
        onClick={prevSlide} 
        className="absolute left-0 md:-left-12 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 transition-all"
      >
        <ArrowRight className="rotate-180" size={24} />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-0 md:-right-12 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 transition-all"
      >
        <ArrowRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === index ? "w-8 bg-yellow-400" : "bg-slate-600"}`} 
          />
        ))}
      </div>
    </div>
  );
};