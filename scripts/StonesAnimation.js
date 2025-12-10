class StonesAnimation {
  constructor() {
    this.section = document.querySelector(".stones");
    if (!this.section) return;

    this.text = this.section.querySelector(".stones__text");
    this.items = this.section.querySelectorAll(".stones__card--item");
    this.observer = null;
    this.hasAnimated = false;

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.animateContent();
            this.hasAnimated = true;
            this.observer.unobserve(this.section);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    this.observer.observe(this.section);
  }

  animateContent() {
    if (this.text) {
      this.text.classList.add("animate");
    }

    this.items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate");
      }, 300 + index * 100);
    });
  }
}

export default StonesAnimation;
