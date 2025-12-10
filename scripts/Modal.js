class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.scrollPosition = 0;
    this.isOpen = false;
    
    if (!this.modal) {
      console.error(`Modal element #${modalId} not found`);
      return;
    }
    
    this.closeBtn = this.modal.querySelector(".modal__close");
    this.overlay = this.modal.querySelector(".modal__overlay");

    if (!this.closeBtn || !this.overlay) {
      console.error('Modal inner elements not found');
      return;
    }

    this.init();
  }

  init() {
    this.closeBtn.addEventListener("click", () => this.close());
    this.overlay.addEventListener("click", () => this.close());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    const modalContainer = this.modal.querySelector(".modal__container");
    if (modalContainer) {
      modalContainer.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }

  open() {
    if (!this.modal || this.isOpen) return;
    
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
    
    this.isOpen = true;
    this.modal.classList.add("active");
  }

  close() {
    if (!this.modal || !this.isOpen) return;
    
    this.isOpen = false;
    this.modal.classList.remove("active");
    
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    requestAnimationFrame(() => {
      window.scrollTo({
        top: this.scrollPosition,
        behavior: 'instant'
      });
    });
  }
}

export default Modal;