import Counter from "./Counter.js";
import Gallery from "./Gallery.js";
import Header from "./Header.js";
import Modal from "./Modal.js";
import Consultation from "./Consultation.js";
import InputMaskCollection from "./InputMask.js";
import MissionSlider from "./MissionSlider.js";
import ContactsMap from "./ContactsMap.js";
import ObjectsAnimation from "./ObjectsAnimation.js";
import StonesAnimation from "./StonesAnimation.js";
import HeroAnimation from "./HeroAnimation.js";
import IntroductionAnimation from "./IntroductionAnimation.js";
import DeliveryAnimation from "./DeliveryAnimation.js";
import DirectionsAnimation from "./DirectionsAnimation.js";
import GuaranteesAnimation from "./GuaranteesAnimation.js";
import CookiesNotification from "./CookiesNotification.js";

function init() {
  new Header();
  new Counter();
  new Gallery();
  new InputMaskCollection();
  new MissionSlider();
  new ContactsMap();
  new ObjectsAnimation();
  new StonesAnimation();
  new HeroAnimation();
  new IntroductionAnimation();
  new DeliveryAnimation();
  new DirectionsAnimation();
  new GuaranteesAnimation();
  new CookiesNotification();

  const consultationModal = new Modal("consultationModal");
  const privacyModal = new Modal("privacyModal");

  new Consultation(consultationModal);

  document.querySelectorAll("[data-js-modal-open]").forEach((button) => {
    button.addEventListener("click", () => {
      consultationModal.open();
    });
  });

  document.querySelectorAll("[data-js-privacy-open]").forEach((button) => {
    button.addEventListener("click", () => {
      privacyModal.open();
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
