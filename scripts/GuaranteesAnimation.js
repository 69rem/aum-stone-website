class GuaranteesAnimation {
  constructor() {
    this.section = document.querySelector(".guarantees");
    if (!this.section) return;

    this.title = this.section.querySelector(".guarantees__title");
    this.items = this.section.querySelectorAll(".guarantees__card--item");
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
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    this.observer.observe(this.section);
  }

  animateContent() {
    if (this.title) {
      this.title.classList.add("animate");
    }

    this.items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate");
      }, 300 + index * 200);
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export default GuaranteesAnimation;
