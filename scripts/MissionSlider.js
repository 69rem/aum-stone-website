class MissionSlider {
  constructor() {
    this.slider = document.querySelector(".mission .slider");
    if (!this.slider) return;

    this.track = this.slider.querySelector(".slider__track");
    this.slides = this.slider.querySelectorAll(".slider__slide");
    this.prevBtn = this.slider.querySelector(".slider__button--prev");
    this.nextBtn = this.slider.querySelector(".slider__button--next");
    this.currentEl = this.slider.querySelector(".slider__current");
    this.totalEl = this.slider.querySelector(".slider__total");
    this.container = this.slider.querySelector(".slider__container");

    this.isDragging = false;
    this.startPos = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.animationID = 0;
    this.currentIndex = 0;
    this.hasFocus = false;

    this.totalSlides = this.slides.length;
    this.boundHandleKeydown = this.handleKeydown.bind(this);

    this.init();
  }

  init() {
    this.totalEl.textContent = this.totalSlides;
    this.updatePagination();
    this.updateButtons();

    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    this.addDragEvents();
    this.preventImageDrag();
    this.addKeyboardNavigation();
  }

  addKeyboardNavigation() {
    document.addEventListener("keydown", this.boundHandleKeydown);

    this.container.addEventListener("focus", () => {
      this.hasFocus = true;
    });

    this.container.addEventListener("blur", () => {
      this.hasFocus = false;
    });

    this.slider.addEventListener("click", () => {
      this.container.focus();
    });

    this.slider.addEventListener("mouseenter", () => {
      this.container.focus();
    });
  }

  addDragEvents() {
    this.container.addEventListener("mousedown", (e) => this.dragStart(e));
    this.container.addEventListener("mousemove", (e) => this.drag(e));
    this.container.addEventListener("mouseup", () => this.dragEnd());
    this.container.addEventListener("mouseleave", () => this.dragEnd());

    this.container.addEventListener("touchstart", (e) => this.dragStart(e));
    this.container.addEventListener("touchmove", (e) => this.drag(e));
    this.container.addEventListener("touchend", () => this.dragEnd());

    this.container.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  dragStart(e) {
    if (e.type === "touchstart") {
      this.startPos = e.touches[0].clientX;
    } else {
      this.startPos = e.clientX;
      e.preventDefault();
    }

    this.isDragging = true;
    this.slider.classList.add("slider--dragging");

    this.animationID = requestAnimationFrame(() => this.animation());
  }

  drag(e) {
    if (!this.isDragging) return;

    let currentPosition = 0;
    if (e.type === "touchmove") {
      currentPosition = e.touches[0].clientX;
    } else {
      currentPosition = e.clientX;
    }

    const currentTranslate =
      this.prevTranslate + currentPosition - this.startPos;

    const maxTranslate = 0;
    const minTranslate = -(this.totalSlides - 1) * this.getSlideWidth();

    if (currentTranslate <= maxTranslate && currentTranslate >= minTranslate) {
      this.currentTranslate = currentTranslate;
      this.setSliderPosition();
    }
  }

  dragEnd() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.slider.classList.remove("slider--dragging");
    cancelAnimationFrame(this.animationID);

    const movedBy = this.currentTranslate - this.prevTranslate;
    const slideWidth = this.getSlideWidth();

    if (Math.abs(movedBy) > slideWidth * 0.1) {
      if (movedBy > 0 && this.currentIndex > 0) {
        this.prev();
      } else if (movedBy < 0 && this.currentIndex < this.totalSlides - 1) {
        this.next();
      } else {
        this.updateSlider();
      }
    } else {
      this.updateSlider();
    }
  }

  animation() {
    this.setSliderPosition();
    if (this.isDragging) {
      requestAnimationFrame(() => this.animation());
    }
  }

  setSliderPosition() {
    this.track.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  getSlideWidth() {
    return this.slides[0].getBoundingClientRect().width;
  }

  next() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.currentIndex++;
      this.updateSlider();
    }
    this.updateButtons();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
    this.updateButtons();
  }

  updateSlider() {
    const slideWidth = this.getSlideWidth();
    this.currentTranslate = -(this.currentIndex * slideWidth);
    this.prevTranslate = this.currentTranslate;

    this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    this.updatePagination();
  }

  updatePagination() {
    this.currentEl.textContent = this.currentIndex + 1;
  }

  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
  }

  preventImageDrag() {
    const images = this.slider.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
    });
  }

  handleKeydown(e) {
    if (!this.hasFocus && !this.isMouseOverSlider()) {
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();
      this.prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      this.next();
    }
  }

  isMouseOverSlider() {
    const rect = this.slider.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight &&
      rect.bottom >= 0 &&
      rect.left <= window.innerWidth &&
      rect.right >= 0
    );
  }

  destroy() {
    document.removeEventListener("keydown", this.boundHandleKeydown);
  }
}

export default MissionSlider;
