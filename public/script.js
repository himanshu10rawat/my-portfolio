const showAboutMe = document.querySelector("#show-about-me");
const aboutMePopup = document.querySelector(".background-black-drop");
showAboutMe.addEventListener("click", function () {
  aboutMePopup.classList.add("show");
  document.body.style.overflow = "hidden";
});

const closeButton = document.querySelector(".close-icon");
closeButton.addEventListener("click", () => {
  aboutMePopup.classList.remove("show");
  document.body.style.overflow = "auto";
});

// scroll function

const workSection = document.getElementById("work-section");
const workSectionPosition = workSection.offsetTop;
const ourWorkBtn = document.getElementById("our-work-btn");
function scrollToFunction() {
  window.scrollTo({
    top: workSectionPosition,
    behavior: "smooth",
  });
}
ourWorkBtn.addEventListener("click", () => {
  scrollToFunction();
});

const footerLogo = document.getElementById("footer-logo");
footerLogo.addEventListener("click", () => {
  scrollToFunction();
});

// contact form Data

let formData = {};

const handleChange = (e) => {
  formData = {
    ...formData,
    [e.target.name]: e.target.value,
  };
  // console.log(formData);
};

// Contact form submit

emailjs.init("EwGPKszVyh6uh8oER");

const handleSubmit = (event) => {
  event.preventDefault();
  const submitButtonText = document.querySelector(".submit-button span");
  submitButtonText.innerText = "Sending...";
  emailjs
    .send("service_xnr9ku9", "template_wh7usuh", formData)
    .then((response) => {
      alert("Message sent successfully!");
      // console.log("SUCCESS!", response.status, response.text);
      document
        .querySelectorAll("input, textarea")
        .forEach((input) => (input.value = ""));
      submitButtonText.innerText = "Send";
    })
    .catch((error) => {
      alert("Failed to send message. Please try again later.");
      console.error("FAILED...", error);
      submitButtonText.innerText = "Send";
    });
};
