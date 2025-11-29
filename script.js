let index = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(i) {
    slides.forEach(sl => sl.classList.remove('active'));
    slides[i].classList.add('active');
}

document.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

document.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});

// Auto slide 5 seconf
setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 5000);

document.querySelectorAll('.project-title').forEach(button => {
    button.addEventListener('click', () => {

        const content = button.nextElementSibling;

        // Tutup jika terbuka
        if (content.classList.contains("open")) {
            content.classList.remove("open");
        } 
        else {
            content.classList.add("open");
        }

    });
});

document.addEventListener("mousemove", function(e) {
    const cursor = document.querySelector(".cursor-gif");
    if (!cursor) return;

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

function detectNavbarBackground() {
    const nav = document.querySelector(".hamburger-box");
    const style = window.getComputedStyle(nav);
    const bg = style.backgroundColor;

    // Ekstrak RGB
    const rgb = bg.match(/\d+/g).map(Number);
    const [r, g, b] = rgb;

    // Rumus brightness (WCAG 2.0)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness < 128) {
        // background gelap → teks putih & icon putih
        document.documentElement.style.setProperty("--nav-text-color", "#ffffff");
        document.documentElement.style.setProperty("--nav-icon-filter", "brightness(0) invert(1)");
    } else {
        // background terang → teks hitam & icon hitam
        document.documentElement.style.setProperty("--nav-text-color", "#000000");
        document.documentElement.style.setProperty("--nav-icon-filter", "brightness(0) invert(0)");
    }
}

window.addEventListener("load", detectNavbarBackground);
window.addEventListener("resize", detectNavbarBackground);

const hamburger = document.getElementById("hamburger");
const dropdown = document.getElementById("dropdown");

// Toggle saat hamburger di klik
hamburger.addEventListener("click", (event) => {
    event.stopPropagation(); // cegah klik dari dibaca sebagai klik luar

    hamburger.classList.toggle("active");

    if (dropdown.classList.contains("active")) {
        // Animasi keluar
        hideDropdown();
    } else {
        // Animasi masuk
        showDropdown();
    }
});

// CLOSE ketika klik di luar
document.addEventListener("click", (event) => {
    const isClickInsideHamburger = hamburger.contains(event.target);
    const isClickInsideDropdown = dropdown.contains(event.target);

    if (!isClickInsideHamburger && !isClickInsideDropdown) {
        // Tutup dropdown dengan animasi
        hideDropdown();
        
        // Kembalikan hamburger ke kecil
        hamburger.classList.remove("active");
    }
});

// Smooth scroll untuk home
document.querySelector('a[href="#home"]').addEventListener("click", (event) => {
    event.preventDefault(); // cegah behavior anchor default
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    
    // Tutup dropdown setelah klik link
    hideDropdown();
    hamburger.classList.remove("active");
});

// Fungsi untuk menampilkan dropdown dengan animasi
function showDropdown() {
    // Reset state sebelumnya jika ada
    dropdown.classList.remove("hiding");
    
    // Tampilkan dropdown
    dropdown.style.display = "block";
    
    // Trigger animasi masuk
    setTimeout(() => {
        dropdown.classList.add("active");
    }, 10);
}

// Fungsi untuk menyembunyikan dropdown dengan animasi
function hideDropdown() {
    // Trigger animasi keluar
    dropdown.classList.remove("active");
    dropdown.classList.add("hiding");
    
    // Tunggu animasi selesai sebelum hide display
    setTimeout(() => {
        dropdown.classList.remove("hiding");
        dropdown.style.display = "none";
    }, 250); // Sesuaikan dengan durasi animasi keluar
}

// Tambahkan juga untuk link lainnya agar dropdown tertutup
document.querySelectorAll('.dropdown a').forEach(link => {
    link.addEventListener('click', () => {
        hideDropdown();
        hamburger.classList.remove("active");
    });
});

const toggleBtn = document.getElementById("music-toggle-btn");
const musicPlayer = document.getElementById("music-player");

// ICON MUSIC = SHOW/HIDE PLAYER ONLY
toggleBtn.addEventListener("click", () => {
    musicPlayer.classList.toggle("active");
});


const bgm = document.getElementById("bgm");
const playBtn = document.getElementById("music-play");
const icon = document.getElementById("music-icon");
const progressBar = document.getElementById("music-progress");
const volumeSlider = document.getElementById("music-volume");

const playIconSrc = "image/play.svg";
const pauseIconSrc = "image/pause.svg";

// Fungsi untuk update ikon
function updateIcon() {
    if (bgm.paused) {
        icon.src = playIconSrc;
        icon.alt = "Play";
    } else {
        icon.src = pauseIconSrc;
        icon.alt = "Pause";
    }
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
    if (bgm.paused) {
        bgm.play();
    } else {
        bgm.pause();
    }
    updateIcon();
});

bgm.addEventListener("play", updateIcon);
bgm.addEventListener("pause", updateIcon);

// Update progress bar saat audio dimainkan
bgm.addEventListener("timeupdate", () => {
    const percent = (bgm.currentTime / bgm.duration) * 100;
    progressBar.value = percent;
});

// Seek audio saat progress bar digeser
progressBar.addEventListener("input", () => {
    const pos = progressBar.value;
    bgm.currentTime = (pos / 100) * bgm.duration;
});

// Kontrol volume
volumeSlider.addEventListener("input", () => {
    bgm.volume = volumeSlider.value;
});

document.addEventListener("click", (e) => {
    if (!musicPlayer.contains(e.target) && !toggleBtn.contains(e.target)) {
        musicPlayer.classList.remove("active");
    }
});

