(function () {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn  = document.getElementById("noBtn");
  const hugBtn = document.getElementById("hugBtn");

  // Page 1
  if (yesBtn && noBtn) {
    let scale = 1;

    noBtn.addEventListener("click", () => {
      scale += 0.28;
      yesBtn.style.transform = `scale(${scale})`;

      if (scale > 14) {
        yesBtn.style.position = "fixed";
        yesBtn.style.top = "0";
        yesBtn.style.left = "0";
        yesBtn.style.width = "100vw";
        yesBtn.style.height = "100vh";
        yesBtn.style.borderRadius = "0";
        yesBtn.style.fontSize = "44px";
        yesBtn.textContent = "YES 💖💖💖";
      }
    });

    yesBtn.addEventListener("click", () => {
      window.location.href = "page2.html";
    });
  }

  // Page 2
  if (hugBtn) {
    hugBtn.addEventListener("click", () => confetti());
  }

  function confetti() {
    const emojis = ["💖","💘","😼","🤍","✨","🌸"];
    for (let i = 0; i < 26; i++) {
      const e = document.createElement("div");
      e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      e.style.position="fixed";
      e.style.left=Math.random()*100+"vw";
      e.style.top="-10vh";
      e.style.fontSize=(18+Math.random()*22)+"px";
      e.style.transition="transform 1.2s ease, opacity 1.2s ease";
      document.body.appendChild(e);

      requestAnimationFrame(()=>{
        e.style.transform=`translateY(120vh) rotate(${Math.random()*720}deg)`;
        e.style.opacity="0";
      });

      setTimeout(()=>e.remove(),1300);
    }
  }
})();
