const weatherForm = document.querySelector('form')
const locationInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = locationInput.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data)=>{
            if(data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = `Weather for ${data.location}.`
            messageTwo.textContent = data.forecast
        })
    })
})