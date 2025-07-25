const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('nav, ul, li, a');


function mostrarOcultar() {
    nav.classList.toggle("mostrar");
}

function seleccionar() {
    nav.classList.remove('mostrar')

}

function enlace(event) {
    navLinks.forEach(link => link.classList.remove('active'));

    if (event && event.target) {
        event.target.classList.add('active')
    }
}

menuToggle.addEventListener('click', mostrarOcultar)
navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        seleccionar()
        enlace(event)
    })
})

window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
        document.getElementById('nav').classList.remove('mostrar')
    }
})

AOS.init({
    duration: 1000,
    once: true
});

