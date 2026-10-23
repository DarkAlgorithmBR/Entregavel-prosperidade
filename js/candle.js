/**
 * VELA VOTIVA VIRTUAL Y ALTAR DE PETICIONES
 * Simulación de llama viva con Canvas, partículas de calor e incienso, y persistencia de 7 días.
 */

class SacredCandle {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = this.canvas.offsetWidth || 300;
    this.height = this.canvas.height = this.canvas.offsetHeight || 280;

    this.isLit = false;
    this.litTimestamp = null;
    this.intentionData = null;
    this.flamePhase = 0;
    this.particles = [];
    this.animFrame = null;

    this.loadState();
    window.addEventListener("resize", () => this.resize());
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = this.canvas.offsetWidth || 300;
    this.height = this.canvas.height = this.canvas.offsetHeight || 280;
  }

  loadState() {
    try {
      const saved = localStorage.getItem("salmo_candle_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
        
        // Verificar si los 7 días aún están vigentes
        if (now - parsed.litTimestamp < sevenDaysMs) {
          this.isLit = true;
          this.litTimestamp = parsed.litTimestamp;
          this.intentionData = parsed.intentionData;
        } else {
          // Expiró la vela
          this.isLit = false;
          this.intentionData = parsed.intentionData;
        }
      }
    } catch (e) {
      console.error("Error al cargar estado de vela", e);
    }
  }

  saveState() {
    try {
      const state = {
        isLit: this.isLit,
        litTimestamp: this.litTimestamp,
        intentionData: this.intentionData
      };
      localStorage.setItem("salmo_candle_state", JSON.stringify(state));
    } catch (e) {
      console.error("Error al guardar vela", e);
    }
  }

  light(intentionData) {
    this.isLit = true;
    this.litTimestamp = Date.now();
    this.intentionData = intentionData;
    this.saveState();

    if (window.sacredAudio) {
      window.sacredAudio.playSacredBell(0.8);
    }
  }

  extinguish() {
    this.isLit = false;
    this.saveState();
  }

  getTimeRemaining() {
    if (!this.isLit || !this.litTimestamp) return null;
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const elapsed = Date.now() - this.litTimestamp;
    const remainingMs = Math.max(0, sevenDaysMs - elapsed);

    const totalHours = Math.floor(remainingMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, remainingMs };
  }

  startLoop() {
    const render = () => {
      this.draw();
      this.animFrame = requestAnimationFrame(render);
    };
    render();
  }

  draw() {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const candleTopY = height * 0.48;
    const candleWidth = 56;
    const candleHeight = height * 0.44;

    this.flamePhase += 0.08;

    // 1. Resplandor del cirio (halo áureo en la habitación)
    if (this.isLit) {
      const flicker = Math.sin(this.flamePhase * 3) * 6 + Math.cos(this.flamePhase * 7) * 3;
      const glowGrad = ctx.createRadialGradient(
        centerX, candleTopY - 35, 10,
        centerX, candleTopY - 35, 120 + flicker
      );
      glowGrad.addColorStop(0, "rgba(255, 215, 0, 0.45)");
      glowGrad.addColorStop(0.4, "rgba(245, 158, 11, 0.18)");
      glowGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, candleTopY - 35, 130 + flicker, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Base de Latón Litúrgico / Candelabro Dorado
    const baseGrad = ctx.createLinearGradient(centerX - 60, height - 35, centerX + 60, height - 35);
    baseGrad.addColorStop(0, "#785816");
    baseGrad.addColorStop(0.5, "#D4AF37");
    baseGrad.addColorStop(1, "#533D0D");
    ctx.fillStyle = baseGrad;
    ctx.beginPath();
    ctx.ellipse(centerX, height - 20, 58, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 3. Cirio Pascual / Vela de Cera Natural
    const waxGrad = ctx.createLinearGradient(centerX - candleWidth / 2, 0, centerX + candleWidth / 2, 0);
    waxGrad.addColorStop(0, "#E5E1D3");
    waxGrad.addColorStop(0.3, "#FFFDF7");
    waxGrad.addColorStop(0.7, "#FAF5E4");
    waxGrad.addColorStop(1, "#C2BCA8");

    // Cuerpo cilíndrico
    ctx.fillStyle = waxGrad;
    ctx.beginPath();
    ctx.rect(centerX - candleWidth / 2, candleTopY, candleWidth, candleHeight - 20);
    ctx.fill();

    // Gotas de cera derretida ornamentales
    ctx.fillStyle = "#FFFDF7";
    ctx.beginPath();
    ctx.arc(centerX - 16, candleTopY + 16, 5, 0, Math.PI * 2);
    ctx.arc(centerX + 18, candleTopY + 24, 6, 0, Math.PI * 2);
    ctx.arc(centerX + 6, candleTopY + 38, 4, 0, Math.PI * 2);
    ctx.fill();

    // Parte superior cóncava de la vela
    const topGrad = ctx.createLinearGradient(0, candleTopY - 6, 0, candleTopY + 6);
    topGrad.addColorStop(0, "#B8B097");
    topGrad.addColorStop(1, "#EFEAD8");
    ctx.fillStyle = topGrad;
    ctx.beginPath();
    ctx.ellipse(centerX, candleTopY, candleWidth / 2, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pabilo / Mecha
    ctx.strokeStyle = "#1A1A1A";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(centerX, candleTopY);
    ctx.quadraticCurveTo(centerX + 1, candleTopY - 12, centerX - 1, candleTopY - 16);
    ctx.stroke();

    // 4. LLAMA VIVA EN TIEMPO REAL
    if (this.isLit) {
      const flameW = 12 + Math.sin(this.flamePhase * 4) * 2;
      const flameH = 42 + Math.cos(this.flamePhase * 3) * 4;
      const flameSway = Math.sin(this.flamePhase * 2.5) * 4 + Math.sin(this.flamePhase * 6) * 1.5;
      const flameBaseY = candleTopY - 14;
      const flameTipX = centerX + flameSway;
      const flameTipY = flameBaseY - flameH;

      // Capa Externa: Resplandor Ámbar
      ctx.beginPath();
      ctx.fillStyle = "rgba(245, 158, 11, 0.75)";
      ctx.moveTo(centerX - flameW, flameBaseY);
      ctx.quadraticCurveTo(centerX - flameW * 1.2, flameBaseY - flameH * 0.5, flameTipX, flameTipY);
      ctx.quadraticCurveTo(centerX + flameW * 1.2, flameBaseY - flameH * 0.5, centerX + flameW, flameBaseY);
      ctx.closePath();
      ctx.fill();

      // Capa Media: Oro y Blanco Celestial
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 245, 180, 0.95)";
      ctx.moveTo(centerX - flameW * 0.65, flameBaseY);
      ctx.quadraticCurveTo(centerX - flameW * 0.8, flameBaseY - flameH * 0.45, flameTipX, flameTipY + 6);
      ctx.quadraticCurveTo(centerX + flameW * 0.8, flameBaseY - flameH * 0.45, centerX + flameW * 0.65, flameBaseY);
      ctx.closePath();
      ctx.fill();

      // Núcleo Azul (Base mística de la llama)
      ctx.beginPath();
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
      ctx.ellipse(centerX, flameBaseY - 3, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Chispas e incienso flotante
      if (Math.random() < 0.25) {
        this.particles.push({
          x: flameTipX + (Math.random() - 0.5) * 6,
          y: flameTipY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -Math.random() * 2 - 1,
          size: Math.random() * 2 + 1,
          alpha: 1
        });
      }

      // Dibujar partículas
      ctx.fillStyle = "#F3E5AB";
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0 || p.y < 20) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(243, 229, 171, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

window.initCandleInstance = function() {
  window.candleInstance = new SacredCandle("candleCanvas");
};
