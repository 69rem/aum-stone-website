class HeroAnimation {
  constructor() {
    this.hero = document.querySelector(".hero");
    if (!this.hero) return;

    this.title = this.hero.querySelector(".hero__title");
    this.card = this.hero.querySelector(".hero__card");

    this.init();
  }

  init() {
    setTimeout(() => {
      this.animateHero();
    }, 100);
  }

  animateHero() {
    if (this.title) {
      this.title.classList.add("animate");
    }

    if (this.card) {
      setTimeout(() => {
        this.card.classList.add("animate");
      }, 300);
    }
  }
}

export default HeroAnimation;
