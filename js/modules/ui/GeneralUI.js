import HistoryUI from "./HistoryUi.js";
import CalculatorUI from "./CalculatorUi.js";

export default class GeneralUI {
  constructor() {
    this.btnEraseHistory = document.querySelector(".btn-delete-history");
    this.calculatorUI = new CalculatorUI();
    this.historyUI = new HistoryUI();
  }

  changeTheme() {
    const body = document.querySelector("body");
    const btnIconsTheme = document.querySelectorAll(".btn-icon-header");

    btnIconsTheme.forEach((btnIcon) => {
      if (btnIcon.classList.contains("display-icon-header")) {
        btnIcon.classList.remove("display-icon-header");
        btnIcon.classList.add("hide-icon-header");
        return;
      }

      if (btnIcon.classList.contains("hide-icon-header")) {
        btnIcon.classList.remove("hide-icon-header");
        btnIcon.classList.add("display-icon-header");
        return;
      }
    });

    if (body.classList.contains("light")) {
      body.classList.remove("light");
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
    }

    return {
      success: true,
      message: "Tema cambiado correctamente",
      data: {newTheme: body.classList[0]},
    };
  }

  displayPopup() {
    return new Promise(resolve => {
      const popupAlert = document.querySelector(".popup-alert");
      popupAlert.classList.add("popup-alert-display");

      popupAlert.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup-alert") || e.target.classList.contains("alert-cancel")) {
          popupAlert.classList.remove("popup-alert-display");

          resolve({
            success: false,
            message: "Accion cancelada",
          })
        }

        if (e.target.classList.contains("alert-delete")) {
          popupAlert.classList.remove("popup-alert-display");

          resolve({
            success: true,
            message: "Confirmado el borrar historial",
          });
        }
        
      });
    })
  }

  applyTheme({theme}) {
    const body = document.querySelector("body");
    const btnIconsTheme = document.querySelectorAll(".btn-icon-header");

    body.className = theme;

    btnIconsTheme.forEach((btnIcon) => {
      if (btnIcon.id === theme) {
        if (btnIcon.classList.contains("hide-icon-header")) {
          btnIcon.classList.remove("hide-icon-header");
          btnIcon.classList.add("display-icon-header");
        }

        return;
      }

      if (btnIcon.classList.contains("display-icon-header")) {
        btnIcon.classList.remove("display-icon-header");
        btnIcon.classList.add("hide-icon-header");
      }
    });
  }

  displayNotification(message) {
    const notification = document.querySelector(".notification");
    const notificationText = document.querySelector(".notification-text");

    notification.classList.add("display-notification");
    notificationText.textContent = message;

    notification.onclick = () => {
      notification.classList.remove("display-notification");
    };

    setTimeout(() => {
      notification.classList.remove("display-notification");
    }, 1500);
  }

  getCalculatorUI() {
    return this.calculatorUI;
  }

  getHistoryUI() {
    return this.historyUI;
  }
}
