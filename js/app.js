document.addEventListener('DOMContentLoaded', () => {
    try {
        const HEARTS = ["❤️", "💕", "💗", "💖", "💘", "💝"];
        const mouse = { x: 0, y: 0 };
        const yesBtn = document.getElementById("yesBtn");
        const noBtn = document.getElementById("noBtn");
        const ovalForAvatar = document.getElementById("ovalForAvatar");
        let isDodging = false;

        yesBtn.addEventListener("click", handleYes);
        noBtn.addEventListener("mouseenter", dodgeNo);

        document.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });

        // Create falling hearts
        for (let i = 0; i < 30; i++) {
            const el = document.createElement("div");
            el.className = "falling-heart";
            el.style.left = Math.random() * 100 + "%";
            el.style.fontSize = (14 + Math.random() * 24) + "px";
            el.style.opacity = 0.3 + Math.random() * 0.5;
            el.style.setProperty("--duration", (6 + Math.random() * 8) + "s");
            el.style.setProperty("--delay", (Math.random() * 10) + "s");
            el.style.setProperty("--sway-dur", (2 + Math.random() * 3) + "s");
            el.innerHTML = `<span>${HEARTS[Math.floor(Math.random() * HEARTS.length)]}</span>`;
            document.body.appendChild(el);
        }

        function dodgeNo() {
            const bW = 120, bH = 50, margin = 20;
            const maxX = window.innerWidth - bW - margin;
            const maxY = window.innerHeight - bH - margin;

            if (!isDodging) {
                isDodging = true;
                noBtn.classList.add("dodging");
            }

            for (let a = 0; a < 50; a++) {
                const x = margin + Math.random() * maxX;
                const y = margin + Math.random() * maxY;

                const dx = x + bW / 2 - mouse.x, dy = y + bH / 2 - mouse.y;
                if (Math.sqrt(dx * dx + dy * dy) < 150) continue;

                const r = yesBtn.getBoundingClientRect();
                if (x < r.right + 20 && x + bW > r.left - 20 && y < r.bottom + 20 && y + bH > r.top - 20) continue;

                const r2 = ovalForAvatar.getBoundingClientRect();
                if (x < r2.right + 20 && x + bW > r2.left - 20 && y < r2.bottom + 20 && y + bH > r2.top - 20) continue;

                noBtn.style.left = x + "px";
                noBtn.style.top = y + "px";
                return;
            }

            noBtn.style.left = margin + "px";
            noBtn.style.top = margin + "px";
        }

        function handleYes() {
            document.getElementById("buttons").style.display = "none";
            if (noBtn) noBtn.style.display = "none";
            document.getElementById("success").style.display = "flex";

            for (let i = 0; i < 20; i++) {
                const span = document.createElement("span");
                span.className = "celeb-heart";
                span.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
                span.style.setProperty("--tx", ((Math.random() - 0.5) * 400) + "px");
                span.style.setProperty("--ty", (-(100 + Math.random() * 300)) + "px");
                document.body.appendChild(span);
                setTimeout(() => span.remove(), 2000);
            }
        }
    } catch (e) { console.log('+++ Exeption +++', e); }
});