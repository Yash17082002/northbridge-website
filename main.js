/**
 * NORTHBRIDGE — MAIN APPLICATION
 *
 * Handles:
 *   1. Animated network background (canvas particle system)
 *   2. Navigation state (scroll, mobile toggle)
 *   3. The intelligent matching demo
 *   4. Modal flows (three ways in, apply, contact)
 *   5. Section reveal animations on scroll
 */

// ==================== NETWORK BACKGROUND ====================
/**
 * A premium research-network particle animation.
 * Nodes drift slowly; lines connect nearby nodes; the cursor gently attracts them.
 * Kept lightweight so it never impacts scroll performance.
 */
class NetworkCanvas {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.options = Object.assign({
      density: 0.00028,     // nodes per pixel — will be adjusted for viewport
      maxNodes: 180,
      connectionDistance: 200,
      nodeSpeed: 0.25,
      nodeColor: '#D6B56A',
      lineColor: '#D6B56A',
      pulseNodes: true,
      centralNode: false
    }, options);

    this.nodes = [];
    this.mouse = { x: -1000, y: -1000, active: false };
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.rafId = null;
    this.lastFrame = 0;
    this.frameInterval = 1000 / 30; // cap at 30fps for battery

    this.init();
  }

  init() {
    this.resize();
    this.spawnNodes();
    this.attachListeners();
    this.animate();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(this.dpr, this.dpr);
  }

  spawnNodes() {
    this.nodes = [];
    const target = Math.min(this.options.maxNodes, Math.floor(this.width * this.height * this.options.density));
    for (let i = 0; i < target; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.options.nodeSpeed,
        vy: (Math.random() - 0.5) * this.options.nodeSpeed,
        r: Math.random() * 2.5 + 1.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        alpha: 0.7 + Math.random() * 0.3
      });
    }

    // Add central "Northbridge" node if requested
    if (this.options.centralNode) {
      this.nodes.push({
        x: this.width / 2,
        y: this.height / 2,
        vx: 0, vy: 0,
        r: 4,
        pulse: 0,
        pulseSpeed: 0.02,
        alpha: 0.9,
        isCentral: true
      });
    }
  }

  attachListeners() {
    const resizeHandler = () => {
      clearTimeout(this._resizeT);
      this._resizeT = setTimeout(() => {
        this.resize();
        this.spawnNodes();
      }, 200);
    };
    window.addEventListener('resize', resizeHandler);

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.active = true;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.active = false;
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(this.rafId);
      } else {
        this.animate();
      }
    });
  }

  updateNode(node) {
    if (node.isCentral) {
      node.pulse += node.pulseSpeed;
      return;
    }
    node.x += node.vx;
    node.y += node.vy;

    // Gentle mouse attraction
    if (this.mouse.active) {
      const dx = this.mouse.x - node.x;
      const dy = this.mouse.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        const force = (200 - dist) / 200 * 0.03;
        node.x += dx / dist * force;
        node.y += dy / dist * force;
      }
    }

    // Wrap
    if (node.x < -20) node.x = this.width + 20;
    if (node.x > this.width + 20) node.x = -20;
    if (node.y < -20) node.y = this.height + 20;
    if (node.y > this.height + 20) node.y = -20;

    node.pulse += node.pulseSpeed;
  }

  drawNode(node) {
    const pulseScale = 1 + Math.sin(node.pulse) * 0.3;
    const r = node.r * pulseScale;

    if (node.isCentral) {
      // Central node — larger, more prominent
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
      const grad = this.ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 5);
      grad.addColorStop(0, `${this.options.nodeColor}80`);
      grad.addColorStop(1, `${this.options.nodeColor}00`);
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = this.options.nodeColor;
      this.ctx.fill();
      return;
    }

    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    this.ctx.fillStyle = this.hexA(this.options.nodeColor, node.alpha);
    this.ctx.fill();
  }

  drawConnections() {
    const dMax = this.options.connectionDistance;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < dMax) {
          const alpha = (1 - d / dMax) * 0.9;
          this.ctx.strokeStyle = this.hexA(this.options.lineColor, alpha);
          this.ctx.lineWidth = 1.0;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    }

    // Mouse-cursor connections (more prominent)
    if (this.mouse.active) {
      for (const node of this.nodes) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          const alpha = (1 - d / 180) * 0.5;
          this.ctx.strokeStyle = this.hexA(this.options.lineColor, alpha);
          this.ctx.lineWidth = 0.6;
          this.ctx.beginPath();
          this.ctx.moveTo(this.mouse.x, this.mouse.y);
          this.ctx.lineTo(node.x, node.y);
          this.ctx.stroke();
        }
      }
    }
  }

  hexA(hex, alpha) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  animate(ts) {
    this.rafId = requestAnimationFrame((t) => this.animate(t));

    if (ts - this.lastFrame < this.frameInterval) return;
    this.lastFrame = ts;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const node of this.nodes) this.updateNode(node);
    this.drawConnections();
    for (const node of this.nodes) this.drawNode(node);
  }
}

// ==================== NAVIGATION ====================
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.toggle = document.querySelector('.nav-toggle');
    this.menu = document.querySelector('.nav-menu');
    this.init();
  }

  init() {
    if (!this.nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    }, { passive: true });

    if (this.toggle) {
      this.toggle.addEventListener('click', () => {
        this.menu.classList.toggle('open');
      });
    }

    // Close mobile menu when a link clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        this.menu.classList.remove('open');
      });
    });
  }
}

// ==================== MATCHING DEMO INTERFACE ====================
class MatchingDemo {
  constructor() {
    this.textarea = document.getElementById('match-textarea');
    this.submitBtn = document.getElementById('match-submit');
    this.resultsContainer = document.getElementById('match-results');
    this.breakdownContainer = document.getElementById('match-breakdown');
    this.chips = document.querySelectorAll('.match-chip');
    this.domainChips = document.querySelectorAll('.domain-chip');
    this.selectedDomains = new Set();

    this.exampleProblems = {
      thermal: "We need to improve the thermal management of a lithium-ion battery pack for an electric two-wheeler. The current design is running hot during fast charging, which is reducing cycle life and creating safety concerns. We are looking at both material solutions and mechanical redesign.",
      manufacturing: "Our precision component manufacturing line has recurring welding defects on stainless steel joints. We want to redesign the process using either friction stir welding or improved automation to reduce rejection rates.",
      ai: "We are building an OCR system for handwritten Indian regional-language forms. Existing models perform poorly on Devanagari and Tamil handwriting. We need help on the deep learning architecture and training data strategy.",
      materials: "We are developing a next-generation cathode material for sodium-ion batteries and need help with electrochemistry characterisation and cycle life testing.",
      infra: "We are designing a seismic retrofit for a heritage steel bridge in a high seismicity zone. Need structural analysis and connection design guidance.",
      marketing: "We are entering the tier-2 Indian market with a premium consumer durable and need help understanding brand positioning and consumer psychology in these markets."
    };

    this.init();
  }

  init() {
    if (!this.textarea) return;

    this.submitBtn.addEventListener('click', () => this.runMatch());

    this.textarea.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') this.runMatch();
    });

    this.chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.example;
        if (this.exampleProblems[key]) {
          this.textarea.value = this.exampleProblems[key];
          this.textarea.focus();
        }
      });
    });

    this.domainChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const d = chip.dataset.domain;
        if (this.selectedDomains.has(d)) {
          this.selectedDomains.delete(d);
          chip.classList.remove('active');
        } else {
          this.selectedDomains.add(d);
          chip.classList.add('active');
        }
      });
    });
  }

  runMatch() {
    const problem = this.textarea.value.trim();
    if (problem.length < 20) {
      this.showValidation("Please describe your problem in a bit more detail — a sentence or two works best.");
      return;
    }

    // Show loading state briefly for perceived intelligence
    this.submitBtn.textContent = 'Analysing...';
    this.submitBtn.disabled = true;

    setTimeout(() => {
      const result = findMatches(problem, Array.from(this.selectedDomains), 5);
      this.renderBreakdown(result.domainWeights);
      this.renderMatches(result.matches);
      this.submitBtn.textContent = 'Analyse Problem';
      this.submitBtn.disabled = false;

      // Smooth scroll to breakdown
      setTimeout(() => {
        this.breakdownContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }, 600);
  }

  showValidation(msg) {
    this.resultsContainer.innerHTML = `
      <div class="match-placeholder">${msg}</div>
    `;
    this.breakdownContainer.innerHTML = '';
  }

  renderBreakdown(domainWeights) {
    const entries = Object.entries(domainWeights).sort((a, b) => b[1] - a[1]);

    let html = `
      <div class="problem-breakdown">
        <div class="breakdown-title">Northbridge Problem Analysis</div>
        <div class="breakdown-sub">Your problem appears to involve ${entries.length} research ${entries.length === 1 ? 'domain' : 'domains'}.</div>
    `;

    for (const [domain, weight] of entries) {
      const pct = Math.round(weight * 100);
      const meta = DOMAIN_METADATA[domain] || { label: domain, color: '#D6B56A' };
      html += `
        <div class="domain-bar">
          <div class="domain-bar-header">
            <span class="domain-bar-name">${meta.label}</span>
            <span class="domain-bar-pct">${pct}%</span>
          </div>
          <div class="domain-bar-track">
            <div class="domain-bar-fill" style="transform: scaleX(${weight})"></div>
          </div>
        </div>
      `;
    }
    html += `</div>`;
    this.breakdownContainer.innerHTML = html;
  }

  renderMatches(matches) {
    if (matches.length === 0) {
      this.resultsContainer.innerHTML = `
        <div class="match-placeholder">
          No strong matches found in the demo dataset for that specific problem.<br>
          In production, Northbridge searches thousands of profiles across all IITs, NITs, IIMs, IIITs, IISc and partner institutions — and, if needed, reaches out directly to identify capability.
        </div>
      `;
      return;
    }

    let html = '';
    for (const match of matches) {
      const { professor: p, total, components, matchedTerms } = match;
      const avatar = generateAvatar(p);
      const reasons = explainMatch(match);

      html += `
        <article class="match-card" style="--avatar-color: ${avatar.color}">
          <div class="match-avatar">
            <span>${avatar.initials}</span>
          </div>
          <div class="match-info">
            <div class="match-name-row">
              <h4 class="match-name">${p.name}</h4>
              <span class="match-status-badge">Recommended</span>
            </div>
            <div class="match-institution">${p.institution}</div>
            <div class="match-department">${p.department} · ${p.designation}</div>
            <div class="match-tags">
              ${p.subDomains.slice(0, 5).map(sd => `<span class="match-tag">${sd}</span>`).join('')}
            </div>
            <div class="match-reasons">
              <span class="match-reasons-label">Why this match</span>
              ${reasons.map(r => `<div class="match-reason-item">${this.escapeHtml(r)}</div>`).join('')}
            </div>
            <div class="match-actions">
              <a href="${p.profileUrl}" target="_blank" rel="noopener noreferrer" class="match-link">Verify on institutional page →</a>
              <span class="match-quiet-note">Availability requires confirmation</span>
            </div>
          </div>
          <div class="match-score-panel">
            <div class="match-score-value">${total}<span style="font-size: 1.75rem; color: var(--text-muted);">%</span></div>
            <div class="match-score-label">Match Score</div>
            <div class="match-score-breakdown">
              ${this.renderScoreComponent('Research', components.research)}
              ${this.renderScoreComponent('Keyword', components.keyword)}
              ${this.renderScoreComponent('Method', components.method)}
              ${this.renderScoreComponent('Industry', components.industry)}
              ${this.renderScoreComponent('Publication', components.publication)}
            </div>
          </div>
        </article>
      `;
    }
    this.resultsContainer.innerHTML = html;
  }

  renderScoreComponent(name, value) {
    return `
      <div>
        <div class="score-component">
          <span class="score-component-name">${name}</span>
          <span class="score-component-value">${value}</span>
        </div>
        <div class="score-mini-bar">
          <div class="score-mini-bar-fill" style="transform: scaleX(${value / 100})"></div>
        </div>
      </div>
    `;
  }

  escapeHtml(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return str.replace(/[&<>"']/g, m => map[m]);
  }
}

// ==================== MODAL SYSTEM ====================
class ModalController {
  constructor() {
    this.modal = document.getElementById('modal');
    this.modalContent = document.getElementById('modal-content');
    this.init();
  }

  init() {
    if (!this.modal) return;

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });

    // Attach openers
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(trigger.dataset.modal);
      });
    });
  }

  open(type) {
    this.modalContent.innerHTML = this.getContent(type);
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Attach form handler
    const form = this.modalContent.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(form, type);
      });
    }
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  getContent(type) {
    const backBtn = `<button class="modal-close" onclick="modalCtrl.close()" aria-label="Close">✕</button>`;

    switch (type) {
      case 'open-challenge':
        return `
          ${backBtn}
          <div class="label" style="margin-bottom: 12px;">Option 01 · Open Challenge</div>
          <h3>Publish an open challenge</h3>
          <p>Post your challenge and let verified professors from across our network respond. Best for well-defined, non-confidential problems.</p>
          <form>
            <div class="form-group">
              <label>Company name</label>
              <input type="text" required placeholder="Your organisation">
            </div>
            <div class="form-group">
              <label>Project title</label>
              <input type="text" required placeholder="A short, clear title">
            </div>
            <div class="form-group">
              <label>Describe the problem</label>
              <textarea required placeholder="What is the technical or business problem you need help with?"></textarea>
            </div>
            <div class="form-group">
              <label>Expected timeline</label>
              <select>
                <option>Under 3 months</option>
                <option>3 to 6 months</option>
                <option>6 to 12 months</option>
                <option>Over 12 months</option>
              </select>
            </div>
            <div class="form-group">
              <label>Contact email</label>
              <input type="email" required placeholder="you@company.com">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Publish Challenge</button>
          </form>
        `;

      case 'guided-search':
        return `
          ${backBtn}
          <div class="label" style="margin-bottom: 12px;">Option 02 · Guided Search</div>
          <h3>Get a guided expert search</h3>
          <p>Our relationship manager works with you to break your problem down and identify the best-fit professors — with intelligent ranking on our verified directory.</p>
          <form>
            <div class="form-group">
              <label>Company name</label>
              <input type="text" required placeholder="Your organisation">
            </div>
            <div class="form-group">
              <label>What are you trying to solve?</label>
              <textarea required placeholder="A short description of your challenge. The clearer this is, the better our matches."></textarea>
            </div>
            <div class="form-group">
              <label>Primary areas involved</label>
              <input type="text" placeholder="e.g. mechanical, materials, control systems">
            </div>
            <div class="form-group">
              <label>Contact email</label>
              <input type="email" required placeholder="you@company.com">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Request Guided Search</button>
          </form>
        `;

      case 'encrypted-match':
        return `
          ${backBtn}
          <div class="label" style="margin-bottom: 12px;">Option 03 · Encrypted Matching</div>
          <h3>Request a private match</h3>
          <p>For competitive or IP-sensitive work. Your problem never becomes public. NDA signed before any detail moves. A relationship manager is assigned to you personally.</p>
          <form>
            <div class="form-group">
              <label>Company name</label>
              <input type="text" required placeholder="Your organisation">
            </div>
            <div class="form-group">
              <label>Broad domain (no confidential detail needed)</label>
              <input type="text" placeholder="e.g. battery, semiconductor, pharmaceutical">
            </div>
            <div class="form-group">
              <label>Preferred contact channel</label>
              <select>
                <option>Email (encrypted)</option>
                <option>Direct call</option>
                <option>Signed NDA before first conversation</option>
              </select>
            </div>
            <div class="form-group">
              <label>Contact name & role</label>
              <input type="text" required placeholder="Full name, designation">
            </div>
            <div class="form-group">
              <label>Contact email</label>
              <input type="email" required placeholder="you@company.com">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Request Private Match</button>
          </form>
        `;

      case 'professor-apply':
        return `
          ${backBtn}
          <div class="label" style="margin-bottom: 12px;">Join the Expert Network</div>
          <h3>Apply as a research partner</h3>
          <p>Northbridge handles project discovery, contracting, coordination and payment follow-up so you can focus on the research.</p>
          <form>
            <div class="form-group">
              <label>Full name</label>
              <input type="text" required placeholder="Prof. ...">
            </div>
            <div class="form-group">
              <label>Institution</label>
              <input type="text" required placeholder="e.g. IIT Bombay">
            </div>
            <div class="form-group">
              <label>Department & designation</label>
              <input type="text" required placeholder="e.g. Mechanical Engineering, Associate Professor">
            </div>
            <div class="form-group">
              <label>Primary research areas</label>
              <textarea required placeholder="Your 2-4 core research areas."></textarea>
            </div>
            <div class="form-group">
              <label>Institutional email</label>
              <input type="email" required placeholder="you@institution.ac.in">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Submit Application</button>
          </form>
        `;

      case 'contact':
      default:
        return `
          ${backBtn}
          <div class="label" style="margin-bottom: 12px;">Contact Northbridge</div>
          <h3>Bring us the problem</h3>
          <p>Tell us about what you are trying to solve. We reply within one working day.</p>
          <form>
            <div class="form-group">
              <label>Your name</label>
              <input type="text" required placeholder="Full name">
            </div>
            <div class="form-group">
              <label>Organisation</label>
              <input type="text" required placeholder="Company or institution">
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea required placeholder="What can we help with?"></textarea>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" required placeholder="you@example.com">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Send Message</button>
          </form>
        `;
    }
  }

  handleSubmit(form, type) {
    // In a real deployment this would POST to a backend API.
    // For the prototype we show a confirmation message.
    const messages = {
      'open-challenge': "Challenge received. A relationship manager will confirm receipt within one working day and share next steps.",
      'guided-search': "Guided search request received. We will schedule an intake call within one working day.",
      'encrypted-match': "Private match request received. An NDA and initial questions will be sent within one working day, before any project detail is discussed.",
      'professor-apply': "Application received. Our team will verify your details and set up your research profile.",
      'contact': "Message received. We will reply within one working day."
    };

    form.style.display = 'none';
    const success = document.createElement('div');
    success.className = 'form-success';
    success.textContent = messages[type] || messages.contact;
    form.parentElement.appendChild(success);
  }
}

// ==================== SCROLL REVEAL ====================
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('[data-reveal]');
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      this.elements.forEach(el => el.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    this.elements.forEach(el => observer.observe(el));
  }
}

// ==================== SMOOTH ANCHOR SCROLLING ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ==================== INIT ====================
let modalCtrl;

document.addEventListener('DOMContentLoaded', () => {
  // Ensure database is loaded
  if (typeof PROFESSOR_DATABASE === 'undefined') {
    console.error('Professor database not loaded');
    return;
  }

  new Navigation();
  new MatchingDemo();
  new ScrollReveal();
  modalCtrl = new ModalController();
  initSmoothScroll();

  // Canvas backgrounds
  new NetworkCanvas('hero-canvas', {
    density: 0.00012,
    maxNodes: 100,
    connectionDistance: 170,
    nodeSpeed: 0.15
  });

  new NetworkCanvas('vision-canvas', {
    density: 0.00006,
    maxNodes: 60,
    connectionDistance: 200,
    nodeSpeed: 0.08
  });

  new NetworkCanvas('final-cta-canvas', {
    density: 0.00008,
    maxNodes: 75,
    connectionDistance: 180,
    nodeSpeed: 0.12
  });
});
