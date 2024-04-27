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
// let map, mapEvent;

class Workout {
  date = new Date();
  id = (Date.now() + " ").slice(-10)
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;

  }

  _setDescription() {
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}}`
  }
}

class Running extends Workout {
  type = "running"
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration)
    this.cadence = cadence
    this.clacPace()
    this._setDescription()
  }

  clacPace() {
    this.pace = this.duration / this.distance;

    return this.pace
  }
}

class Cycling extends Workout {
  type = 'cycling'
  constructor(coords, duration, distance, elevationGain) {
    super(coords, distance, duration)
    this.elevationGain = elevationGain;
    this.clacSpeed()
    this._setDescription()
  }

  clacSpeed() {
    this.speed = this.distance / (this.duration / 60);

    return this.speed
  }
}

// const running = new Running([90, 12], 5.2, 24, 178);
// const cycling = new Cycling([12, 19], 5.9, 30, 500)
// console.log("cycling", cycling)
// console.log("Running", running)

class App {
  #map;
  #mapEvent;
  #workouts = []
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your Location');
        }
      );
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
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(event) {
    event.preventDefault();

    const validInputs = (...input) => (input.every(inp => Number.isFinite(inp)));

    const allPositive = (...input) => (input.every(inp => inp < 0));

    const allNan = (...input) => (input.every(inp => isNaN(inp)));

    const type = inputType.value;
    const distance = parseInt(inputDistance.value)
    const duration = parseInt(inputDuration.value)
    const { lat, lng } = this.#mapEvent.latlng
    let workout;

    console.log(distance, type)
    if (type == "running") {
      console.log("running", distance)
      const cadence = +inputCadence.value
      console.log("check", !validInputs(distance, duration, cadence), allPositive(distance, duration, cadence), allNan(distance, duration, cadence))
      // !Number.isFinite(distance) || isNaN(distance || duration || cadence) || !Number.isFinite(duration) || !Number.isFinite(cadence)
      if (!validInputs(distance, duration, cadence) || allPositive(distance, duration, cadence) || allNan(distance, duration, cadence)) {
        return alert("Inputs have to be positive numbers")
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }


    if (type == "cycling") {
      const elevation = +inputElevation.value

      if (!validInputs(distance, duration, elevation) || allPositive(distance, duration, elevation)) {
        return alert("Inputs have to be positive numbers")
      }

      workout = new Cycling([lat, lng], distance, duration, elevation)
    }

    this.#workouts.push(workout)
    console.log("workout", workout)


    //render workout marker
    this._renderWorkoutMarker(workout)


    this._renderWorkout(workout);

    this._setDataToLocalStorage()



    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
    //Display Marker
    // console.log('Map Event', mapEvent, 'inputDistance -- >', inputDistance.value);

  }


  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }

  _renderWorkout(workout) {

    let html = `
          <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
              <span class="workout__icon">🏃‍♂️</span>
              <span class="workout__value">${workout.distance}</span>
              <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⏱</span>
              <span class="workout__value">${workout.duration}</span>
              <span class="workout__unit">min</span>
            </div>
    `

    if (workout.type = 'running') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`
    }

    if (workout.type == 'cycling') {
      html += ` <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevationGain  }</span>
      <span class="workout__unit">m</span>
    </div>
  </li> `
    }

    form.insertAdjacentHTML('afterend',html)
  }


  _setDataToLocalStorage(){
    localStorage.setItem('workouts', JSON.stringify(this.#workouts))
  }

}

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {},
//     function () {
//       //   console.log('');
//       alert('Could not get your Position');
//     }
//   );
// }

const appMap = new App();
