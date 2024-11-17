const showAboutMe = document.querySelector('#show-about-me')
const aboutMePopup = document.querySelector('.background-black-drop')
showAboutMe.addEventListener('click', function () {
    aboutMePopup.classList.add('show')
    document.body.style.overflow = "hidden"
})

const closeButton = document.querySelector('.close-icon')
closeButton.addEventListener('click', () => {
    aboutMePopup.classList.remove('show')
    document.body.style.overflow = "auto"
})


// scroll function

const workSection = document.getElementById('work-section')
const workSectionPosition = workSection.offsetTop;
const ourWorkBtn = document.getElementById('our-work-btn')
function scrollToFunction() {
    window.scrollTo({
        top: workSectionPosition,
        behavior: "smooth"
    })
}
ourWorkBtn.addEventListener('click', () => {
    scrollToFunction()
})

const footerLogo = document.getElementById('footer-logo')
footerLogo.addEventListener('click', () => {
    scrollToFunction()
})