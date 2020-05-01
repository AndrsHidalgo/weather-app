console.log('Client side js file is loaded!')


const form = document.querySelector('form'),
      search = document.querySelector('input'),
      msgOne = document.querySelector('#msgOne'),
      msgTwo = document.querySelector('#msgTwo')   

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgOne.textContent = "Loading..."
    msgTwo.textContent = ""
          
    fetch(`/weather?address=${ location }`)
        .then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    msgOne.textContent = data.error
                } else {
                    msgOne.textContent = data.location
                    msgTwo.textContent = data.message
                }
            })
        })
})