(function () {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");
  const hugBtn = document.getElementById("hugBtn");

  /* ======================
     PAGE 1
  ====================== */
  if (yesBtn && noBtn) {
    let scale = 1;

    // Yes ثابت
    yesBtn.style.position = "relative";
    yesBtn.style.zIndex = "2";

    // No يبدأ طبيعي جمبه
    noBtn.style.position = "relative";
    noBtn.style.zIndex = "1";

    noBtn.addEventListener("click", () => {
      // كبر Yes
      scale += 0.3;
      yesBtn.style.transform = `scale(${scale})`;

      // بعد أول ضغطة يبدأ الهروب
      escapeNo();

      // سيطرة كاملة
      if (scale > 14) {
        yesBtn.style.position = "fixed";
        yesBtn.style.top = "0";
        yesBtn.style.left = "0";
        yesBtn.style.width = "100vw";
        yesBtn.style.height = "100vh";
        yesBtn.style.borderRadius = "0";
        yesBtn.style.fontSize = "44px";
        yesBtn.textContent = "YES 💖💖💖";
        yesBtn.style.zIndex = "9999";
      }
    });

    // يهرب عند المحاولة
    noBtn.addEventListener("mouseenter", escapeNo);
    noBtn.addEventListener("touchstart", escapeNo, { passive: true });

    yesBtn.addEventListener("click", () => {
      window.location.href = "page2.html";
    });

    function escapeNo() {
      const padding = 20;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const x = padding + Math.random() * (w - padding * 2);
      const y = padding + Math.random() * (h - padding * 2);

      noBtn.style.position = "fixed";
      noBtn.style.left = x + "px";
      noBtn.style.top  = y + "px";
      noBtn.style.transform = "translate(-50%, -50%)";
      noBtn.style.zIndex = "9998";
    }
  }

  /* ======================
     PAGE 2 – HUG SPAM
  ====================== */
  if (hugBtn) {
    hugBtn.addEventListener("click", () => spamHearts(5000));
  }

  function spamHearts(durationMs) {
    const emojis = ["💖","💘","😼","🤍","✨","🌸","🍓","🫂"];
    const start = Date.now();

    const layer = document.createElement("div");
    layer.style.position = "fixed";
    layer.style.inset = "0";
    layer.style.pointerEvents = "none";
    layer.style.zIndex = "999999";
    document.body.appendChild(layer);

    const interval = setInterval(() => {
      for (let i = 0; i < 70; i++) {
        const e = document.createElement("div");
        e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        e.style.position = "absolute";
        e.style.left = Math.random() * 100 + "vw";
        e.style.top  = Math.random() * 100 + "vh";
        e.style.fontSize = (18 + Math.random() * 45) + "px";
        layer.appendChild(e);
      }

      if (Date.now() - start >= durationMs) {
        clearInterval(interval);
        layer.style.transition = "opacity .4s";
        layer.style.opacity = "0";
        setTimeout(() => layer.remove(), 400);
      }
    }, 70);
  }
})();
