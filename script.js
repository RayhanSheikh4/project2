// 1. Initialize Shery plugins
Shery.mouseFollower();
Shery.makeMagnet(".magnet");

// 2. Hover media circle with video previews
Shery.hoverWithMediaCircle(".hvr", {
  images: ["./img/eye.jpg", "./img/cute.jpg", "./img/eye2.jpg"],
});

// 3. Scroll-synced Shery image effect
let sections = document.querySelectorAll(".leftelem");
let setScroll;

Shery.imageEffect(".images", {
  style: 4,
  config: { onMouse: { value: 1 } },
  slideStyle: (scrollFn) => {
    setScroll = scrollFn; // store the scroll update function
  },
});

// 4. GSAP scroll animation for text and synced image switching
gsap.registerPlugin(ScrollTrigger);

gsap.to(".leftelem", {
  y: `-${(sections.length - 1) * 100}%`,
  ease: "power1.inOut",
  scrollTrigger: {
    trigger: ".memories-images",
    pin: true,
    start: "top top",
    end: "bottom bottom",
    endTrigger: ".last",
    scrub: 1,
    onUpdate: (self) => {
      if (setScroll && typeof setScroll === "function") {
        let imageProgress = self.progress * (sections.length - 1);
        setScroll(imageProgress);
      }
    }
  }
});
