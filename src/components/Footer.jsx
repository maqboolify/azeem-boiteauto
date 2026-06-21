import { useEffect, useRef } from "react";

export default function BapParis() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const rafRef = useRef(null);
  const ptsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    function init() {
      W = canvas.width = wrap.offsetWidth;
      H = canvas.height = wrap.offsetHeight;
      ptsRef.current = [];
      const count = Math.round((W * H) / 400 * 400 / 400 * 1.8);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 0.1 + Math.random() * 0.9;
        ptsRef.current.push({
          x: Math.random() * W,
          y: Math.random() * H,
          size: 0.4 + Math.random() * 1.6,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          op: Math.random(),
          opSpeed: (0.5 + Math.random() * 3.5) * 0.016,
          opDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (const p of ptsRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -2) p.x = W + 2;
        if (p.x > W + 2) p.x = -2;
        if (p.y < -2) p.y = H + 2;
        if (p.y > H + 2) p.y = -2;
        p.op += p.opSpeed * p.opDir;
        if (p.op >= 1) { p.op = 1; p.opDir = -1; }
        if (p.op <= 0.05) { p.op = 0.05; p.opDir = 1; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.op})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    function resize() {
      cancelAnimationFrame(rafRef.current);
      init();
      tick();
    }

    resize();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="bg-black w-full relative overflow-hidden flex flex-col items-center justify-start pt-20 box-border" style={{ minHeight: 350 }}>
      
      {/* Logo Image (replaces text) */}
      <a href="/" className="relative z-10 mb-2">
        <img
          src="/images/logu.png"
          alt="BAP Paris Auto Garage"
          className="h-[130px] md:h-[170px] w-auto object-contain"
          style={{ filter: "drop-shadow(0 0 18px rgba(219,0,0,0.45))" }}
        />
      </a>

      {/* Particle wrap */}
      <div ref={wrapRef} className="relative w-full flex-1">
        {/* Sharp glow line */}
        <div className="absolute top-0 left-1/2 z-30 pointer-events-none"
             style={{
               transform: "translateX(-50%)",
               width: "80%",
               height: 1,
               background: "linear-gradient(90deg, transparent 0%, #6366f1 25%, #38bdf8 50%, #6366f1 75%, transparent 100%)",
             }} />

        {/* Soft glow blur */}
        <div className="absolute top-0 left-1/2 z-30 pointer-events-none"
             style={{
               transform: "translateX(-50%) translateY(-3px)",
               width: "40%",
               height: 8,
               background: "linear-gradient(90deg, transparent, #38bdf8, transparent)",
               filter: "blur(5px)",
             }} />

        {/* Center bright spot */}
        <div className="absolute left-1/2 z-30 pointer-events-none rounded-full"
             style={{
               transform: "translateX(-50%) translateY(-4px)",
               top: 0,
               width: 80,
               height: 14,
               background: "rgba(56,189,248,0.95)",
               filter: "blur(8px)",
             }} />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-20"
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none"
             style={{
               height: 100,
               background: "linear-gradient(to bottom, transparent, #000)",
             }} />
      </div>
    </div>
  );
}