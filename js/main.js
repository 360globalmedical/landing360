/* 360 Global Medical — Landing JS */

// Navbar scroll
const nav = document.getElementById('nav');
const topBtn = document.getElementById('top-btn');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 50);
  topBtn?.classList.toggle('show', y > 400);
  document.querySelectorAll('section[id]').forEach(s => {
    const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
    if (!link) return;
    const top = s.offsetTop - 110, bot = top + s.offsetHeight;
    link.classList.toggle('active', y >= top && y < bot);
  });
}, { passive: true });

topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile menu
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mob-menu');
const cls = document.getElementById('mob-close');
const closeMenu = () => { ham.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow = ''; };
ham?.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : ''; });
cls?.addEventListener('click', closeMenu);
mob?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Counter animation
function counter(el, target, dur = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const targets = [['c1', 25], ['c2', 50], ['c3', 9], ['c4', 100]];
      targets.forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) counter(el, val);
      });
      co.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsRow = document.querySelector('.stats-row');
if (statsRow) co.observe(statsRow);

// Ticker duplicate
const track = document.getElementById('ticker-track');
if (track) track.innerHTML += track.innerHTML;

// Form submit
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sending…'; btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; e.target.reset(); }, 3000);
  }, 1500);
});
