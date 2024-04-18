'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;
console.log("cALUENOJADJ")

class App {
  #map;
  #mapEvent;
  constructor() {
    console.log("cxzxx")
    this._getPosition()
    console.log("this")
  }

  _getPosition() {
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
      alert("Could not get your Location")
    })
  }
  }

  _loadMap(position) {
    console.log(position);
    const { latitude, longitude } = position.coords;

    this.#map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([latitude, longitude])
      .addTo(this.#map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();

    // Handling Click on Map
    this.#map.on('click', function (mapE) {
      this.#mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  }

  _showForm() {}

  _toggleElevationField() {}

  _newWorkout() {}
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {},
    function () {
      //   console.log('');
      alert('Could not get your Position');
    }
  );
}

const appMap = new App()

form.addEventListener('submit', function (event) {
  event.preventDefault();
  //Display Marker
  console.log('Map Event', mapEvent, 'inputDistance -- >', inputDistance.value);
  L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent()
    .openPopup();
  const items = JSON.parse(localStorage.getItem('userInfo')) || [];

  let obj = {
    lat: mapEvent.latlng.lat,
    lng: mapEvent.latlng.lng,
    Distance: inputDistance.value,
    Duration: inputDuration.value,
  };
  items.push(obj);
  const stringObj = JSON.stringify(items);

  localStorage.setItem('userInfo', stringObj);
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
