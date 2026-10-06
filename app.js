const projects = {
  autosys: {
    title: "AutoSys",
    type: "Aplicación web",
    origin: "Proyecto aplicado",
    short: "Sistema web para la gestión de talleres mecánicos, clientes, vehículos y órdenes de ingreso.",
    description: "Plataforma web para digitalizar la gestión de clientes, vehículos y órdenes de ingreso de un taller mecánico. Combina una arquitectura MVC con persistencia relacional para ordenar el trabajo operativo diario.",
    technologies: ["ASP.NET Core MVC", "C#", "SQL Server", "Entity Framework Core", "Razor"],
    image: "./assets/autosys.svg",
    url: "https://github.com/JuanBocadi/AutoSys"
  },
  futbolle: {
    title: "Futbolle",
    type: "Juego web",
    origin: "Proyecto final · UAI",
    short: "Juego web de adivinanzas de fútbol con pistas, niveles y datos de jugadores.",
    description: "Juego de adivinanzas desarrollado para Desarrollo y Arquitecturas Web en la UAI. Usa una API de jugadores, pistas comparativas y tres niveles de dificultad; guarda el historial de partidas en el navegador.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Fetch API", "LocalStorage"],
    image: "./assets/futbolle.svg",
    url: "https://github.com/JuanBocadi/futbolle-daw-2026"
  },
  bases: {
    title: "Bases de Datos Avanzada",
    type: "Base de datos",
    origin: "Trabajos de la UAI",
    short: "Ejercicios de SQL Server, modelado de datos y procedimientos almacenados.",
    description: "Repositorio de trabajos de la materia Bases de Datos Avanzada de la UAI. Reúne ejercicios de SQL sobre distintos dominios, entre ellos una empresa, vuelos, eventos y procedimientos almacenados para un banco.",
    technologies: ["T-SQL", "SQL Server", "Procedimientos almacenados", "Modelado de datos"],
    image: "./assets/bases.svg",
    url: "https://github.com/JuanBocadi/Base_de_Datos_Avanzada"
  }
};
const projectKeys = Object.keys(projects);
const views = [...document.querySelectorAll(".view")];
const viewNames = {store:"TIENDA / Inicio",library:"BIBLIOTECA / Proyectos",community:"COMUNIDAD / Destacados",profile:"BOCADIJUAN / Perfil",activity:"BOCADIJUAN / Actividad",contact:"AMIGOS Y CHAT / Contacto"};
const menu = document.querySelector(".account-menu");
const menuTrigger = document.querySelector(".account-trigger");
const mobileToggle = document.querySelector(".mobile-menu-toggle");
const mainNav = document.querySelector(".main-nav");
const projectRows = [...document.querySelectorAll("[data-project]")];
const libraryOverview = document.querySelector("#library-overview");
const projectDetail = document.querySelector("#project-detail");
const libraryMain = document.querySelector(".library-main");
document.querySelector(".skip-link").addEventListener("click",event=>{
  event.preventDefault();
  requestAnimationFrame(()=>document.querySelector("main").focus());
});

function closeMenus(){
  menu.classList.remove("is-open");
  menuTrigger.setAttribute("aria-expanded","false");
  mainNav.classList.remove("is-open");
  mobileToggle.setAttribute("aria-expanded","false");
}
mobileToggle.addEventListener("click",()=>{
  const open=mainNav.classList.toggle("is-open");
  mobileToggle.setAttribute("aria-expanded",String(open));
  mobileToggle.setAttribute("aria-label",open?"Cerrar navegación":"Abrir navegación");
});
menuTrigger.addEventListener("click",()=>{
  const open=menu.classList.toggle("is-open");
  menuTrigger.setAttribute("aria-expanded",String(open));
});
document.addEventListener("click",event=>{
  if(!event.target.closest(".account-menu")){
    menu.classList.remove("is-open");
    menuTrigger.setAttribute("aria-expanded","false");
  }
});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenus()});
mainNav.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenus));

function showProject(key){
  const project=projects[key];
  if(!project)return;
  libraryOverview.hidden=true;
  projectDetail.hidden=false;
  projectRows.forEach(row=>{
    const active=row.dataset.project===key;
    row.classList.toggle("is-active",active);
    row.setAttribute("aria-pressed",String(active));
  });
  const image=document.querySelector("#detail-image");
  image.src=project.image;
  image.alt=`Ilustración del proyecto ${project.title}`;
  document.querySelector("#detail-banner-title").textContent=project.title;
  document.querySelector("#project-title").textContent=project.title;
  document.querySelector("#project-type").textContent=project.type;
  document.querySelector("#project-origin").textContent=project.origin;
  document.querySelector("#project-description").textContent=project.description;
  for(const id of ["project-play","project-repo-link","project-side-link"])document.getElementById(id).href=project.url;
  document.querySelector("#project-tech").replaceChildren(...project.technologies.map(tech=>{
    const pill=document.createElement("span");pill.textContent=tech;return pill;
  }));
  document.querySelector("#address-label").textContent=`BIBLIOTECA / ${project.title}`;
  libraryMain.scrollTop=0;
}
function showLibraryHome(){
  libraryOverview.hidden=false;
  projectDetail.hidden=true;
  projectRows.forEach(row=>{row.classList.remove("is-active");row.setAttribute("aria-pressed","false")});
  libraryMain.scrollTop=0;
}
projectRows.forEach(row=>row.addEventListener("click",()=>{location.hash=`library/${row.dataset.project}`}));
document.querySelector("#project-search").addEventListener("input",event=>{
  const term=event.target.value.trim().toLocaleLowerCase("es");
  let visible=0;
  projectRows.forEach(row=>{
    const match=projects[row.dataset.project].title.toLocaleLowerCase("es").includes(term);
    row.hidden=!match;
    if(match)visible++;
  });
  document.querySelector("#search-empty").hidden=visible>0;
});
document.querySelectorAll(".detail-subnav a[href^='#project-']").forEach(link=>link.addEventListener("click",event=>{
  event.preventDefault();
  document.querySelector(link.getAttribute("href")).scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
}));

function route(){
  const routePart=decodeURIComponent(location.hash.slice(1))||"store";
  const [base,detail]=routePart.split("/");
  const active=base==="skills"?"profile":viewNames[base]?base:"store";
  document.body.classList.toggle("route-library",active==="library");
  views.forEach(view=>view.hidden=view.id!==active);
  document.querySelectorAll("[data-view-link]").forEach(link=>{
    const selected=link.dataset.viewLink===active;
    link.classList.toggle("is-current",selected);
    if(selected)link.setAttribute("aria-current","page");else link.removeAttribute("aria-current");
  });
  menu.classList.toggle("is-current",["profile","activity","contact"].includes(active));
  document.querySelector("#address-label").textContent=viewNames[active];
  if(active==="library"){
    if(detail&&projects[detail])showProject(detail);else showLibraryHome();
  }
  if(active==="profile"&&base==="skills"){
    requestAnimationFrame(()=>document.querySelector("#skills").scrollIntoView({block:"start"}));
  }else{
    document.querySelector("main").scrollTop=0;
  }
  closeMenus();
}
window.addEventListener("hashchange",route);
route();

let currentSlide=0;
function showSlide(index){
  currentSlide=(index+projectKeys.length)%projectKeys.length;
  const key=projectKeys[currentSlide],project=projects[key];
  const image=document.querySelector("#featured-image");
  image.src=project.image;image.alt=`Ilustración del proyecto ${project.title}`;
  document.querySelector("#featured-title").textContent=project.title;
  document.querySelector("#featured-description").textContent=project.short;
  document.querySelector("#featured-tech").textContent=project.technologies.slice(0,2).join(" · ");
  document.querySelector("#featured-link").href=`#library/${key}`;
  document.querySelectorAll("[data-slide]").forEach(dot=>{
    const selected=Number(dot.dataset.slide)===currentSlide;
    dot.classList.toggle("active",selected);
    dot.setAttribute("aria-pressed",String(selected));
  });
}
document.querySelector(".carousel-prev").addEventListener("click",()=>showSlide(currentSlide-1));
document.querySelector(".carousel-next").addEventListener("click",()=>showSlide(currentSlide+1));
document.querySelectorAll("[data-slide]").forEach(dot=>dot.addEventListener("click",()=>showSlide(Number(dot.dataset.slide))));
showSlide(0);

const feed=document.querySelector("#activity-feed");
const labels={
  PushEvent:"Publicó cambios en",
  CreateEvent:"Creó contenido en",
  PullRequestEvent:"Trabajó en una propuesta de",
  IssuesEvent:"Participó en un issue de",
  ReleaseEvent:"Publicó una versión de",
  ForkEvent:"Hizo un fork de"
};
function activityRow(verb,name,url,date,source){
  const row=document.createElement("article");row.className="activity-item";
  const icon=document.createElement("span");icon.className="activity-item-icon";icon.setAttribute("aria-hidden","true");icon.textContent="↥";
  const content=document.createElement("div");
  const title=document.createElement("strong");title.append(`${verb} `);
  const link=document.createElement("a");link.href=url;link.target="_blank";link.rel="noopener noreferrer";link.textContent=name;title.append(link);
  const sub=document.createElement("small");sub.textContent=source;
  const time=document.createElement("time");const parsed=new Date(date);time.dateTime=parsed.toISOString();time.textContent=parsed.toLocaleDateString("es-AR",{day:"numeric",month:"short",year:"numeric"});
  content.append(title,sub);row.append(icon,content,time);return row;
}
async function loadActivity(){
  try{
    const response=await fetch("https://api.github.com/users/JuanBocadi/events/public?per_page=20",{headers:{Accept:"application/vnd.github+json"}});
    if(!response.ok)throw new Error("Eventos no disponibles");
    const events=await response.json();
    const usable=events.filter(event=>event.repo&&event.created_at).slice(0,6);
    if(!usable.length)throw new Error("No hay eventos recientes");
    feed.replaceChildren(...usable.map(event=>activityRow(labels[event.type]||"Registró actividad en",event.repo.name.replace(/^JuanBocadi\//i,""),`https://github.com/${event.repo.name}`,event.created_at,"Evento público de GitHub")));
  }catch{
    try{
      const response=await fetch("https://api.github.com/users/JuanBocadi/repos?per_page=6&sort=pushed&direction=desc",{headers:{Accept:"application/vnd.github+json"}});
      if(!response.ok)throw new Error("Repositorios no disponibles");
      const repos=await response.json();
      if(!repos.length)throw new Error("Sin repositorios");
      feed.replaceChildren(...repos.map(repo=>activityRow("Última actualización de",repo.name,repo.html_url,repo.pushed_at||repo.updated_at,"Repositorio público de GitHub")));
    }catch{
      const paragraph=document.createElement("p");paragraph.className="activity-empty";
      paragraph.append("La actividad no está disponible ahora. Podés verla en ");
      const link=document.createElement("a");link.href="https://github.com/JuanBocadi";link.target="_blank";link.rel="noopener noreferrer";link.textContent="mi perfil de GitHub";paragraph.append(link,".");
      feed.replaceChildren(paragraph);
    }
  }
}
loadActivity();
