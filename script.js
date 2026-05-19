/* =========================
   GSAP CONFIG
========================= */

gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

gsap.registerPlugin(ScrollTrigger);

/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* MOBILE NAV DROPDOWN */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 992) {
      item.classList.toggle("active");
    }
  });
});

/* =========================
   PAGE 2 IMAGE HOVER
========================= */

const cards = document.querySelectorAll(".article-card");

cards.forEach((card) => {
  const image = card.querySelector("img");

  if (!image) return;

  if (window.innerWidth > 768) {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      image.style.left = `${x}px`;
      image.style.top = `${y}px`;

      image.style.opacity = "1";
      image.style.transform = "translate(-50%, -50%) scale(1)";
    });

    card.addEventListener("mouseleave", () => {
      image.style.opacity = "0";
      image.style.transform = "translate(-50%, -50%) scale(0)";
    });
  }
});

/* =========================
   VIDEO MODAL
========================= */

const playBtn = document.getElementById("playBtn");
const videoModal = document.getElementById("videoModal");
const closeVideo = document.getElementById("closeVideo");
const showreelVideo = document.getElementById("showreelVideo");

if (playBtn && videoModal && showreelVideo) {
  playBtn.addEventListener("click", () => {
    videoModal.classList.add("active");
    showreelVideo.play();
  });
}

if (closeVideo && videoModal && showreelVideo) {
  closeVideo.addEventListener("click", () => {
    videoModal.classList.remove("active");
    showreelVideo.pause();
    showreelVideo.currentTime = 0;
  });

  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove("active");
      showreelVideo.pause();
      showreelVideo.currentTime = 0;
    }
  });
}

/* =========================
   PORTFOLIO VIDEO HOVER
========================= */

const portfolioItems = document.querySelectorAll(".portfolio-right");

portfolioItems.forEach((item) => {
  const video = item.querySelector("video");

  if (!video) return;

  if (window.innerWidth > 768) {
    item.addEventListener("mouseenter", () => {
      video.play();
    });

    item.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});

/* =========================
   ACCORDION
========================= */

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  if (!header) return;

  header.addEventListener("click", () => {
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

/* =========================
   LOCOMOTIVE + SCROLLTRIGGER
========================= */

function locomotiveAnimation() {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.08,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();

  window.addEventListener("resize", () => {
    locoScroll.update();
    ScrollTrigger.refresh();
  });
}

/* INIT */

locomotiveAnimation();

/* =========================
   GSAP ANIMATIONS
========================= */

gsap.from(".process-card", {
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",

  scrollTrigger: {
    trigger: "#page6",
    scroller: "#main",
    start: "top 70%",
  },
});
