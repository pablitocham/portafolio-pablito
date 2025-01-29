function mostrarOcultar() {
    let nav = document.getElementById("nav");
    nav.classList.toggle("responsive");

}

function seleccionar() {
    document.getElementById("nav").classList = ""
    menuVisible = false

}



function efectos() {
    let skills = document.getElementById("skills")
    let recorrido = window.innerHeight - skills.getBoundingClientRect().top
    if (recorrido >= 300) {

        let habilidades = document.getElementsByClassName("progreso")
        for (let i = 0; i < habilidades.length; i++) {
            habilidades[i].classList.remove("html", "css", "sass", "javascript", "react", "boostrap", "mongodb", "nodejs", "git")
        }
        setTimeout(function () {
            habilidades[0].classList.add("html");
            habilidades[1].classList.add("css");
            habilidades[2].classList.add("sass");
            habilidades[3].classList.add("javascript");
            habilidades[4].classList.add("react");
            habilidades[5].classList.add("boostrap");
            habilidades[6].classList.add("mongodb");
            habilidades[7].classList.add("nodejs");
            habilidades[8].classList.add("git");
        }, 60)
    }
}

window.onscroll = function () {

    efectos()
}