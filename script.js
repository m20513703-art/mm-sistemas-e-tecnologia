"use strict";

const WHATSAPP_NUMBER = "5519981123401";
const WHATSAPP_MESSAGES = {
  contato: "Olá! Conheci a MM Sistemas & Tecnologia pelo site e gostaria de saber mais.",
  orcamento: "Olá! Conheci a MM Sistemas & Tecnologia pelo site e gostaria de conversar sobre um projeto."
};

function whatsappUrl(message) {
  const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
  url.searchParams.set("text", message);
  return url.toString();
}

function configureWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    const kind = link.dataset.whatsapp || "contato";
    link.href = whatsappUrl(WHATSAPP_MESSAGES[kind] || WHATSAPP_MESSAGES.contato);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function configureMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

function configureHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function configureProjectFilters() {
  const buttons = document.querySelectorAll(".filter-button");
  const cards = document.querySelectorAll(".project-card");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      cards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/);
        card.classList.toggle("is-hidden", filter !== "todos" && !categories.includes(filter));
      });
    });
  });
}

function configureCommentForm() {
  const form = document.querySelector("#comment-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const comment = form.elements.comment.value.trim();
    const consent = form.elements.publicationConsent.checked;
    if (!name || !comment) return;

    const publicationText = consent
      ? "A pessoa autoriza que o comentário seja avaliado para possível publicação no site."
      : "A pessoa envia como sugestão privada e não autoriza publicação no site.";
    const message = [
      "Olá! Quero enviar um comentário sobre a MM Sistemas & Tecnologia.",
      "",
      `Nome: ${name}`,
      `Comentário: ${comment}`,
      "",
      publicationText
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  });
}

function configureRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}


const FEATURED_PROJECTS = [
  {name:"Pizzaria Dom Juan",kicker:"DEMO · SITE + PDV",title:"Pizzaria<br>Dom Juan",href:"https://m20513703-art.github.io/dom-juan-pizzaria/",image:"project-dom-juan.jpg",alt:"Demonstração fictícia da Pizzaria Dom Juan"},
  {name:"Restaurante & Lanchonete MM",kicker:"WEB · GASTRONOMIA",title:"Restaurante &amp;<br>Lanchonete MM",href:"https://m20513703-art.github.io/restaurante-e-lanchonete-mm/",image:"project-restaurante.jpg",alt:"Projeto de restaurante e lanchonete"},
  {name:"Sistema para Padaria",kicker:"SISTEMA · PADARIA",title:"Sistema para<br>Padaria",href:"https://m20513703-art.github.io/padaria/",image:"project-padaria.jpg",alt:"Sistema web para padaria"},
  {name:"TECH MM",kicker:"SISTEMA · SERVIÇOS",title:"TECH MM",href:"https://m20513703-art.github.io/tech-mm/",image:"project-tech.jpg",alt:"Sistema de serviços TECH MM"},
  {name:"Luz & Memória",kicker:"WEB · FOTOGRAFIA",title:"Luz &amp;<br>Memória",href:"https://m20513703-art.github.io/fotografia/",image:"project-fotografia.jpg",alt:"Site de fotografia Luz e Memória"},
  {name:"Site de Climatização",kicker:"WEB · CLIMATIZAÇÃO",title:"Site de<br>Climatização",href:"https://m20513703-art.github.io/climatizacao/",image:"project-climatizacao.jpg",alt:"Site de serviços de climatização"},
  {name:"Supermercado MM",kicker:"WEB · VAREJO",title:"Supermercado<br>MM",href:"https://m20513703-art.github.io/supermercado-mm/",image:"project-supermercado.jpg",alt:"Projeto do Supermercado MM"},
  {name:"Açougue — Encomendas",kicker:"WEB · ENCOMENDAS",title:"Sistema para<br>Açougue",href:"https://m20513703-art.github.io/acougue/",image:"project-acougue.jpg",alt:"Sistema de encomendas para açougue"},
  {name:"Giovana Modas",kicker:"WEB · MODA",title:"Giovana<br>Modas",href:"https://m20513703-art.github.io/loja-giovana/",image:"project-moda.jpg",alt:"Site de moda Giovana Modas"},
  {name:"Thor Pet Shop",kicker:"WEB · PET SHOP",title:"Thor Pet<br>Shop",href:"https://m20513703-art.github.io/pet-shop/",image:"project-pet.jpg",alt:"Site do Thor Pet Shop"},
  {name:"Clínica Odontológica",kicker:"WEB · SAÚDE",title:"Clínica<br>Odontológica",href:"https://m20513703-art.github.io/denstista/",image:"project-odontologia.jpg",alt:"Site demonstrativo de clínica odontológica"},
  {name:"Notas — Organização",kicker:"SISTEMA · ORGANIZAÇÃO",title:"Notas — Sistema<br>de Organização",href:"https://m20513703-art.github.io/notas-/",image:"project-notas.jpg",alt:"Sistema de organização de notas"},
  {name:"Imobiliária São José",kicker:"DEMO · IMÓVEIS",title:"Imobiliária<br>São José",href:"https://m20513703-art.github.io/imobiliaria-sao-jose-demo/",image:"https://m20513703-art.github.io/imobiliaria-sao-jose-demo/fachada-imobiliaria-ilustrativa.webp",alt:"Fachada ilustrativa de imobiliária fictícia"},
  {name:"Oficina do Dedé",kicker:"DEMO · OFICINA",title:"Oficina<br>do Dedé",href:"https://m20513703-art.github.io/oficina-do-dede-demo/",image:"https://m20513703-art.github.io/oficina-do-dede-demo/oficina-hero.png",alt:"Imagem ilustrativa da demonstração de oficina"},
  {name:"OrçaPro",kicker:"DEMO · SISTEMA DE ORÇAMENTOS",title:"Orçamentos<br>mais organizados.",href:"https://m20513703-art.github.io/orcapro-teste/",image:"project-orcapro.webp",alt:"Capa ilustrativa do OrçaPro"},
  {name:"Guia de Viagens",kicker:"APP ANDROID · VIAGENS",title:"Guia de<br>Viagens",href:"guia-de-viagens.html",image:"project-guia-viagens.png",alt:"Aplicativo Guia de Viagens"},
  {name:"Minhas Finanças",kicker:"APP ANDROID · FINANÇAS",title:"Minhas<br>Finanças",href:"minhas-financas.html",image:"project-minhas-financas.png",alt:"Aplicativo Minhas Finanças"},
  {name:"Viver Bem",kicker:"APP ANDROID · BEM-ESTAR",title:"Viver Bem",href:"viver-bem.html",image:"project-viver-bem.png",alt:"Aplicativo Viver Bem"},
  {name:"MM FC",kicker:"SITE · TIME AMADOR",title:"MM FC —<br>Futebol Clube",href:"mm-fc.html",image:"",alt:""},
  {name:"Show do MM",kicker:"JOGO ANDROID · QUIZ",title:"Show do MM",href:"show-do-mm.html",image:"",alt:""}
];
function configureFeaturedProjects() {
  const grid = document.querySelector("#featured-projects");
  if (!grid) return;
  const cards = [...grid.querySelectorAll(".home-project-card")];
  let previous = [];
  try {
    const stored = JSON.parse(localStorage.getItem("mm-featured-previous-v1") || "[]");
    if (Array.isArray(stored)) previous = stored;
  } catch (_) {}
  let shuffled = FEATURED_PROJECTS.filter(project => !previous.includes(project.name));
  if (shuffled.length < cards.length) shuffled = [...FEATURED_PROJECTS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  try { localStorage.setItem("mm-featured-previous-v1", JSON.stringify(shuffled.slice(0, cards.length).map(project => project.name))); } catch (_) {}
  cards.forEach((card, index) => {
    const project = shuffled[index];
    card.href = project.href;
    card.setAttribute("aria-label", `${project.name} — abrir projeto`);
    const image = card.querySelector(".home-project-photo");
    image.src = project.image || "project-tech.jpg";
    image.alt = project.alt;
    image.hidden = !project.image;
    const kicker = card.querySelector("span");
    if (kicker) kicker.textContent = project.kicker;
    const title = card.querySelector("strong");
    if (title) title.innerHTML = project.title;
  });
}

function setCurrentYear() {
  const year = document.getElementById("ano-atual");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  configureFeaturedProjects();
  configureWhatsAppLinks();
  configureMobileMenu();
  configureHeader();
  configureProjectFilters();
  configureCommentForm();
  configureRevealAnimations();
  setCurrentYear();
});
