const nav = document.getElementById('nav')
const menuToggle = document.getElementById('menu-toggle')
const navLinks = document.querySelectorAll('nav a')


function mostrarOcultar() {
    nav.classList.toggle("mostrar")
}

function seleccionar() {
    nav.classList.remove('mostrar')

}

function enlace(event) {
    navLinks.forEach(link => link.classList.remove('active'))

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

const sections = document.querySelectorAll('section[id]')

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active')
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active')
                }
            })
        }
    })
}, {
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
})

sections.forEach(section => sectionObserver.observe(section))


const typedEl = document.getElementById('typed-text')

const phrases = [
    'HTML / CSS / JavaScript',
    'React Developer',
    'Node.js',
    'MongoDB / APIs REST',
    'Full Stack Developer',
    'Rosario, Argentina'
]

let phraseIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
    if (!typedEl) return

    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
    } else {
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
    }

    let speed = isDeleting ? 38 : 75

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 1800
        isDeleting = true
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        speed = 350
    }

    setTimeout(typeEffect, speed)
}

typeEffect()

const canvas = document.getElementById('particlesCanvas')
const ctx = canvas ? canvas.getContext('2d') : null


if (canvas && ctx) {

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H


    const MAX_DIST = 150
    const particles = []
    function getParticleCount() {
        if (window.innerWidth < 768) return 120
        if (window.innerWidth < 1024) return 200
        return 300
    }

    class Particle {
        constructor() {
            this.reset()
        }

        reset() {
            this.x = Math.random() * W
            this.y = Math.random() * H
            this.size = Math.random() * 2.2 + 0.6
            this.speedX = (Math.random() - 0.5) * 0.28
            this.speedY = (Math.random() - 0.5) * 0.28
            this.opacity = Math.random() * 0.6 + 0.2
            this.color = Math.random() > 0.55 ? '#1cb698' : '#0dda40'
        }

        update() {
            this.x += this.speedX
            this.y += this.speedY
            if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) {
                this.reset()
            }
        }

        draw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fillStyle = this.color
            ctx.globalAlpha = this.opacity
            ctx.fill()
            ctx.globalAlpha = 1
        }
    }

    function createParticles() {
        particles.length = 0
        const count = getParticleCount()
        for (let i = 0; i < count; i++) {
            particles.push(new Particle())
        }
    }
    createParticles()

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x
                const dy = particles[i].y - particles[j].y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < MAX_DIST) {
                    ctx.beginPath()
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(particles[j].x, particles[j].y)
                    ctx.strokeStyle = '#1cb698'
                    ctx.globalAlpha = (1 - dist / MAX_DIST) * 1.5
                    ctx.lineWidth = 0.5
                    ctx.stroke()
                    ctx.globalAlpha = 1
                }
            }
        }
    }
    function animateParticles() {
        ctx.clearRect(0, 0, W, H)
        particles.forEach(p => {
            p.update()
            p.draw()
        })
        drawConnections()
        requestAnimationFrame(animateParticles)
    }
    animateParticles()
    let resizeTimeout
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {

            W = window.innerWidth
            H = window.innerHeight
            canvas.width = W
            canvas.height = H
            createParticles()
        }, 200)
    })

}

const revealSelectors = [
    '.skill-inner',
    '.item-body',
    '.project',
    '.sobremi-text p',
    '.contacto-info'
]

const revealElements = document.querySelectorAll(revealSelectors.join(', '))

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
            revealObserver.unobserve(entry.target)
        }
    })
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -35px 0px'
})

revealElements.forEach((el, index) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(18px)'
    el.style.transition = `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s`
    revealObserver.observe(el)
})
