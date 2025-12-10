class DirectionsAnimation {
  constructor() {
    this.section = document.querySelector('.directions');
    if (!this.section) return;

    this.title = this.section.querySelector('.directions__title');
    this.firstList = this.section.querySelector('.directions__list--first');
    this.secondList = this.section.querySelector('.directions__list--second');
    this.text = this.section.querySelector('.directions__text');
    this.contactUs = this.section.querySelector('.directions__contact-us');
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

    if (this.firstList) {
      setTimeout(() => {
        this.firstList.classList.add('animate');
      }, 300);
    }

    if (this.secondList) {
      setTimeout(() => {
        this.secondList.classList.add('animate');
      }, 500);
    }

    if (this.text) {
      setTimeout(() => {
        this.text.classList.add('animate');
      }, 1500);
    }

    if (this.contactUs) {
      setTimeout(() => {
        this.contactUs.classList.add('animate');
      }, 2000);
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export default DirectionsAnimation;