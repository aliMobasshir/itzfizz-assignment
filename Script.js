gsap.registerPlugin(ScrollTrigger);

const car            = document.getElementById("car");
const trail          = document.getElementById("trail");
const welcomeLetters = gsap.utils.toArray(".welcome-letter");
const itzfizzLetters = gsap.utils.toArray(".itzfizz-letter");

const carWidth  = 150;
const roadWidth = window.innerWidth;
const endX      = roadWidth - carWidth;

requestAnimationFrame(() => {
  const roadRect = document.getElementById("road").getBoundingClientRect();

  const welcomeOffsets = welcomeLetters.map(l => {
    const r = l.getBoundingClientRect();
    return r.left + r.width / 2 - roadRect.left;
  });

  const itzfizzOffsets = itzfizzLetters.map(l => {
    const r = l.getBoundingClientRect();
    return r.left + r.width / 2 - roadRect.left;
  });

  gsap.to(car, {
    scrollTrigger: {
      trigger: ".section",
      start:   "top top",
      end:     "bottom top",
      scrub:   true,
      pin:     ".track",
    },
    x:    endX,
    ease: "none",
    onUpdate() {
      const carX     = gsap.getProperty(car, "x");
      const carFront = carX + carWidth;
      const carBack  = carX;

      gsap.set(trail, { width: carFront });

      welcomeLetters.forEach((l, i) => {
        l.style.opacity = carFront >= welcomeOffsets[i] ? 0 : 1;
      });

      itzfizzLetters.forEach((l, i) => {
        l.style.opacity = carBack >= itzfizzOffsets[i] ? 1 : 0;
      });
    },
  });
});

// 8 cards
[
  ["#box1", 200,  420],
  ["#box2", 420,  640],
  ["#box3", 640,  860],
  ["#box4", 860,  1080],
  ["#box5", 1080, 1300],
  ["#box6", 1300, 1520],
  ["#box7", 1520, 1740],
  ["#box8", 1740, 1960],
].forEach(([id, s, e]) => {
  gsap.to(id, {
    scrollTrigger: {
      trigger: ".section",
      start: `top+=${s} top`,
      end:   `top+=${e} top`,
      scrub: true,
    },
    opacity: 1,
  });
});