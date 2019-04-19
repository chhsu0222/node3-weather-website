const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const currentLocationButton = document.querySelector('#current-location-button')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''  // clear the previous forecast

    const url = '/weather?address=' + search.value

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return msgOne.textContent = data.error
            }

            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        })
    })
})

currentLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    currentLocationButton.setAttribute('disabled', 'disabled')
    // clear the previous forecast
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    search.value = ''

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const url = `/weather/currentLocation?latitude=${latitude}&longitude=${longitude}`
        
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    return msgOne.textContent = data.error
                }
                // create an anchor tag
                const aTag = document.createElement('a')
                aTag.setAttribute('href', `https://google.com/maps?q=${latitude},${longitude}`)
                aTag.setAttribute('target', '_blank')
                aTag.innerHTML = "My current location";
    
                msgOne.textContent = ''
                msgOne.appendChild(aTag)
                msgTwo.textContent = data.forecast
                currentLocationButton.removeAttribute('disabled')
            })
        })
    })
})
