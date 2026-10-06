const projects = {
  autosys: {
    title: "AutoSys",
    wordmark: "AUTOSYS",
    subtitle: "GESTIÓN DE TALLERES",
    type: "APLICACIÓN WEB",
    description: "Plataforma web para digitalizar la gestión de clientes, vehículos y órdenes de ingreso de un taller mecánico. Combina una arquitectura MVC con persistencia relacional para ordenar el trabajo operativo diario.",
    technologies: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework Core", "Razor"],
    origin: "Proyecto aplicado",
    url: "https://github.com/JuanBocadi/AutoSys",
    banner: "banner-autosys"
  },
  futbolle: {
    title: "Futbolle",
    wordmark: "FUTBOLLE",
    subtitle: "JUEGO WEB DE FÚTBOL",
    type: "JUEGO WEB",
    description: "Juego de adivinanzas desarrollado para Desarrollo y Arquitecturas Web en la UAI. Usa una API de jugadores, pistas comparativas y tres niveles de dificultad; guarda el historial de partidas en el navegador.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Fetch API", "LocalStorage"],
    origin: "Proyecto final · UAI",
    url: "https://github.com/JuanBocadi/futbolle-daw-2026",
    banner: "banner-futbolle"
  },
  bases: {
    title: "Bases de Datos Avanzada",
    wordmark: "DATA LAB",
    subtitle: "SQL · MODELOS · CONSULTAS",
    type: "COLECCIÓN ACADÉMICA",
    description: "Repositorio de trabajos de la materia Bases de Datos Avanzada de la UAI. Reúne ejercicios de SQL sobre distintos dominios, entre ellos una empresa, vuelos, eventos y procedimientos almacenados para un banco.",
    technologies: ["T-SQL", "SQL Server", "Procedimientos almacenados", "Modelado de datos"],
    origin: "Trabajos de la UAI",
    url: "https://github.com/JuanBocadi/Base_de_Datos_Avanzada",
    banner: "banner-bases"
  }
};

const projectButtons = [...document.querySelectorAll("[data-project]")];
const projectSearch = document.querySelector("#project-search");
const projectBanner = document.querySelector("#project-banner");
const projectTech = document.querySelector("#project-tech");

function selectProject(key) {
  const project = projects[key];
  if (!project) return;

  projectButtons.forEach((button) => {
    const active = button.dataset.project === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  projectBanner.className = `project-banner ${project.banner}`;
  document.querySelector("#banner-wordmark").textContent = project.wordmark;
  document.querySelector("#banner-subline").textContent = project.subtitle;
  document.querySelector("#project-title").textContent = project.title;
  document.querySelector("#project-type").textContent = project.type;
  document.querySelector("#project-description").textContent = project.description;
  document.querySelector("#project-origin").textContent = project.origin;
  document.querySelector("#project-play").href = project.url;
  document.querySelector("#project-repo-link").href = project.url;
  projectTech.replaceChildren(...project.technologies.map((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    return tag;
  }));
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => selectProject(button.dataset.project));
});

projectSearch.addEventListener("input", () => {
  const term = projectSearch.value.trim().toLocaleLowerCase("es");
  const visibleButtons = projectButtons.filter((button) => {
    const matches = projects[button.dataset.project].title.toLocaleLowerCase("es").includes(term);
    button.hidden = !matches;
    return matches;
  });
  document.querySelector("#search-empty").hidden = visibleButtons.length > 0;
  if (visibleButtons.length && !visibleButtons.some((button) => button.classList.contains("is-active"))) {
    selectProject(visibleButtons[0].dataset.project);
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const profileMenu = document.querySelector(".profile-menu");
const profileTrigger = document.querySelector(".profile-trigger");

function closeMenus() {
  primaryNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú");
  profileMenu.classList.remove("is-open");
  profileTrigger.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const open = primaryNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

profileTrigger.addEventListener("click", () => {
  const open = profileMenu.classList.toggle("is-open");
  profileTrigger.setAttribute("aria-expanded", String(open));
});

primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenus));
document.addEventListener("click", (event) => {
  if (!event.target.closest(".profile-menu")) {
    profileMenu.classList.remove("is-open");
    profileTrigger.setAttribute("aria-expanded", "false");
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenus();
});

const navLinks = [...document.querySelectorAll(".primary-nav > a[data-nav]")];
const sections = [...document.querySelectorAll("#inicio, #biblioteca, #comunidad")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach((link) => {
      const active = link.dataset.nav === current.target.id;
      link.classList.toggle("is-current", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, .1, .3] });
  sections.forEach((section) => observer.observe(section));
}

const activityFeed = document.querySelector("#activity-feed");
const eventLabels = {
  PushEvent: { icon: "↥", verb: "Publicó cambios en" },
  CreateEvent: { icon: "+", verb: "Creó una rama o repositorio en" },
  PullRequestEvent: { icon: "⑂", verb: "Actualizó una propuesta en" },
  IssuesEvent: { icon: "◎", verb: "Participó en un issue de" },
  ReleaseEvent: { icon: "◆", verb: "Publicó una versión de" },
  ForkEvent: { icon: "⑃", verb: "Creó una copia de" }
};

function renderActivity(events) {
  activityFeed.replaceChildren();
  if (!events.length) {
    return loadRecentRepositories();
  }

  events.slice(0, 5).forEach((event) => {
    const info = eventLabels[event.type] || { icon: "•", verb: "Registró actividad en" };
    const row = document.createElement("div");
    row.className = "activity-item";
    const icon = document.createElement("span");
    icon.className = "activity-item-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = info.icon;
    const content = document.createElement("div");
    const title = document.createElement("strong");
    title.append(`${info.verb} `);
    const repo = document.createElement("a");
    repo.href = `https://github.com/${event.repo.name}`;
    repo.target = "_blank";
    repo.rel = "noopener noreferrer";
    repo.textContent = event.repo.name.replace(/^JuanBocadi\//i, "");
    title.append(repo);
    const source = document.createElement("small");
    source.textContent = "Evento público de GitHub";
    const time = document.createElement("time");
    const date = new Date(event.created_at);
    time.dateTime = event.created_at;
    time.textContent = date.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
    content.append(title, source);
    row.append(icon, content, time);
    activityFeed.append(row);
  });
}

function loadRecentRepositories() {
  return fetch("https://api.github.com/users/JuanBocadi/repos?per_page=5&sort=pushed&direction=desc", {
    headers: { Accept: "application/vnd.github+json" }
  })
    .then((response) => {
      if (!response.ok) throw new Error("GitHub no respondió correctamente");
      return response.json();
    })
    .then((repos) => {
      if (!Array.isArray(repos) || !repos.length) throw new Error("Sin repositorios");
      repos.forEach((repo) => {
        const row = document.createElement("div");
        row.className = "activity-item";
        const icon = document.createElement("span");
        icon.className = "activity-item-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "↥";
        const content = document.createElement("div");
        const title = document.createElement("strong");
        title.append("Última actualización de ");
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = repo.name;
        title.append(link);
        const source = document.createElement("small");
        source.textContent = "Repositorio público de GitHub";
        const time = document.createElement("time");
        const date = new Date(repo.pushed_at || repo.updated_at);
        time.dateTime = date.toISOString();
        time.textContent = date.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
        content.append(title, source);
        row.append(icon, content, time);
        activityFeed.append(row);
      });
    });
}

fetch("https://api.github.com/users/JuanBocadi/events/public?per_page=10", {
  headers: { Accept: "application/vnd.github+json" }
})
  .then((response) => {
    if (!response.ok) throw new Error("GitHub no respondió correctamente");
    return response.json();
  })
  .then((events) => renderActivity(Array.isArray(events) ? events : []))
  .catch(() => {
    activityFeed.replaceChildren();
    const message = document.createElement("p");
    message.className = "activity-empty";
    message.append("No se pudo cargar la actividad ahora. Visitá ");
    const link = document.createElement("a");
    link.href = "https://github.com/JuanBocadi";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "mi perfil de GitHub";
    message.append(link, " para verla directamente.");
    activityFeed.append(message);
  });
