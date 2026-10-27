const services = {
  armed: {
    kicker: "Armed",
    title: "Armed Security Officers",
    image: "images/armed.jpg",
    alt: "Security officer in a dark suit outside a glass office tower at night",
    body: "Armed officers are assigned only where the post calls for a licensed firearm. They may be uniformed or in plain clothes. Each post has written orders, a supervisor, and a reporting line back to Suncrest. The work is deterrence, access control, and an immediate response when something is wrong."
  },
  unarmed: {
    kicker: "Unarmed",
    title: "Unarmed Security Officers",
    image: "images/unarmed.jpg",
    alt: "Unarmed security officer beside a marble reception desk",
    body: "Unarmed officers cover lobbies, residences, retail floors, and workplaces where judgment and presence carry the post. Duties include access control, visitor management, patrol, and incident reporting. The hiring standard does not drop because the post is unarmed."
  },
  patrol: {
    kicker: "Mobile",
    title: "Mobile Patrol & Alarm Response",
    image: "images/patrol.jpg",
    alt: "Uniformed officer on a night patrol beside a sedan",
    body: "Mobile officers run a set route and answer alarm activations. Stops are logged with time and condition. Perimeter checks, lock-and-leave, and after-hours response are coordinated from one desk, including overnight."
  },
  event: {
    kicker: "Events",
    title: "Event & Venue Security",
    image: "images/event.jpg",
    alt: "Security officer standing beside a column at a formal gala",
    body: "Event teams handle arrivals, credentials, and the floor of a private gathering. Staffing follows the guest count, the venue, and how visible you want the security to be. The aim is a controlled room that still feels like the event you planned."
  },
  executive: {
    kicker: "Protection",
    title: "Executive / VIP Protection",
    image: "images/executive.jpg",
    alt: "Close protection officer walking with an executive at dawn",
    body: "Close protection is planned before the principal moves. Advance work, routes, and the size of the detail are set to the day. Officers stay near and stay unobtrusive, at home or while traveling."
  },
  residential: {
    kicker: "Residential",
    title: "Residential Security",
    image: "images/residential.jpg",
    alt: "Officer at the gate of a modern private residence at dusk",
    body: "Residential coverage is built around the property: gate control, a fixed post, interior overnight, or a passing patrol. Officers are briefed on the household, the vendors, and what should never be discussed off the property."
  },
  commercial: {
    kicker: "Commercial",
    title: "Commercial & Industrial Security",
    image: "images/commercial.jpg",
    alt: "Security officer reviewing a tablet at an industrial loading dock",
    body: "Commercial and industrial posts cover offices, yards, warehouses, and plants. Officers learn the operation, follow the post orders, and keep access and incident logs management can review. Coverage can be one officer or a full site."
  },
  loss: {
    kicker: "Retail",
    title: "Loss Prevention",
    image: "images/loss.jpg",
    alt: "Plainclothes professional observing a quiet luxury retail floor",
    body: "Loss prevention is quiet coverage for sales floors and high-value stock. Officers watch, deter, and document. Incidents are written up so the client has a record, not a story."
  }
};

const header = document.querySelector(".site-header");
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const modal = document.querySelector("#service-modal");
const form = document.querySelector("#consult-form");
const success = document.querySelector("#form-success");
const serviceSelect = document.querySelector("#service");
let lastFocus = null;

document.documentElement.classList.add("js");

function onScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  header.classList.toggle("is-open", open);
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
}

toggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => spy.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-in"));
}

function openModal(key) {
  const service = services[key];
  if (!service) return;
  lastFocus = document.activeElement;
  modal.querySelector("#modal-image").src = service.image;
  modal.querySelector("#modal-image").alt = service.alt;
  modal.querySelector("#modal-kicker").textContent = service.kicker;
  modal.querySelector("#modal-title").textContent = service.title;
  modal.querySelector("#modal-body").textContent = service.body;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-panel").focus();
}

function closeModal() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(link.dataset.service);
  });
});

modal.querySelectorAll("[data-close]").forEach((node) => {
  node.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
  if (event.key !== "Tab" || modal.hidden) return;
  const focusable = [...modal.querySelectorAll("button, a[href]")];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

modal.querySelector("#modal-cta").addEventListener("click", () => {
  const title = modal.querySelector("#modal-title").textContent;
  if ([...serviceSelect.options].some((option) => option.value === title)) {
    serviceSelect.value = title;
  }
  closeModal();
});

function setError(name, message) {
  const field = form.elements[name];
  const slot = form.querySelector(`[data-error-for="${name}"]`);
  if (!field || !slot) return;
  slot.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

function validate() {
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const phone = form.elements.phone.value.trim();
  const service = form.elements.service.value;
  const message = form.elements.message.value.trim();
  let valid = true;

  setError("name", "");
  setError("email", "");
  setError("phone", "");
  setError("service", "");
  setError("message", "");

  if (name.length < 2) {
    setError("name", "Enter your name.");
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Enter a valid email.");
    valid = false;
  }
  if (phone.replace(/\D/g, "").length < 7) {
    setError("phone", "Enter a phone number.");
    valid = false;
  }
  if (!service) {
    setError("service", "Select a service.");
    valid = false;
  }
  if (message.length < 12) {
    setError("message", "Add a short note about the site and coverage.");
    valid = false;
  }
  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (form.elements.company.value) return;
  if (!validate()) {
    const firstInvalid = form.querySelector("[aria-invalid='true']");
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const button = form.querySelector("[type='submit']");
  button.disabled = true;
  button.textContent = "Sending";

  window.setTimeout(() => {
    form.hidden = true;
    success.hidden = false;
    button.disabled = false;
    button.textContent = "Request a Consultation";
  }, 700);
});

document.querySelector("#form-reset").addEventListener("click", () => {
  form.reset();
  form.querySelectorAll(".error").forEach((slot) => {
    slot.textContent = "";
  });
  form.querySelectorAll("[aria-invalid]").forEach((field) => {
    field.setAttribute("aria-invalid", "false");
  });
  success.hidden = true;
  form.hidden = false;
  form.elements.name.focus();
});
