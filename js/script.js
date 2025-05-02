window.onload = function() {
  const userName = prompt("Please enter your name:");

  if (userName && userName.trim()) {
      const formattedName = userName.trim().charAt(0).toUpperCase() + userName.trim().slice(1).toLowerCase();

      const loopTexts = document.querySelectorAll("#loop h1 span i");
      loopTexts.forEach(span => {
          span.textContent = formattedName;
      });

      document.querySelector("#nav h3 b").textContent = formattedName;
  } else {
      alert("Name cannot be empty. Default name will be used.");
  }
};

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
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

  setupNavigation(locoScroll);
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotive();

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 300;
const images = [];
const imageSeq = { frame: 1 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `images\\male${String(i + 1).padStart(4, '0')}.png`;
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
      scrub: 0.15,
      trigger: `#main canvas`,
      start: `top top`,
      end: `600% top`,
      scroller: `#main`,
  },
  onUpdate: render,
});

images[0].onload = render;

function render() {
    scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
  );
}

ScrollTrigger.create({
  trigger: "#main canvas",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `600% top`,
});

gsap.to("#page1", {
  scrollTrigger: {
      trigger: `#page1`,
      start: `top top`,
      end: `bottom top`,
      pin: true,
      scroller: `#main`,
  },
});

gsap.to("#page2", {
  scrollTrigger: {
      trigger: `#page2`,
      start: `top top`,
      end: `bottom top`,
      pin: true,
      scroller: `#main`,
  },
});

gsap.to("#page3", {
  scrollTrigger: {
      trigger: `#page3`,
      start: `top top`,
      end: `bottom top`,
      pin: true,
      scroller: `#main`,
  },
});

const toggleNavbar = document.getElementById("toggleNavbar");
const navbar = document.getElementById("navbar");

toggleNavbar.addEventListener("click", () => {
  navbar.style.display = navbar.style.display === "block" ? "none" : "block";
});

function setupNavigation(locoScroll) {
  document.querySelector("#navPage").addEventListener("click", () => {
    locoScroll.scrollTo("#page", { duration: 1000 }); 
  });

  document.querySelector("#navPage1").addEventListener("click", () => {
    locoScroll.scrollTo("#page1", { duration: 1000 }); 
  });

  document.querySelector("#navPage2").addEventListener("click", () => {
    locoScroll.scrollTo("#page2", { duration: 1000 }); 
  });

  document.querySelector("#navPage3").addEventListener("click", () => {
    locoScroll.scrollTo("#page3", { duration: 1000 }); 
  });
}