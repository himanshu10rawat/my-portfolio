const THEME_STORAGE_KEY = "portfolio-theme";
const themeToggleButton = document.getElementById("theme-toggle");
const themeToggleText = document.getElementById("theme-toggle-text");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const darkThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");

const getStoredTheme = () => localStorage.getItem(THEME_STORAGE_KEY);

const getResolvedTheme = (themePreference = getStoredTheme()) => {
  if (themePreference === "light" || themePreference === "dark") {
    return themePreference;
  }

  return darkThemeMedia.matches ? "dark" : "light";
};

const updateThemeToggleLabel = (resolvedTheme) => {
  if (!themeToggleText) return;
  themeToggleText.textContent = resolvedTheme === "dark" ? "Dark" : "Light";
};

const applyTheme = (themePreference = getStoredTheme()) => {
  const resolvedTheme = getResolvedTheme(themePreference);
  document.body.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", resolvedTheme === "dark" ? "#020617" : "#ffffff");
  }

  updateThemeToggleLabel(resolvedTheme);
};

const toggleTheme = () => {
  const currentResolvedTheme = getResolvedTheme();
  const nextTheme = currentResolvedTheme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
};

applyTheme();

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", toggleTheme);
}

const handleSystemThemeChange = () => {
  if (!getStoredTheme()) {
    applyTheme();
  }
};

if (typeof darkThemeMedia.addEventListener === "function") {
  darkThemeMedia.addEventListener("change", handleSystemThemeChange);
} else if (typeof darkThemeMedia.addListener === "function") {
  darkThemeMedia.addListener(handleSystemThemeChange);
}

const showAboutMe = document.querySelector("#show-about-me");
const aboutMePopup = document.querySelector(".background-black-drop");
if (showAboutMe && aboutMePopup) {
  showAboutMe.addEventListener("click", function () {
    aboutMePopup.classList.add("show");
    document.body.style.overflow = "hidden";
  });
}

const closeButton = document.querySelector(".close-icon");
if (closeButton && aboutMePopup) {
  closeButton.addEventListener("click", () => {
    aboutMePopup.classList.remove("show");
    document.body.style.overflow = "auto";
  });
}

const workSection = document.getElementById("work-section");
const ourWorkBtn = document.getElementById("our-work-btn");
function scrollToFunction() {
  if (!workSection) return;
  window.scrollTo({
    top: workSection.offsetTop,
    behavior: "smooth",
  });
}
if (ourWorkBtn) {
  ourWorkBtn.addEventListener("click", () => {
    scrollToFunction();
  });
}

const footerLogo = document.getElementById("footer-logo");
if (footerLogo) {
  footerLogo.addEventListener("click", () => {
    scrollToFunction();
  });
}

let formData = {};

const handleChange = (e) => {
  formData = {
    ...formData,
    [e.target.name]: e.target.value,
  };
};

emailjs.init("EwGPKszVyh6uh8oER");

const handleSubmit = (event) => {
  event.preventDefault();
  const submitButtonText = document.querySelector(".submit-button span");
  if (submitButtonText) {
    submitButtonText.innerText = "Sending...";
  }

  emailjs
    .send("service_xnr9ku9", "template_wh7usuh", formData)
    .then(() => {
      alert("Message sent successfully!");
      document.querySelectorAll("input, textarea").forEach((input) => (input.value = ""));
      if (submitButtonText) {
        submitButtonText.innerText = "Send";
      }
    })
    .catch((error) => {
      alert("Failed to send message. Please try again later.");
      console.error("FAILED...", error);
      if (submitButtonText) {
        submitButtonText.innerText = "Send";
      }
    });
};
