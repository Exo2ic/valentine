(() => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");
  const hugBtn = document.getElementById("hugBtn");

  /* PAGE 1 */
  if (yesBtn && noBtn) {
    let scale = 1;

    // نخلي Yes فوق بصريًا
    yesBtn.style.position = "relative";
    yesBtn.style.zIndex = "2";

    // نخلي No يبدأ طبيعي جمبه
    noBtn.style.position = "relative";
    noBtn.style.zIndex = "1";

    // ضغط No -> Yes يكبر فورًا + No يهرب
    noBtn.addEventListener("click", () => {
      scale += 0.35;

      // ✅ تحديث التكبير بطريقة ثابتة للجوال
      document.documentElement.style.setProperty("--yesScale", String(scale));

      escapeNo();
    });

    // يهرب عند المحاولة
    noBtn.addEventListener("mouseenter", escapeNo);
    noBtn.addEventListener("touchstart", escapeNo, { passive: true });

    // Yes -> صفحة 2
    yesBtn.addEventListener("click", () => {
      window.location.href = "page2.html";
    });

    function escapeNo() {
      const padding = 20;
      const x = padding + Math.random() * (window.innerWidth - padding * 2);
      const y = padding + Math.random() * (window.innerHeight - padding * 2);

      noBtn.style.position = "fixed";
      noBtn.style.left = x + "px";
      noBtn.style.top  = y + "px";
      noBtn.style.transform = "translate(-50%, -50%)";
      noBtn.style.zIndex = "999";
    }
  }

  /* PAGE 2 – HUG SPAM */
  if (hugBtn) {
    hugBtn.addEventListener("click", () => spam(5000));
  }

  function spam(duration) {
    const emojis = ["💖","💘","😼","🤍","✨","🌸","🍓","🫂"];
    const layer = document.createElement("div");
    layer.style.position = "fixed";
    layer.style.inset = "0";
    layer.style.pointerEvents = "none";
    layer.style.zIndex = "9999";
    document.body.appendChild(layer);

    const start = Date.now();
    const interval = setInterval(() => {
      for (let i = 0; i < 70; i++) {
        const e = document.createElement("span");
        e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        e.style.position = "absolute";
        e.style.left = Math.random() * 100 + "vw";
        e.style.top  = Math.random() * 100 + "vh";
        e.style.fontSize = (18 + Math.random() * 35) + "px";
        layer.appendChild(e);
      }

      if (Date.now() - start > duration) {
        clearInterval(interval);
        layer.remove();
      }
    }, 70);
  }
})();
