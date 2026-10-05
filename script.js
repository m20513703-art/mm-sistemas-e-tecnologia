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

function setCurrentYear() {
  const year = document.getElementById("ano-atual");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  configureWhatsAppLinks();
  configureMobileMenu();
  configureHeader();
  configureProjectFilters();
  configureCommentForm();
  configureRevealAnimations();
  setCurrentYear();
});
