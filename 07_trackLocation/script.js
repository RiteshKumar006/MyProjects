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
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude, longitude } = position.coords;

      map = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();


      // Handling Click on Map  
      map.on('click', function (mapE) {
        mapEvent = mapE
        form.classList.remove('hidden');
        inputDistance.focus()
     
      });
    },
    function () {
      //   console.log('');
      alert('Could not get your Position');
    }
  );
}


form.addEventListener('submit', function(event){
  event.preventDefault();
    //Display Marker
         console.log('Map Event', mapEvent,"inputDistance -- >", inputDistance.value);
         L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng])
           .addTo(map)
           .bindPopup(L.popup({
             maxWidth:250,
             minWidth:100,
             autoClose:false,
             closeOnClick:false
           }))
           .setPopupContent()
           .openPopup();
           const items = JSON.parse(localStorage.getItem("userInfo")) || [];


           let obj ={
              "lat": mapEvent.latlng.lat,
              "lng" : mapEvent.latlng.lng,
              "Distance" : inputDistance.value,
              "Duration" : inputDuration.value
           }
           items.push(obj)
           const stringObj = JSON.stringify(items);

           localStorage.setItem("userInfo", stringObj )
})

inputType.addEventListener('change', function(){
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})