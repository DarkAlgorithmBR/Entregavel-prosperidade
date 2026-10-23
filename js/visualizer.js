/**
 * VISUALIZADORES CANVAS: ESCÁNER DE INTERFERENCIA Y ONDAS ARMÓNICAS EN TIEMPO REAL
 */

// 1. ESCÁNER DE INTERFERENCIA ELECTROMAGNÉTICA
class InterferenceScanner {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = this.canvas.offsetWidth || 340;
    this.height = this.canvas.height = this.canvas.offsetHeight || 140;
    
    this.state = "dirty"; // "dirty" (rojo/estática), "cleaning" (transición), "clean" (dorado/puro)
    this.progress = 0; // 0 a 1
    this.animFrame = null;
    this.particles = [];
    this.phase = 0;

    window.addEventListener("resize", () => this.resize());
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = this.canvas.offsetWidth || 340;
    this.height = this.canvas.height = this.canvas.offsetHeight || 140;
  }

  startCleaning(onComplete) {
    this.state = "cleaning";
    this.progress = 0;
    this.particles = [];

    // Generar partículas de purificación doradas
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 0.5,
        alpha: Math.random(),
        size: Math.random() * 3 + 1
      });
    }

    const duration = 4000; // 4 segundos de limpieza inmersiva
    const startTime = performance.now();

    const animateCleaning = (now) => {
      const elapsed = now - startTime;
      this.progress = Math.min(1, elapsed / duration);

      if (this.progress < 1) {
        requestAnimationFrame(animateCleaning);
      } else {
        this.state = "clean";
        if (onComplete) onComplete();
      }
    };

    requestAnimationFrame(animateCleaning);
  }

  reset() {
    this.state = "dirty";
    this.progress = 0;
    this.particles = [];
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

    // Fondo degradado del radar
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, "rgba(11, 15, 25, 0.95)");
    bgGrad.addColorStop(1, "rgba(19, 27, 46, 0.95)");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Líneas de cuadrícula sutil de escáner
    ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < width; x += 30) {
      ctx.moveTo(x, 0); ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 25) {
      ctx.moveTo(0, y); ctx.lineTo(width, y);
    }
    ctx.stroke();

    this.phase += 0.06;
    const centerY = height / 2;

    if (this.state === "dirty") {
      // ONDA ROJA CAÓTICA (Interferencia de Celulares y Ruido Electromagnético)
      ctx.beginPath();
      ctx.strokeStyle = "#EF4444";
      ctx.shadowColor = "#EF4444";
      ctx.shadowBlur = 12;
      ctx.lineWidth = 2.2;

      for (let x = 0; x < width; x += 2) {
        // Ruido fractal caótico
        const noise = (Math.sin(x * 0.15 + this.phase * 4) * 14) +
                      (Math.sin(x * 0.35 - this.phase * 2) * 10) +
                      ((Math.random() - 0.5) * 12);
        const y = centerY + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

    } else if (this.state === "cleaning") {
      // TRANSICIÓN DE PURIFICACIÓN: Lo rojo se aplana y emerge la onda de oro puro de 528Hz
      const t = this.progress; // 0 a 1

      // Interferencia roja desvaneciéndose
      ctx.beginPath();
      ctx.strokeStyle = `rgba(239, 68, 68, ${Math.max(0, 1 - t * 1.5)})`;
      ctx.lineWidth = 2 * (1 - t * 0.5);
      for (let x = 0; x < width; x += 3) {
        const chaos = ((Math.random() - 0.5) * 14 * (1 - t));
        const noise = Math.sin(x * 0.2 + this.phase * 3) * 15 * (1 - t) + chaos;
        const y = centerY + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Onda armónica dorada floreciendo
      ctx.beginPath();
      ctx.strokeStyle = `rgba(212, 175, 55, ${Math.min(1, t * 1.3)})`;
      ctx.shadowColor = "#D4AF37";
      ctx.shadowBlur = 15 * t;
      ctx.lineWidth = 2.8;

      for (let x = 0; x < width; x++) {
        const harmonic = Math.sin((x / 25) + this.phase * 1.5) * (18 * t) +
                         Math.sin((x / 50) + this.phase * 0.8) * (8 * t);
        const y = centerY + harmonic;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Partículas sagradas flotando hacia arriba
      ctx.fillStyle = "#F3E5AB";
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.008;
        if (p.alpha <= 0 || p.y < 0) {
          p.x = Math.random() * width;
          p.y = height;
          p.alpha = Math.random();
        }
        ctx.fillStyle = `rgba(243, 229, 171, ${Math.max(0, p.alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

    } else if (this.state === "clean") {
      // ONDA DORADA Y AZUL CELESTIAL PURA (528 Hz - CONEXIÓN CON SAN MIGUEL)
      // Doble onda entrelazada (frecuencia áurea)
      
      // Halo azul celestial de fondo
      ctx.beginPath();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 4;
      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x / 30) + this.phase * 1.2 + 0.3) * 16;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Onda principal en Oro Litúrgico
      ctx.beginPath();
      ctx.strokeStyle = "#D4AF37";
      ctx.shadowColor = "#F3E5AB";
      ctx.shadowBlur = 16;
      ctx.lineWidth = 2.6;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x / 30) + this.phase * 1.2) * 16;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }
}

// 2. VISUALIZADOR DE ONDAS EN TIEMPO REAL DEL REPRODUCTOR
class PlayerVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = this.canvas.offsetWidth || 340;
    this.height = this.canvas.height = this.canvas.offsetHeight || 160;

    this.dataArray = new Uint8Array(128);
    this.phase = 0;
    this.animFrame = null;

    window.addEventListener("resize", () => this.resize());
    this.startLoop();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = this.canvas.offsetWidth || 340;
    this.height = this.canvas.height = this.canvas.offsetHeight || 160;
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

    // Fondo oscuro con gradiente sacro
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, "#0B0F19");
    grad.addColorStop(1, "#131B2E");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    const isAudioPlaying = window.sacredAudio && window.sacredAudio.isPlaying;
    this.phase += 0.04;
    const centerY = height / 2;

    if (isAudioPlaying && window.sacredAudio.analyser) {
      window.sacredAudio.getByteTimeDomainData(this.dataArray);

      // Dibujar resplandor central
      const radGrad = ctx.createRadialGradient(width / 2, centerY, 5, width / 2, centerY, 90);
      radGrad.addColorStop(0, "rgba(212, 175, 55, 0.25)");
      radGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 90, 0, Math.PI * 2);
      ctx.fill();

      // Onda armónica azul de San Miguel (Capa 1)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
      ctx.lineWidth = 2;
      const sliceWidth = width * 1.0 / this.dataArray.length;
      let x = 0;

      for (let i = 0; i < this.dataArray.length; i++) {
        const v = this.dataArray[i] / 128.0;
        const y = (v * height / 2) + Math.sin(this.phase + i * 0.1) * 6;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();

      // Onda principal en Oro Litúrgico brillante (Capa 2)
      ctx.beginPath();
      ctx.strokeStyle = "#D4AF37";
      ctx.shadowColor = "#F3E5AB";
      ctx.shadowBlur = 18;
      ctx.lineWidth = 3;
      x = 0;

      for (let i = 0; i < this.dataArray.length; i++) {
        const v = this.dataArray[i] / 128.0;
        const y = v * height / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

    } else {
      // Estado en reposo: Onda suave dorada respirando
      ctx.beginPath();
      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 1.8;

      for (let x = 0; x < width; x += 2) {
        const y = centerY + Math.sin((x / 40) + this.phase) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
}

// Inicialización diferida
window.initVisualizers = function() {
  window.scannerInstance = new InterferenceScanner("scannerCanvas");
  window.playerVisualizerInstance = new PlayerVisualizer("playerCanvas");
};
