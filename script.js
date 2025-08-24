// ====== Intro Reveal Utilities ======
function revealToSpan() {
  document.querySelectorAll('.reveal').forEach(function (elem) {
    const parent = document.createElement('span');
    const child = document.createElement('span');
    parent.classList.add('parent');
    child.classList.add('child');
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);
    elem.innerHTML = '';
    elem.appendChild(parent);
  });
}

// Stroke-draw animation for SVG signature
function animateSvg() {
  document.querySelectorAll('#Visual>g').forEach(function (e) {
    const character = e.childNodes[0].childNodes[0];
    if (!character || !character.getTotalLength) return;
    character.style.strokeDasharray = character.getTotalLength() + 'px';
    character.style.strokeDashoffset = character.getTotalLength() + 'px';
  });

  gsap.to('#Visual>g>g>path ,#Visual>g>g>polyline', {
    strokeDashoffset: 0,
    duration: 3,
    ease: 'expo.inOut',
    delay: 1.6,
    repeat: 2
  });
}

revealToSpan();
animateSvg();

// Master timeline for loader -> home
let tl = gsap.timeline();
tl.from('.child span', {
  x: '100%',
  delay: 0,
  stagger: 0.2,
  duration: 1.4,
  ease: 'back.inOut'
})
.to('.parent .child', {
  y: '-100%',
  duration: 0.8,
  delay: -0.8,
  ease: 'expo.inOut'
})
.to('#loader', {
  height: 0,
  duration: 0.9,
  delay: -0.6,
  ease: 'expo.inOut'
})
.to('#green', {
  height: '100%',
  delay: -1.5,
  duration: 0.8,
  ease: 'expo.inOut'
})
.to('#green', {
  height: '0',
  top: 0,
  duration: 1.2,
  delay: -0.6,
  ease: 'expo.inOut'
})
.to('#home', {
  opacity: 1,
  pointerEvents: 'all',
  duration: 1,
  delay: -0.65,
  ease: 'power2.out',
  onComplete: () => {
    // Show sections after home is loaded
    document.querySelectorAll('.section').forEach((sec) => {
      sec.style.display = 'block';
      sec.style.visibility = 'visible'
    });

    ScrollTrigger.refresh();
  }
});

// Animate each section on scroll
gsap.utils.toArray('.section').forEach((section, i) => {
  gsap.to(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play reverse play reverse'
    },
    opacity: 1,
    visibility: 'visible',
    y: 0,
    duration: 1,
    ease: 'power2.out',
    delay: i* 0.4
  });
});

// Animate project cards individually
gsap.utils.toArray('.card').forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play reverse play reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
});

// Hover animation for cards
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.05,
      y: -12,
      boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
      duration: 0.25,
      ease: 'power3.out'
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      y: 0,
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      duration: 0.25,
      ease: 'power3.out'
    });
  });
});

// ====== Typewriter (uses the text inside #typewriter) ======
const typewriter = document.getElementById('typewriter');
if (typewriter) {
  const text = typewriter.textContent;
  typewriter.textContent = '';
  let index = 0;
  let forward = true;
  let lastTime = 0;

  function type(timestamp) {
    if (timestamp - lastTime > 35) { // control typing speed
      typewriter.textContent = text.slice(0, index);
      if (forward) {
        index++;
        if (index > text.length) {
          forward = false;
          lastTime = timestamp;
          setTimeout(() => requestAnimationFrame(type), 1500);
          return;
        }
      } else {
        index--;
        if (index < 0) {
          forward = true;
          lastTime = timestamp;
          setTimeout(() => requestAnimationFrame(type), 300);
          return;
        }
      }
      lastTime = timestamp;
    }
    requestAnimationFrame(type);
  }

  requestAnimationFrame(type);
}


// ====== Project Filters ======
const filters = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const tag = btn.dataset.filter;
    projects.forEach((p) => {
      const shouldShow = tag === 'all' || (p.dataset.tags || '').includes(tag);
      p.style.display = shouldShow ? 'block' : 'none';
    });
  });
});

// ====== Contact Form (client-side validate only) ======
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const status = document.getElementById('formStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill out all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      return;
    }
    status.textContent = 'Thanks! Your message has been prepared in your mail app.';
    window.location.href = `mailto:akbamanbatsh@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
    contactForm.reset();
  });
}

// Animate each section (fade in & out)
gsap.utils.toArray('.section').forEach((section, i) => {
  gsap.fromTo(section,
    { opacity: 0, y: 50 },
    {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: i * 0.2
    }
  );
});

// Animate skill chips (fade in/out)
gsap.utils.toArray('#skills .chip').forEach((chip, i) => {
  gsap.fromTo(chip,
    { opacity: 0, scale: 0.5 },
    {
      scrollTrigger: {
        trigger: chip,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 1,
      scale: 1,
      duration: 0.4,
      delay: i * 0.05,
      ease: "back.out(1.7)"
    }
  );
});

// Animate highlights (fade in/out)
gsap.utils.toArray('#skills .highlight').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 60 },
    {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: i * 0.15,
      ease: "power3.out"
    }
  );
});

// Animate experience timeline items (fade in/out, alternate left/right)
gsap.utils.toArray('#experience .item').forEach((item, i) => {
  gsap.fromTo(item,
    { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
    {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
      },
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    }
  );
});

document.getElementById('date').textContent = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata"
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();


// Animate skills chips
