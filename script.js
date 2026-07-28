
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();


const businessEmailForm = document.getElementById('business-email-form');
if (businessEmailForm) {
  businessEmailForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim() || 'Business Inquiry';
    const message = document.getElementById('contact-message').value.trim();

    const bodyParts = [];
    if (name) bodyParts.push(`Name: ${name}`);
    if (email) bodyParts.push(`Reply email: ${email}`);
    if (name || email) bodyParts.push('');
    bodyParts.push(message || 'I would like to discuss a potential partnership.');

    const mailto = `mailto:CornfieldCommando@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyParts.join('\\n'))}`;
    window.location.href = mailto;
  });
}
