// sound.js - Generador de atmósfera sonora terrorífica con Web Audio API (Cero dependencias externas)
class SpookySoundtrack {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.nodes = [];
    this.windGain = null;
    this.bellTimer = null;
    this.heartbeatTimer = null;
    this.volume = 0.5;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generador de viento espectral usando ruido marrón filtrado
  startWind() {
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Compensar ganancia
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filtro pasabanda resonante con modulación lenta (aullido de viento)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 320;
    filter.Q.value = 3.0;

    // LFO para modular la frecuencia del viento (ráfagas)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.15; // Ráfaga cada ~6 segundos
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.windGain.gain.exponentialRampToValueAtTime(0.28 * this.volume, this.ctx.currentTime + 3);

    whiteNoise.connect(filter);
    filter.connect(this.windGain);
    this.windGain.connect(this.ctx.destination);

    whiteNoise.start();
    lfo.start();

    this.nodes.push(whiteNoise, lfo, filter, this.windGain);
  }

  // Campana fúnebre siniestra aleatoria
  playSpookyBell() {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now); // Nota La grave misteriosa
      osc.frequency.exponentialRampToValueAtTime(82.4, now + 4);

      // Armónicos secundarios
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(165, now);

      gain.gain.setValueAtTime(0.18 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 6);
      osc2.stop(now + 6);
    } catch (e) {
      console.warn("Audio bell issue:", e);
    }

    // Próxima campana en 15 - 30 segundos
    if (this.isPlaying) {
      const nextTime = (14 + Math.random() * 18) * 1000;
      this.bellTimer = setTimeout(() => this.playSpookyBell(), nextTime);
    }
  }

  // Latido tenebroso sutil
  playHeartbeat() {
    if (!this.ctx || !this.isPlaying) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.18);

      gain.gain.setValueAtTime(0.22 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch(e) {}

    if (this.isPlaying) {
      this.heartbeatTimer = setTimeout(() => this.playHeartbeat(), 2400);
    }
  }

  // Sonido de susto / efecto al abrir una casa o conseguir logro
  playStinger(type = 'creak') {
    // Si el sonido está desactivado o silenciado, NO reproducir ningún sonido de interacción
    if (!this.isPlaying) return;

    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'unlock') {
      // Fanfarria fantasmagórica triunfal
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.4);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    } else {
      // Chillido sutil o suspiro
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.35);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.3);
  }

  toggle() {
    this.initContext();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    this.initContext();
    this.isPlaying = true;
    this.startWind();
    this.bellTimer = setTimeout(() => this.playSpookyBell(), 3000);
    this.heartbeatTimer = setTimeout(() => this.playHeartbeat(), 1500);
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.bellTimer);
    clearTimeout(this.heartbeatTimer);
    if (this.windGain && this.ctx) {
      try {
        this.windGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      } catch(e) {}
    }
    setTimeout(() => {
      this.nodes.forEach(node => {
        try { node.stop(); } catch(e) {}
        try { node.disconnect(); } catch(e) {}
      });
      this.nodes = [];
    }, 1100);
  }
}

window.spookyAudio = new SpookySoundtrack();
