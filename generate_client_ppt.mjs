import PptxGenJS from "pptxgenjs";
import fs from "fs";

const pptx = new PptxGenJS();
pptx.author = "Saurabh Bhandari";
pptx.company = "Varad Netralaya (वरद नेत्रालय)";
pptx.subject = "Website Features & Future Scope Proposal";
pptx.title = "Varad Netralaya - What We Built & What More We Can Do";
pptx.layout = "LAYOUT_WIDE";

const C = {
  dark: "0F172A", card: "1E293B", white: "FFFFFF", offWhite: "F1F5F9",
  s300: "CBD5E1", s400: "94A3B8", s500: "64748B",
  blue: "0B5ED7", teal: "14B8A6", amber: "F59E0B", red: "EF4444",
  green: "10B981", purple: "8B5CF6", pink: "EC4899", cyan: "06B6D4",
};

function bg(slide) { slide.background = { color: C.dark }; }

function header(slide, n, total = 12) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.5, fill: { color: "020617" } });
  slide.addText([
    { text: "VARAD ", options: { bold: true, color: C.white, fontSize: 12 } },
    { text: "NETRALAYA", options: { color: C.teal, fontSize: 12 } },
  ], { x: 0.3, y: 0.08, w: 3, h: 0.35 });
  slide.addText("— नेत्रसेवेचा आधुनिक दृष्टिकोन —", { x: 4, y: 0.1, w: 5, h: 0.3, color: C.amber, fontSize: 8, bold: true, align: "center" });
  slide.addText(`${n} / ${total}`, { x: 11.5, y: 0.1, w: 1.5, h: 0.3, color: C.amber, fontSize: 9, bold: true, align: "right" });
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, fill: { color: opts.fill || C.card }, rectRadius: opts.r || 0.15,
    shadow: { type: "outer", blur: 4, offset: 2, color: "000000", opacity: 0.25 },
    line: opts.border ? { color: opts.border, width: 1.5 } : undefined,
  });
}

function sectionTitle(slide, tag, title, sub) {
  slide.addText(tag, { x: 0.5, y: 0.7, w: 5, h: 0.25, color: C.teal, fontSize: 9, bold: true });
  slide.addText(title, { x: 0.5, y: 0.95, w: 12, h: 0.55, color: C.white, fontSize: 26, bold: true, fontFace: "Poppins" });
  if (sub) slide.addText(sub, { x: 0.5, y: 1.55, w: 10, h: 0.3, color: C.s400, fontSize: 10 });
}

// Helper to load image as base64
function imgBase64(p) {
  try { return "data:image/png;base64," + fs.readFileSync(p).toString("base64"); }
  catch { return null; }
}

const ssDir = "C:/Users/ASUS/.gemini/antigravity-ide/brain/deb7aeea-ddbc-47e0-b208-ce4e78e34e51/";
const heroImg = imgBase64(ssDir + "hero_section_1786363899052.png");
const servicesImg = imgBase64(ssDir + "services_section_1786363917672.png");
const doctorsImg = imgBase64(ssDir + "doctors_section_1786363936334.png");
const testimonialsImg = imgBase64(ssDir + "testimonials_section_1786363961761.png");
const footerImg = imgBase64(ssDir + "footer_section_1786364022947.png");

// ══════════════════════════════════════
// SLIDE 1: TITLE
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s);
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.1, fill: { color: C.amber } });

  s.addShape(pptx.ShapeType.ellipse, { x: 5.67, y: 0.6, w: 2, h: 2, fill: { color: C.white }, line: { color: C.amber, width: 3 } });
  s.addText("V", { x: 5.67, y: 0.6, w: 2, h: 2, color: C.blue, fontSize: 52, bold: true, align: "center", valign: "middle" });

  card(s, 4.2, 2.8, 5, 0.4, { fill: "422006", border: C.amber });
  s.addText("★ 4.9 Google Rating • 439+ Reviews • Savedi, Ahilyanagar", { x: 4.2, y: 2.8, w: 5, h: 0.4, color: C.amber, fontSize: 9, bold: true, align: "center" });

  s.addText("वरद नेत्रालय", { x: 1, y: 3.4, w: 11.33, h: 0.7, color: C.white, fontSize: 42, bold: true, align: "center" });
  s.addText("Varad Netralaya — Official Website Proposal", { x: 1, y: 4.05, w: 11.33, h: 0.5, color: C.teal, fontSize: 22, bold: true, align: "center" });
  s.addText("आपण काय बनवले  •  काय काय फीचर्स आहेत  •  पुढे आणखी काय करता येईल", { x: 1.5, y: 4.6, w: 10.33, h: 0.4, color: C.s300, fontSize: 12, align: "center" });

  card(s, 3, 5.3, 3.5, 0.85, { border: C.amber });
  s.addText("PRESENTED TO", { x: 3.2, y: 5.35, w: 3, h: 0.15, color: C.s500, fontSize: 7, bold: true });
  s.addText("Dr. Smita Patare & Dr. Raosaheb Borude", { x: 3.2, y: 5.55, w: 3, h: 0.25, color: C.white, fontSize: 9.5, bold: true });
  s.addText("DOS, AIOS, MOS • Senior Ophthalmologists", { x: 3.2, y: 5.8, w: 3, h: 0.2, color: C.teal, fontSize: 8 });

  card(s, 6.8, 5.3, 3.5, 0.85, { border: C.teal });
  s.addText("PRESENTED BY", { x: 7, y: 5.35, w: 3, h: 0.15, color: C.s500, fontSize: 7, bold: true });
  s.addText("Saurabh Bhandari", { x: 7, y: 5.55, w: 3, h: 0.25, color: C.white, fontSize: 9.5, bold: true });
  s.addText("Full Stack Web Developer & UI/UX Designer", { x: 7, y: 5.8, w: 3, h: 0.2, color: C.teal, fontSize: 8 });

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 7.4, w: 13.33, h: 0.1, fill: { color: C.teal } });
}

// ══════════════════════════════════════
// SLIDE 2: WHAT WE BUILT — OVERVIEW
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 2);
  sectionTitle(s, "✅ COMPLETED FEATURES", "आपण काय बनवले — Website Overview", "सध्या तयार असलेल्या वेबसाईटमधील सर्व प्रमुख विभाग.");

  const items = [
    { icon: "🏠", name: "Home (Hero Section)", desc: "HD Logo, YouTube Video, Doctor Names, Rating Badge" },
    { icon: "ℹ️", name: "About Us", desc: "Hospital History, Vision & Mission Statement" },
    { icon: "🩺", name: "Services (6 Cards)", desc: "Cataract, Retina, Perimetry, Pediatric, Diabetic Eye, Refraction" },
    { icon: "💎", name: "Eye Treatments Detail", desc: "Phaco Surgery, IOL Types, Visual Field, LASIK Information" },
    { icon: "👨‍⚕️", name: "Doctor Profiles", desc: "Dr. Smita Patare & Dr. Raosaheb Borude Full Profile Cards" },
    { icon: "📊", name: "Stats Counter (Animated)", desc: "30,000+ Patients • 18,000+ Surgeries • 15+ Years" },
    { icon: "🏛️", name: "Govt Schemes & Insurance", desc: "Zurich Kotak, Star Health, HDFC ERGO, ICICI, SBI, Niva Bupa" },
    { icon: "⭐", name: "Patient Testimonials", desc: "4.9★ Google Reviews Carousel with Photo & Treatment" },
    { icon: "📸", name: "Photo Gallery", desc: "OPD, Operation Theatre, Equipment & Consultation Rooms" },
    { icon: "❓", name: "FAQ Section", desc: "6 Interactive Q&A Accordion — Timings, Doctors, Insurance" },
    { icon: "📅", name: "Appointment Booking", desc: "OPD Online Form + WhatsApp + Call Helpline Integration" },
    { icon: "📞", name: "Contact & Footer", desc: "Google Maps, Address, Phone, Email, YouTube, Social Links" },
  ];

  items.forEach((it, i) => {
    const col = i < 6 ? 0 : 1;
    const row = i < 6 ? i : i - 6;
    const cx = 0.5 + col * 6.3;
    const cy = 2 + row * 0.82;
    card(s, cx, cy, 5.9, 0.68);
    s.addText(it.icon + "  " + it.name, { x: cx + 0.2, y: cy + 0.05, w: 3.8, h: 0.28, color: C.white, fontSize: 10, bold: true });
    s.addText(it.desc, { x: cx + 0.2, y: cy + 0.35, w: 5.4, h: 0.22, color: C.s400, fontSize: 8 });
  });
}

// ══════════════════════════════════════
// SLIDE 3: HERO SCREENSHOT
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 3);
  sectionTitle(s, "📸 LIVE SCREENSHOT — HOME PAGE", "Hero Section (Homepage)", "HD Logo, YouTube Video Player, Doctor Names, 4.9★ Badge, Dark/Light Mode.");

  if (heroImg) {
    s.addImage({ data: heroImg, x: 0.5, y: 2, w: 12.33, h: 5, sizing: { type: "contain", w: 12.33, h: 5 } });
  }
  card(s, 0.5, 2, 12.33, 5, { border: C.blue });
}

// ══════════════════════════════════════
// SLIDE 4: SERVICES SCREENSHOT
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 4);
  sectionTitle(s, "📸 LIVE SCREENSHOT — SERVICES", "Services & Eye Treatments Section", "6 प्रमुख नेत्रसेवा कार्ड्स — Cataract, Retina, Perimetry, Pediatric, Computerized Eye Testing.");

  if (servicesImg) {
    s.addImage({ data: servicesImg, x: 0.5, y: 2, w: 12.33, h: 5, sizing: { type: "contain", w: 12.33, h: 5 } });
  }
  card(s, 0.5, 2, 12.33, 5, { border: C.teal });
}

// ══════════════════════════════════════
// SLIDE 5: DOCTORS SCREENSHOT
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 5);
  sectionTitle(s, "📸 LIVE SCREENSHOT — DOCTORS", "Doctor Profiles Section", "Dr. Smita Prashant Patare (DOS, AIOS, MOS) & Dr. Raosaheb Kundlik Borude (MOS, AIOS).");

  if (doctorsImg) {
    s.addImage({ data: doctorsImg, x: 0.5, y: 2, w: 12.33, h: 5, sizing: { type: "contain", w: 12.33, h: 5 } });
  }
  card(s, 0.5, 2, 12.33, 5, { border: C.amber });
}

// ══════════════════════════════════════
// SLIDE 6: TESTIMONIALS SCREENSHOT
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 6);
  sectionTitle(s, "📸 LIVE SCREENSHOT — REVIEWS", "Patient Testimonials & Google Reviews", "4.9★ Rated • 439+ Google Reviews • सावेडी, अहिल्यानगर मधील रुग्णांचे अभिप्राय.");

  if (testimonialsImg) {
    s.addImage({ data: testimonialsImg, x: 0.5, y: 2, w: 12.33, h: 5, sizing: { type: "contain", w: 12.33, h: 5 } });
  }
  card(s, 0.5, 2, 12.33, 5, { border: C.green });
}

// ══════════════════════════════════════
// SLIDE 7: SPECIAL FEATURES BUILT
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 7);
  sectionTitle(s, "🎯 SPECIAL FEATURES", "वेबसाईटमधील विशेष फीचर्स", "या वेबसाईटमध्ये बनवलेल्या प्रीमियम सुविधा.");

  const feats = [
    { title: "🌙 Dark / Light Mode Toggle", desc: "रात्री सहज वाचता येण्यासाठी डार्क मोड — एका क्लिकवर बदलता येतो.", color: C.purple },
    { title: "🎥 थेट YouTube Video Player", desc: "वरद नेत्रालयाचा अधिकृत YouTube व्हिडिओ वेबसाईटवरच प्ले होतो.", color: C.red },
    { title: "📺 YouTube Channel Link", desc: "@VaradNetrayala — सबस्क्राईब बटण दाबल्यास YouTube चॅनेल उघडतो.", color: C.red },
    { title: "💬 Floating WhatsApp Button", desc: "स्क्रीनवरील हिरवे WhatsApp बटण — 1-क्लिक वर डॉक्टरांशी चॅट.", color: C.green },
    { title: "📅 Online Appointment Booking", desc: "नाव, मोबाईल नंबर, तारीख भरून OPD अपॉइंटमेंट बुक करता येतो.", color: C.blue },
    { title: "📱 100% Mobile Responsive", desc: "मोबाईल, टॅबलेट, लॅपटॉप — सर्व डिवाईसवर यथार्थ दिसतो.", color: C.cyan },
    { title: "🔄 3D Animated Preloader", desc: "वेबसाईट ओपन करताना गोल फिरणारा HD वरद नेत्रालय लोगो.", color: C.amber },
    { title: "⬆️ Scroll to Top Button", desc: "खाली स्क्रोल केल्यावर दिसणारे ↑ बटण — वरती जाण्यासाठी.", color: C.teal },
  ];

  feats.forEach((f, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const cx = 0.5 + col * 6.3;
    const cy = 2 + row * 1.3;
    card(s, cx, cy, 5.9, 1.1, { border: f.color });
    s.addText(f.title, { x: cx + 0.25, y: cy + 0.1, w: 5.4, h: 0.3, color: C.white, fontSize: 11, bold: true });
    s.addText(f.desc, { x: cx + 0.25, y: cy + 0.5, w: 5.4, h: 0.45, color: C.s300, fontSize: 9.5, lineSpacingMultiple: 1.3 });
  });
}

// ══════════════════════════════════════
// SLIDE 8: INSURANCE & CASHLESS
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 8);
  sectionTitle(s, "🛡️ CASHLESS INSURANCE PARTNERS", "100% कॅशलेस इन्शुरन्स सुविधा", "वेबसाईटवर दाखवलेल्या सर्व इन्शुरन्स कंपन्या.");

  const ins = [
    "Zurich Kotak General Insurance", "Star Health Insurance", "HDFC ERGO General Insurance",
    "ICICI Lombard Health", "Niva Bupa Health Insurance", "SBI General Insurance",
  ];
  ins.forEach((name, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const cx = 0.5 + col * 4.15, cy = 2.2 + row * 2.1;
    card(s, cx, cy, 3.85, 1.7, { border: C.teal });
    s.addShape(pptx.ShapeType.ellipse, { x: cx + 1.4, y: cy + 0.2, w: 1, h: 1, fill: { color: C.teal } });
    s.addText("🛡️", { x: cx + 1.4, y: cy + 0.2, w: 1, h: 1, fontSize: 26, align: "center", valign: "middle" });
    s.addText(name, { x: cx + 0.15, y: cy + 1.25, w: 3.55, h: 0.3, color: C.white, fontSize: 10, bold: true, align: "center" });
  });
}

// ══════════════════════════════════════
// SLIDE 9: FOOTER SCREENSHOT
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 9);
  sectionTitle(s, "📸 LIVE SCREENSHOT — CONTACT & FOOTER", "Contact, Google Maps & Footer Section", "Address, Phone, Email, Working Hours, YouTube Link, Social Media, Google Maps Navigation.");

  if (footerImg) {
    s.addImage({ data: footerImg, x: 0.5, y: 2, w: 12.33, h: 5, sizing: { type: "contain", w: 12.33, h: 5 } });
  }
  card(s, 0.5, 2, 12.33, 5, { border: C.purple });
}

// ══════════════════════════════════════
// SLIDE 10: WHAT MORE WE CAN DO — FUTURE SCOPE
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 10);
  sectionTitle(s, "🚀 FUTURE POSSIBILITIES", "पुढे आणखी काय करता येईल?", "Varad Netralaya साठी पुढील टप्प्यात जोडता येणाऱ्या अत्याधुनिक सुविधा.");

  const future = [
    { icon: "🌐", title: "Custom Domain & Hosting", desc: "www.varadnetralaya.com सारख्या स्वतःच्या डोमेनवर वेबसाईट लाईव्ह करणे. SSL सिक्युरिटी सोबत.", color: C.blue },
    { icon: "📱", title: "Android & iOS Mobile App", desc: "वरद नेत्रालयाचे स्वतःचे मोबाईल ॲप — अपॉइंटमेंट, रिपोर्ट्स, नोटिफिकेशन्स.", color: C.green },
    { icon: "💳", title: "Online Payment Gateway", desc: "Razorpay/PhonePe द्वारे ऑनलाईन OPD कन्सल्टेशन फी पेमेंट सुविधा.", color: C.purple },
    { icon: "📊", title: "Admin Dashboard & CRM", desc: "रुग्णांचे रेकॉर्ड, अपॉइंटमेंट व्यवस्थापन, आणि डेली रिपोर्ट्स डॅशबोर्ड.", color: C.cyan },
    { icon: "🤖", title: "AI ChatBot (24/7 Support)", desc: "WhatsApp/Website वर AI चॅटबॉट — OPD वेळ, उपचार माहिती, अपॉइंटमेंट बुकिंग.", color: C.pink },
    { icon: "🔔", title: "SMS & WhatsApp Reminders", desc: "अपॉइंटमेंट बुकिंगनंतर रुग्णांना ऑटो SMS/WhatsApp रिमाइंडर पाठवणे.", color: C.amber },
    { icon: "📈", title: "Google Ads & SEO Campaign", desc: "\"Eye Hospital Savedi\" सारख्या कीवर्ड्सवर गुगल #1 रँक प्राप्त करणे.", color: C.red },
    { icon: "🎬", title: "YouTube Content Marketing", desc: "Patient Stories, Doctor Q&A व्हिडिओ YouTube चॅनेलवर नियमित प्रकाशन.", color: C.red },
  ];

  future.forEach((f, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const cx = 0.5 + col * 6.3;
    const cy = 2 + row * 1.3;
    card(s, cx, cy, 5.9, 1.1, { border: f.color });
    s.addText(f.icon + "  " + f.title, { x: cx + 0.25, y: cy + 0.1, w: 5.4, h: 0.3, color: C.white, fontSize: 11, bold: true });
    s.addText(f.desc, { x: cx + 0.25, y: cy + 0.5, w: 5.4, h: 0.45, color: C.s300, fontSize: 9.5, lineSpacingMultiple: 1.3 });
  });
}

// ══════════════════════════════════════
// SLIDE 11: PRICING / PACKAGES (OPTIONAL)
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s); header(s, 11);
  sectionTitle(s, "💰 SERVICE PACKAGES", "सेवा पॅकेजेस (Optional Add-ons)", "वेबसाईट व्यतिरिक्त जोडता येणाऱ्या अतिरिक्त सेवा.");

  const pkgs = [
    { name: "🌐 Website Launch", items: ["Custom Domain (varadnetralaya.com)", "SSL Security Certificate", "Fast Cloud Hosting (1 Year)", "Google Analytics Setup", "SEO Meta Tags & Sitemap"], color: C.blue },
    { name: "📱 Mobile App", items: ["Android App (Play Store)", "iOS App (App Store)", "Push Notifications", "Appointment Booking", "Patient Report Viewing"], color: C.green },
    { name: "📈 Digital Marketing", items: ["Google Ads Campaign (Monthly)", "Facebook/Instagram Ads", "YouTube Video SEO", "Google Maps Optimization", "Monthly Performance Report"], color: C.purple },
  ];

  pkgs.forEach((p, i) => {
    const cx = 0.5 + i * 4.15;
    card(s, cx, 2, 3.85, 4.8, { border: p.color });
    s.addText(p.name, { x: cx + 0.15, y: 2.15, w: 3.55, h: 0.4, color: C.white, fontSize: 13, bold: true, align: "center" });
    s.addShape(pptx.ShapeType.rect, { x: cx + 0.3, y: 2.6, w: 3.25, h: 0.02, fill: { color: p.color } });
    p.items.forEach((item, j) => {
      s.addText("✓  " + item, { x: cx + 0.3, y: 2.8 + j * 0.55, w: 3.25, h: 0.4, color: C.s300, fontSize: 9.5 });
    });
  });
}

// ══════════════════════════════════════
// SLIDE 12: THANK YOU & DEMO
// ══════════════════════════════════════
{
  const s = pptx.addSlide(); bg(s);
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.1, fill: { color: C.teal } });

  s.addShape(pptx.ShapeType.ellipse, { x: 5.67, y: 0.7, w: 2, h: 2, fill: { color: "042F2E" }, line: { color: C.teal, width: 3 } });
  s.addText("✓", { x: 5.67, y: 0.7, w: 2, h: 2, color: C.teal, fontSize: 52, bold: true, align: "center", valign: "middle" });

  s.addText("धन्यवाद!", { x: 1, y: 2.9, w: 11.33, h: 0.7, color: C.white, fontSize: 40, bold: true, align: "center" });
  s.addText("Thank You for Your Time & Trust", { x: 1, y: 3.55, w: 11.33, h: 0.4, color: C.teal, fontSize: 18, bold: true, align: "center" });

  s.addText("ही वेबसाईट पूर्णपणे तयार असून चाचणीसाठी लाईव्ह आहे.\nआपल्या सूचनेनुसार कोणतेही बदल करता येतील.", { x: 2, y: 4.1, w: 9.33, h: 0.6, color: C.s300, fontSize: 11, align: "center", lineSpacingMultiple: 1.4 });

  card(s, 3.5, 4.9, 6.33, 1.4, { border: C.teal });
  s.addText("LIVE DEMO", { x: 3.5, y: 5, w: 6.33, h: 0.2, color: C.s500, fontSize: 8, bold: true, align: "center" });
  s.addText("http://localhost:5173/", { x: 3.5, y: 5.2, w: 6.33, h: 0.4, color: C.teal, fontSize: 20, bold: true, align: "center" });
  s.addText("GitHub: github.com/bhandarisaurabh500/Varad-HospitalManagment", { x: 3.5, y: 5.7, w: 6.33, h: 0.25, color: C.s500, fontSize: 8, align: "center" });
  s.addText("YouTube: youtube.com/@VaradNetrayala", { x: 3.5, y: 5.95, w: 6.33, h: 0.2, color: C.red, fontSize: 8, bold: true, align: "center" });

  s.addText("Saurabh Bhandari — Full Stack Developer & UI/UX Designer", { x: 1, y: 6.6, w: 11.33, h: 0.25, color: C.s400, fontSize: 9, align: "center" });
  s.addText("Q&A Session — आपले प्रश्न विचारा 🙏", { x: 1, y: 6.9, w: 11.33, h: 0.3, color: C.amber, fontSize: 11, bold: true, align: "center" });

  s.addShape(pptx.ShapeType.rect, { x: 0, y: 7.4, w: 13.33, h: 0.1, fill: { color: C.amber } });
}

// ─── SAVE ───
const out = "d:/Varad Hospital Management System/Varad_Netralaya_Client_Presentation.pptx";
pptx.writeFile({ fileName: out })
  .then(() => console.log("SUCCESS: Client PPT saved → " + out))
  .catch((e) => console.error("ERROR:", e));
