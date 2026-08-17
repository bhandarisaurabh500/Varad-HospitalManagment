import PptxGenJS from "pptxgenjs";

const pptx = new PptxGenJS();

// ─── Global Settings ───
pptx.author = "Varad Netralaya";
pptx.company = "Varad Netralaya (वरद नेत्रालय)";
pptx.subject = "Official Digital Website & Branding Proposal";
pptx.title = "Varad Netralaya - Website Proposal Presentation";
pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5

const COLORS = {
  darkBg: "0F172A",
  cardBg: "1E293B",
  white: "FFFFFF",
  slate300: "CBD5E1",
  slate400: "94A3B8",
  slate500: "64748B",
  blue600: "0B5ED7",
  teal500: "14B8A6",
  teal400: "2DD4BF",
  amber400: "FBBF24",
  amber500: "F59E0B",
  red500: "EF4444",
  emerald500: "10B981",
  purple400: "C084FC",
  pink400: "F472B6",
  cyan400: "22D3EE",
};

// ─── Helper: add dark background to a slide ───
function darkSlide(slide) {
  slide.background = { color: COLORS.darkBg };
}

// ─── Helper: add top header bar ───
function addHeader(slide, slideNum, totalSlides = 10) {
  // Top bar background
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 0.55,
    fill: { color: "020617" },
  });
  // Logo text
  slide.addText([
    { text: "VARAD ", options: { bold: true, color: COLORS.white, fontSize: 13 } },
    { text: "NETRALAYA", options: { bold: false, color: COLORS.teal400, fontSize: 13 } },
  ], { x: 0.4, y: 0.1, w: 3, h: 0.35 });
  // Slide counter
  slide.addText(`Slide ${slideNum} / ${totalSlides}`, {
    x: 11, y: 0.1, w: 2, h: 0.35,
    color: COLORS.amber400, fontSize: 9, bold: true, align: "right",
  });
  // Tagline
  slide.addText("— नेत्रसेवेचा आधुनिक दृष्टिकोन —", {
    x: 3.5, y: 0.12, w: 4, h: 0.3,
    color: COLORS.amber500, fontSize: 8, bold: true, align: "center",
  });
}

// ─── Helper: rounded card ───
function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: opts.fill || COLORS.cardBg },
    shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.3 },
    rectRadius: opts.radius || 0.15,
    line: opts.borderColor ? { color: opts.borderColor, width: 1.5 } : undefined,
  });
}

// ════════════════════════════════════════════
// SLIDE 1: TITLE SLIDE
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);

  // Decorative gradient band at top
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 0.12,
    fill: { type: "solid", color: COLORS.amber500 },
  });

  // Center emblem circle placeholder
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 5.67, y: 0.7, w: 2, h: 2,
    fill: { color: COLORS.white },
    line: { color: COLORS.amber400, width: 3 },
    shadow: { type: "outer", blur: 12, color: COLORS.amber500, opacity: 0.4 },
  });
  slide.addText("V", {
    x: 5.67, y: 0.7, w: 2, h: 2,
    color: COLORS.blue600, fontSize: 52, bold: true, align: "center", valign: "middle",
    fontFace: "Poppins",
  });

  // Rating pill
  addCard(slide, 4.4, 2.9, 4.5, 0.45, { fill: "422006", borderColor: COLORS.amber500 });
  slide.addText("★ 4.9 Rating (439+ Google Reviews) • सावेडी, अहिल्यानगर", {
    x: 4.4, y: 2.9, w: 4.5, h: 0.45,
    color: COLORS.amber400, fontSize: 10, bold: true, align: "center",
  });

  // Main title
  slide.addText("वरद नेत्रालय", {
    x: 1, y: 3.55, w: 11.33, h: 0.7,
    color: COLORS.white, fontSize: 40, bold: true, align: "center",
    fontFace: "Poppins",
  });
  slide.addText("डिजिटल वेबसाईट व ब्रँडिंग प्रस्ताव", {
    x: 1, y: 4.2, w: 11.33, h: 0.6,
    color: COLORS.teal400, fontSize: 28, bold: true, align: "center",
    fontFace: "Poppins",
  });

  // Subtitle
  slide.addText(
    "Apollo Hospitals च्या धर्तीवर तयार केलेली जगन्मान्य प्रीमियम वेबसाईट, अत्याधुनिक फीचर्स,\nयूट्यूब व्हिडिओ एकत्रीकरण आणि रुग्णांसाठी सुलभ अपॉइंटमेंट सिस्टीम.",
    {
      x: 2, y: 4.85, w: 9.33, h: 0.7,
      color: COLORS.slate300, fontSize: 11, align: "center", lineSpacingMultiple: 1.3,
    }
  );

  // Two info cards at bottom
  addCard(slide, 3.2, 5.7, 3.3, 0.9, { borderColor: COLORS.amber500 });
  slide.addText("Presented To", {
    x: 3.4, y: 5.75, w: 3, h: 0.2,
    color: COLORS.slate400, fontSize: 7, bold: true,
  });
  slide.addText("Dr. Smita Patare & Dr. Raosaheb Borude", {
    x: 3.4, y: 5.95, w: 3, h: 0.25,
    color: COLORS.white, fontSize: 10, bold: true,
  });
  slide.addText("DOS, AIOS, MOS — Senior Ophthalmologists", {
    x: 3.4, y: 6.2, w: 3, h: 0.2,
    color: COLORS.teal400, fontSize: 8,
  });

  addCard(slide, 6.8, 5.7, 3.3, 0.9, { borderColor: COLORS.teal500 });
  slide.addText("Location & Contact", {
    x: 7, y: 5.75, w: 3, h: 0.2,
    color: COLORS.slate400, fontSize: 7, bold: true,
  });
  slide.addText("Balikashram Road, Savedi, Ahilyanagar", {
    x: 7, y: 5.95, w: 3, h: 0.25,
    color: COLORS.white, fontSize: 10, bold: true,
  });
  slide.addText("+91 98765 43210 • Maharashtra 414003", {
    x: 7, y: 6.2, w: 3, h: 0.2,
    color: COLORS.teal400, fontSize: 8,
  });

  // Bottom band
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.38, w: 13.33, h: 0.12,
    fill: { type: "solid", color: COLORS.teal500 },
  });
}

// ════════════════════════════════════════════
// SLIDE 2: PROJECT OBJECTIVES
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);
  addHeader(slide, 2);

  slide.addText("01. OBJECTIVES", {
    x: 0.6, y: 0.8, w: 5, h: 0.3,
    color: COLORS.teal400, fontSize: 9, bold: true,
  });
  slide.addText("डिजिटल वेबसाईटची उद्दिष्टे व फायदे", {
    x: 0.6, y: 1.1, w: 10, h: 0.55,
    color: COLORS.white, fontSize: 28, bold: true, fontFace: "Poppins",
  });
  slide.addText("वरद नेत्रालयाला अहिल्यानगर मधील #1 नेत्रोपचार केंद्र म्हणून स्थापित करणे.", {
    x: 0.6, y: 1.7, w: 10, h: 0.3,
    color: COLORS.slate400, fontSize: 10,
  });

  // 3 objective cards
  const objectives = [
    { num: "01", title: "रुग्णांचा विश्वास व पत", desc: "Google वरील 4.9★ रेटिंग व 439+ अभिप्राय ठळकपणे दाखवून नवीन रुग्णांचा आत्मविश्वास वाढवणे.", color: COLORS.amber500 },
    { num: "02", title: "1-क्लिक अपॉइंटमेंट", desc: "फोन कॉल, व्हॉट्सॲप आणि ऑनलाईन फॉर्म द्वारे एका क्लिकवर OPD अपॉइंटमेंट बुकिंग.", color: COLORS.teal500 },
    { num: "03", title: "100% कॅशलेस माहिती", desc: "Zurich Kotak, Star Health, HDFC ERGO इन्शुरन्स जोडणीची पारदर्शक माहिती रुग्णांसाठी.", color: COLORS.blue600 },
  ];

  objectives.forEach((obj, i) => {
    const cx = 0.6 + i * 4.1;
    addCard(slide, cx, 2.3, 3.8, 3.2, { borderColor: obj.color });
    // Number badge
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cx + 0.3, y: 2.6, w: 0.7, h: 0.7,
      fill: { color: obj.color }, rectRadius: 0.12,
    });
    slide.addText(obj.num, {
      x: cx + 0.3, y: 2.6, w: 0.7, h: 0.7,
      color: COLORS.white, fontSize: 18, bold: true, align: "center", valign: "middle",
    });
    slide.addText(obj.title, {
      x: cx + 0.3, y: 3.5, w: 3.2, h: 0.35,
      color: COLORS.white, fontSize: 14, bold: true,
    });
    slide.addText(obj.desc, {
      x: cx + 0.3, y: 3.9, w: 3.2, h: 1.2,
      color: COLORS.slate300, fontSize: 10, lineSpacingMultiple: 1.35,
    });
  });
}

// ════════════════════════════════════════════
// SLIDE 3: DESIGN THEME
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);
  addHeader(slide, 3);

  slide.addText("02. DESIGN THEME", {
    x: 0.6, y: 0.8, w: 5, h: 0.3,
    color: COLORS.teal400, fontSize: 9, bold: true,
  });
  slide.addText("Apollo-Inspired प्रीमियम डिझाईन थीम", {
    x: 0.6, y: 1.1, w: 10, h: 0.55,
    color: COLORS.white, fontSize: 28, bold: true, fontFace: "Poppins",
  });

  // Left: Color Palette card
  addCard(slide, 0.6, 1.9, 5.8, 4.5);
  slide.addText("रंगसंगती (Color Palette)", {
    x: 0.9, y: 2.1, w: 5, h: 0.35,
    color: COLORS.white, fontSize: 14, bold: true,
  });

  const colors = [
    { hex: COLORS.blue600, name: "Primary Blue (#0B5ED7)", desc: "वैद्यकीय विश्वासार्हता व दर्जा" },
    { hex: COLORS.teal500, name: "Teal Emerald (#14B8A6)", desc: "आरोग्य, ताजेपणा व दृष्टी सुधारणा" },
    { hex: COLORS.amber500, name: "Amber Gold (#F59E0B)", desc: "4.9★ रेटिंग व प्रिमियम ब्रँडिंग" },
    { hex: COLORS.darkBg, name: "Dark Slate (#0F172A)", desc: "रात्रीसाठी डार्क मोड बॅकग्राउंड" },
  ];

  colors.forEach((c, i) => {
    const cy = 2.65 + i * 0.85;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 1.1, y: cy, w: 0.5, h: 0.5,
      fill: { color: c.hex },
      line: { color: COLORS.slate500, width: 0.5 },
    });
    slide.addText(c.name, {
      x: 1.8, y: cy, w: 4, h: 0.25,
      color: COLORS.white, fontSize: 10, bold: true,
    });
    slide.addText(c.desc, {
      x: 1.8, y: cy + 0.25, w: 4, h: 0.2,
      color: COLORS.slate400, fontSize: 8,
    });
  });

  // Right: UI Features card
  addCard(slide, 6.9, 1.9, 5.8, 4.5);
  slide.addText("वैशिष्ट्यपूर्ण UI सुविधा", {
    x: 7.2, y: 2.1, w: 5, h: 0.35,
    color: COLORS.white, fontSize: 14, bold: true,
  });

  const features = [
    "✓  लाइट व डीप डार्क मोड (#030712) — रात्री सहज वाचता येणारा",
    "✓  3D ॲनिमेटेड प्रीलोडर — वेबसाईट उघडताच HD लोगो दिसतो",
    "✓  फुल स्क्रीन लेआऊट (1440px) — डेस्कटॉपवर भव्य अनुभव",
    "✓  100% मोबाईल रिस्पॉन्सिव्ह — मोबाईलवर ड्रॉवर मेनू",
    "✓  Glassmorphism व Soft Shadow कार्ड्स",
    "✓  Smooth Scroll ॲनिमेशन्स व Hover इफेक्ट्स",
    "✓  Sticky Navbar — स्क्रोल करतानाही मेनू वरती दिसतो",
  ];

  features.forEach((f, i) => {
    slide.addText(f, {
      x: 7.2, y: 2.65 + i * 0.52, w: 5.2, h: 0.4,
      color: COLORS.slate300, fontSize: 9.5, lineSpacingMultiple: 1.2,
    });
  });
}

// ════════════════════════════════════════════
// SLIDE 4: TECHNOLOGY STACK
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);
  addHeader(slide, 4);

  slide.addText("03. TECHNOLOGY STACK", {
    x: 0.6, y: 0.8, w: 5, h: 0.3,
    color: COLORS.teal400, fontSize: 9, bold: true,
  });
  slide.addText("आधुनिक तंत्रज्ञान व वेग (Super-Fast Performance)", {
    x: 0.6, y: 1.1, w: 11, h: 0.55,
    color: COLORS.white, fontSize: 26, bold: true, fontFace: "Poppins",
  });
  slide.addText("जगभरात वापरल्या जाणाऱ्या अत्याधुनिक कटिंग-एज फ्रंटएंड फ्रेमवर्कचा वापर.", {
    x: 0.6, y: 1.7, w: 10, h: 0.3,
    color: COLORS.slate400, fontSize: 10,
  });

  const techs = [
    { name: "React 19", subtitle: "React.js Engine", desc: "डायनामिक व जलद लोड होणारे कॉम्पोनंट्स", color: COLORS.cyan400 },
    { name: "Vite 8", subtitle: "Build Tool", desc: "३६०ms पेक्षा जलद बिल्ड स्पीड", color: COLORS.purple400 },
    { name: "Tailwind v4", subtitle: "CSS Framework", desc: "सुंदर व रिस्पॉन्सिव्ह स्टाईलिंग", color: COLORS.teal400 },
    { name: "Motion", subtitle: "Framer Motion", desc: "गुळगुळीत स्क्रोल व ॲनिमेशन्स", color: COLORS.pink400 },
  ];

  techs.forEach((t, i) => {
    const cx = 0.6 + i * 3.15;
    addCard(slide, cx, 2.3, 2.9, 3.5);
    slide.addText(t.name, {
      x: cx, y: 2.6, w: 2.9, h: 0.6,
      color: t.color, fontSize: 24, bold: true, align: "center", fontFace: "Poppins",
    });
    slide.addText(t.subtitle, {
      x: cx, y: 3.25, w: 2.9, h: 0.3,
      color: COLORS.white, fontSize: 11, bold: true, align: "center",
    });
    slide.addText(t.desc, {
      x: cx + 0.2, y: 3.65, w: 2.5, h: 0.8,
      color: COLORS.slate300, fontSize: 9, align: "center", lineSpacingMultiple: 1.3,
    });
  });
}

// ════════════════════════════════════════════
// SLIDE 5: YOUTUBE VIDEO & CHANNEL INTEGRATION
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);
  addHeader(slide, 5);

  slide.addText("04. MEDIA & VIDEO", {
    x: 0.6, y: 0.8, w: 5, h: 0.3,
    color: COLORS.red500, fontSize: 9, bold: true,
  });
  slide.addText("थेट युट्युब व्हिडिओ व चॅनेल जोडणी", {
    x: 0.6, y: 1.1, w: 10, h: 0.55,
    color: COLORS.white, fontSize: 28, bold: true, fontFace: "Poppins",
  });
  slide.addText("वरद नेत्रालयाचे अधिकृत युट्युब चॅनेल व व्हिडिओ वेबसाईटवर थेट प्ले होतात.", {
    x: 0.6, y: 1.7, w: 10, h: 0.3,
    color: COLORS.slate400, fontSize: 10,
  });

  // Left: Video placeholder card
  addCard(slide, 0.6, 2.2, 6.2, 4.2, { borderColor: COLORS.red500 });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1, y: 2.5, w: 5.4, h: 3.1,
    fill: { color: "000000" },
  });
  // Play button
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 3.2, y: 3.4, w: 1, h: 1,
    fill: { color: COLORS.red500 },
  });
  slide.addText("▶", {
    x: 3.2, y: 3.4, w: 1, h: 1,
    color: COLORS.white, fontSize: 28, align: "center", valign: "middle",
  });
  slide.addText("Official YouTube Video — Varad Netralaya Happy Patients", {
    x: 1, y: 5.7, w: 5.4, h: 0.3,
    color: COLORS.slate300, fontSize: 8, align: "center",
  });
  slide.addText("youtube.com/watch?v=a38nME-7Ocg", {
    x: 1, y: 6, w: 5.4, h: 0.25,
    color: COLORS.red500, fontSize: 8, align: "center", bold: true,
  });

  // Right: Feature list
  const ytFeatures = [
    { icon: "▶", title: "थेट युट्युब प्लेअर", desc: "रुग्ण वेबसाईट सोडल्याशिवाय वरद नेत्रालयाचे व्हिडिओ थेट वेबसाईटवर पाहू शकतात." },
    { icon: "🔔", title: "युट्युब चॅनेल सबस्क्राईब लिंक", desc: "1-क्लिक वर रुग्णांना @VaradNetrayala चॅनेल वर पुनर्निर्देशित केले जाते." },
    { icon: "🎥", title: "Full-Screen व्हिडिओ मॉडल", desc: "Watch Official Video बटन दाबता फुल-स्क्रीन सिनेमॅटिक मॉडल ओपन होतो." },
  ];

  ytFeatures.forEach((f, i) => {
    const cy = 2.4 + i * 1.35;
    addCard(slide, 7.2, cy, 5.5, 1.15);
    slide.addText(f.icon, {
      x: 7.4, y: cy + 0.15, w: 0.5, h: 0.4,
      color: COLORS.red500, fontSize: 16, align: "center",
    });
    slide.addText(f.title, {
      x: 8, y: cy + 0.1, w: 4.4, h: 0.3,
      color: COLORS.white, fontSize: 11, bold: true,
    });
    slide.addText(f.desc, {
      x: 8, y: cy + 0.45, w: 4.4, h: 0.55,
      color: COLORS.slate300, fontSize: 9, lineSpacingMultiple: 1.3,
    });
  });
}

// ════════════════════════════════════════════
// SLIDE 6: DOCTORS & CLINICAL EXCELLENCE
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);
  addHeader(slide, 6);

  slide.addText("05. CLINICAL EXCELLENCE", {
    x: 0.6, y: 0.8, w: 5, h: 0.3,
    color: COLORS.teal400, fontSize: 9, bold: true,
  });
  slide.addText("तज्ज्ञ डॉक्टर व अत्याधुनिक उपचार", {
    x: 0.6, y: 1.1, w: 10, h: 0.55,
    color: COLORS.white, fontSize: 28, bold: true, fontFace: "Poppins",
  });

  // Doctor 1
  addCard(slide, 0.6, 2, 6, 4, { borderColor: COLORS.teal500 });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 2, w: 0.2, h: 4,
    fill: { color: COLORS.teal500 },
  });
  slide.addText("Dr. Smita Prashant Patare", {
    x: 1.2, y: 2.3, w: 5, h: 0.4,
    color: COLORS.white, fontSize: 18, bold: true, fontFace: "Poppins",
  });
  slide.addText("DOS, AIOS, MOS • Senior Eye Surgeon", {
    x: 1.2, y: 2.7, w: 5, h: 0.3,
    color: COLORS.teal400, fontSize: 10, bold: true,
  });
  slide.addText("18+ वर्षांचा अनुभव • 10,000+ यशस्वी शस्त्रक्रिया", {
    x: 1.2, y: 3.1, w: 5, h: 0.25,
    color: COLORS.amber400, fontSize: 9, bold: true,
  });
  slide.addText(
    "• बिनटाक्याची मोतीबिंदू शस्त्रक्रिया (Phacoemulsification)\n• प्रीमियम मोनोफोकल, मल्टीफोकल व टॉरिक IOL\n• बालकांच्या डोळ्यांच्या आजारांची तपासणी\n• तिरळेपणा (Squint) मूल्यमापन",
    {
      x: 1.2, y: 3.5, w: 5, h: 2,
      color: COLORS.slate300, fontSize: 10, lineSpacingMultiple: 1.5,
    }
  );

  // Doctor 2
  addCard(slide, 6.9, 2, 6, 4, { borderColor: COLORS.amber500 });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.9, y: 2, w: 0.2, h: 4,
    fill: { color: COLORS.amber500 },
  });
  slide.addText("Dr. Raosaheb Kundlik Borude", {
    x: 7.5, y: 2.3, w: 5, h: 0.4,
    color: COLORS.white, fontSize: 18, bold: true, fontFace: "Poppins",
  });
  slide.addText("MOS, AIOS • Refractive & Retina Specialist", {
    x: 7.5, y: 2.7, w: 5, h: 0.3,
    color: COLORS.amber400, fontSize: 10, bold: true,
  });
  slide.addText("15+ वर्षांचा अनुभव • 8,500+ यशस्वी शस्त्रक्रिया", {
    x: 7.5, y: 3.1, w: 5, h: 0.25,
    color: COLORS.amber400, fontSize: 9, bold: true,
  });
  slide.addText(
    "• डायबेटीक नेत्रतपासणी व रेटिना उपचार\n• कॉम्प्युटराइज्ड पेरीमेट्री (Humphrey Field Analyzer)\n• चष्मा नंबर घालवणे (Refractive Correction)\n• मेडिकल रेटिना व इंट्राव्हिट्रिअल थेरपी",
    {
      x: 7.5, y: 3.5, w: 5, h: 2,
      color: COLORS.slate300, fontSize: 10, lineSpacingMultiple: 1.5,
    }
  );
}

// ════════════════════════════════════════════
// SLIDE 7: WEBSITE SECTIONS OVERVIEW
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);
  addHeader(slide, 7);

  slide.addText("06. WEBSITE SECTIONS", {
    x: 0.6, y: 0.8, w: 5, h: 0.3,
    color: COLORS.teal400, fontSize: 9, bold: true,
  });
  slide.addText("वेबसाईटमधील सर्व विभाग (Complete Sections)", {
    x: 0.6, y: 1.1, w: 11, h: 0.55,
    color: COLORS.white, fontSize: 26, bold: true, fontFace: "Poppins",
  });

  const sections = [
    { name: "🏠 Home (Hero Section)", desc: "HD Logo, Rating Badge, Video Tour Button" },
    { name: "ℹ️ About Us", desc: "Hospital History, Vision & Mission Statement" },
    { name: "🩺 Services & Eye Treatments", desc: "Cataract, Retina, Perimetry, Pediatric Eye" },
    { name: "👨‍⚕️ Doctors Profiles", desc: "Dr. Smita Patare & Dr. Raosaheb Borude Cards" },
    { name: "📊 Stats Counter", desc: "30,000+ Patients, 18,000+ Surgeries Animated" },
    { name: "🏛️ Government Schemes", desc: "Cashless Insurance & Scheme Documentation" },
    { name: "🛡️ Insurance Partners", desc: "Zurich Kotak, Star Health, HDFC ERGO Logos" },
    { name: "⭐ Testimonials", desc: "4.9★ Google Patient Reviews Carousel" },
    { name: "📸 Gallery", desc: "Clinic Facility, OT & Equipment Photos" },
    { name: "❓ FAQ Section", desc: "6 Interactive Accordion Q&A Cards" },
    { name: "📅 Appointment Booking", desc: "Online OPD Form + WhatsApp Integration" },
    { name: "📞 Contact & Footer", desc: "Maps, Phone, Email & Social Links" },
  ];

  sections.forEach((s, i) => {
    const col = i < 6 ? 0 : 1;
    const row = i < 6 ? i : i - 6;
    const cx = 0.6 + col * 6.3;
    const cy = 1.9 + row * 0.85;
    addCard(slide, cx, cy, 5.9, 0.7);
    slide.addText(s.name, {
      x: cx + 0.2, y: cy + 0.05, w: 3.5, h: 0.3,
      color: COLORS.white, fontSize: 10, bold: true,
    });
    slide.addText(s.desc, {
      x: cx + 0.2, y: cy + 0.35, w: 5.2, h: 0.25,
      color: COLORS.slate400, fontSize: 8,
    });
  });
}

// ════════════════════════════════════════════
// SLIDE 8: CASHLESS INSURANCE
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);
  addHeader(slide, 8);

  slide.addText("07. CASHLESS DESK", {
    x: 0.6, y: 0.8, w: 5, h: 0.3,
    color: COLORS.teal400, fontSize: 9, bold: true,
  });
  slide.addText("100% कॅशलेस हेल्थ इन्शुरन्स सुविधा", {
    x: 0.6, y: 1.1, w: 11, h: 0.55,
    color: COLORS.white, fontSize: 28, bold: true, fontFace: "Poppins",
  });
  slide.addText("प्रमुख इन्शुरन्स कंपन्यांसोबत कॅशलेस मोतीबिंदू शस्त्रक्रिया सुविधा.", {
    x: 0.6, y: 1.7, w: 10, h: 0.3,
    color: COLORS.slate400, fontSize: 10,
  });

  const insurers = [
    "Zurich Kotak General Insurance",
    "Star Health Insurance",
    "HDFC ERGO General Insurance",
    "ICICI Lombard Health",
    "Niva Bupa Health Insurance",
    "SBI General Insurance",
  ];

  insurers.forEach((name, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = 0.6 + col * 4.1;
    const cy = 2.3 + row * 2.2;
    addCard(slide, cx, cy, 3.8, 1.8, { borderColor: COLORS.teal500 });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: cx + 1.4, y: cy + 0.25, w: 1, h: 1,
      fill: { color: COLORS.teal500 },
    });
    slide.addText("🛡️", {
      x: cx + 1.4, y: cy + 0.25, w: 1, h: 1,
      fontSize: 28, align: "center", valign: "middle",
    });
    slide.addText(name, {
      x: cx + 0.2, y: cy + 1.3, w: 3.4, h: 0.3,
      color: COLORS.white, fontSize: 10, bold: true, align: "center",
    });
  });
}

// ════════════════════════════════════════════
// SLIDE 9: GOOGLE TRUST & SEO STRATEGY
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);
  addHeader(slide, 9);

  slide.addText("08. DIGITAL STRATEGY", {
    x: 0.6, y: 0.8, w: 5, h: 0.3,
    color: COLORS.amber400, fontSize: 9, bold: true,
  });
  slide.addText("रुग्ण वाढ, Google Trust व SEO धोरण", {
    x: 0.6, y: 1.1, w: 11, h: 0.55,
    color: COLORS.white, fontSize: 28, bold: true, fontFace: "Poppins",
  });

  // Google rating card
  addCard(slide, 0.6, 2, 6, 2.5, { borderColor: COLORS.amber500 });
  slide.addText("4.9★", {
    x: 1, y: 2.2, w: 1.5, h: 1,
    color: COLORS.amber400, fontSize: 40, bold: true, fontFace: "Poppins",
  });
  slide.addText("439+ Google Reviews", {
    x: 2.7, y: 2.3, w: 3.5, h: 0.3,
    color: COLORS.white, fontSize: 14, bold: true,
  });
  slide.addText("Top Rated Eye Clinic in Savedi, Ahilyanagar", {
    x: 2.7, y: 2.65, w: 3.5, h: 0.25,
    color: COLORS.slate400, fontSize: 9,
  });
  slide.addText("\"Dr. Smita Patare & Dr. Raosaheb Borude matchless treatment.\nMy mother's phaco surgery was 100% successful!\"", {
    x: 1, y: 3.2, w: 5.2, h: 0.8,
    color: COLORS.slate300, fontSize: 9, italic: true, lineSpacingMultiple: 1.3,
  });

  // Location card
  addCard(slide, 6.9, 2, 6, 2.5, { borderColor: COLORS.teal500 });
  slide.addText("📍 Google Maps Location", {
    x: 7.2, y: 2.2, w: 5, h: 0.35,
    color: COLORS.white, fontSize: 13, bold: true,
  });
  slide.addText("Near Anita Medical, Behind Hotel Parichay,\nBalikashram Road, Savedi, Ahilyanagar - 414003\nPlus Code: 4PCG+JR8", {
    x: 7.2, y: 2.7, w: 5, h: 1,
    color: COLORS.slate300, fontSize: 10, lineSpacingMultiple: 1.4,
  });
  slide.addText("✓ Direct 1-Click Google Navigation Link Ready", {
    x: 7.2, y: 3.8, w: 5, h: 0.25,
    color: COLORS.teal400, fontSize: 9, bold: true,
  });

  // SEO Strategy cards
  const seoItems = [
    { icon: "🔍", title: "SEO ऑप्टिमायझेशन", desc: "\"Eye Specialist Savedi\", \"Phaco Cataract Ahilyanagar\" किवर्ड्सवर गुगल वर #1 रँक." },
    { icon: "💬", title: "Floating WhatsApp बटन", desc: "स्क्रीनवर फ्लोटिंग WhatsApp बटण — रुग्ण 1-क्लिक वर डॉक्टरांशी थेट चॅट करू शकतात." },
    { icon: "📞", title: "24x7 Click-to-Call", desc: "मोबाईल व डेस्कटॉपवरून थेट कॉल लागणारे Click-to-Call बटन्स." },
  ];

  seoItems.forEach((s, i) => {
    const cx = 0.6 + i * 4.1;
    addCard(slide, cx, 4.8, 3.8, 1.8);
    slide.addText(s.icon + " " + s.title, {
      x: cx + 0.2, y: 5, w: 3.4, h: 0.3,
      color: COLORS.white, fontSize: 10, bold: true,
    });
    slide.addText(s.desc, {
      x: cx + 0.2, y: 5.35, w: 3.4, h: 1,
      color: COLORS.slate300, fontSize: 9, lineSpacingMultiple: 1.3,
    });
  });
}

// ════════════════════════════════════════════
// SLIDE 10: CONCLUSION & LIVE DEMO
// ════════════════════════════════════════════
{
  const slide = pptx.addSlide();
  darkSlide(slide);

  // Top decorative band
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 0.12,
    fill: { color: COLORS.teal500 },
  });

  // Big checkmark
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 5.67, y: 0.8, w: 2, h: 2,
    fill: { color: "042F2E" },
    line: { color: COLORS.teal500, width: 3 },
    shadow: { type: "outer", blur: 12, color: COLORS.teal500, opacity: 0.4 },
  });
  slide.addText("✓", {
    x: 5.67, y: 0.8, w: 2, h: 2,
    color: COLORS.teal400, fontSize: 52, bold: true, align: "center", valign: "middle",
  });

  slide.addText("प्रस्ताव निष्कर्ष व लाईव्ह डेमो", {
    x: 1, y: 3, w: 11.33, h: 0.7,
    color: COLORS.white, fontSize: 34, bold: true, align: "center", fontFace: "Poppins",
  });
  slide.addText("वरद नेत्रालयाची ही अत्याधुनिक वेबसाईट लाइव्ह झाली असून चाचणीसाठी पूर्णपणे तयार आहे.", {
    x: 2, y: 3.7, w: 9.33, h: 0.4,
    color: COLORS.slate300, fontSize: 12, align: "center",
  });

  // Demo link card
  addCard(slide, 3.5, 4.3, 6.33, 1.6, { borderColor: COLORS.teal500 });
  slide.addText("LIVE DEMO SERVER", {
    x: 3.5, y: 4.45, w: 6.33, h: 0.25,
    color: COLORS.slate400, fontSize: 8, bold: true, align: "center",
  });
  slide.addText("http://localhost:5173/", {
    x: 3.5, y: 4.75, w: 6.33, h: 0.45,
    color: COLORS.teal400, fontSize: 22, bold: true, align: "center", fontFace: "Poppins",
  });
  slide.addText("GitHub: github.com/bhandarisaurabh500/Varad-HospitalManagment.git", {
    x: 3.5, y: 5.3, w: 6.33, h: 0.3,
    color: COLORS.slate500, fontSize: 9, align: "center",
  });

  // Thank you
  slide.addText("धन्यवाद! (Thank You!)", {
    x: 1, y: 6.1, w: 11.33, h: 0.5,
    color: COLORS.white, fontSize: 20, bold: true, align: "center", fontFace: "Poppins",
  });
  slide.addText("Q&A Session with Dr. Smita Patare & Dr. Raosaheb Borude", {
    x: 1, y: 6.55, w: 11.33, h: 0.3,
    color: COLORS.amber400, fontSize: 10, bold: true, align: "center",
  });

  // Bottom band
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.38, w: 13.33, h: 0.12,
    fill: { color: COLORS.amber500 },
  });
}

// ─── GENERATE THE FILE ───
const outputPath = "d:/Varad Hospital Management System/Varad_Netralaya_Presentation.pptx";
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`SUCCESS: PowerPoint saved to ${outputPath}`);
  })
  .catch((err) => {
    console.error("ERROR generating PPTX:", err);
  });
