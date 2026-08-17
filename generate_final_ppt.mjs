import PptxGenJS from "pptxgenjs";
import fs from "fs";

const pptx = new PptxGenJS();
pptx.author = "Saurabh Bhandari";
pptx.company = "Varad Netralaya";
pptx.title = "Varad Netralaya — Official Website Proposal";
pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

// ─── COLORS ───
const C = {
  bg1: "0B1120", bg2: "111827", bg3: "1E293B",
  w: "FFFFFF", w90: "F1F5F9", w70: "CBD5E1", w50: "94A3B8", w30: "64748B",
  blue: "2563EB", blueD: "1D4ED8", teal: "0D9488", tealL: "2DD4BF",
  amber: "F59E0B", amberL: "FCD34D", red: "EF4444",
  green: "10B981", purple: "7C3AED", pink: "EC4899", cyan: "06B6D4",
};

// ─── LOAD SCREENSHOTS AS BASE64 ───
function b64(path) {
  try { return "data:image/png;base64," + fs.readFileSync(path).toString("base64"); } catch { return null; }
}
const ssDir = "C:/Users/ASUS/.gemini/antigravity-ide/brain/deb7aeea-ddbc-47e0-b208-ce4e78e34e51/";
const imgHero = b64(ssDir + "hero_section_initial_1786361379186.png");
const imgServices = b64(ssDir + "homepage_services_treatments_1786351767139.png");
const imgDoctors = b64(ssDir + "doctors_section_1786363936334.png");
const imgTestimonials = b64(ssDir + "testimonials_section_1786363961761.png");
const imgDark = b64(ssDir + "dark_mode_verification_1786355112318.png");
const imgMobile = b64(ssDir + "mobile_homepage_real_1786355995293.png");

// ─── HELPERS ───
function slideBg(s) {
  s.background = { color: C.bg1 };
  // Top gradient accent line
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: C.blue } });
  // Bottom gradient accent line
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 7.44, w: 13.33, h: 0.06, fill: { color: C.teal } });
}

function addBrand(s) {
  s.addText([
    { text: "VARAD ", options: { bold: true, color: C.w, fontSize: 9 } },
    { text: "NETRALAYA", options: { color: C.tealL, fontSize: 9 } },
  ], { x: 0.35, y: 7.1, w: 2.5, h: 0.25 });
}

function card(s, x, y, w, h, borderColor) {
  s.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, fill: { color: C.bg2 }, rectRadius: 0.12,
    line: borderColor ? { color: borderColor, width: 1.2 } : { color: "374151", width: 0.5 },
    shadow: { type: "outer", blur: 3, offset: 1, color: "000000", opacity: 0.3 },
  });
}

function bullet(s, x, y, w, text, color = C.tealL) {
  s.addText([
    { text: "✦  ", options: { color: color, fontSize: 10, bold: true } },
    { text: text, options: { color: C.w70, fontSize: 10 } },
  ], { x, y, w, h: 0.32 });
}

// ══════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg1 };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.08, fill: { color: C.amber } });

  // Big V emblem
  s.addShape(pptx.ShapeType.ellipse, { x: 5.92, y: 0.5, w: 1.5, h: 1.5, fill: { color: C.w }, line: { color: C.amber, width: 2.5 } });
  s.addText("V", { x: 5.92, y: 0.5, w: 1.5, h: 1.5, color: C.blue, fontSize: 44, bold: true, align: "center", valign: "middle" });

  // Title
  s.addText("VARAD NETRALAYA", { x: 0.5, y: 2.2, w: 12.33, h: 0.7, color: C.w, fontSize: 38, bold: true, align: "center", fontFace: "Calibri" });
  s.addText("Advanced Eye Care & Phaco Surgery Center", { x: 0.5, y: 2.85, w: 12.33, h: 0.4, color: C.tealL, fontSize: 16, align: "center" });

  // Divider
  s.addShape(pptx.ShapeType.rect, { x: 5.17, y: 3.45, w: 3, h: 0.03, fill: { color: C.amber } });

  // Proposal line
  s.addText("Official Website — Features & Future Scope Proposal", { x: 1, y: 3.7, w: 11.33, h: 0.45, color: C.w, fontSize: 18, bold: true, align: "center" });

  // Subtitle
  s.addText("What We Built  |  Technologies Used  |  What More We Can Deliver", { x: 1, y: 4.3, w: 11.33, h: 0.35, color: C.w50, fontSize: 12, align: "center" });

  // Two cards
  card(s, 3.3, 5.1, 3.2, 1.1, C.amber);
  s.addText("PRESENTED TO", { x: 3.5, y: 5.2, w: 2.8, h: 0.15, color: C.w30, fontSize: 7, bold: true });
  s.addText("Dr. Smita Prashant Patare\nDr. Raosaheb Kundlik Borude", { x: 3.5, y: 5.4, w: 2.8, h: 0.45, color: C.w, fontSize: 9.5, bold: true, lineSpacingMultiple: 1.3 });
  s.addText("Senior Ophthalmologists — DOS, AIOS, MOS", { x: 3.5, y: 5.9, w: 2.8, h: 0.2, color: C.tealL, fontSize: 7.5 });

  card(s, 6.8, 5.1, 3.2, 1.1, C.teal);
  s.addText("PRESENTED BY", { x: 7, y: 5.2, w: 2.8, h: 0.15, color: C.w30, fontSize: 7, bold: true });
  s.addText("Saurabh Bhandari", { x: 7, y: 5.4, w: 2.8, h: 0.25, color: C.w, fontSize: 9.5, bold: true });
  s.addText("Full Stack Developer & UI/UX Designer", { x: 7, y: 5.7, w: 2.8, h: 0.2, color: C.tealL, fontSize: 7.5 });

  // Rating badge
  card(s, 4.67, 6.5, 4, 0.4, C.amber);
  s.addText("★ 4.9 Google Rating  •  439+ Reviews  •  Savedi, Ahilyanagar", { x: 4.67, y: 6.5, w: 4, h: 0.4, color: C.amberL, fontSize: 9, bold: true, align: "center" });

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 7.42, w: 13.33, h: 0.08, fill: { color: C.teal } });
}

// ══════════════════════════════════════════════════════════
// SLIDE 2 — WHAT WE BUILT (FEATURES OVERVIEW)
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide(); slideBg(s); addBrand(s);

  s.addText("WHAT WE BUILT", { x: 0.5, y: 0.3, w: 4, h: 0.3, color: C.tealL, fontSize: 10, bold: true });
  s.addText("Complete Website Features Delivered", { x: 0.5, y: 0.6, w: 8, h: 0.45, color: C.w, fontSize: 22, bold: true });
  s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.1, w: 2.5, h: 0.03, fill: { color: C.teal } });

  const features = [
    ["🏠 Premium Hero Section", "Full-width hero banner with hospital logo, embedded YouTube video player, doctor names, 4.9★ Google rating badge, and animated call-to-action buttons."],
    ["ℹ️ About Us Page", "Hospital history, vision, mission, and core values with smooth scroll animations and glassmorphism card design."],
    ["🩺 6 Eye Treatment Service Cards", "Cataract Surgery, Retina & Diabetic Eye Care, Computerized Eye Testing, Automated Perimetry, Pediatric Eye Care, Refractive Correction."],
    ["👨‍⚕️ Doctor Profile Cards", "Detailed profiles of Dr. Smita Patare (DOS, AIOS, MOS) and Dr. Raosaheb Borude (MOS, AIOS) with qualifications, experience, and specialties."],
    ["📊 Live Animated Statistics", "30,000+ Happy Patients, 18,000+ Successful Surgeries, 15+ Years Experience — numbers animate on scroll."],
    ["🛡️ Insurance & Cashless Section", "Zurich Kotak, Star Health, HDFC ERGO, ICICI Lombard, Niva Bupa, SBI General — full cashless information."],
    ["⭐ Google Reviews Carousel", "4.9★ patient testimonials from Google Reviews displayed in animated slider cards."],
    ["📸 Photo Gallery", "OPD rooms, operation theatre, diagnostic equipment, and consultation chambers showcase."],
    ["❓ Interactive FAQ Accordion", "6 frequently asked questions with expandable answers — timings, doctors, insurance, surgery info."],
    ["📅 Online Appointment Booking", "Name, phone, date picker form + direct WhatsApp chat + click-to-call buttons."],
    ["📞 Contact & Google Maps", "Full address, phone numbers, email, working hours, and embedded Google Maps navigation link."],
    ["🦶 Professional Footer", "Quick links, eye specialties list, contact info, YouTube channel link, social media icons, copyright."],
  ];

  features.forEach((f, i) => {
    const col = i < 6 ? 0 : 1;
    const row = i < 6 ? i : i - 6;
    const cx = 0.4 + col * 6.4;
    const cy = 1.35 + row * 0.95;
    card(s, cx, cy, 6.1, 0.82);
    s.addText(f[0], { x: cx + 0.2, y: cy + 0.06, w: 5.7, h: 0.25, color: C.w, fontSize: 9.5, bold: true });
    s.addText(f[1], { x: cx + 0.2, y: cy + 0.35, w: 5.7, h: 0.38, color: C.w50, fontSize: 8, lineSpacingMultiple: 1.2 });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 3 — HERO SECTION SCREENSHOT + HIGHLIGHTS
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide(); slideBg(s); addBrand(s);

  s.addText("LIVE PREVIEW — HOMEPAGE", { x: 0.5, y: 0.3, w: 5, h: 0.3, color: C.tealL, fontSize: 10, bold: true });
  s.addText("Hero Section with YouTube Video & Logo", { x: 0.5, y: 0.6, w: 8, h: 0.4, color: C.w, fontSize: 20, bold: true });

  if (imgHero) {
    card(s, 0.4, 1.2, 8.5, 5.5, C.blue);
    s.addImage({ data: imgHero, x: 0.5, y: 1.3, w: 8.3, h: 5.3, sizing: { type: "contain", w: 8.3, h: 5.3 } });
  }

  // Right side highlights
  const hl = [
    "HD Crystal-Clear Hospital Logo in circular golden badge",
    "Official YouTube video plays directly on website",
    "4.9★ Google Rating badge with 439+ reviews count",
    "Doctor names and qualifications visible at first glance",
    "\"Book Appointment\" gradient CTA button",
    "\"Watch Official Video\" opens full-screen cinema modal",
    "YouTube Channel @VaradNetrayala subscribe link",
    "Light blue background with floating glassmorphism badges",
    "100% responsive — works on mobile, tablet, desktop",
  ];

  s.addText("KEY HIGHLIGHTS", { x: 9.2, y: 1.3, w: 3.8, h: 0.25, color: C.amber, fontSize: 9, bold: true });
  hl.forEach((h, i) => {
    s.addText("▸ " + h, { x: 9.2, y: 1.65 + i * 0.55, w: 3.8, h: 0.5, color: C.w70, fontSize: 8.5, lineSpacingMultiple: 1.2 });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 4 — TECHNOLOGIES USED
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide(); slideBg(s); addBrand(s);

  s.addText("TECHNOLOGIES USED", { x: 0.5, y: 0.3, w: 5, h: 0.3, color: C.tealL, fontSize: 10, bold: true });
  s.addText("Modern Tech Stack Powering The Website", { x: 0.5, y: 0.6, w: 10, h: 0.45, color: C.w, fontSize: 22, bold: true });
  s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.1, w: 2.5, h: 0.03, fill: { color: C.teal } });

  const techs = [
    { name: "React 19", sub: "Frontend Framework", desc: "Component-based architecture for fast, dynamic user interfaces. Used by Facebook, Instagram, Netflix.", color: C.cyan },
    { name: "Vite 8", sub: "Build & Dev Server", desc: "Ultra-fast build tool — website compiles in under 400ms. Instant hot-reload during development.", color: C.purple },
    { name: "Tailwind CSS v4", sub: "Styling Framework", desc: "Utility-first CSS for pixel-perfect responsive design. Clean, modern, and highly maintainable code.", color: C.teal },
    { name: "Framer Motion", sub: "Animation Library", desc: "Smooth scroll animations, hover effects, card transitions, and animated statistics counters.", color: C.pink },
  ];

  techs.forEach((t, i) => {
    const cy = 1.4 + i * 1.45;
    card(s, 0.5, cy, 12.33, 1.25, t.color);
    s.addText(t.name, { x: 0.8, y: cy + 0.12, w: 2.5, h: 0.4, color: t.color, fontSize: 20, bold: true });
    s.addText(t.sub, { x: 0.8, y: cy + 0.55, w: 2.5, h: 0.25, color: C.w, fontSize: 10, bold: true });
    s.addText(t.desc, { x: 3.5, y: cy + 0.2, w: 9, h: 0.7, color: C.w70, fontSize: 10, lineSpacingMultiple: 1.35, valign: "middle" });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 5 — SPECIAL PREMIUM FEATURES
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide(); slideBg(s); addBrand(s);

  s.addText("SPECIAL PREMIUM FEATURES", { x: 0.5, y: 0.3, w: 6, h: 0.3, color: C.tealL, fontSize: 10, bold: true });
  s.addText("What Makes This Website Stand Out", { x: 0.5, y: 0.6, w: 10, h: 0.45, color: C.w, fontSize: 22, bold: true });
  s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.1, w: 2.5, h: 0.03, fill: { color: C.teal } });

  const feats = [
    { icon: "🌙", title: "Dark / Light Mode Toggle", desc: "One-click switch between light mode and deep dark mode. The entire website transforms — comfortable for patients reading at night.", color: C.purple },
    { icon: "🎥", title: "Direct YouTube Video Player", desc: "Your official YouTube video (a38nME-7Ocg) plays directly on the homepage. No need for patients to leave the website.", color: C.red },
    { icon: "📺", title: "YouTube Channel Integration", desc: "Subscribe button links directly to youtube.com/@VaradNetrayala. Patients can follow your channel in one click.", color: C.red },
    { icon: "💬", title: "Floating WhatsApp Chat", desc: "Green WhatsApp icon always visible on screen. Patients tap it and chat directly with your reception desk.", color: C.green },
    { icon: "🎨", title: "3D Animated Preloader", desc: "When the website loads, a spinning 3D animated Varad Netralaya logo appears with a glowing ring — premium first impression.", color: C.amber },
    { icon: "📱", title: "100% Mobile Responsive", desc: "Website looks perfect on phones, tablets, and desktops. Mobile menu drawer, touch-friendly buttons, optimized images.", color: C.cyan },
    { icon: "🔄", title: "Smooth Scroll Animations", desc: "Every section fades in beautifully as you scroll down. Cards hover and lift on mouse interaction.", color: C.pink },
    { icon: "📍", title: "Google Maps Direct Link", desc: "Clicking the address opens Google Maps with Varad Netralaya's exact pin (4PCG+JR8, Savedi). Instant navigation.", color: C.blue },
  ];

  feats.forEach((f, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const cx = 0.4 + col * 6.4;
    const cy = 1.35 + row * 1.45;
    card(s, cx, cy, 6.1, 1.28, f.color);
    s.addText(f.icon + "  " + f.title, { x: cx + 0.2, y: cy + 0.1, w: 5.7, h: 0.3, color: C.w, fontSize: 11, bold: true });
    s.addText(f.desc, { x: cx + 0.2, y: cy + 0.5, w: 5.7, h: 0.65, color: C.w50, fontSize: 9, lineSpacingMultiple: 1.3 });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 6 — DARK MODE & MOBILE SCREENSHOTS
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide(); slideBg(s); addBrand(s);

  s.addText("DARK MODE & MOBILE VIEW", { x: 0.5, y: 0.3, w: 5, h: 0.3, color: C.tealL, fontSize: 10, bold: true });
  s.addText("Works Beautifully on Every Device & Theme", { x: 0.5, y: 0.6, w: 10, h: 0.45, color: C.w, fontSize: 20, bold: true });

  // Dark mode screenshot
  if (imgDark) {
    card(s, 0.4, 1.2, 7.8, 5.5, C.purple);
    s.addImage({ data: imgDark, x: 0.5, y: 1.3, w: 7.6, h: 5.3, sizing: { type: "contain", w: 7.6, h: 5.3 } });
    s.addText("Dark Mode View", { x: 0.5, y: 6.65, w: 7.6, h: 0.25, color: C.purple, fontSize: 9, bold: true, align: "center" });
  }

  // Mobile screenshot
  if (imgMobile) {
    card(s, 8.5, 1.2, 4.4, 5.5, C.teal);
    s.addImage({ data: imgMobile, x: 8.6, y: 1.3, w: 4.2, h: 5.3, sizing: { type: "contain", w: 4.2, h: 5.3 } });
    s.addText("Mobile View", { x: 8.6, y: 6.65, w: 4.2, h: 0.25, color: C.tealL, fontSize: 9, bold: true, align: "center" });
  }
}

// ══════════════════════════════════════════════════════════
// SLIDE 7 — WHAT MORE WE CAN DO (FUTURE SCOPE)
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide(); slideBg(s); addBrand(s);

  s.addText("WHAT MORE WE CAN DO", { x: 0.5, y: 0.3, w: 5, h: 0.3, color: C.amber, fontSize: 10, bold: true });
  s.addText("Future Services & Growth Opportunities", { x: 0.5, y: 0.6, w: 10, h: 0.45, color: C.w, fontSize: 22, bold: true });
  s.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.1, w: 2.5, h: 0.03, fill: { color: C.amber } });

  const future = [
    { icon: "🌐", title: "Custom Domain & Live Hosting", desc: "Launch the website on www.varadnetralaya.com with SSL security certificate and high-speed cloud hosting. Your own professional web address.", color: C.blue },
    { icon: "📱", title: "Android & iOS Mobile Application", desc: "Dedicated Varad Netralaya mobile app on Google Play Store and Apple App Store — appointment booking, reports, push notifications.", color: C.green },
    { icon: "💳", title: "Online Payment Gateway", desc: "Accept OPD consultation fees online via Razorpay, PhonePe, Google Pay, or UPI. Patients pay before arriving.", color: C.purple },
    { icon: "📊", title: "Admin Dashboard & Patient CRM", desc: "Secure admin panel to manage appointments, patient records, daily reports, revenue tracking, and staff scheduling.", color: C.cyan },
    { icon: "🤖", title: "AI ChatBot (24/7 Support)", desc: "Intelligent WhatsApp and website chatbot — answers OPD timings, doctor availability, surgery info, and books appointments automatically.", color: C.pink },
    { icon: "📈", title: "Google Ads & SEO Marketing", desc: "Rank #1 on Google for \"Eye Hospital Savedi\", \"Cataract Surgery Ahilyanagar\". Run targeted Google and Facebook ads to attract patients.", color: C.red },
    { icon: "🔔", title: "SMS & WhatsApp Reminders", desc: "Automated appointment reminders, follow-up messages, and post-surgery care instructions sent via SMS and WhatsApp.", color: C.amber },
    { icon: "🎬", title: "YouTube Content & Video Marketing", desc: "Professional patient testimonial videos, doctor Q&A sessions, and surgery explainer videos for @VaradNetrayala channel growth.", color: C.red },
  ];

  future.forEach((f, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const cx = 0.4 + col * 6.4;
    const cy = 1.35 + row * 1.45;
    card(s, cx, cy, 6.1, 1.28, f.color);
    s.addText(f.icon + "  " + f.title, { x: cx + 0.2, y: cy + 0.1, w: 5.7, h: 0.3, color: C.w, fontSize: 11, bold: true });
    s.addText(f.desc, { x: cx + 0.2, y: cy + 0.5, w: 5.7, h: 0.65, color: C.w50, fontSize: 9, lineSpacingMultiple: 1.3 });
  });
}

// ══════════════════════════════════════════════════════════
// SLIDE 8 — THANK YOU & CONTACT
// ══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  s.background = { color: C.bg1 };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.08, fill: { color: C.teal } });

  // Checkmark
  s.addShape(pptx.ShapeType.ellipse, { x: 5.67, y: 0.7, w: 1.8, h: 1.8, fill: { color: "042F2E" }, line: { color: C.teal, width: 2.5 } });
  s.addText("✓", { x: 5.67, y: 0.7, w: 1.8, h: 1.8, color: C.tealL, fontSize: 48, bold: true, align: "center", valign: "middle" });

  s.addText("Thank You!", { x: 0.5, y: 2.7, w: 12.33, h: 0.7, color: C.w, fontSize: 36, bold: true, align: "center" });
  s.addText("The website is live and ready for your review.", { x: 1, y: 3.35, w: 11.33, h: 0.35, color: C.tealL, fontSize: 14, align: "center" });
  s.addText("All changes and customizations can be made based on your feedback.", { x: 1, y: 3.7, w: 11.33, h: 0.3, color: C.w50, fontSize: 11, align: "center" });

  // Live demo card
  card(s, 3.3, 4.3, 6.73, 1.8, C.teal);
  s.addText("LIVE DEMO", { x: 3.3, y: 4.4, w: 6.73, h: 0.2, color: C.w30, fontSize: 8, bold: true, align: "center" });
  s.addText("http://localhost:5173/", { x: 3.3, y: 4.65, w: 6.73, h: 0.45, color: C.tealL, fontSize: 20, bold: true, align: "center" });
  s.addShape(pptx.ShapeType.rect, { x: 4.5, y: 5.2, w: 4.33, h: 0.02, fill: { color: "374151" } });
  s.addText("GitHub:  github.com/bhandarisaurabh500/Varad-HospitalManagment", { x: 3.3, y: 5.3, w: 6.73, h: 0.2, color: C.w30, fontSize: 8, align: "center" });
  s.addText("YouTube:  youtube.com/@VaradNetrayala", { x: 3.3, y: 5.55, w: 6.73, h: 0.2, color: C.red, fontSize: 8, bold: true, align: "center" });
  s.addText("Google Maps:  4PCG+JR8, Savedi, Ahilyanagar 414003", { x: 3.3, y: 5.8, w: 6.73, h: 0.2, color: C.w30, fontSize: 8, align: "center" });

  // Contact info
  s.addText("Saurabh Bhandari  —  Full Stack Developer & UI/UX Designer", { x: 1, y: 6.5, w: 11.33, h: 0.25, color: C.w50, fontSize: 9, align: "center" });
  s.addText("We look forward to your feedback  🙏", { x: 1, y: 6.85, w: 11.33, h: 0.3, color: C.amber, fontSize: 11, bold: true, align: "center" });

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 7.42, w: 13.33, h: 0.08, fill: { color: C.amber } });
}

// ─── SAVE ───
const outPath = "d:/Varad Hospital Management System/Varad_Netralaya_Final_Presentation.pptx";
pptx.writeFile({ fileName: outPath })
  .then(() => console.log("SUCCESS: Final PPT saved → " + outPath))
  .catch((e) => console.error("ERROR:", e));
