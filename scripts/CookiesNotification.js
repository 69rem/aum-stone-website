class CookiesNotification {
  constructor() {
    this.notification = document.getElementById("cookiesNotification");
    this.acceptButton = document.getElementById("acceptCookies");

    if (!this.notification || !this.acceptButton) {
      console.log("Cookies notification elements not found");
      return;
    }

    this.cookieName = "cookies_accepted";

    this.init();
  }

  init() {
    this.notification.removeAttribute("data-js-hidden");

    if (!this.isCookiesAccepted()) {
      setTimeout(() => {
        this.showNotification();
      }, 4000);
    } else {
      this.hideImmediately();
    }

    this.acceptButton.addEventListener("click", () => this.acceptCookies());
  }

  showNotification() {
    this.notification.classList.add("cookies-notification--visible");
    this.notification.classList.remove("cookies-notification--hidden");
  }

  hideNotification() {
    this.notification.classList.remove("cookies-notification--visible");
    this.notification.classList.add("cookies-notification--hidden");

    setTimeout(() => {
      this.notification.classList.add("cookies-notification--removed");
    }, 400);
  }

  hideImmediately() {
    this.notification.classList.add("cookies-notification--removed");
  }

  acceptCookies() {
    this.setCookiesAccepted();
    this.hideNotification();
  }

  isCookiesAccepted() {
    return localStorage.getItem(this.cookieName) === "true";
  }

  setCookiesAccepted() {
    localStorage.setItem(this.cookieName, "true");
    this.setCookie(this.cookieName, "true", 365);
  }

  setCookie(name, value, days) {
    try {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  }
}

export default CookiesNotification;
