const cardHover = document.querySelector('.hero__section--second');
const cards = document.querySelectorAll('.hero__section--card');
cardHover.addEventListener('mouseover', (e) => {
    cards.forEach(card => {
        if (card.classList.contains('background'))
            return;
        card.style.filter = 'blue(0)';
    });
    cards[2].style.zIndex = 5;
    cards[2].style.filter = 'blur(0)';
    cards[6].style.filter = 'blur(0)';
    cards[6].style.zIndex = 6;
    cards[0].style.zIndex = 7;
    cards[3].style.zIndex = 8;
    gsap.to(cards[2], { duration: 0.5, x: -100, y: -20, ease: "power2.inOut" });
    gsap.to(cards[1], { duration: 0.5, y: -10, ease: "power2.inOut" });
    gsap.to(cards[6], { duration: 0.5, x: -50, y: -20, ease: "power2.inOut" });
    gsap.to(cards[0], { duration: 0.5, y: 70, x: 70, ease: "power2.inOut" })
    gsap.to(cards[4], { duration: 0.5, x: -50, y: 50, ease: "power2.inOut" })
    gsap.to(cards[3], { duration: 0.5, y: 20, x: -80, ease: "power2.inOut" })
});
cardHover.addEventListener('mouseout', (e) => {
    cards[2].style.zIndex = -5;
    cards[6].style.zIndex = -5;
    gsap.to(cards[2], { duration: 0.5, y: 0, ease: "power2.inOut" });
    gsap.to(cards[1], { duration: 0.5, y: 0, ease: "power2.inOut" });
    gsap.to(cards[6], { duration: 0.5, x: 0, y: 0, ease: "power2.inOut" });
    gsap.to(cards[0], { duration: 0.5, y: 0, ease: "power2.inOut" });
    gsap.to(cards[4], { duration: 0.5, x: 0, y: 0, ease: "power2.inOut" });
    gsap.to(cards[3], { duration: 0.5, y: 0, x: 0, ease: "power2.inOut" });
})
const headerText = document.querySelector('.hero__header');
const heroDescription = document.querySelector('.hero__description');
gsap.fromTo(headerText, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.inOut" }, '<');

gsap.fromTo(heroDescription, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.inOut" }, '<');
headerText.style.zIndex = -1;


gsap.fromTo('.hero__button--primary', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, '<');
gsap.fromTo('.hero__button--secondary', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, '<');

gsap.fromTo('.hero__count', { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, '<');
const slider = function () {
    const slides = document.querySelectorAll('.slide__card');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    let curSlide = 0;
    const maxSlide = slides.length;
    const goToSlide = function (slide) {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
        });
    }

    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide += 2;
        }
        goToSlide(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide -= 2;
        }
        goToSlide(curSlide);
    }
    const init = function () {
        goToSlide(0);
    }
    init();


    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

}
slider();

const collectionsCards = document.querySelectorAll('.collections__card');

let bounds;
let currentCard;

function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    currentCard.style.transform = `
        perspective(1000px)
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 2}deg
        )
      `;


}

function resetRotation() {
    currentCard.style.transform = '';
    currentCard.style.background = '';
    document.removeEventListener('mousemove', rotateToMouse);
}

// Attach event listeners to each card
collectionsCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        bounds = card.getBoundingClientRect();
        currentCard = card;
        document.addEventListener('mousemove', rotateToMouse);
    });

    card.addEventListener('mouseleave', resetRotation);
});

const header = document.querySelector('.header');
const main = document.querySelector('main')

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting)
        header.classList.add('sticky');
    else
        header.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0
});

headerObserver.observe(main);

const company = document.querySelector('.hero__section--third')

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
sectionObserver.observe(company);
company.classList.add('section--hidden');

cards.forEach(card => {
    if (card.classList.contains('background')) return;
    gsap.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, '<')
})



const observeFunction = function (o) {
    const revealSection = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    }

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    sectionObserver.observe(o);
    o.classList.add('section--hidden');
}
const sectionFourth = document.querySelector('.hero__section--fourth');
observeFunction(sectionFourth);

const sectionFifth = document.querySelector('.hero__section--fifth');
observeFunction(sectionFifth);

const sectionSixth = document.querySelector('.hero__section--sixth');
observeFunction(sectionSixth);

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', function () {
    document.querySelector('.absolute').classList.toggle('display')
});

const lists = document.querySelector('.absolute--menu__lists');
lists.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('absolute--menu__lists')) return;
    document.querySelector('.absolute').classList.remove('display');

    document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
});

