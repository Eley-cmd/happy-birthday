'use strict';

const PASSWORD = 'happybirthdaypauline';
let current = 'gate';
let envOpened = false;
let currentReason = 0;

const REASONS = [
    "Pray as though everything depended on God. Work as though everything depended on you. — St. Augustine",
    "Peace begins with a smile — St. Mother Teresa",
    "Work hard in silence, let your success be your noise — Frank Ocean",
    "Trust that God will not give you a cross you cannot bear — St. Padre Pio",
    "The secret of happiness is to live moment by moment and to thank God for all that He is sending us every day — St. Gianna Beretta Molla",
    "Do not be afraid of the dark — for God is light — Pope St. John Paul II",
    "Be patient with all things, but first of all with yourself — St. Francis de Sales",
    "Courage does not always roar. Sometimes courage is the quiet voice at the end of the day saying, I will try again tomorrow — Mary Anne Radmacher",
    "When you feel like you are drowning in schoolwork, remember that even the greatest oceans are crossed one wave at a time — Anonymous",
    "After the winter comes the spring; after the night comes the day; and after the storm comes a great calm — St. Anselm of Canterbury",
    "Let us always meet each other with a smile, for the smile is the beginning of love — St. Mother Teresa",
    "The world is indeed full of peril, and in it there are many dark places; but still there is much that is fair, and though in all lands love is now mingled with grief, it grows perhaps the GREATER — J.R.R. Tolkien"
];

const STICKER_BASE = 'https://fonts.gstatic.com/s/e/notoemoji/latest/';
const REASON_ICONS = [
    STICKER_BASE + '1f496/512.png',
    STICKER_BASE + '1f338/512.png',
    STICKER_BASE + '1f495/512.png',
    STICKER_BASE + '1f970/512.png',
    STICKER_BASE + '1f337/512.png',
    STICKER_BASE + '2728/512.png',
    STICKER_BASE + '1f497/512.png',
    STICKER_BASE + '1f98b/512.png',
    STICKER_BASE + '1f49d/512.png',
    STICKER_BASE + '1f490/512.png',
    STICKER_BASE + '1f33a/512.png',
    STICKER_BASE + '2764_fe0f/512.png'
];

const el = {
    gate: document.getElementById('gate'),
    tree: document.getElementById('tree-scene'),
    letter: document.getElementById('letter-scene'),
    gallery: document.getElementById('gallery-scene'),
    video: document.getElementById('video-scene'),
    reasons: document.getElementById('reasons-scene'),
    wish: document.getElementById('wish-scene'),
};

/* ── SECTION TRANSITIONS ── */
function showSection(id) {
    if (id === current) return;
    const prev = el[current];
    const next = el[id];
    prev.classList.remove('active');
    prev.classList.add('exiting');
    setTimeout(() => prev.classList.remove('exiting'), 450);
    next.classList.add('active');
    current = id;

    if (id !== 'video') {
        const vid = document.getElementById('momVideo');
        if (vid && !vid.paused) vid.pause();
    }
}

function openSection(id) {
    showSection(id);
    if (id === 'gallery') resetGalleryAnimation();
    if (id === 'letter') closeEnvelope(true);
    if (id === 'reasons') showReason(currentReason);
    if (id === 'wish') resetCandle();
}

function goBack() {
    const overlay = document.getElementById('letterOverlay');
    if (overlay && overlay.classList.contains('open')) {
        closeEnvelope();
        return;
    }
    showSection('tree');
}

/* ── PASSWORD ── */
function checkPassword() {
    const input = document.getElementById('pwInput');
    const err = document.getElementById('pwError');
    if (input.value.trim().toLowerCase() === PASSWORD) {
        err.classList.remove('show');
        input.style.background = 'rgba(90, 160, 90, .1)';
        launchConfetti();
        setTimeout(() => {
            showSection('tree');
            animateHearts();
        }, 380);
    } else {
        err.classList.add('show');
        input.style.animation = 'none';
        void input.offsetWidth;
        input.style.animation = 'shake .4s ease';
        input.value = '';
        setTimeout(() => { input.style.animation = ''; err.classList.remove('show'); }, 2400);
        input.focus();
    }
}

document.getElementById('pwInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkPassword();
});

/* ── PASSWORD TOGGLE (SVG icons) ── */
function togglePassword() {
    const input = document.getElementById('pwInput');
    const svg = document.getElementById('pwEyeIcon');
    if (input.type === 'password') {
        input.type = 'text';
        svg.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>';
    } else {
        input.type = 'password';
        svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    }
}

/* ── HEARTS ANIMATION ── */
function animateHearts() {
    const cards = document.querySelectorAll('.heart-card');
    cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 200);
        setTimeout(() => card.classList.add('beating'), 700 + i * 200);
    });
}

/* ── REASONS I LOVE YOU ── */
function showReason(index) {
    const card = document.getElementById('reasonsCard');
    const text = document.getElementById('reasonText');
    const num = document.getElementById('reasonNum');
    const icon = document.querySelector('.reason-icon');
    const total = document.getElementById('reasonTotal');
    if (!card || !text) return;

    total.textContent = REASONS.length;
    card.classList.add('switching');

    setTimeout(() => {
        text.textContent = REASONS[index];
        icon.innerHTML = '<img src="' + REASON_ICONS[index] + '" alt="sticker" class="sticker-img" />';
        num.textContent = index + 1;
        card.classList.remove('switching');
    }, 250);
}

function nextReason() {
    currentReason = (currentReason + 1) % REASONS.length;
    showReason(currentReason);
}

function prevReason() {
    currentReason = (currentReason - 1 + REASONS.length) % REASONS.length;
    showReason(currentReason);
}

function shuffleReason() {
    let newIndex;
    do { newIndex = Math.floor(Math.random() * REASONS.length); }
    while (newIndex === currentReason && REASONS.length > 1);
    currentReason = newIndex;
    showReason(currentReason);
}

/* ── ENVELOPE / LETTER OVERLAY ── */
function buildLetterOverlay() {
    if (document.getElementById('letterOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'letterOverlay';
    overlay.className = 'letter-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Letter from the heart');
    overlay.innerHTML = `
    <div class="letter-overlay-close">
      <button class="letter-close-btn" onclick="closeEnvelope()" aria-label="Close letter">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M19 12H5M11 6l-6 6 6 6"/>
        </svg>
        Close the letter
      </button>
    </div>
    <div class="letter-overlay-body">
      <div class="letter-content">
         <p class="letter-greeting">Happy Birthday, Pauline!</p>
         <p>Hapiest Birthday sa babaeng papatulan yung isang pulang sardinas at load, ay. Kidding aside, ang wish ko ngayong birthday mo na sana ipagpatuloy mo lang kung ano na nasimulan mo, maging masipag ka pa lalo. Maging masaya ka sa ginagawa mo, at kung lulungkot ka, aba eh isipin mo lang na may baliw sa’yo na cute na handa kang samahan at damayan. Kayanin mo lahat pero kapag hindi mo na kaya, abay magsabi ka lang, uy. Maging maayos at laging ligtas ka; makamit mo lahat ng dreams mo sa buhay. Yumaman ka siyempre, ta’s pautang na rin; at higit sa lahat… more blessings pa na dumating sa’yo, sa family mo, at good health na rin siyempre.</p>
         <p>Pero ito ah, sa totoo lang kung ako mamahalin mo, aba hindi lang sardinas at load makukuha mo. Bukod sa cute na kagaya ko, eh hindi ka na magtitiyaga sa sardinas—bangus yung ibibigay ko sa’yo… yung tig-piso, alam mo yun? Nung araw, yung tig-piso na bangus, ang sarap kayang ulamin noon. At imbis na load, aba eh papatayuan kita ng internet tower, tatak Lewis, subok na dekalidad at matibay! HAHHHHAHAHHA.</p>
         <p>Sa ngayon, ito lang kaya kong gawin. Wala muna mga bulaklak at expensive gifts kasi taghirap pa. At saka, I understand na ayaw mo ’yon—hindi naman sa literal na ayaw, gusto mo rin, pero yung ginagawa ko kasi is kakaiba, right? Nawawala kasi meaning niyan kapag walang connection, na para bang naglolokohan tayo ganoon, tama ba? Bigay ako nang bigay nang biglaan at padalos-dalos, kaya parang mixed signals dating, ta’s ang result is confusion lang—yun ang napansin ko.</p>
         <p>Alam mo, while nasa IG ako, I met this word “Love Bombing.” I knew na familiar ka sa word na 'yan, at alam mo, kung tao lang itong word na ito, malamang na ako ’yan. I’m not downing myself here; I just want to say all my previous mistakes I made, at wala na akong magagawa kasi nangyari na ang mga nangyari. Wala na akong choice kung ’di tanggapin ang naging result, pero in some way, naging beneficial sa akin ngayon iyan kasi nalaman ko yung some right way kung paano ba mahalin ang isang katulad mo.</p>
         <p>Ayyyy... malalaman at malalaman ko rin sa huli kung paano ka ba mahalin nang totoo—yung tunay, yung walang love bombing at confusion. Yung hindi pilit, at doon sa comfortable ka at ako na rin siyempre. Alam ko naman na low chance ako or baka nga wala na eh, pero papatunayan ko sa'yo na seryoso ako sa mga sinasabi ko. I will work hard para maging financially stable at maging better version ng sarili ko, hindi lang para sa’yo kundi para na rin sa future ko. Alam ko rin na may mga naipangako ako dati na hindi ko nagawa at napako lang, siguro dahil sa pagiging padalos-dalos ko rin. Kaya ngayon ayaw ko na maulit iyon, magiging mas masipag at mas magiging maayos ako. I’ll respect whatever boundaries you set, at sorry kung minsan nag-ooverstep ako; gusto ko lang talagang maging tapat sa nararamdaman ko.</p>
         <p>Alam mo, tulad kahapon, alam kong niloloko ko lang sarili ko na huwag kang pansinin, pinipigilan ko, pero sa totoo lang gustong-gusto ko talaga—baka nga napansin mo pa ’yon. Now, I make ways to become financially stable. Mahirap, oo, but again, like what I always say, I will grind so hard until I make it. Marami akong oras at ayaw kong sayangin sa mga useless things; like others, kasi ang sarap sa una lang niyan, pero kung magsisikap ka nang maaga pa lang, kahit mahirap sa umpisa, eh makakamit at makakamit mo yung tinatawag nilang financial freedom.</p>
         <p>I want to make my family proud of me, at siyempre pati na rin ikaw. Pangarap ko kasi na someday, kapag stable na talaga ako, magkaroon ng sariling space at kung papalarin eh kasama ka na kung saan tayo ang magdedecide ng lahat. Medyo mahilig ako sa mid-dark tones at fancy or elegant types, at na-imagine ko rin yung isang bahay na malapit sa farm, simple pero solid, maraming fruit-bearing trees at mga hayop na aalagaan. Ang sarap siguro sa pakiramdam ng ganoon, yung tahimik lang.</p>
         <p>Then ito mas maganda, yung mag-pipiano ako, then ikaw maggigitara, ta’s sabay tayong kakanta. Medyo sintunado ako pero okay lang ’yon, ta’s naka-vid then i-edit natin ta’s i-save para memories and document. Paulit-ulit natin gagawin hanggang umabot sa point na parang movie marathon na sa sobrang haba. Then gusto ko sabay tayong mag-paint—ang balak ko doon is gagawin natin 'yun doon sa business mo. Papatayo tayo ng studio mo then mag-paint tayo sa wall, ta’s siyempre magkatabi lang office ko at studio mo.</p>
         <p>Ta’s travel na rin; gusto ko lumibot sa iba’t ibang lugar. Then gusto ko rin gawin yung kasabay kang magsisimba, sabay magbabasa ng book, ta’s kapag may tampuhan, siyempre pag-uusapan natin nang maayos. Step-by-step lang tayo, walang pressure at hindi natin kailangang madaliin lahat.</p>
         <p>Nga pala, alam mo 'di ba dati may ipinangako ako sa’yong book? Kung naalala mo pa, kasabay nga noon yung website na art gallery eh. Ang dapat ngayon kasabay nito ko ibibigay iyon, pero naisip ko mas maganda kung gawan ko ng 4 volumes ta’s ikaw unang babasa then publish ko sa net. Nagawa ko na yung 55 chapters, buti na lang blessed me, meron akong proofreader kaya sobrang thankful ko. Alam mo, ginawa ko siyang fiction—mahilig ka ba doon?</p>
         <p>Alam mo, hindi lang ako nag-focus solely sa’yo. Then may relates siya sa Philippine culture, kaya hindi ako nahirapan sa world building. Example na lang, like this character I made named Joseph R. Izal. Meron siyang power where he can paint and sculpt anything to fight enemies—like Bakunawa. (Kilala mo ba siya? 'Di ba dragon siya na kumain ng mga buwan?) Pero dito sa story, isa siyang tall, red-haired, handsome, and cold villain. So iyon, hindi kita gustong i-spoil nang buo kasi mas maganda kung babasahin mo siya nang buo.</p>
         <p>After kong tapusin Volume 2, send ko sa’yo parehas, para habang ginagawa ko Vol 3 and 4, may binabasa ka na at hindi nawawala yung exciting thing. Hindi ako totally great writer pero I did my best in doing so. Marami pa akong gustong sabihin pero baka hindi na ako matapos at hindi ko maisend ito ngayong birthday mo, so I will end this here for now.</p>
         <p>Ala kasi eh, parehas kasi tayong medyo hindi magaling sa communication kaya parehas tayong tulala at hindi nag-uusap, pero ako, binabago ko na paunti-unti yung akin. Wala pang improvements sa ngayon pero darating din iyan. Madalas pansin mo ba lumalabas ako ng room kasi medyo maingay sa loob? Eh sobrang init na nga, ang ingay pa, grabe! HAHAHAHAAHH.</p>
         <p>Kung okay lang sa’yo, pwede mo rin akong samahan, then kwentuhan tayo sa ibang room ta’s papatugtog, then magdadala ako ng novel then babasahin natin habang waiting sa mga teacher. Ta’s dala ako snacks para may nginangata tayo, like honey butter na fav. mo—pero ikaw, if you're comfortable lang naman, no pressure at all. Basta ako, gagawin ko yun.</p>
         <p>Ito lang final kong masasabi, I will become financially stable at hindi ko na uulitin yung mga maling ginawa ko. Dahan-dahan, no rush. So ulit, I wish you the very best birthday ngayon.</p>
        <p class="letter-sign">
           Sincerly,<br/>
           <em>Lewis Alfred Tinio</em>
        </p>
      </div>
    </div>
    <div class="letter-swipe-hint" aria-hidden="true">
      <div class="swipe-bar"></div>
      <span>scroll to read</span>
    </div>`;
    document.body.appendChild(overlay);
}

function openEnvelope() {
    if (envOpened) return;
    envOpened = true;
    buildLetterOverlay();
    const envelope = document.getElementById('envelope');
    if (envelope) envelope.classList.add('opened');
    const openBtn = document.getElementById('openEnvBtn');
    if (openBtn) openBtn.classList.add('hidden');
    setTimeout(() => {
        const overlay = document.getElementById('letterOverlay');
        if (overlay) overlay.classList.add('open');
    }, 650);
    const music = document.getElementById('envMusic');
    if (music) { music.currentTime = 0; music.play().catch(() => { }); }
    // Pause bg music when envelope opens
    if (musicPlaying) {
        musicPausedByEnvelope = true;
        const bgAudio = document.getElementById('bgMusic');
        if (bgAudio) bgAudio.pause();
    }
}

function closeEnvelope(silent) {
    envOpened = false;
    const overlay = document.getElementById('letterOverlay');
    if (overlay) overlay.classList.remove('open');
    const envelope = document.getElementById('envelope');
    if (envelope) envelope.classList.remove('opened');
    const openBtn = document.getElementById('openEnvBtn');
    if (openBtn) openBtn.classList.remove('hidden');
    if (!silent) {
        const music = document.getElementById('envMusic');
        if (music && !music.paused) {
            let vol = music.volume;
            const fade = setInterval(() => {
                vol -= 0.08;
                if (vol <= 0) { music.pause(); music.currentTime = 0; music.volume = 1; clearInterval(fade); }
                else music.volume = vol;
            }, 80);
        }
    }
    // Resume bg music if it was paused by envelope
    if (musicPausedByEnvelope) {
        musicPausedByEnvelope = false;
        const bgAudio = document.getElementById('bgMusic');
        if (bgAudio) {
            bgAudio.volume = BG_VOLUME;
            bgAudio.play().catch(() => { });
        }
    }
}

/* ── GALLERY ── */
function resetGalleryAnimation() {
    document.querySelectorAll('.gallery-card').forEach(card => {
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = '';
    });
}

/* ── INJECTED KEYFRAMES ── */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-5px)}
    80%{transform:translateX(5px)}
  }
`;
document.head.appendChild(style);



/* ── VIRTUAL HUG (text burst with stickers) ── */
const HUG_STICKERS = [
    STICKER_BASE + '1f496/512.png',
    STICKER_BASE + '2764_fe0f/512.png',
    STICKER_BASE + '1f917/512.png',
    STICKER_BASE + '1f338/512.png',
    STICKER_BASE + '1f495/512.png',
    STICKER_BASE + '1f970/512.png',
    STICKER_BASE + '1f49d/512.png',
    STICKER_BASE + '1f490/512.png'
];
const HUG_TEXTS = [
    '🎉 Happy Birthday, Pauline!', '✨ You are amazing!', '🎂 Cheers to you!',
    '🌟 Best wishes!', '💖 You deserve the world!', '🥳 Celebrate big!',
    '🎊 Another great year!', '💫 We love you, Pauline!'
];
let hugCooldown = false;

function sendVirtualMessage() {
    if (hugCooldown) return;
    hugCooldown = true;
    setTimeout(() => { hugCooldown = false; }, 2200);

    const container = document.getElementById('hugContainer');
    if (!container) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const count = 16;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'hug-heart';
        heart.textContent = HUG_TEXTS[i % HUG_TEXTS.length];

        const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
        const dist = 100 + Math.random() * 200;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 30;
        const rot = (Math.random() - 0.5) * 40;
        const dur = 1.5 + Math.random() * 1;

        heart.style.cssText = `
            left:${cx}px;top:${cy}px;
            --tx:${tx}px;--ty:${ty}px;--rot:${rot}deg;--dur:${dur}s;
            animation-delay:${i * 0.06}s;
        `;

        container.appendChild(heart);
        setTimeout(() => heart.remove(), (dur + 0.8) * 4000);
    }
}

/* ── PHOTO LIGHTBOX ── */
function openLightbox(src, caption) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (!lb || !img) return;
    img.src = src;
    if (cap) cap.textContent = caption || '';
    lb.classList.add('open');
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
}

// Attach click to gallery photos
document.querySelectorAll('.gallery-card .gc-inner img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = img.closest('.gallery-card');
        const caption = card ? card.querySelector('.gc-caption') : null;
        openLightbox(img.src, caption ? caption.textContent : '');
    });
});

// Close lightbox with Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

/* ── SPARKLE CURSOR TRAIL ── */
const SPARKLE_CHARS = ['✦', '✧', '✶', '⋆', '˚', '•', '★'];
let lastSparkle = 0;

function createSparkle(x, y) {
    const now = Date.now();
    if (now - lastSparkle < 60) return; // throttle
    lastSparkle = now;

    const dot = document.createElement('span');
    dot.className = 'sparkle-dot';
    dot.textContent = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    dot.style.color = `hsl(${110 + Math.random() * 40}, 45%, ${35 + Math.random() * 25}%)`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
}

document.addEventListener('mousemove', e => createSparkle(e.clientX, e.clientY));
document.addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (t) createSparkle(t.clientX, t.clientY);
}, { passive: true });

/* ── CONFETTI CELEBRATION ── */
const CONFETTI_COLORS = ['#8FBF8F', '#5A7A5A', '#C8DCC8', '#7AAE7A', '#A8CFA8', '#fff', '#3B6E3B'];

function launchConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    const count = 60;
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        const left = Math.random() * 100;
        const dur = 2 + Math.random() * 2;
        const delay = Math.random() * 0.8;
        const rot = (Math.random() - 0.5) * 720;
        const w = 6 + Math.random() * 8;
        const h = 4 + Math.random() * 6;
        piece.style.cssText = 'left:' + left + '%;width:' + w + 'px;height:' + h + 'px;background:' + color + ';--dur:' + dur + 's;--delay:' + delay + 's;--rot:' + rot + 'deg;';
        container.appendChild(piece);
        setTimeout(() => piece.remove(), (dur + delay + 0.5) * 1000);
    }
}

/* -- FLOATING BIRTHDAY QUOTES (text only, no emoji) -- */
const LOVE_QUOTES = [
    'Happy Birthday, Pauline!',
    'Ang ganda mo teh!',
    'Another beautiful year!',
    'More blessings to come',
    'Wishing you the best!',
    'Wishing you a peace of mind!',
    'Good health and happiness!',
    'You deserve all the best!',
    'Enjoy your special day!',
    'Take care always!'
];

function spawnFloatingQuote() {
    if (current !== 'tree') return;
    const text = LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)];
    const quote = document.createElement('div');
    quote.className = 'float-quote';
    quote.textContent = text;
    const x = 5 + Math.random() * 75;
    const y = 10 + Math.random() * 65;
    const dur = 3.5 + Math.random() * 2;
    quote.style.cssText = 'left:' + x + '%;top:' + y + '%;--dur:' + dur + 's;--delay:0s;';
    document.body.appendChild(quote);
    setTimeout(() => quote.remove(), dur * 1000);
}

setInterval(spawnFloatingQuote, 4000);

/* ── BACKGROUND MUSIC SYSTEM ── */
const PLAYLIST = ['assets/generalmusic.mp3', 'assets/music1.mp3', 'assets/music2.mp3'];
const BG_VOLUME = 0.25;          // default gentle volume
const BG_VOLUME_DUCKED = 0.08;   // volume when video is playing
let musicPlaying = false;
let currentTrack = 0;
let musicPausedByEnvelope = false;

function loadTrack(index) {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    currentTrack = index % PLAYLIST.length;
    audio.src = PLAYLIST[currentTrack];
    audio.volume = BG_VOLUME;
}

function playMusic() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    if (!audio.src || audio.src === '') loadTrack(0);
    audio.volume = BG_VOLUME;
    audio.play().catch(() => { });
    musicPlaying = true;
    const icon = document.getElementById('musicIcon');
    const btn = document.getElementById('musicToggle');
    if (icon) icon.src = STICKER_BASE + '1f3b6/512.png';
    if (btn) btn.classList.add('playing');
}

function pauseMusic() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    audio.pause();
    musicPlaying = false;
    const icon = document.getElementById('musicIcon');
    const btn = document.getElementById('musicToggle');
    if (icon) icon.src = STICKER_BASE + '1f507/512.png';
    if (btn) btn.classList.remove('playing');
}

function toggleMusic() {
    if (musicPlaying) {
        pauseMusic();
    } else {
        const audio = document.getElementById('bgMusic');
        if (!audio.src || audio.src === window.location.href) loadTrack(0);
        playMusic();
    }
}

// Auto-advance to next track when current one ends
(function initPlaylist() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    audio.volume = BG_VOLUME;
    loadTrack(0);
    audio.addEventListener('ended', () => {
        loadTrack(currentTrack + 1);
        if (musicPlaying) {
            audio.play().catch(() => { });
        }
    });
})();

/* ── VIDEO DUCK (reduce bg music when video plays) ── */
(function initVideoDuck() {
    const video = document.querySelector('video');
    const audio = document.getElementById('bgMusic');
    if (!video || !audio) return;

    video.addEventListener('play', () => {
        if (musicPlaying) audio.volume = BG_VOLUME_DUCKED;
    });
    video.addEventListener('pause', () => {
        if (musicPlaying) audio.volume = BG_VOLUME;
    });
    video.addEventListener('ended', () => {
        if (musicPlaying) audio.volume = BG_VOLUME;
    });
})();

/* ── MAKE A WISH CANDLE ── */
const BIRTHDAY_WISHES = [
    "HBD! Yumaman ka na sana nang husto para pautang na rin pag may time. Joke lang!",
    "HBD! Wishing you a year full of love and peace of mind.",
    "Happy Birthday! Sana maging comfortable at payapa ka ngayong special day mo.",
    "HBD! Wishing you more blessings and good health. 'Wag ka masyadong magpakapagod",
    "Happy Birthday! Sana laging masarap ang ulam mo, at sana kasama ako sa 'ulam' na 'yun... joke!",
    "HBD! Sabi nila 'money can’t buy happiness,' pero sana yumaman ka na para sabay nating i-prove na mali sila, pautang na rin mga 1m lang. Happy Birthday!",
    "Happy Birthday! Kahit na sintunado ako, handa akong kantahan ka maghapon ng happy birthday basta wag mo lang akong i-block HAHHAHAHA. Enjoy your day!",
    "HBD! Wishing you peace of mind and a full stomach. 'Pag malungkot ka, okay lang na umiyak pero 'wag naman sobra baka pumangit ka niyan. Joke! Mas pangit ako 'pag umiiyak, kaya smile na!",
    "Happy Birthday! Alam kong low chance ako, pero tandaan mo, dun nga sa lotto kahit low chance may nananalo. Baka sa susunod ako naman ang maka jackpot hindi man sa lotto pero diyan sa puso mo",
];
let candleBlown = false;

function blowCandle() {
    if (candleBlown) return;
    candleBlown = true;

    const flame = document.getElementById('candleFlame');
    const btn = document.getElementById('wishBlowBtn');
    const msg = document.getElementById('wishMessage');
    const text = document.getElementById('wishText');
    const candleWrap = document.getElementById('candleWrap');
    const hint = document.querySelector('.wish-hint');

    // 1. Blow out the flame
    if (flame) {
        flame.style.transition = 'opacity .6s ease, transform .6s ease';
        flame.style.opacity = '0';
        flame.style.transform = 'translateY(-15px) scale(0.3)';
    }

    // Hide blow button immediately
    if (btn) {
        btn.style.transition = 'opacity .3s ease';
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
    }

    // Hide hint
    if (hint) {
        hint.style.transition = 'opacity .3s ease';
        hint.style.opacity = '0';
    }

    // Spawn smoke
    spawnSmoke();

    // 2. After 1.2s — hide the whole candle, then show cake + wish
    setTimeout(() => {
        if (candleWrap) {
            candleWrap.style.transition = 'opacity .5s ease, transform .5s ease';
            candleWrap.style.opacity = '0';
            candleWrap.style.transform = 'scale(0.8) translateY(10px)';
        }

        // 3. After candle fades — show cake + wish message
        setTimeout(() => {
            if (candleWrap) candleWrap.style.display = 'none';
            const wish = BIRTHDAY_WISHES[Math.floor(Math.random() * BIRTHDAY_WISHES.length)];
            if (text) text.textContent = wish;
            if (msg) msg.classList.add('visible');
            launchConfetti();
        }, 600);
    }, 1200);
}

function relightCandle() {
    candleBlown = false;
    const flame = document.getElementById('candleFlame');
    const btn = document.getElementById('wishBlowBtn');
    const msg = document.getElementById('wishMessage');
    const candleWrap = document.getElementById('candleWrap');
    const hint = document.querySelector('.wish-hint');

    // Hide cake/message first
    if (msg) msg.classList.remove('visible');

    // After message fades, bring back the candle
    setTimeout(() => {
        if (candleWrap) {
            candleWrap.style.display = 'flex';
            // Force reflow
            void candleWrap.offsetWidth;
            candleWrap.style.transition = 'opacity .6s ease, transform .6s ease';
            candleWrap.style.opacity = '1';
            candleWrap.style.transform = 'scale(1) translateY(0)';
        }

        // Relight the flame
        setTimeout(() => {
            if (flame) {
                flame.style.transition = 'opacity .8s ease, transform .8s ease';
                flame.style.opacity = '1';
                flame.style.transform = 'translateY(0) scale(1)';
            }
            if (btn) {
                btn.style.transition = 'opacity .4s ease';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
            }
            if (hint) {
                hint.style.transition = 'opacity .4s ease';
                hint.style.opacity = '1';
            }
        }, 400);
    }, 500);
}

function resetCandle() {
    candleBlown = false;
    const flame = document.getElementById('candleFlame');
    const btn = document.getElementById('wishBlowBtn');
    const msg = document.getElementById('wishMessage');
    const candleWrap = document.getElementById('candleWrap');
    const hint = document.querySelector('.wish-hint');

    if (flame) {
        flame.style.transition = 'none';
        flame.style.opacity = '1';
        flame.style.transform = 'translateY(0) scale(1)';
    }
    if (btn) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'all';
    }
    if (msg) msg.classList.remove('visible');
    if (candleWrap) {
        candleWrap.style.display = 'flex';
        candleWrap.style.opacity = '1';
        candleWrap.style.transform = 'scale(1) translateY(0)';
    }
    if (hint) hint.style.opacity = '1';
}

function spawnSmoke() {
    const container = document.getElementById('smokeContainer');
    if (!container) return;
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'smoke-particle';
        const x = -12 + Math.random() * 24;
        const dur = 1.2 + Math.random() * 0.8;
        p.style.cssText = `--sx:${x}px;--dur:${dur}s;animation-delay:${i * 0.1}s;`;
        container.appendChild(p);
        setTimeout(() => p.remove(), (dur + 0.5) * 1000);
    }
}