class DeliveryAnimation {
  constructor() {
    this.section = document.querySelector(".delivery");
    if (!this.section) return;

    this.items = this.section.querySelectorAll(".delivery__card--item");
    this.observers = [];

    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add("animate");
              }, index * 150);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(item);
      this.observers.push(observer);
    });
  }

  destroy() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
  }
}

export default DeliveryAnimation;
