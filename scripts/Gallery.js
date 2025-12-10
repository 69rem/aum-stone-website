class Gallery {
  constructor() {
    this.gallery = document.querySelector(".gallery__card");
    if (!this.gallery) return;

    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initLightbox());
    } else {
      this.initLightbox();
    }
  }

  initLightbox() {
    const lightbox = new window.PhotoSwipeLightbox({
      gallery: ".gallery__card",
      children: ".gallery__card--item",
      pswpModule: window.PhotoSwipe,

      preload: [1, 2],
      wheelToZoom: true,
      pinchToClose: false,
      clickToCloseNonZoomable: false,

      arrowKeys: true,
      zoom: true,
      close: true,
      counter: true,

      breakpoints: {
        768: {
          arrowKeys: false,
        },
      },
    });

    lightbox.on("uiRegister", () => {
      lightbox.pswp.ui.registerElement({
        name: "download-button",
        title: "Download",
        order: 8,
        isButton: true,
        html: {
          isCustomSVG: true,
          inner:
            '<path d="M20 15v4H4v-4H2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4h-2zM12 2L7 7h4v8h2V7h4l-5-5z"/>',
          outlineID: "pswp__icn-download",
        },
        onClick: (e, el) => {
          const link = document.createElement("a");
          link.href = lightbox.pswp.currSlide.data.src;
          link.download = "";
          link.click();
        },
      });
    });

    lightbox.init();
  }
}

export default Gallery;
