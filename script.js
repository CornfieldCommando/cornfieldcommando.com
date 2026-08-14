const header=document.querySelector('.site-header');const menuButton=document.querySelector('.menu-toggle');const navLinks=document.querySelector('.nav-links');if(header){window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>24));}if(menuButton&&navLinks){menuButton.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();


/* Netlify partnership form submission */
const partnershipForm = document.getElementById("partnership-inquiry-form");
if (partnershipForm) {
  partnershipForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = partnershipForm.querySelector('button[type="submit"]');
    const status = document.getElementById("form-status");
    const formData = new FormData(partnershipForm);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    if (status) status.textContent = "";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      window.location.assign("/thank-you/");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      if (status) {
        status.textContent = "The form could not be sent. Please email CornfieldCommando@gmail.com directly.";
      }
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send inquiry";
      }
    }
  });
}
