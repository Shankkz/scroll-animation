// Synthesizer for engine sound effects using Web Audio API
class EngineSound {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.filter = null;
    this.gain = null;
    this.isPlaying = false;
    this.isEnabled = false;
  }

  // Initialize audio context and oscillators
  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(45, this.ctx.currentTime);

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(90, this.ctx.currentTime);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(250, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    this.gain = this.ctx.createGain();
    this.gain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.filter.connect(this.gain);
    this.gain.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();
  }

  // Turn sound on or off
  toggle(enabled) {
    this.isEnabled = enabled;
    if (enabled) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.startIdle();
    } else {
      this.stop();
    }
    return this.isEnabled;
  }

  // Start engine idle sound
  startIdle() {
    if (!this.gain || !this.ctx) return;
    this.isPlaying = true;
    const now = this.ctx.currentTime;
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
    this.osc1.frequency.linearRampToValueAtTime(55, now + 0.3);
    this.osc2.frequency.linearRampToValueAtTime(110, now + 0.3);
    this.filter.frequency.linearRampToValueAtTime(300, now + 0.3);
  }

  // Adjust engine pitch and volume based on speed (0 to 1)
  updateRPM(speedFactor) {
    if (!this.isPlaying || !this.gain || !this.ctx || !this.isEnabled) return;
    const now = this.ctx.currentTime;
    const baseFreq = 50 + speedFactor * 160;
    const filterFreq = 280 + speedFactor * 1400;
    const volume = 0.08 + speedFactor * 0.14;

    this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.08);
    this.osc2.frequency.setTargetAtTime(baseFreq * 2, now, 0.08);
    this.filter.frequency.setTargetAtTime(filterFreq, now, 0.08);
    this.gain.gain.setTargetAtTime(volume, now, 0.08);
  }

  // Stop engine sound
  stop() {
    if (!this.gain || !this.ctx) return;
    this.isPlaying = false;
    const now = this.ctx.currentTime;
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.linearRampToValueAtTime(0, now + 0.2);
  }
}

export const soundEngine = new EngineSound();
