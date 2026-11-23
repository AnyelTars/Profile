document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    toggle.textContent = 'Menu';
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
}

// Stylized atom symbols: decorative motion, not an atomic simulation.
const atomCanvas = document.querySelector('#atom-background');
const motionToggle = document.querySelector('.motion-toggle');
const atomContext = atomCanvas && atomCanvas.getContext('2d');
if (atomContext && motionToggle) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let frame = null;
  let previousTime = null;
  let width = 0;
  let height = 0;
  let atoms = [];
  const random = (min, max) => min + Math.random() * (max - min);

  function createAtom() {
    const angle = random(0, Math.PI * 2);
    const speed = random(8, 17);
    return {
      x: random(30, Math.max(30, width - 30)),
      y: random(30, Math.max(30, height - 30)),
      radius: random(12, 23),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      targetAngle: angle,
      speed,
      turnIn: random(2, 5),
      phase: random(0, Math.PI * 2),
      rotation: random(0, Math.PI),
      color: Math.random() > .5 ? '#66859d' : '#7b9992'
    };
  }

  function draw() {
    atomContext.clearRect(0, 0, width, height);
    for (const atom of atoms) {
      atomContext.save();
      atomContext.translate(atom.x, atom.y);
      atomContext.rotate(atom.rotation);
      atomContext.strokeStyle = atom.color;
      atomContext.fillStyle = atom.color;
      atomContext.lineWidth = .8;
      for (let ring = 0; ring < 3; ring++) {
        atomContext.save();
        atomContext.rotate(ring * Math.PI / 3);
        atomContext.beginPath();
        atomContext.ellipse(0, 0, atom.radius, atom.radius * .36, 0, 0, Math.PI * 2);
        atomContext.stroke();
        const phase = atom.phase + ring * Math.PI * 2 / 3;
        atomContext.beginPath();
        atomContext.arc(Math.cos(phase) * atom.radius, Math.sin(phase) * atom.radius * .36, 1.6, 0, Math.PI * 2);
        atomContext.fill();
        atomContext.restore();
      }
      atomContext.beginPath();
      atomContext.arc(0, 0, 2.7, 0, Math.PI * 2);
      atomContext.fill();
      atomContext.restore();
    }
  }

  function resize() {
    const oldWidth = width;
    const oldHeight = height;
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    atomCanvas.width = Math.round(width * ratio);
    atomCanvas.height = Math.round(height * ratio);
    atomContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(7, Math.min(22, Math.round(width * height / 65000)));
    atoms = atoms.slice(0, count);
    for (const atom of atoms) {
      atom.x = Math.max(atom.radius, Math.min(width - atom.radius, atom.x / (oldWidth || width) * width));
      atom.y = Math.max(atom.radius, Math.min(height - atom.radius, atom.y / (oldHeight || height) * height));
    }
    while (atoms.length < count) atoms.push(createAtom());
    draw();
  }

  function animate(timestamp) {
    const dt = previousTime === null ? 0 : Math.min((timestamp - previousTime) / 1000, .05);
    previousTime = timestamp;
    for (const atom of atoms) {
      atom.turnIn -= dt;
      if (atom.turnIn <= 0) {
        atom.targetAngle += random(-1.3, 1.3);
        atom.turnIn = random(2, 5);
      }
      const smoothing = 1 - Math.exp(-dt * .7);
      atom.vx += (Math.cos(atom.targetAngle) * atom.speed - atom.vx) * smoothing;
      atom.vy += (Math.sin(atom.targetAngle) * atom.speed - atom.vy) * smoothing;
      atom.x += atom.vx * dt;
      atom.y += atom.vy * dt;
      if (atom.x < atom.radius || atom.x > width - atom.radius) {
        atom.x = Math.max(atom.radius, Math.min(width - atom.radius, atom.x));
        atom.vx *= -1;
        atom.targetAngle = Math.atan2(atom.vy, atom.vx);
      }
      if (atom.y < atom.radius || atom.y > height - atom.radius) {
        atom.y = Math.max(atom.radius, Math.min(height - atom.radius, atom.y));
        atom.vy *= -1;
        atom.targetAngle = Math.atan2(atom.vy, atom.vx);
      }
      atom.phase += dt * .7;
      atom.rotation += dt * .035;
    }
    draw();
    frame = window.requestAnimationFrame(animate);
  }

  function updateMotion() {
    motionToggle.hidden = reducedMotion.matches;
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? 'Resume animation' : 'Pause animation';
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    previousTime = null;
    if (!paused && !reducedMotion.matches && !document.hidden) {
      frame = window.requestAnimationFrame(animate);
    }
  }
  motionToggle.addEventListener('click', () => {
    paused = !paused;
    updateMotion();
  });
  reducedMotion.addEventListener('change', () => {
    paused = reducedMotion.matches;
    updateMotion();
  });
  document.addEventListener('visibilitychange', updateMotion);
  window.addEventListener('resize', resize);
  resize();
  updateMotion();
}
