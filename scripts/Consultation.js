class Consultation {
  constructor(modal) {
    this.form = document.getElementById("consultationForm");
    this.modal = modal;
    this.formSubmitted = false;

    this.init();
  }

  init() {
    if (this.form) {
      this.form.setAttribute("novalidate", "");
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));

      this.addRealTimeValidation();
    }
  }

  addRealTimeValidation() {
    const phoneInput = this.form.querySelector('input[name="phone"]');
    const emailInput = this.form.querySelector('input[name="email"]');

    if (phoneInput) {
      phoneInput.addEventListener("blur", () => this.validatePhone(phoneInput));
      phoneInput.addEventListener("input", () =>
        this.clearFieldError(phoneInput)
      );
    }

    if (emailInput) {
      emailInput.addEventListener("blur", () => this.validateEmail(emailInput));
      emailInput.addEventListener("input", () =>
        this.clearFieldError(emailInput)
      );
    }
  }

  validatePhone(input) {
    const phone = input.value.trim();
    const phoneRegex =
      /^(\+7|8)[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    const cleanPhone = phone.replace(/\s+/g, "");

    if (phone && !phoneRegex.test(cleanPhone)) {
      this.showFieldError(input, "Введите корректный номер телефона");
      return false;
    } else {
      this.clearFieldError(input);
      return true;
    }
  }

  validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
      this.showFieldError(input, "Введите корректный email адрес");
      return false;
    } else {
      this.clearFieldError(input);
      return true;
    }
  }

  showFieldError(input, message) {
    this.clearFieldError(input);
    input.classList.add("field-error");

    const errorElement = document.createElement("div");
    errorElement.className = "field-error-message";
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    `;

    input.parentNode.appendChild(errorElement);
  }

  clearFieldError(input) {
    input.classList.remove("field-error");
    const existingError = input.parentNode.querySelector(
      ".field-error-message"
    );
    if (existingError) {
      existingError.remove();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.formSubmitted = true;

    if (!this.validateForm()) {
      return;
    }

    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = "Отправка...";
      submitBtn.disabled = true;

      const formData = new FormData(this.form);

      await this.sendToTelegram(formData);

      this.showSuccess();
      this.form.reset();
      this.formSubmitted = false;

      setTimeout(() => {
        if (this.modal) {
          this.modal.close();
        }
      }, 2000);
    } catch (error) {
      this.showError();
      console.error("Ошибка отправки:", error);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  validateForm() {
    let isValid = true;

    const contactMethod = this.form.querySelector(
      'input[name="contact-method"]:checked'
    );
    if (!contactMethod) {
      this.showNotification("Пожалуйста, выберите способ связи", "error");
      isValid = false;
    }

    const name = this.form.querySelector('input[name="name"]');
    if (!name.value.trim()) {
      this.showFieldError(name, "Пожалуйста, введите ваше имя");
      isValid = false;
    } else {
      this.clearFieldError(name);
    }

    const phone = this.form.querySelector('input[name="phone"]');
    const phoneValue = phone.value.trim();

    if (!phoneValue || phoneValue === "+7") {
      this.showFieldError(phone, "Пожалуйста, введите номер телефона");
      isValid = false;
    } else {
      const isPhoneValid = this.validatePhone(phone);
      if (!isPhoneValid) {
        isValid = false;
      }
    }

    const email = this.form.querySelector('input[name="email"]');
    if (email.value.trim()) {
      const isEmailValid = this.validateEmail(email);
      if (!isEmailValid) {
        isValid = false;
      }
    }

    const agreement = this.form.querySelector('input[name="agreement"]');
    if (!agreement.checked) {
      this.showNotification(
        "Необходимо согласие на обработку персональных данных",
        "error"
      );
      isValid = false;
    }

    return isValid;
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;

    const icons = {
      success: `<svg class="notification__icon" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      error: `<svg class="notification__icon" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
        <path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
    };

    notification.innerHTML = `
      ${icons[type]}
      <div class="notification__message">${message}</div>
      <button class="notification__close" aria-label="Закрыть">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("notification--visible");
    }, 100);

    const closeBtn = notification.querySelector(".notification__close");
    closeBtn.addEventListener("click", () => {
      this.hideNotification(notification);
    });

    setTimeout(() => {
      this.hideNotification(notification);
    }, 5000);
  }

  hideNotification(notification) {
    notification.classList.remove("notification--visible");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  showSuccess() {
    this.showNotification(
      "✅ Заявка отправлена! Мы свяжемся с вами в течение 15 минут.",
      "success"
    );
  }

  showError() {
    this.showNotification(
      "❌ Ошибка отправки. Пожалуйста, позвоните нам по телефону +7 (985) 315-82-83.",
      "error"
    );
  }

  async sendToTelegram(formData) {
    const requestData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email") || "",
      "contact-method": formData.get("contact-method"),
      comment: formData.get("comment") || "",
    };

    const response = await fetch("/send_telegram.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(
        result.error || `Ошибка HTTP! Статус: ${response.status}`
      );
    }

    return result;
  }
}

export default Consultation;
