// Language toggle (EN <-> AR) + RTL direction
const langToggle = document.getElementById('langToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuToggle  = document.getElementById('menuToggle');

let currentLang = 'en';

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  applyLanguage();
  langToggle.textContent = currentLang === 'en' ? 'AR' : 'EN';
});

function applyLanguage(){
  document.querySelectorAll('[data-en]').forEach(el=>{
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  document.documentElement.setAttribute('lang', currentLang);
  document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}
applyLanguage(); // initialize

// Mobile menu open/close
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=>{
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded','false');
  });
});

// ----- Slideshow (7s per slide with active caption) -----
const slidesTrack = document.getElementById('slides');
if (slidesTrack) {
  let index = 0;
  const slides = Array.from(slidesTrack.children);
  const total  = slides.length;

  function setActive(i){
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  }

  function goTo(n) {
    index = (n + total) % total;
    slidesTrack.style.transform = `translateX(-${index * 100}%)`;
    setActive(index);
  }

  // init
  window.addEventListener('load', () => goTo(0));

  // auto-advance every 7 seconds
  setInterval(() => goTo(index + 1), 7000);
}

// ----- Update slideshow captions when language changes -----
function updateCaptions(){
  document.querySelectorAll('.caption').forEach(c=>{
    const lang = currentLang || 'en';
    const txt = c.getAttribute(`data-${lang}`);
    if (txt) c.textContent = txt;
  });
}



/*tester*/