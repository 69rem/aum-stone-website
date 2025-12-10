class IntroductionAnimation {
  constructor() {
    this.section = document.querySelector('.introduction');
    if (!this.section) return;

    this.title = this.section.querySelector('.introduction__title');
    this.info = this.section.querySelector('.introduction__info');
    this.items = this.section.querySelectorAll('.introduction__cards--item');
    this.observer = null;
    this.hasAnimated = false;

    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.animateContent();
            this.hasAnimated = true;
            this.observer.unobserve(this.section);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.observer.observe(this.section);
  }

  animateContent() {
    if (this.title) {
      this.title.classList.add('animate');
    }

    if (this.info) {
      setTimeout(() => {
        this.info.classList.add('animate');
      }, 300);
    }

    this.items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, 600 + (index * 150));
    });
  }
}

export default IntroductionAnimation;