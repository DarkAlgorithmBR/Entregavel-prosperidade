/**
 * APLICACIÓN PRINCIPAL: ESTADOS, EVENTOS Y PERSISTENCIA (ANTI-REEMBOLSO)
 */

class SacredApp {
  constructor() {
    this.userData = {
      name: "",
      urgencia: "deudas",
      onboardingComplete: false,
      streakDays: 1,
      lastListenDate: null,
      completedDays: [1],
      isCleaned: false,
      cleanedTimestamp: null,
      peticiones: [],
      checklistState: {},
      fontSize: "normal", // "normal", "large", "xlarge"
      lastOracleCard: null
    };

    this.activeTab = "tab-santuario";
    this.currentVerseIndex = 0;
    this.verseInterval = null;
  }

  init() {
    this.loadUserData();
    this.applyFontSize();
    this.setupEventListeners();
    this.renderInitialUI();
    this.checkOnboarding();
    
    // Inicializar visualizadores y vela tras carga del DOM
    if (window.initVisualizers) window.initVisualizers();
    if (window.initCandleInstance) window.initCandleInstance();
    
    this.updateCandleDisplay();
    this.renderVerses();
    this.renderFaq();
    this.renderPeticiones();
    this.renderChecklist();
    this.renderMedals();
    this.renderDailyMessage();
  }

  // --- PERSISTENCIA LOCALSTORAGE ---
  loadUserData() {
    try {
      const saved = localStorage.getItem("salmo_prohibido_userdata");
      if (saved) {
        this.userData = { ...this.userData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Error al cargar datos", e);
    }
  }

  saveUserData() {
    try {
      localStorage.setItem("salmo_prohibido_userdata", JSON.stringify(this.userData));
    } catch (e) {
      console.error("Error al guardar datos", e);
    }
  }

  // --- ACCESIBILIDAD: TAMAÑO DE FUENTE ---
  toggleFontSize() {
    const sizes = ["normal", "large", "xlarge"];
    const currentIndex = sizes.indexOf(this.userData.fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    this.userData.fontSize = sizes[nextIndex];
    this.saveUserData();
    this.applyFontSize();
  }

  applyFontSize() {
    document.body.classList.remove("font-large", "font-xlarge");
    if (this.userData.fontSize === "large") {
      document.body.classList.add("font-large");
    } else if (this.userData.fontSize === "xlarge") {
      document.body.classList.add("font-xlarge");
    }
    const indicator = document.getElementById("fontSizeIndicator");
    if (indicator) {
      indicator.textContent = this.userData.fontSize === "normal" ? "A" : (this.userData.fontSize === "large" ? "A+" : "A++");
    }
  }

  // --- NAVEGACIÓN ENTRE PESTAÑAS (TABS) ---
  switchTab(tabId) {
    this.activeTab = tabId;
    
    // Ocultar todos los contenidos de pestaña
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    
    // Mostrar la seleccionada
    const target = document.getElementById(tabId);
    if (target) target.classList.add("active");

    // Actualizar barra de navegación inferior
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Si entra al altar, redibujar la vela
    if (tabId === "tab-altar" && window.candleInstance) {
      window.candleInstance.resize();
    }
    // Si entra al reproductor, redibujar visualizador
    if (tabId === "tab-salmo" && window.playerVisualizerInstance) {
      window.playerVisualizerInstance.resize();
    }
  }

  // --- GESTIÓN DE EVENTOS ---
  setupEventListeners() {
    // Pestañas inferiores
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Botones de acceso rápido
    document.querySelectorAll("[data-action='goto-salmo']").forEach(btn => {
      btn.addEventListener("click", () => this.switchTab("tab-salmo"));
    });

    document.querySelectorAll("[data-action='goto-altar']").forEach(btn => {
      btn.addEventListener("click", () => this.switchTab("tab-altar"));
    });

    document.querySelectorAll("[data-action='goto-boveda']").forEach(btn => {
      btn.addEventListener("click", () => this.switchTab("tab-boveda"));
    });

    // Control de fuente A / A+
    const btnFont = document.getElementById("btnToggleFont");
    if (btnFont) btnFont.addEventListener("click", () => this.toggleFontSize());

    // Botón Acolhimento Pastoral "Hablar con Hermana Clara"
    const btnClara = document.getElementById("btnPastoralHelp");
    if (btnClara) {
      btnClara.addEventListener("click", () => this.openModal("modalPastoralHelp"));
    }

    // Modal Onboarding
    const formOnboarding = document.getElementById("formOnboarding");
    if (formOnboarding) {
      formOnboarding.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("onboardingName");
        const urgenciaSelect = document.getElementById("onboardingUrgencia");
        
        this.userData.name = (nameInput.value || "Peregrino de Fe").trim();
        this.userData.urgencia = urgenciaSelect.value;
        this.userData.onboardingComplete = true;
        this.saveUserData();
        
        this.closeModal("modalOnboarding");
        this.renderInitialUI();
        if (window.sacredAudio) window.sacredAudio.playSacredBell(0.6);
      });
    }

    // Botón Iniciar Limpieza de Interferencia
    const btnClean = document.getElementById("btnStartCleaning");
    if (btnClean) {
      btnClean.addEventListener("click", () => this.handleInterferenceCleaning());
    }

    // Controles del Reproductor (Play / Pause)
    const btnPlay = document.getElementById("btnPlaySalmo");
    if (btnPlay) {
      btnPlay.addEventListener("click", () => this.toggleAudioPlayback());
    }

    // Selector de Frecuencias
    document.querySelectorAll(".freq-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".freq-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.mode;
        if (window.sacredAudio) {
          window.sacredAudio.play(mode);
        }
      });
    });

    // Selector de Temporizador
    const timerSelect = document.getElementById("playerTimerSelect");
    if (timerSelect) {
      timerSelect.addEventListener("change", (e) => {
        const seconds = parseInt(e.target.value, 10);
        if (window.sacredAudio) {
          window.sacredAudio.setTimerDuration(seconds);
        }
      });
    }

    // Sub-pestañas de Bóveda (Bonus 1, 2, 3)
    document.querySelectorAll(".bonus-nav-item").forEach(item => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".bonus-nav-item").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".bonus-container-pane").forEach(p => p.classList.remove("active"));
        item.classList.add("active");
        const paneId = item.dataset.pane;
        const pane = document.getElementById(paneId);
        if (pane) pane.classList.add("active");
      });
    });

    // Oráculo de San Miguel: Revelar Carta
    const btnOracle = document.getElementById("btnDrawOracle");
    if (btnOracle) {
      btnOracle.addEventListener("click", () => this.drawOracleCard());
    }

    // Botón Invocación Matinal
    const btnMorningInvocation = document.getElementById("btnMorningInvocation");
    if (btnMorningInvocation) {
      btnMorningInvocation.addEventListener("click", () => {
        if (window.sacredAudio) {
          window.sacredAudio.playSacredBell(1.0);
          window.sacredAudio.play("inversa1930");
          this.showToast("Invocación activada: Frecuencia de protección de San Miguel sonando.");
        }
      });
    }

    // Botón Activar Modo Nocturno (Bono 3)
    const btnNightMode = document.getElementById("btnStartNightMode");
    if (btnNightMode) {
      btnNightMode.addEventListener("click", () => {
        if (window.sacredAudio) {
          window.sacredAudio.setTimerDuration(15 * 60); // 15 minutos para dormir
          window.sacredAudio.play("nocturna174");
          this.showToast("Modo Sueño Sagrado activo: Frecuencia Delta sonando por 15 minutos.");
        }
      });
    }

    // Botón Encender Vela en el Altar
    const btnLightCandle = document.getElementById("btnOpenCandleModal");
    if (btnLightCandle) {
      btnLightCandle.addEventListener("click", () => this.openModal("modalCandleIntention"));
    }

    // Formulario de Petición de Vela
    const formCandle = document.getElementById("formCandleIntention");
    if (formCandle) {
      formCandle.addEventListener("submit", (e) => {
        e.preventDefault();
        const cat = document.getElementById("candleCategory").value;
        const txt = document.getElementById("candleText").value.trim();
        if (!txt) return;

        const intentionData = {
          id: Date.now(),
          categoria: cat,
          texto: txt,
          fecha: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
          graciaRecibida: false
        };

        if (window.candleInstance) {
          window.candleInstance.light(intentionData);
        }

        // Agregar a la lista de peticiones
        this.userData.peticiones.unshift(intentionData);
        this.saveUserData();
        
        this.closeModal("modalCandleIntention");
        document.getElementById("candleText").value = "";
        this.updateCandleDisplay();
        this.renderPeticiones();
        this.showToast("Tu vela ha sido encendida ante San Miguel por los próximos 7 días.");
      });
    }

    // Botón Apagar/Renovar Vela
    const btnExtinguish = document.getElementById("btnExtinguishCandle");
    if (btnExtinguish) {
      btnExtinguish.addEventListener("click", () => {
        if (window.candleInstance) {
          window.candleInstance.extinguish();
          this.updateCandleDisplay();
          this.showToast("Vela renovada. Puedes encender una nueva intención.");
        }
      });
    }

    // Modales de cierre
    document.querySelectorAll(".modal-close-btn, [data-close-modal]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-overlay");
        if (modal) modal.classList.remove("active");
      });
    });

    // Callback de audio
    if (window.sacredAudio) {
      window.sacredAudio.onStateChange = (state) => {
        this.updatePlayerButtons(state.isPlaying);
      };

      window.sacredAudio.onTimerTick = (rem, dur) => {
        this.updateTimerDisplay(rem);
      };

      window.sacredAudio.onTimerEnd = () => {
        this.markDayCompleted();
        this.showToast("¡Has completado tu consagración de hoy! Tu canal sigue limpio.");
      };
    }
  }

  // --- LIMPIEZA DE INTERFERENCIA ELECTROMAGNÉTICA ---
  handleInterferenceCleaning() {
    const btnClean = document.getElementById("btnStartCleaning");
    const statusVal = document.getElementById("scannerStatusVal");
    const statusBadge = document.getElementById("scannerStatusBadge");
    
    if (btnClean) {
      btnClean.disabled = true;
      btnClean.textContent = "Neutralizando Estática Electromagnética...";
    }

    if (window.sacredAudio) {
      window.sacredAudio.playSacredBell(0.4);
    }

    if (window.scannerInstance) {
      window.scannerInstance.startCleaning(() => {
        this.userData.isCleaned = true;
        this.userData.cleanedTimestamp = Date.now();
        this.saveUserData();

        if (statusVal) {
          statusVal.innerHTML = `<span style="color: var(--green-restored)">0.0% — Puro</span>`;
        }
        if (statusBadge) {
          statusBadge.className = "card-badge badge-success";
          statusBadge.textContent = "Conexión Restaurada";
        }
        if (btnClean) {
          btnClean.disabled = false;
          btnClean.innerHTML = `<span>✓</span> Frecuencia Limpia (Volver a Escanear)`;
        }

        if (window.sacredAudio) {
          window.sacredAudio.playSacredBell(0.8);
        }

        this.showToast("¡Estática eliminada! Línea directa con San Miguel activada.");
      });
    }
  }

  // --- REPRODUCTOR & VERSOS SINCRONIZADOS ---
  toggleAudioPlayback() {
    if (!window.sacredAudio) return;

    if (window.sacredAudio.isPlaying) {
      window.sacredAudio.stop();
      this.stopVerseSync();
    } else {
      window.sacredAudio.play();
      this.startVerseSync();
    }
  }

  updatePlayerButtons(isPlaying) {
    const btnPlay = document.getElementById("btnPlaySalmo");
    if (btnPlay) {
      btnPlay.innerHTML = isPlaying ? "⏸" : "▶";
      btnPlay.setAttribute("aria-label", isPlaying ? "Pausar Salmo" : "Reproducir Salmo");
    }
    const indicator = document.getElementById("headerAudioStatus");
    if (indicator) {
      indicator.textContent = isPlaying ? "Sintonizado" : "En Reposo";
      indicator.style.color = isPlaying ? "var(--green-restored)" : "var(--text-muted)";
    }
  }

  startVerseSync() {
    this.stopVerseSync();
    this.currentVerseIndex = 0;
    this.highlightVerse(0);

    // Cambiar verso suavemente cada 35 segundos para una meditación guiada
    this.verseInterval = setInterval(() => {
      this.currentVerseIndex = (this.currentVerseIndex + 1) % SACRED_DATA.salmo.versos.length;
      this.highlightVerse(this.currentVerseIndex);
    }, 35000);
  }

  stopVerseSync() {
    if (this.verseInterval) {
      clearInterval(this.verseInterval);
      this.verseInterval = null;
    }
  }

  highlightVerse(index) {
    document.querySelectorAll(".verse-card").forEach((el, i) => {
      el.classList.toggle("current", i === index);
      if (i === index) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  updateTimerDisplay(secondsRemaining) {
    const el = document.getElementById("playerTimerDisplay");
    if (!el) return;
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    el.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // --- ORÁCULO DE SAN MIGUEL (BONO 1) ---
  drawOracleCard() {
    const deck = SACRED_DATA.bono1.oraculo;
    const randomCard = deck[Math.floor(Math.random() * deck.length)];
    this.userData.lastOracleCard = randomCard;
    this.saveUserData();

    const container = document.getElementById("oracleCardContainer");
    if (!container) return;

    if (window.sacredAudio) window.sacredAudio.playSacredBell(0.6);

    container.innerHTML = `
      <div class="oracle-icon-large">${randomCard.simbolo}</div>
      <div class="oracle-card-title">${randomCard.titulo}</div>
      <div class="oracle-significance">${randomCard.significado}</div>
      <p class="oracle-message">${randomCard.mensaje}</p>
      <div class="oracle-action-box">
        <strong style="color: var(--gold-light);">Paso de fe para hoy:</strong><br>
        ${randomCard.accion}
      </div>
      <div class="oracle-verse-quote">"${randomCard.versiculo}"</div>
    `;
  }

  // --- CHECKLIST DEL MANTO DE SAN JOSÉ (BONO 2) ---
  renderChecklist() {
    const container = document.getElementById("sanJoseChecklistContainer");
    if (!container) return;

    const list = SACRED_DATA.bono2.checklistHogar;
    container.innerHTML = list.map(item => {
      const isChecked = !!this.userData.checklistState[item.id];
      return `
        <div class="checklist-item ${isChecked ? 'checked' : ''}" data-item-id="${item.id}">
          <div class="checklist-checkbox">${isChecked ? '✓' : ''}</div>
          <div style="font-size: calc(0.88rem * var(--font-scale));">${item.texto}</div>
        </div>
      `;
    }).join("");

    container.querySelectorAll(".checklist-item").forEach(item => {
      item.addEventListener("click", () => {
        const id = item.dataset.itemId;
        this.userData.checklistState[id] = !this.userData.checklistState[id];
        this.saveUserData();
        this.renderChecklist();
      });
    });
  }

  // --- ALTAR: VELAS Y PETICIONES ---
  updateCandleDisplay() {
    const btnOpen = document.getElementById("btnOpenCandleModal");
    const infoBox = document.getElementById("candleInfoBox");
    const countdownEl = document.getElementById("candleCountdown");
    const activeIntentionEl = document.getElementById("candleActiveIntention");
    const btnExtinguish = document.getElementById("btnExtinguishCandle");

    if (window.candleInstance && window.candleInstance.isLit) {
      if (btnOpen) btnOpen.style.display = "none";
      if (infoBox) infoBox.style.display = "block";
      if (btnExtinguish) btnExtinguish.style.display = "inline-flex";

      const rem = window.candleInstance.getTimeRemaining();
      if (rem && countdownEl) {
        countdownEl.textContent = `${rem.days}d ${rem.hours}h ${rem.minutes}m restantes`;
      }
      if (activeIntentionEl && window.candleInstance.intentionData) {
        activeIntentionEl.textContent = `"${window.candleInstance.intentionData.texto}"`;
      }
    } else {
      if (btnOpen) btnOpen.style.display = "flex";
      if (infoBox) infoBox.style.display = "none";
      if (btnExtinguish) btnExtinguish.style.display = "none";
    }
  }

  renderPeticiones() {
    const container = document.getElementById("peticionesListContainer");
    if (!container) return;

    if (this.userData.peticiones.length === 0) {
      container.innerHTML = `
        <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 12px;">
          No tienes intenciones registradas aún. Enciende tu primera vela para consagrar tu pedido.
        </p>
      `;
      return;
    }

    container.innerHTML = this.userData.peticiones.map(p => {
      return `
        <div class="peticion-card ${p.graciaRecibida ? 'gracia-recibida' : ''}" id="peticion-${p.id}">
          <div class="peticion-header">
            <span class="peticion-categoria">${p.categoria}</span>
            <span class="peticion-fecha">${p.fecha}</span>
          </div>
          <div class="peticion-texto">${p.texto}</div>
          ${p.graciaRecibida ? `
            <div style="color: var(--green-restored); font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 4px;">
              <span>🌟</span> ¡Gracia Alcanzada y Testimonio Registrado!
            </div>
          ` : `
            <button class="btn-gracia-alcanzada" onclick="window.sacredApp.markGracia(${p.id})">
              <span>★</span> Marcar como "¡Gracia Alcanzada!"
            </button>
          `}
        </div>
      `;
    }).join("");
  }

  markGracia(id) {
    const item = this.userData.peticiones.find(p => p.id === id);
    if (item) {
      item.graciaRecibida = true;
      this.saveUserData();
      this.renderPeticiones();
      if (window.sacredAudio) window.sacredAudio.playSacredBell(1.0);
      this.showToast("¡Alabado sea Dios! Testimonio registrado en el Mural de Milagros.");
    }
  }

  // --- JORNADA DE 60 DÍAS & MEDALLAS ---
  markDayCompleted() {
    const today = new Date().toDateString();
    if (this.userData.lastListenDate !== today) {
      this.userData.lastListenDate = today;
      this.userData.streakDays = (this.userData.streakDays || 0) + 1;
      
      const currentDayNumber = this.userData.streakDays;
      if (!this.userData.completedDays.includes(currentDayNumber)) {
        this.userData.completedDays.push(currentDayNumber);
      }
      this.saveUserData();
      this.renderInitialUI();
      this.renderMedals();
    }
  }

  renderMedals() {
    const container = document.getElementById("medalsGridContainer");
    if (!container) return;

    const streak = this.userData.streakDays || 1;
    const medallas = SACRED_DATA.medallas;

    container.innerHTML = medallas.map(m => {
      const isUnlocked = streak >= m.diaRequerido;
      return `
        <div class="medal-badge-box ${isUnlocked ? 'unlocked' : ''}" title="${m.desc}">
          <div class="medal-icon">${m.icono}</div>
          <div class="medal-name">${m.nombre}</div>
          <div style="font-size: 0.6rem; color: var(--text-muted);">${m.diaRequerido} Días</div>
        </div>
      `;
    }).join("");
  }

  renderDailyMessage() {
    const container = document.getElementById("dailyGuidanceContainer");
    if (!container) return;

    const streak = Math.min(60, this.userData.streakDays || 1);
    const dayData = SACRED_DATA.jornada60Dias.find(d => d.dia === streak) || SACRED_DATA.jornada60Dias[0];

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
        <span style="font-size: 0.75rem; color: var(--gold-primary); font-weight: 700; text-transform: uppercase;">
          Día ${dayData.dia} de Consagración — Fase ${dayData.fase}
        </span>
        <span style="font-size: 0.75rem; color: var(--blue-michael);">${dayData.versiculo}</span>
      </div>
      <div style="font-family: var(--font-serif); font-size: calc(1rem * var(--font-scale)); color: var(--gold-light); margin-bottom: 6px; font-weight: 600;">
        "${dayData.titulo}"
      </div>
      <p style="font-size: calc(0.85rem * var(--font-scale)); font-style: italic; color: #E2E8F0; margin-bottom: 8px;">
        «${dayData.citaPadrePio}» — Padre Pío
      </p>
      <div style="background: rgba(212, 175, 55, 0.08); padding: 8px 10px; border-radius: 4px; font-size: calc(0.8rem * var(--font-scale)); border-left: 2px solid var(--gold-primary);">
        <strong>Consigna de Hoy:</strong> ${dayData.tarea}
      </div>
    `;
  }

  // --- RENDER DE ELEMENTOS ESTÁTICOS Y VERSOS ---
  renderVerses() {
    const container = document.getElementById("versesListContainer");
    if (!container) return;

    const versos = SACRED_DATA.salmo.versos;
    container.innerHTML = versos.map(v => {
      return `
        <div class="verse-card" id="verse-${v.num}">
          <div class="verse-latin">${v.num}. ${v.latin}</div>
          <div class="verse-espanol">${v.espanol}</div>
          <div class="verse-guia">
            <span>✨</span> <em>${v.guia}</em>
          </div>
        </div>
      `;
    }).join("");
  }

  renderFaq() {
    const container = document.getElementById("faqAccordionContainer");
    if (!container) return;

    const faqs = SACRED_DATA.faqPastoral;
    container.innerHTML = faqs.map((faq, i) => {
      return `
        <div class="faq-item" id="faq-item-${i}">
          <div class="faq-question" onclick="window.sacredApp.toggleFaq(${i})">
            <span>${faq.pregunta}</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-answer">
            ${faq.respuesta}
          </div>
        </div>
      `;
    }).join("");
  }

  toggleFaq(index) {
    const item = document.getElementById(`faq-item-${index}`);
    if (item) {
      item.classList.toggle("open");
    }
  }

  // --- ONBOARDING Y UI INICIAL ---
  checkOnboarding() {
    if (!this.userData.onboardingComplete) {
      this.openModal("modalOnboarding");
    }
  }

  renderInitialUI() {
    // Saludo al usuario
    const userNameEl = document.getElementById("headerUserName");
    if (userNameEl) {
      userNameEl.textContent = this.userData.name || "Peregrino";
    }

    // Días de racha
    const streakDisplay = document.getElementById("jornadaStreakNumber");
    if (streakDisplay) {
      streakDisplay.textContent = `${this.userData.streakDays || 1} Días`;
    }

    const homeStreakDisplay = document.getElementById("homeStreakNumber");
    if (homeStreakDisplay) {
      homeStreakDisplay.textContent = `${this.userData.streakDays || 1}`;
    }

    // Barra de progreso de 60 días
    const progressFill = document.getElementById("jornadaProgressBar");
    if (progressFill) {
      const pct = Math.min(100, Math.round(((this.userData.streakDays || 1) / 60) * 100));
      progressFill.style.width = `${pct}%`;
      const pctLabel = document.getElementById("jornadaProgressPct");
      if (pctLabel) pctLabel.textContent = `${pct}% de Consagración`;
    }

    // Estado del escáner
    const statusVal = document.getElementById("scannerStatusVal");
    const statusBadge = document.getElementById("scannerStatusBadge");
    if (this.userData.isCleaned) {
      if (statusVal) statusVal.innerHTML = `<span style="color: var(--green-restored)">0.0% — Puro</span>`;
      if (statusBadge) {
        statusBadge.className = "card-badge badge-success";
        statusBadge.textContent = "Conexión Restaurada";
      }
      if (window.scannerInstance) {
        window.scannerInstance.state = "clean";
      }
    }
  }

  // --- MODALES & TOAST NOTIFICACIONES ---
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  }

  showToast(message) {
    const toast = document.getElementById("sacredToast");
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = "block";
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => { toast.style.display = "none"; }, 300);
    }, 4000);
  }
}

// Inicialización global
window.sacredApp = new SacredApp();
document.addEventListener("DOMContentLoaded", () => {
  window.sacredApp.init();
});
