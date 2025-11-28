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