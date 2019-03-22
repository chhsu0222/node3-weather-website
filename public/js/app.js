console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const url = 'http://localhost:3000/weather?address=' + search.value

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return console.log(data.error)
            }
            console.log(data.location)
            console.log(data.forecast)
        })
    })
})
