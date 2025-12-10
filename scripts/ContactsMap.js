class ContactsMap {
  constructor() {
    this.mapContainer = document.getElementById("yandex-map");
    if (!this.mapContainer) return;

    this.init();
  }

  init() {
    this.loadYandexMap();
  }

  loadYandexMap() {
    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=YANDEX_MAPS_API_KEY_REMOVED&lang=ru_RU";
    script.onload = () => this.initMap();
    document.head.appendChild(script);
  }

  initMap() {
    if (typeof ymaps === "undefined") {
      console.error("Yandex Maps API not loaded");
      return;
    }

    ymaps.ready(() => {
      const map = new ymaps.Map("yandex-map", {
        center: [55.772734, 37.464168],
        zoom: 16,
        controls: ["zoomControl", "fullscreenControl"],
      });

      const placemark = new ymaps.Placemark(
        [55.772734, 37.464168],
        {
          balloonContent: `
          <strong>СТК АУМ</strong><br>
          г. Москва, вн. тер. г. муниципальный округ Хорошево-Мневники, наб. Карамышевская, д. 48, к. 1, помещ. 4/1<br>
          <a href="tel:+79853158283">+7 (985) 315-82-83</a>
        `,
        },
        {
          iconLayout: "default#image",
          iconImageHref:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAzNCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3IDQxQzE3IDQxIDM0IDI2LjA3MzIgMzQgMTcuMDM2NkMzNCA4IDI2LjUwODMgMSAxNyAxQzcuNDkxNyAxIDAgOCAwIDE3LjAzNjZDMCAyNi4wNzMyIDE3IDQxIDE3IDQxWiIgZmlsbD0iI2U4ZTRkYiIvPgo8cGF0aCBkPSJNMTcgMjEuNUMxOS40ODUzIDIxLjUgMjEuNSAxOS40ODUzIDIxLjUgMTdDMjEuNSAxNC41MTQ3IDE5LjQ4NTMgMTIuNSAxNyAxMi41QzE0LjUxNDcgMTIuNSAxMi41IDE0LjUxNDcgMTIuNSAxN0MxMi41IDE5LjQ4NTMgMTQuNTE0NyAyMS41IDE3IDIxLjVaIiBmaWxsPSIjMWExYTFhIi8+Cjwvc3ZnPgo=",
          iconImageSize: [34, 41],
          iconImageOffset: [-17, -41],
        }
      );

      map.geoObjects.add(placemark);

      if (window.innerWidth <= 768) {
        map.behaviors.disable("scrollZoom");
      }

      map.controls.get("zoomControl").options.set({
        size: "small",
        position: { right: 10, top: 100 },
      });
    });
  }
}

export default ContactsMap;
