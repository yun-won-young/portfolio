window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const ani1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#section1",
      // start: "-60px top",
      start: "top top",
      end: "300px top",
      scrub: true,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      // markers: true,

      onEnter: () => {
        gsap.to(".nav-bar", {
          y: "-150%",
          duration: 0.4,
          ease: "power2.out",
        });
      },
      onLeave: () => {
        gsap.to(".nav-bar", {
          y: "0%",
          duration: 0.4,
          ease: "power2.out",
        });
      },
      onEnterBack: () => {
        gsap.to(".nav-bar", {
          y: "-150%",
          duration: 0.4,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(".nav-bar", {
          y: "0%",
          duration: 0.4,
          ease: "power2.out",
        });
      },
    },
  });

  ani1.fromTo(
    "#section1 .item-img",
    {
      width: "300px",
      height: "430px",
    },
    {
      width: "100vw",
      height: "100vh",
      ease: "power2.out",
    }
  );

  ani1.to(
    "#section1 .intro",
    {
      opacity: 0,
      y: -60,
    },
    "<"
  );

  // gsap.from("#section2", {
  //   scrollTrigger: {
  //     trigger: "#section2",
  //     start: "top 80%",
  //     toggleActions: "play none none none",
  //   },
  //   y: -50,
  //   opacity: 0,
  //   duration: 1,
  //   ease: "power2.out",
  // });

  document.querySelectorAll(".nav-bar a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      // #으로 시작하는 내부 링크일 경우에만 preventDefault
      if (targetId.startsWith("#")) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);
        const targetTop = targetSection.offsetTop;

        gsap.to(window, {
          scrollTo: targetTop,
          duration: 0.5,
          ease: "none",
        });
      }
    });
  });

  const interview = document.querySelector(".my-img");
  console.log(interview);
  const interviewModal = document.querySelector(".interview-modal");
  const interviewBtn = document.querySelector(".interview-modal .close");
  const video = interviewModal.querySelector("video");

  interview.addEventListener("click", (e) => {
    interviewModal.classList.add("active");
    video.play();
  });
  interviewBtn.addEventListener("click", () => {
    interviewModal.classList.remove("active");
    video.pause();
    video.currentTime = 0;
    // video.load();
  });
  interviewModal.addEventListener("click", (e) => {
    if (e.target === interviewModal) {
      interviewModal.classList.remove("active");
      video.pause();
      video.currentTime = 0;
      // video.load();
    }
  });

  const ani2 = gsap.timeline();

  ani2.from(
    "#section3 .left",
    {
      xPercent: -100,
      x: "-100vw",
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    "text"
  );
  ani2.from(
    "#section3 .right",
    {
      xPercent: 100,
      x: "100vw",
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    "text"
  );

  ScrollTrigger.create({
    animation: ani2,
    trigger: "#section3",
    start: "top 70%",
    end: "top 30%",
    // anticipatePin: 1,
    scrub: true,
    // pin: true,
    // markers: true,
  });

  const grid = new Isotope(".section", {
    itemSelector: "article",
    transitionDuration: "0.2s",
    // layoutMode: "fitRows",
    masonry: {
      colums: "article",
    },
  });

  const btns = document.querySelectorAll(".menu-bar li");
  console.log(btns);

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const sort = btn.querySelector("a").getAttribute("href");

      grid.arrange({
        filter: sort,
      });

      btns.forEach((el) => {
        el.classList.remove("on");
      });
      e.currentTarget.classList.add("on");
    });
  });

  const planBtns = document.querySelectorAll(".plan-modal");
  const modalConti = document.querySelector(".modal .conti");
  const modal = document.querySelector(".modal");
  const modalBtn = document.querySelector(".modal .close");

  const contiImages = {
    1: [
      "https://picsum.photos/700/300?random=1",
      "https://picsum.photos/700/300?random=2",
      "https://picsum.photos/700/300?random=3",
    ],
    2: [
      "https://picsum.photos/700/300?random=4",
      "https://picsum.photos/700/300?random=5",
      "https://picsum.photos/700/300?random=6",
    ],
    3: [
      "https://picsum.photos/700/300?random=7",
      "https://picsum.photos/700/300?random=8",
      "https://picsum.photos/700/300?random=9",
    ],
    4: [
      "https://picsum.photos/700/300?random=10",
      "https://picsum.photos/700/300?random=11",
      "https://picsum.photos/700/300?random=13",
    ],
  };

  planBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.id;

      modalConti.innerHTML = "<h1>영상 기획서" + id + "</h1>";

      contiImages[id].forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        modalConti.appendChild(img);
      });
      modal.classList.add("active");
    });
  });

  // 모달 닫기
  modalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // 모달 바깥 영역 클릭 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});
