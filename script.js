/* =========================
   GSAP CONFIG
========================= */

gsap.config({ force3D: true, nullTargetWarn: false });
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

const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (window.innerWidth <= 992) item.classList.toggle("active");
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
      image.style.left = `${e.clientX - rect.left}px`;
      image.style.top = `${e.clientY - rect.top}px`;
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
   ACCORDION
========================= */

const accordionItems = document.querySelectorAll(".accordion-item");
accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  if (!header) return;
  header.addEventListener("click", () => {
    accordionItems.forEach((other) => {
      if (other !== item) other.classList.remove("active");
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
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  window.addEventListener("resize", () => {
    locoScroll.update();
    ScrollTrigger.refresh();
  });

  /* =========================
     INLINE SHOWREEL — AUTO PLAY ON SCROLL
     Plays the video directly inside page3 (no modal).
     Fades in smoothly via CSS .video-playing class.
  ========================= */

  const page3 = document.getElementById("page3");
  const inlineVideo = document.getElementById("inlineShowreel");

  if (page3 && inlineVideo) {
    ScrollTrigger.create({
      trigger: "#page3",
      scroller: "#main",
      start: "top 60%",    // starts playing when page3 reaches 60% of viewport
      end: "bottom top",
      onEnter: () => {
        inlineVideo.play().catch(() => {});
        page3.classList.add("video-playing");   // fades video in via CSS
      },
      onLeave: () => {
        inlineVideo.pause();
        page3.classList.remove("video-playing");
      },
      onEnterBack: () => {
        inlineVideo.play().catch(() => {});
        page3.classList.add("video-playing");
      },
      onLeaveBack: () => {
        inlineVideo.pause();
        page3.classList.remove("video-playing");
      },
    });
  }

  /* =========================
     VIDEO MODAL (fullscreen click)
     Modal is OUTSIDE #main so position:fixed works with Locomotive.
     Locomotive is paused while modal is open.
  ========================= */

  const playBtn = document.getElementById("playBtn");
  const videoModal = document.getElementById("videoModal");
  const closeVideo = document.getElementById("closeVideo");
  const showreelVideo = document.getElementById("showreelVideo");

  function openModal() {
    videoModal.classList.add("active");
    showreelVideo.play();
    if (inlineVideo) inlineVideo.pause();       // pause inline while fullscreen plays
    locoScroll.stop();
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    videoModal.classList.remove("active");
    showreelVideo.pause();
    showreelVideo.currentTime = 0;
    // Resume inline video if page3 is still in view
    if (page3 && page3.classList.contains("video-playing") && inlineVideo) {
      inlineVideo.play().catch(() => {});
    }
    locoScroll.start();
    document.body.style.overflow = "";
  }

  if (playBtn) playBtn.addEventListener("click", openModal);
  if (closeVideo) closeVideo.addEventListener("click", closeModal);
  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoModal.classList.contains("active")) closeModal();
    });
  }

  /* =========================
     PORTFOLIO VIDEOS — SCROLL TRIGGER
  ========================= */

  const portfolioItems = document.querySelectorAll(".portfolio-right");
  portfolioItems.forEach((item) => {
    const video = item.querySelector("video");
    if (!video) return;

    ScrollTrigger.create({
      trigger: item,
      scroller: "#main",
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => { item.classList.add("playing"); video.play().catch(() => {}); },
      onLeave: () => { item.classList.remove("playing"); video.pause(); video.currentTime = 0; },
      onEnterBack: () => { item.classList.add("playing"); video.play().catch(() => {}); },
      onLeaveBack: () => { item.classList.remove("playing"); video.pause(); video.currentTime = 0; },
    });

    if (window.innerWidth > 768) {
      item.addEventListener("mouseenter", () => video.play().catch(() => {}));
      item.addEventListener("mouseleave", () => {
        if (!item.classList.contains("playing")) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
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