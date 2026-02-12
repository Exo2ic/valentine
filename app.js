(function () {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");
  const hugBtn = document.getElementById("hugBtn");

  /* =========================
     PAGE 1
  ========================= */
  if (yesBtn && noBtn) {
    let scale = 1;
    let noClicks = 0;

    // Yes ثابت
    yesBtn.style.position = "relative";
    yesBtn.style.zIndex = "9999";

    // No حر الحركة
    noBtn.style.position = "fixed";
    noBtn.style.zIndex = "9998";

    // 🔥 من البداية: حطه عدال (يمين الشاشة)
    setTimeout(() => moveNoSide(1), 50);

    // عند الضغط
    noBtn.addEventListener("click", () => {
      noClicks++;

      // كبر Yes
      scale += 0.28;
      yesBtn.style.transform = `scale(${scale})`;

      // هرب No
      moveNoSide(noClicks);

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

    // 😈 يهرب قبل اللمس
    noBtn.addEventListener("mouseenter", () => moveNoSide(++noClicks));
    noBtn.addEventListener(
      "touchstart",
      () => moveNoSide(++noClicks),
      { passive: true }
    );

    yesBtn.addEventListener("click", () => {
      window.location.href = "page2.html";
    });

    // 🔁 حركة الهروب (يمين / يسار الشاشة)
    function moveNoSide(clicks) {
      const padding = 20;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // نختار جهة: يمين أو يسار
      const side = Math.random() > 0.5 ? "right" : "left";

      let x;
      if (side === "right") {
        x = w * (0.65 + Math.random() * 0.3);
      } else {
        x = w * (0.05 + Math.random() * 0.25);
      }

      // Y عشوائي بس مو تحت Yes
      const y = h * (0.2 + Math.random() * 0.6);

      noBtn.style.left = Math.min(w - padding, Math.max(padding, x)) + "px";
      noBtn.style.top  = Math.min(h - padding, Math.max(padding, y)) + "px";
      noBtn.style.transform = "translate(-50%, -50%)";
    }

    window.addEventListener("resize", () => moveNoSide(noClicks));
  }

  /* =========================
     PAGE 2 – HUG SPAM
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
