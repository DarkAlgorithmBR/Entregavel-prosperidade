/**
 * MOTOR DE AUDIO SACRO Y SINTETIZADOR DE FRECUENCIAS INVERSAS
 * Desarrollado con Web Audio API pura para cero latencia, cero dependencias y sonido envolvente.
 */

class SacredAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.currentMode = "inversa1930"; // "inversa1930", "abundancia432", "nocturna174"
    this.volume = 0.8;
    this.oscillators = [];
    this.gainNodes = [];
    this.masterGain = null;
    this.analyser = null;
    this.filterNode = null;
    this.pannerLeft = null;
    this.pannerRight = null;
    
    // Temporizador
    this.timerDuration = 7 * 60; // 7 minutos por defecto
    this.timerRemaining = 7 * 60;
    this.timerInterval = null;
    this.onTimerTick = null;
    this.onTimerEnd = null;
    this.onStateChange = null;

    // Soporte para audio grabado / MP3
    this.audioElement = null;
    this.audioElementSource = null;
    this.useMp3Mode = false;
  }

  // Inicializar el contexto de audio tras la primera interacción del usuario
  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      // Master Gain
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

      // Analizador de espectro para el Canvas
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.85;

      // Filtro Lowpass suave estilo catedral (suaviza armónicos)
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(850, this.audioCtx.currentTime);
      this.filterNode.Q.setValueAtTime(1.2, this.audioCtx.currentTime);

      // Conexión
      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  // Configuración de frecuencias por preset
  getPresetFrequencies(mode) {
    switch (mode) {
      case "inversa1930":
        // 528 Hz (Milagro y Transformación de ADN) + 264 Hz (Sub-octava) + 1056 Hz (Brillo) + 8Hz Binaural Alpha
        return {
          name: "Frecuencia Inversa Original 1930 (528 Hz)",
          baseFreq: 528,
          harmonics: [
            { freq: 264, type: "sine", gain: 0.28, detune: -2 },
            { freq: 528, type: "triangle", gain: 0.35, detune: 0 },
            { freq: 536, type: "sine", gain: 0.22, detune: 4 }, // Batido binaural Alpha (8Hz)
            { freq: 792, type: "sine", gain: 0.12, detune: 2 }, // Quinta armónica (Paz)
            { freq: 1056, type: "sine", gain: 0.08, detune: -1 } // Brillo angelical
          ],
          filterFreq: 900
        };

      case "abundancia432":
        // 432 Hz (Armonía Cósmica de Sanación) + 888 Hz (Abundancia Cristológica y Multiplicación)
        return {
          name: "Frecuencia de Abundancia de Padre Pío (432 Hz + 888 Hz)",
          baseFreq: 432,
          harmonics: [
            { freq: 216, type: "sine", gain: 0.30, detune: -3 },
            { freq: 432, type: "triangle", gain: 0.35, detune: 0 },
            { freq: 438, type: "sine", gain: 0.20, detune: 3 }, // Batido Theta 6Hz
            { freq: 888, type: "sine", gain: 0.15, detune: 0 }, // Frecuencia de la Divina Abundancia
            { freq: 1296, type: "sine", gain: 0.06, detune: 1 }
          ],
          filterFreq: 1100
        };

      case "nocturna174":
        // 174 Hz (Anestésico Natural contra el Dolor y Estrés) + 396 Hz (Liberación de Culpa y Miedo a la Pobreza)
        return {
          name: "Frecuencia Nocturna de Restauración Profunda (174 Hz + 396 Hz)",
          baseFreq: 174,
          harmonics: [
            { freq: 87, type: "sine", gain: 0.35, detune: 0 }, // Bajo profundo relajante
            { freq: 174, type: "triangle", gain: 0.30, detune: -1 },
            { freq: 177, type: "sine", gain: 0.25, detune: 2 }, // Batido Delta 3Hz (Sueño profundo)
            { freq: 396, type: "sine", gain: 0.18, detune: 0 },
            { freq: 528, type: "sine", gain: 0.07, detune: 0 }
          ],
          filterFreq: 550 // Más cálido y oscuro para dormir
        };

      default:
        return this.getPresetFrequencies("inversa1930");
    }
  }

  // Reproducir sintetizador
  play(mode = this.currentMode) {
    this.initContext();

    if (this.isPlaying) {
      this.stop();
    }

    this.currentMode = mode;
    const preset = this.getPresetFrequencies(mode);

    // Ajustar filtro suave
    this.filterNode.frequency.setTargetAtTime(preset.filterFreq, this.audioCtx.currentTime, 0.5);

    // Crear generadores
    this.oscillators = [];
    this.gainNodes = [];

    const now = this.audioCtx.currentTime;

    preset.harmonics.forEach((h) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = h.type;
      osc.frequency.setValueAtTime(h.freq, now);
      if (h.detune) osc.detune.setValueAtTime(h.detune, now);

      // Fade-in celestial suave para evitar chasquidos
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(h.gain, now + 2.5);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(now);

      this.oscillators.push(osc);
      this.gainNodes.push(gain);
    });

    this.isPlaying = true;
    this.startTimer();
    this.playSacredBell(0.4); // Suena una campana suave al encender el canal sagrado

    if (this.onStateChange) {
      this.onStateChange({ isPlaying: true, mode: this.currentMode, preset });
    }
  }

  // Detener la reproducción
  stop() {
    if (!this.isPlaying) return;

    if (this.audioCtx && this.oscillators.length > 0) {
      const now = this.audioCtx.currentTime;
      // Fade-out suave
      this.gainNodes.forEach(g => {
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      });

      const oldOscs = [...this.oscillators];
      setTimeout(() => {
        oldOscs.forEach(osc => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {
            // Ya detenido
          }
        });
      }, 1300);

      this.oscillators = [];
      this.gainNodes = [];
    }

    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }

    this.isPlaying = false;
    this.stopTimer();

    if (this.onStateChange) {
      this.onStateChange({ isPlaying: false, mode: this.currentMode });
    }
  }

  // Campanada litúrgica sintetizada (Campana de San Giovanni Rotondo)
  playSacredBell(intensity = 0.5) {
    if (!this.audioCtx) this.initContext();

    const now = this.audioCtx.currentTime;
    const baseBellFreq = 440; // Campana en La
    const bellHarmonics = [
      { ratio: 1.0, decay: 4.0, gain: 0.3 * intensity },
      { ratio: 1.2, decay: 3.5, gain: 0.25 * intensity }, // Hum
      { ratio: 1.5, decay: 3.0, gain: 0.2 * intensity },  // Tierce
      { ratio: 2.0, decay: 2.2, gain: 0.15 * intensity }, // Quint
      { ratio: 2.76, decay: 1.5, gain: 0.1 * intensity } // Brillo metálico
    ];

    bellHarmonics.forEach(h => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(baseBellFreq * h.ratio, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(h.gain, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + h.decay);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + h.decay + 0.1);
    });
  }

  // Control de Volumen General
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.1);
    }
  }

  // Configuración del Temporizador (segundos)
  setTimerDuration(seconds) {
    this.timerDuration = seconds;
    this.timerRemaining = seconds;
    if (this.onTimerTick) {
      this.onTimerTick(this.timerRemaining, this.timerDuration);
    }
  }

  startTimer() {
    this.stopTimer();
    if (this.timerDuration === 0) return; // Modo continuo

    this.timerRemaining = this.timerDuration;
    if (this.onTimerTick) {
      this.onTimerTick(this.timerRemaining, this.timerDuration);
    }

    this.timerInterval = setInterval(() => {
      this.timerRemaining--;
      if (this.onTimerTick) {
        this.onTimerTick(this.timerRemaining, this.timerDuration);
      }

      if (this.timerRemaining <= 0) {
        this.stop();
        this.playSacredBell(0.3); // Campana de cierre
        if (this.onTimerEnd) {
          this.onTimerEnd();
        }
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Obtener datos para visualizador Canvas
  getByteFrequencyData(array) {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(array);
    }
  }

  getByteTimeDomainData(array) {
    if (this.analyser) {
      this.analyser.getByteTimeDomainData(array);
    }
  }

  // Soporte para conectar archivo MP3 real opcional
  attachAudioElement(audioEl) {
    this.initContext();
    this.audioElement = audioEl;
    if (!this.audioElementSource) {
      this.audioElementSource = this.audioCtx.createMediaElementSource(audioEl);
      this.audioElementSource.connect(this.masterGain);
    }
  }
}

// Instancia global
window.sacredAudio = new SacredAudioEngine();
