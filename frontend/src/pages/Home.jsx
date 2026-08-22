import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { doctorsData } from '../data/hospitalData';

const Home = () => {
  const { openAppointmentModal } = useTheme();
  const doctor = doctorsData.find(d => d.id === 2) || doctorsData[0]; // Dr. Borude

  return (
    <div className="premium-landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="container gridhero">
          <div>
            <span className="eyebrow"><span className="dot"></span> ADVANCED OPHTHALMIC CARE</span>
            <h1>Clear vision.<br/><span className="grad">Better life.</span></h1>
            <p>Compassionate, technology-led eye care designed around what matters most — your vision, comfort and confidence.</p>
            <div className="hero-buttons">
              <Link className="btn btn-primary" to="/appointment">Book an Appointment <span>→</span></Link>
              <a className="btn btn-ghost" href="#services">Explore Eye Care</a>
            </div>
            <div className="trust">
              <span><b className="check">✓</b> Patient-first care</span>
              <span><b className="check">✓</b> Modern technology</span>
              <span><b className="check">✓</b> Complete eye care</span>
            </div>
          </div>
          <div className="visual">
            <div className="orbit"></div>
            <div className="eye-card"><div className="eye-label">Precision Eye Care</div></div>
            <div className="floating f1"><div className="mini">✦</div><div><strong>Modern Care</strong><small>Technology guided</small></div></div>
            <div className="floating f2"><div className="mini">✓</div><div><strong>Patient First</strong><small>Personalised attention</small></div></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Our expertise</div>
              <h2>Complete eye care,<br/>under one roof.</h2>
            </div>
            <p>From routine examinations to advanced eye-care procedures, discover a thoughtful approach to every stage of your vision journey.</p>
          </div>
          <div className="services">
            <article className="service"><div className="icon">◉</div><h3>Cataract Care</h3><p>Comprehensive evaluation and modern treatment pathways.</p><Link to="/appointment">Learn more →</Link></article>
            <article className="service"><div className="icon">✧</div><h3>LASIK & Laser</h3><p>Vision-correction consultation and laser-focused eye care guidance.</p><Link to="/appointment">Learn more →</Link></article>
            <article className="service"><div className="icon">◌</div><h3>Retina Care</h3><p>Specialised assessment and ongoing care for retinal conditions.</p><Link to="/appointment">Learn more →</Link></article>
            <article className="service"><div className="icon">◎</div><h3>Glaucoma Care</h3><p>Care focused on early assessment, monitoring and long-term eye health.</p><Link to="/appointment">Learn more →</Link></article>
            <article className="service"><div className="icon">◇</div><h3>Cornea Care</h3><p>Detailed evaluation for corneal and surface-eye concerns.</p><Link to="/appointment">Learn more →</Link></article>
            <article className="service"><div className="icon">♡</div><h3>Pediatric Eye Care</h3><p>Comfortable, age-appropriate eye examinations for children.</p><Link to="/appointment">Learn more →</Link></article>
            <article className="service"><div className="icon">⌁</div><h3>Eye Check-up</h3><p>Thorough vision and eye-health assessments for everyday confidence.</p><Link to="/appointment">Learn more →</Link></article>
            <article className="service"><div className="icon">⊙</div><h3>Diabetic Eye Care</h3><p>Eye-health monitoring for patients living with diabetes.</p><Link to="/appointment">Learn more →</Link></article>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="section" id="doctor">
        <div className="container">
          <div className="doctor">
            <div className="doc-photo">
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '28px', position: 'absolute', top: 0, left: 0, zIndex: 5 }} 
              />
              <div className="doc-silhouette"></div>
            </div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div className="kicker">Your eye care specialist</div>
              <h2>Expertise with a human touch.</h2>
              <p style={{ marginTop: '18px' }}>
                Meet {doctor.name} at Varad Netralaya — where clinical attention, modern eye-care technology and a patient-first experience come together. {doctor.specialties && doctor.specialties[0]}.
              </p>
              <div className="pills">
                <span className="pill">Ophthalmic Care</span>
                <span className="pill">Patient-Centric</span>
                <span className="pill">Modern Approach</span>
              </div>
              <Link className="btn btn-primary" to="/appointment">Book Consultation →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Eye Scanner Section */}
      <section className="container" id="care">
        <div className="ai">
          <div>
            <div className="kicker">Technology experience</div>
            <h2>Meet the AI Eye Scanner.</h2>
            <p>Explore a modern screening interface for retinal and eye-image analysis. AI-assisted screening can support clinical workflows, but it should never replace an examination by a qualified ophthalmologist.</p>
            <a className="btn btn-primary" href="#scanner">Try the Scanner →</a>
          </div>
          <div className="scanner" id="scanner">
            <div className="scan-box">
              <div>
                <div className="scan-ring"></div>
                <strong>Upload an eye image</strong>
                <div style={{ fontSize: '12px', color: '#6d8583', marginTop: '4px' }}>PNG / JPG · preliminary screening</div>
              </div>
            </div>
            <Link to="/login" className="btn btn-primary justify-center" style={{ width: '100%', marginTop: '14px' }}>Analyze Scan (Login Required)</Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="kicker">Simple process</div>
              <h2>Your eye care journey.</h2>
            </div>
            <p>A calm, clear experience from your first appointment through ongoing care.</p>
          </div>
          <div className="steps">
            <div className="step"><div className="num">01</div><h3>Book</h3><p>Choose a convenient appointment.</p></div>
            <div className="step"><div className="num">02</div><h3>Examine</h3><p>Understand your vision and eye health.</p></div>
            <div className="step"><div className="num">03</div><h3>Diagnose</h3><p>Review findings with clinical guidance.</p></div>
            <div className="step"><div className="num">04</div><h3>Treat</h3><p>Follow a personalised care pathway.</p></div>
            <div className="step"><div className="num">05</div><h3>Follow up</h3><p>Stay on track with continued care.</p></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container" id="appointment">
        <div className="cta">
          <div className="kicker" style={{ color: '#70d9cb' }}>Take the next step</div>
          <h2>Your vision deserves expert care.</h2>
          <p>Book an appointment and make your eye health a priority.</p>
          <Link className="btn btn-primary" to="/appointment" style={{ background: '#fff', color: '#075d60' }}>Book Appointment →</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
