console.log('Client side js file is loaded!')


const form = document.querySelector('form'),
      search = document.querySelector('input'),
      msgOne = document.querySelector('#msgOne'),
      temperature = document.querySelector('#temperature') 
      weather = document.querySelector('#weather') 
      wind = document.querySelector('#wind') 
      humidity = document.querySelector('#humidity') 
      precipitation = document.querySelector('#precipitation') 
      pressure = document.querySelector('#pressure') 
      visibility = document.querySelector('#visibility') 

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgOne.textContent = "Loading..."
    temperature.textContent = ""
    weather.textContent = ""
    wind.textContent = ""
    humidity.textContent = ""
    precipitation.textContent = ""
    pressure.textContent = ""
    visibility.textContent = ""
          
    fetch(`/weather?address=${ location }`)
        .then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    msgOne.textContent = data.error
                } else {
                    msgOne.textContent = data.location
                    temperature.textContent = data.info.temperature
                    weather.textContent = data.info.weather_descriptions
                    wind.textContent = data.info.wind_speed
                    humidity.textContent = data.info.humidity
                    precipitation.textContent = data.info.precip
                    pressure.textContent = data.info.pressure
                    visibility.textContent = data.info.visibility
                }
            })
        })
})