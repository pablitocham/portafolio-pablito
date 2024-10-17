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
            habilidades[i].classList.remove("htmlycss", "sass", "javascript", "react", "github", "comunicacion", "equipo", "creatividad", "resolucion", "liderazgo")
        }
        setTimeout(function () {
            habilidades[0].classList.add("htmlycss");
            habilidades[1].classList.add("sass");
            habilidades[2].classList.add("javascript");
            habilidades[3].classList.add("react");
            habilidades[4].classList.add("github");
            habilidades[5].classList.add("comunicacion");
            habilidades[6].classList.add("equipo");
            habilidades[7].classList.add("creatividad");
            habilidades[8].classList.add("resolucion");
            habilidades[9].classList.add("liderazgo");
        }, 60)
    }
}

window.onscroll = function () {

    efectos()
}