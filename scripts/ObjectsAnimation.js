// ObjectsAnimation.js
class ObjectsAnimation {
  constructor() {
    this.cards = document.querySelectorAll(".objects__card--item");
    this.observer = null;

    this.init();
  }

  init() {
    if (this.cards.length === 0) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, 
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = Array.from(this.cards).indexOf(card);
          const delay = index * 150; 

          setTimeout(() => {
            card.classList.add("animate");
          }, delay);

          this.observer.unobserve(card);
        }
      });
    }, options);

    this.cards.forEach((card) => {
      this.observer.observe(card);
    });
  }

  animateAll() {
    this.cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate");
      }, index * 150);
    });
  }

  reset() {
    this.cards.forEach((card) => {
      card.classList.remove("animate");
    });
  }
}

export default ObjectsAnimation;
