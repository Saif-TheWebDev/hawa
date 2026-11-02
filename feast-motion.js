(() => {
  const stage = document.getElementById("feastStage"),
    food = document.getElementById("feastFood");
  if (!stage || !food) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false,
    raf = 0,
    x = 0,
    y = 0;
  function draw() {
    raf = 0;
    if (reduced.matches || paused) {
      food.style.setProperty("--px", "0px");
      food.style.setProperty("--py", "0px");
      return;
    }
    food.style.setProperty("--px", x + "px");
    food.style.setProperty("--py", y - Math.min(scrollY, 700) * 0.045 + "px");
  }
  function request() {
    if (!raf) raf = requestAnimationFrame(draw);
  }
  stage.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse") {
      x = (e.clientX / innerWidth - 0.5) * 15;
      y = (e.clientY / innerHeight - 0.5) * 10;
      request();
    }
  });
  stage.addEventListener("pointerleave", () => {
    x = y = 0;
    request();
  });
  addEventListener("scroll", request, { passive: true });
  reduced.addEventListener("change", request);
  const btn = document.getElementById("feastMotion");
  btn.addEventListener("click", () => {
    paused = !paused;
    stage.classList.toggle("is-paused", paused);
    btn.setAttribute("aria-pressed", String(paused));
    btn.textContent = paused ? "Resume motion" : "Pause motion";
    request();
  });
  const observer = new IntersectionObserver(([entry]) => {
    stage.classList.toggle("is-paused", paused || !entry.isIntersecting);
  });
  observer.observe(stage);
  addEventListener(
    "pagehide",
    () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    },
    { once: true },
  );
})();
