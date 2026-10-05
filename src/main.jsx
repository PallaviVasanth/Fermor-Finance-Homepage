import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const money = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(n));

const Icon = ({ name }) => {
  const paths = {
    arrow: 'M5 12h14M13 6l6 6-6 6', menu: 'M4 7h16M4 12h16M4 17h16', x: 'M6 6l12 12M18 6L6 18',
    trend: 'M4 16l6-6 4 4 6-8', sparkle: 'M12 3l1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3',
    chart: 'M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-3', brain: 'M9 4a3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3 3h2V4H9zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 0 6 3 3 0 0 1-3 3h-2V4h2z',
    shield: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z', zap: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z', coin: 'M12 4c4.4 0 8 2 8 4.5S16.4 13 12 13s-8-2-8-4.5S7.6 4 12 4zm-8 4.5V12c0 2.5 3.6 4.5 8 4.5s8-2 8-4.5V8.5'
  };
  return <svg className="icon-svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
};

const insightData = [
  { cat: 'Markets', meta: 'MARKETS · 6 MIN', title: 'When markets move, what actually matters to you?', desc: 'A practical way to separate signal from the daily noise.' },
  { cat: 'Personal finance', meta: 'PERSONAL FINANCE · 8 MIN', title: 'The numbers behind a healthier emergency fund.', desc: 'How to think about the right buffer for your life.' },
  { cat: 'Investing', meta: 'INVESTING · 10 MIN', title: 'Why consistency beats trying to time the market.', desc: 'A calmer framework for long-term investing.' }
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1100 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let frame; const start = performance.now(); const from = 0;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1); const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased)); if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [value, duration]);
  return <span ref={ref}>{prefix}{display.toLocaleString('en-IN')}{suffix}</span>;
}

function App() {
  const [menu, setMenu] = useState(false); const [amount, setAmount] = useState(10000); const [years, setYears] = useState(10); const [active, setActive] = useState('All');
  const monthlyRate = 0.11 / 12; const months = years * 12;
  const projected = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const filtered = useMemo(() => active === 'All' ? insightData : insightData.filter((a) => a.cat === active), [active]);
  useReveal();

  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menu]);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false); };

  return <div className="app" id="top">
    <header className="nav"><div className="container nav-inner">
      <button className="brand" onClick={() => go('top')} aria-label="Fermor home"><span className="brand-mark"><i></i><i></i><i></i></span><span>fermor</span></button>
      <nav className="desktop-nav" aria-label="Primary navigation"><button onClick={() => go('product')}>Product</button><button onClick={() => go('approach')}>How it works</button><button onClick={() => go('insights')}>Insights</button></nav>
      <div className="nav-actions"><button className="nav-cta" onClick={() => go('start')}>Get started <Icon name="arrow" /></button><button className="menu-btn" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>{menu ? <Icon name="x" /> : <Icon name="menu" />}</button></div>
    </div></header>
    {menu && <div className="mobile-menu"><button onClick={() => go('product')}>Product</button><button onClick={() => go('approach')}>How it works</button><button onClick={() => go('insights')}>Insights</button><button onClick={() => go('start')}>Get started <Icon name="arrow" /></button></div>}

    <main>
      <section className="hero"><div className="hero-noise"></div><div className="container hero-grid">
        <div className="hero-copy" data-reveal><div className="eyebrow"><span className="pulse"></span> Your money, with momentum</div><h1>Make your money <em>make sense.</em></h1><p>Fermor brings your spending, saving and investing into one clear picture — so you can understand where you stand and know what to do next.</p><div className="hero-actions"><button className="primary magnetic" onClick={() => go('start')}>See how it works <Icon name="arrow" /></button><button className="text-btn" onClick={() => go('product')}>Explore Fermor <span>↓</span></button></div><div className="hero-proof"><div className="avatars"><span>AV</span><span>RK</span><span>SM</span><span>+</span></div><span><strong>Built for everyday decisions.</strong><br />Simple enough to use in minutes.</span></div></div>
        <div className="hero-visual" data-reveal><div className="orbit o1"></div><div className="orbit o2"></div><div className="orbit-dot dot-a"></div><div className="orbit-dot dot-b"></div>
          <div className="dashboard-card tilt-card"><div className="dash-top"><div><span className="muted">Total wealth</span><strong>₹53,00,000</strong></div><span className="gain">+18.4% <Icon name="trend" /></span></div><div className="chart"><div className="chart-labels"><span>₹60L</span><span>₹40L</span><span>₹20L</span></div><svg viewBox="0 0 500 180" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b8e96b" stopOpacity=".30" /><stop offset="1" stopColor="#b8e96b" stopOpacity="0" /></linearGradient></defs><path className="chart-fill" d="M0 160 C35 150 45 135 75 142 S120 122 150 128 S195 96 220 105 S265 80 290 91 S330 60 355 68 S405 38 430 48 S470 20 500 28 V180 H0Z" fill="url(#fill)" /><path className="chart-line" d="M0 160 C35 150 45 135 75 142 S120 122 150 128 S195 96 220 105 S265 80 290 91 S330 60 355 68 S405 38 430 48 S470 20 500 28" fill="none" stroke="#b8e96b" strokeWidth="3" /></svg></div><div className="chart-foot"><span>Today</span><span>2Y</span><span>5Y</span><span className="selected">10Y</span></div><div className="mini-grid"><div><span>Investments</span><b>₹31.2L</b><small>+12.8%</small></div><div><span>Cash & savings</span><b>₹12.4L</b><small>+4.2%</small></div><div><span>Goals</span><b>3 active</b><small>On track</small></div></div></div>
          <div className="floating-note"><span className="note-icon"><Icon name="sparkle" /></span><div><small>Fermor insight</small><strong>Your savings rate is up 6%</strong></div></div>
          <div className="floating-stat"><small>MONTHLY MOMENTUM</small><strong>+₹8,420</strong><span>saved this month</span></div>
        </div>
      </div></section>

      <section className="ticker"><div className="ticker-track"><span>FINANCIAL CLARITY</span><i>•</i><span>SMARTER DECISIONS</span><i>•</i><span>LONG-TERM MOMENTUM</span><i>•</i><span>FINANCIAL CLARITY</span><i>•</i><span>SMARTER DECISIONS</span><i>•</i><span>LONG-TERM MOMENTUM</span></div></section>

      <section className="section product" id="product"><div className="container"><div className="section-head" data-reveal><div><span className="kicker">ONE CLEAR PICTURE</span><h2>Know where your money is.<br /><em>Know where it's going.</em></h2></div><p>Finance gets complicated when every decision lives in a different place. Fermor connects the dots and turns numbers into something you can actually act on.</p></div>
        <div className="feature-grid"><article className="feature large lift" data-reveal><div className="feature-copy"><span className="icon"><Icon name="chart" /></span><span className="feature-number">01</span><h3>See the whole picture.</h3><p>Bring savings, investments and spending together. One view, less guesswork.</p></div><div className="spending-card"><div className="sc-head"><span>This month</span><span>•••</span></div><strong>₹48,320</strong><small>12% less than last month</small><div className="bar-row"><i style={{ width: '72%' }}></i><span>Food <b>₹12,480</b></span></div><div className="bar-row"><i style={{ width: '58%' }}></i><span>Shopping <b>₹8,320</b></span></div><div className="bar-row"><i style={{ width: '43%' }}></i><span>Transport <b>₹6,900</b></span></div></div></article>
          <article className="feature lift" data-reveal><span className="icon"><Icon name="brain" /></span><span className="feature-number">02</span><h3>Turn numbers into insight.</h3><p>Get context around the changes that matter — not another wall of charts.</p><div className="insight-pill"><span>✦</span><div><small>Worth noticing</small><b>Dining is 14% higher this month.</b></div></div></article>
          <article className="feature dark lift" data-reveal><span className="icon"><Icon name="trend" /></span><span className="feature-number">03</span><h3>Plan for what’s next.</h3><p>Model possibilities before you make a move. See how today's choices shape tomorrow.</p><div className="goal-card"><div><small>10-year projection</small><b>₹1,64,60,996</b></div><span>+211%</span></div></article>
        </div>
      </div></section>

      <section className="section approach" id="approach"><div className="container"><div className="center-head" data-reveal><span className="kicker">A BETTER WAY TO THINK ABOUT MONEY</span><h2>Understand. <em>Act.</em> Grow.</h2><p>Fermor is designed around the decisions you actually make — not the financial jargon around them.</p></div><div className="steps"><div className="step" data-reveal><span>01</span><div className="step-line"></div><h3>Understand</h3><p>Get a simple, accurate view of your financial position and the forces behind it.</p></div><div className="step" data-reveal><span>02</span><div className="step-line"></div><h3>Act</h3><p>Compare options, test scenarios and take the next step with more confidence.</p></div><div className="step" data-reveal><span>03</span><div className="step-line"></div><h3>Grow</h3><p>Keep learning, investing and adjusting as your goals and life change.</p></div></div></div></section>

      <section className="section planner"><div className="container planner-grid"><div data-reveal><span className="kicker">PLAY WITH THE NUMBERS</span><h2>See what your money<br /><em>could become.</em></h2><p>Try a simple projection. Change the amount or timeline and see the difference compounding can make.</p><div className="sliders"><label>Monthly investment <strong>{money(amount)}</strong><input aria-label="Monthly investment" type="range" min="1000" max="50000" step="500" value={amount} onChange={(e) => setAmount(+e.target.value)} /></label><label>Time horizon <strong>{years} years</strong><input aria-label="Time horizon" type="range" min="1" max="25" value={years} onChange={(e) => setYears(+e.target.value)} /></label></div></div><div className="projection" data-reveal><div className="projection-glow"></div><div className="projection-top"><span>Potential value</span><span className="tiny">Illustrative at 11% p.a.</span></div><strong>{money(projected)}</strong><div className="projection-bar"><i style={{ width: `${Math.min(92, 25 + years * 2.6)}%` }}></i></div><div className="projection-meta"><span>Invested<br /><b>{money(amount * 12 * years)}</b></span><span>Growth<br /><b>{money(Math.max(0, projected - amount * 12 * years))}</b></span><span>Horizon<br /><b>{years} yrs</b></span></div><p>Small, consistent decisions can compound into meaningful progress.</p></div></div></section>

      <section className="section insights" id="insights"><div className="container"><div className="section-head compact" data-reveal><div><span className="kicker">FROM THE FERMOR DESK</span><h2>Money context,<br /><em>without the noise.</em></h2></div><button className="outline" onClick={() => setActive(active === 'All' ? 'Markets' : 'All')}>{active === 'All' ? 'View a category' : 'Show all'} <Icon name="arrow" /></button></div><div className="filter" role="tablist" aria-label="Insight categories"><button className={active === 'All' ? 'on' : ''} onClick={() => setActive('All')} role="tab" aria-selected={active === 'All'}>All</button><button className={active === 'Markets' ? 'on' : ''} onClick={() => setActive('Markets')} role="tab" aria-selected={active === 'Markets'}>Markets</button><button className={active === 'Personal finance' ? 'on' : ''} onClick={() => setActive('Personal finance')} role="tab" aria-selected={active === 'Personal finance'}>Personal finance</button><button className={active === 'Investing' ? 'on' : ''} onClick={() => setActive('Investing')} role="tab" aria-selected={active === 'Investing'}>Investing</button></div><div className="article-grid">{filtered.map((a) => <article className="article-card lift" key={a.cat} data-reveal><span>{a.meta}</span><h3>{a.title}</h3><p>{a.desc}</p><a href="#start">Read insight <Icon name="arrow" /></a></article>)}</div></div></section>

      <section className="section trust"><div className="container trust-box" data-reveal><div><span className="kicker">BUILT WITH INTENTION</span><h2>Your finances are personal.<br /><em>They should feel that way.</em></h2><p>Clear methodology. Transparent assumptions. No pressure to buy a financial product just because you're trying to understand one.</p></div><div className="trust-items"><div><Icon name="shield" /><div><b>Privacy first</b><span>Your financial numbers stay yours.</span></div></div><div><Icon name="zap" /><div><b>Fast by design</b><span>Useful answers without the clutter.</span></div></div><div><Icon name="coin" /><div><b>Made for India</b><span>Built around the decisions you face here.</span></div></div></div></div></section>

      <section className="cta" id="start"><div className="container cta-inner" data-reveal><div className="cta-orb"></div><div className="cta-orb cta-orb-2"></div><span className="kicker">START WITH ONE DECISION</span><h2>Better money decisions<br /><em>start with clarity.</em></h2><p>Explore Fermor and put your numbers to work.</p><button className="primary light magnetic" onClick={() => go('top')}>Explore Fermor <Icon name="arrow" /></button></div></section>
    </main>

    <footer id="footer"><div className="container footer-top"><div><button className="brand footer-brand" onClick={() => go('top')}><span className="brand-mark"><i></i><i></i><i></i></span><span>fermor</span></button><p>Understand your money.<br />Act with confidence. Grow with purpose.</p></div><div className="footer-links"><div><b>Explore</b><button onClick={() => go('product')}>Product</button><button onClick={() => go('insights')}>Insights</button><button onClick={() => go('approach')}>How it works</button></div><div><b>Company</b><a href="https://fermor.in/about" target="_blank" rel="noreferrer">About</a><a href="https://fermor.in/contact" target="_blank" rel="noreferrer">Contact</a><a href="https://fermor.in/privacy" target="_blank" rel="noreferrer">Privacy</a></div></div></div><div className="container footer-bottom"><span>© 2026 Fermor. Built for better financial decisions.</span><span>Made in Bengaluru, India.</span></div></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
