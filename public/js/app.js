const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

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
