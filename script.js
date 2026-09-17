// =========================================================
// SCRIPT PRINCIPAL
// MM SISTEMAS & TECNOLOGIA
// =========================================================


// =========================================================
// CONFIGURAÇÕES
// =========================================================

const WHATSAPP = "5519981123401";

const INSTAGRAM =
    "https://www.instagram.com/mmsistemasetecnologia/";


// =========================================================
// MENSAGENS DO WHATSAPP
// =========================================================

const MENSAGENS = {

    contato:
        "Olá! Vi a MM Sistemas & Tecnologia e gostaria de saber mais sobre os serviços.",

    orcamento:
        "Olá! Vi a MM Sistemas & Tecnologia e gostaria de solicitar um orçamento para um projeto."

};


// =========================================================
// ABRIR WHATSAPP
// =========================================================

function abrirWhatsApp(tipo = "contato") {

    const mensagem =
        MENSAGENS[tipo] || MENSAGENS.contato;

    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");

}


// =========================================================
// ANO AUTOMÁTICO DO RODAPÉ
// =========================================================

function atualizarAno() {

    const elemento =
        document.getElementById("anoAtual");

    if (elemento) {

        elemento.textContent =
            new Date().getFullYear();

    }

}


// =========================================================
// BOTÕES DO WHATSAPP
// =========================================================

function configurarWhatsApp() {

    const botoes =
        document.querySelectorAll("[data-whatsapp]");

    botoes.forEach(botao => {

        botao.addEventListener("click", function (evento) {

            evento.preventDefault();

            const tipo =
                this.dataset.whatsapp || "contato";

            abrirWhatsApp(tipo);

        });

    });

}


// =========================================================
// NAVEGAÇÃO SUAVE
// =========================================================

function configurarNavegacao() {

    const links =
        document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (evento) {

            const destino =
                this.getAttribute("href");

            if (
                !destino ||
                destino === "#" ||
                this.hasAttribute("data-whatsapp")
            ) {

                return;

            }

            const elemento =
                document.querySelector(destino);

            if (!elemento) {

                return;

            }

            evento.preventDefault();

            elemento.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}


// =========================================================
// ANIMAÇÃO DOS ELEMENTOS
// =========================================================

function configurarAnimacoes() {

    const elementos =
        document.querySelectorAll(
            ".card-servico, .card-projeto, .destaque, .contato-card"
        );

    if (!("IntersectionObserver" in window)) {

        elementos.forEach(elemento => {

            elemento.classList.add("mostrar");

        });

        return;

    }

    const observador =
        new IntersectionObserver(

            (entradas, observer) => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("mostrar");

                        observer.unobserve(
                            entrada.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    elementos.forEach(elemento => {

        elemento.classList.add("animar");

        observador.observe(elemento);

    });

}


// =========================================================
// EFEITO NO CABEÇALHO AO ROLAR
// =========================================================

function configurarCabecalho() {

    const cabecalho =
        document.querySelector(".cabecalho");

    if (!cabecalho) {

        return;

    }

    function verificarScroll() {

        if (window.scrollY > 30) {

            cabecalho.classList.add("rolando");

        } else {

            cabecalho.classList.remove("rolando");

        }

    }

    window.addEventListener(
        "scroll",
        verificarScroll
    );

    verificarScroll();

}


// =========================================================
// BOTÃO VER PROJETOS
// =========================================================

function configurarProjetos() {

    const botoes =
        document.querySelectorAll(".botao-projeto");

    botoes.forEach(botao => {

        botao.addEventListener("click", function () {

            if (
                this.classList.contains("desativado")
            ) {

                return;

            }

        });

    });

}


// =========================================================
// LOGO → VOLTAR PARA O TOPO
// =========================================================

function configurarLogo() {

    const logos =
        document.querySelectorAll(".logo");

    logos.forEach(logo => {

        logo.addEventListener("click", function (evento) {

            evento.preventDefault();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    });

}


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        atualizarAno();

        configurarWhatsApp();

        configurarNavegacao();

        configurarAnimacoes();

        configurarCabecalho();

        configurarProjetos();

        configurarLogo();

        console.log(
            "MM Sistemas & Tecnologia — Landing Page carregada."
        );

    }
);