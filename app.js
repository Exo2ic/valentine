(function () {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");
  const hugBtn = document.getElementById("hugBtn");

  /* =========================
     PAGE 1: YES vs NO
  ========================= */
  if (yesBtn && noBtn) {
    let scale = 1;
    let noClicks = 0;

    // نخلي زر No حر الحركة
    noBtn.style.position = "fixed";
    noBtn.style.zIndex = "9998";

    // زر Yes واضح وفوق
    yesBtn.style.position = "relative";
    yesBtn.style.zIndex = "9999";

    // 🔥 خلي No بعيد من أول ما تفتح الصفحة
    setTimeout(() => moveNoFar(1), 50);

    // عند الضغط على No
    noBtn.addEventListener("click", () => {
      noClicks++;

      // كبر زر Yes
      scale += 0.28;
      yesBtn.style.transform = `scale(${scale})`;

      // هرب زر No
      moveNoFar(noClicks);

      // سيطرة كاملة
      if (scale > 14) {
        yesBtn.style.position = "fixed";
        yesBtn.style.top = "0";
        yesBtn.style.left = "0";
        yesBtn.style.width = "100vw";
        yesBtn.style.height = "100vh";
        yesBtn.style.borderRadius = "0";
        yesBtn.style.fontSize = "44px";
        yesBtn.style.zIndex = "999999";
        yesBtn.textContent = "YES 💖💖💖";
      }
    });

    // 😈 يهرب حتى قبل ما تضغط (كمبيوتر + جوال)
    noBtn.addEventListener("mouseenter", () => moveNoFar(++noClicks));
    noBtn.addEventListener(
      "touchstart",
      () => moveNoFar(++noClicks),
      { passive: true }
    );

    // عند الضغط على Yes
    yesBtn.addEventListener("click", () => {
      window.location.href = "page2.html";
    });

    // حركة الهروب (بعيد عن منتصف الشاشة)
    function moveNoFar(clicks) {
      const padding = 20;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const cx = w * 0.5;
      const cy = h * 0.5;

      let x, y, tries = 0;
      const minDist = Math.min(w, h) * Math.min(0.75, 0.35 + clicks * 0.06);

      do {
        x = padding + Math.random() * (w - padding * 2);
        y = padding + Math.random() * (h - padding * 2);
        tries++;
      } while (distance(x, y, cx, cy) < minDist && tries < 50);

      noBtn.style.left = x + "px";
      noBtn.style.top  = y + "px";
      noBtn.style.transform = "translate(-50%, -50%)";
    }

    function distance(x1, y1, x2, y2) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    }

    window.addEventListener("resize", () => moveNoFar(noClicks));
  }

  /* =========================
     PAGE 2: HUG SPAM (5s)
  ========================= */
  if (hugBtn) {
    hugBtn.addEventListener("click", () => spamHearts(5000));
  }

  function spamHearts(durationMs) {
    const emojis = ["💖","💘","😼","🤍","✨","🌸","🍓","🫂","💗","💞"];
    const start = Date.now();

    const layer = document.createElement("div");
    layer.style.position = "fixed";
    layer.style.inset = "0";
    layer.style.pointerEvents = "none";
    layer.style.zIndex = "999999";
    document.body.appendChild(layer);

    const interval = setInterval(() => {
      for (let i = 0; i < 80; i++) {
        const e = document.createElement("div");
        e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        e.style.position = "absolute";
        e.style.left = Math.random() * 100 + "vw";
        e.style.top  = Math.random() * 100 + "vh";
        e.style.fontSize = (18 + Math.random() * 45) + "px";
        e.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
        e.style.transform = `rotate(${Math.random() * 360}deg)`;
        layer.appendChild(e);
      }

      if (Date.now() - start >= durationMs) {
        clearInterval(interval);
        layer.style.transition = "opacity .35s ease";
        layer.style.opacity = "0";
        setTimeout(() => layer.remove(), 380);
      }
    }, 65);
  }
})();
