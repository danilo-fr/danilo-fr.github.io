const canvas = document.getElementById("headerParticles");

if (canvas) {

    const ctx = canvas.getContext("2d");
    const header = document.getElementById("header");

    function resize() {
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    const mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        active: false
    };

    header.addEventListener("mousemove", (e) => {
        const rect = header.getBoundingClientRect();

        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;

        for (let i = 0; i < 2; i++) {
            particles.push({
                x: mouse.x,
                y: mouse.y,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 2 + 1,
                life: 1
            });
        }
    });

    header.addEventListener("mouseleave", () => {
        mouse.active = false;
    });

    function animate() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {

            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            p.life -= 0.02;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(255,255,255,${p.life})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = "white";
            ctx.fill();

            if (p.life <= 0)
                particles.splice(i, 1);
        }

        requestAnimationFrame(animate);
    }

    animate();
}
