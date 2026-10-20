const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

const progress = $('#railProgress');
const roomNo = $('#roomNo');
const scenes = $$('.scene');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });
$$('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 90}ms`;
  revealObserver.observe(el);
});

const roomObserver = new IntersectionObserver((entries) => {
  const active = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if (active) roomNo.textContent = active.target.dataset.room;
}, { threshold: [0.25, 0.55] });
scenes.forEach(scene => roomObserver.observe(scene));

addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.height = `${Math.min(100, scrollY / max * 100)}%`;
}, { passive: true });

const mirror = $('#mirrorStage');
const repairBtn = $('#repairBtn');
const repairHint = $('#repairHint');
let repairTimer, repaired = false;
function startRepair() {
  if (repaired) return;
  repairBtn.classList.add('charging');
  repairBtn.querySelector('span').textContent = '正在维持';
  repairHint.textContent = '不要松手。它还没有完整。';
  repairTimer = setTimeout(() => {
    repaired = true;
    mirror.classList.add('broken');
    repairBtn.classList.remove('charging');
    repairBtn.querySelector('span').textContent = '修复失败';
    repairBtn.querySelector('i').textContent = '已耗尽';
    repairHint.textContent = '没有人能够永远流血。';
  }, 1800);
}
function stopRepair() {
  if (!repaired) {
    clearTimeout(repairTimer);
    repairBtn.classList.remove('charging');
    repairBtn.querySelector('span').textContent = '尝试修复';
    repairHint.textContent = '每一次修复，都需要有人付出。';
  }
}
['pointerdown', 'keydown'].forEach(e => repairBtn.addEventListener(e, startRepair));
['pointerup', 'pointerleave', 'keyup'].forEach(e => repairBtn.addEventListener(e, stopRepair));

addEventListener('pointermove', (e) => {
  if (scrollY < innerHeight * 1.1 && !repaired) {
    const x = (e.clientX / innerWidth - .5) * 10;
    const y = (e.clientY / innerHeight - .5) * -8;
    mirror.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
  }
});

const soundToggle = $('#soundToggle');
let audioCtx, drone, gain, beatTimer;
function toggleSound() {
  const on = soundToggle.getAttribute('aria-pressed') === 'true';
  if (on) {
    gain.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + .4);
    clearInterval(beatTimer);
    setTimeout(() => audioCtx.close(), 450);
  } else {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gain = audioCtx.createGain();
    gain.gain.value = .018;
    drone = audioCtx.createOscillator();
    drone.type = 'sine'; drone.frequency.value = 47;
    const filter = audioCtx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 120;
    drone.connect(filter).connect(gain).connect(audioCtx.destination); drone.start();
    beatTimer = setInterval(() => {
      const now = audioCtx.currentTime;
      gain.gain.setValueAtTime(.018, now); gain.gain.linearRampToValueAtTime(.04, now+.05); gain.gain.exponentialRampToValueAtTime(.018, now+.25);
    }, 830);
  }
  soundToggle.setAttribute('aria-pressed', String(!on));
  $('.sound-label', soundToggle).textContent = `声音：${on ? '关' : '开'}`;
}
soundToggle.addEventListener('click', toggleSound);

const pulseNumber = $('#pulseNumber');
let bpm = 72;
const collapseRoom = $('#room-4');
const pulseObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    const timer = setInterval(() => {
      bpm = Math.max(0, bpm - 1);
      pulseNumber.textContent = String(bpm).padStart(2, '0');
      if (!collapseRoom.getBoundingClientRect || bpm === 0) clearInterval(timer);
    }, 180);
  }
}, { threshold: .4 });
pulseObserver.observe(collapseRoom);

$('#restartBtn').addEventListener('click', () => {
  repaired = false; bpm = 72; pulseNumber.textContent = '72';
  mirror.classList.remove('broken'); mirror.style.transform = '';
  repairBtn.querySelector('span').textContent = '尝试修复'; repairBtn.querySelector('i').textContent = '按住';
  repairHint.textContent = '每一次修复，都需要有人付出。';
  scrollTo({ top: 0, behavior: 'smooth' });
});

// Quiet floating dust, rendered in canvas so the gallery never feels entirely still.
const canvas = $('#dust');
const ctx = canvas.getContext('2d');
let motes = [];
function resize() { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); motes = Array.from({length: Math.min(55, innerWidth/18)}, () => ({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1+.2,v:Math.random()*.15+.04})); }
function draw() { ctx.clearRect(0,0,innerWidth,innerHeight); ctx.fillStyle = scrollY > innerHeight*2 ? '#ddd8' : '#3335'; motes.forEach(m=>{m.y-=m.v;if(m.y<0)m.y=innerHeight;ctx.beginPath();ctx.arc(m.x,m.y,m.r,0,7);ctx.fill()}); requestAnimationFrame(draw); }
addEventListener('resize', resize); resize(); draw();
