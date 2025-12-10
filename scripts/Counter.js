class Counter {
  constructor() {
    this.counters = document.querySelectorAll("[data-js-count]");
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute("data-js-count"));
    const duration = 800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      element.textContent = Math.floor(current);
    }, 16);
  }
}

document.addEventListener("DOMContentLoaded", () => new Counter());

export default Counter;
