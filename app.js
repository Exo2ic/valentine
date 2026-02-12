(function () {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");
  const hugBtn = document.getElementById("hugBtn");

  // -------- Page 1: Yes grows + No runs far away --------
  if (yesBtn && noBtn) {
    let scale = 1;
    let noClicks = 0;

    // نخلي الـ No يقدر يتحرك بحرية (ويهج من الكرت)
    noBtn.style.position = "fixed";
    noBtn.style.left = "50%";
    noBtn.style.top = "58%";
    noBtn.style.transform = "translate(-50%, -50%)";
    noBtn.style.zIndex = "9998";

    // نخلي الـ Yes واضح فوق
    yesBtn.style.position = "relative";
    yesBtn.style.zIndex = "9999";

    noBtn.addEventListener("click", () => {
      noClicks++;

      // ✅ كبر الـ Yes
      scale += 0.28;
      yesBtn.style.transform = `scale(${scale})`;

      // ✅ هرب الـ No بعيد
      moveNoFar(noClicks);

      // ✅ سيطرة كاملة
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

    yesBtn.addEventListener("click", () => {
      window.location.href = "page2.html";
    });

    // يحرك No لمكان عشوائي بعيد عن الوسط
    function moveNoFar(clicks) {
      const padding = 18;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const cx = w * 0.5;
      const cy = h * 0.5;

      let x, y, tries = 0;

      // كل ما زادت الضغطات، نخليه يهرب أبعد
      const minDist = Math.min(w, h) * Math.min(0.70, 0.30 + clicks * 0.06);

      do {
        x = padding + Math.random() * (w - padding * 2);
        y = padding + Math.random() * (h - padding * 2);
        tries++;
      } while (distance(x, y, cx, cy) < minDist && tries < 40);

      noBtn.style.left = x + "px";
      noBtn.style.top  = y + "px";
      noBtn.style.transform = "translate(-50%, -50%)";
    }

    function distance(x1, y1, x2, y2) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx*dx + dy*dy);
    }

    // لو سويت ريسايز للشاشة، خليه يعيد مكانه بعيد
    window.addEventListener("resize", () => moveNoFar(noClicks));
  }

  // -------- Page 2: Hug spam fills screen for 5 seconds --------
  if (hugBtn) {
    hugBtn.addEventListener("click", () => spamHearts(5000));
  }

  function spamHearts(durationMs) {
    const emojis = ["💖","💘","😼","🤍","✨","🌸","🍓","🫂","💗","💞"];
    const start = Date.now();

    // طبقة فوق كل شي
    const layer = document.createElement("div");
    layer.style.position = "fixed";
    layer.style.inset = "0";
    layer.style.pointerEvents = "none";
    layer.style.zIndex = "999999";
    document.body.appendChild(layer);

    const interval = setInterval(() => {
      // Spam كثيف يترس الشاشة
      for (let i = 0; i < 70; i++) {
        const e = document.createElement("div");
        e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        e.style.position = "absolute";
        e.style.left = Math.random() * 100 + "vw";
        e.style.top  = Math.random() * 100 + "vh";
        e.style.fontSize = (18 + Math.random() * 42) + "px";
        e.style.opacity = (0.55 + Math.random() * 0.45).toFixed(2);
        e.style.transform = `rotate(${Math.random() * 360}deg)`;
        layer.appendChild(e);
      }

      if (Date.now() - start >= durationMs) {
        clearInterval(interval);

        layer.style.transition = "opacity .35s ease";
        layer.style.opacity = "0";
        setTimeout(() => layer.remove(), 380);
      }
    }, 70);
  }
})();
