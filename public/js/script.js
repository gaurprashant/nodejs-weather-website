

console.log('script.js')


// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
   // console.log(searchInput.value)

    const location = searchInput.value

    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error


        }
        messageOne.textContent = 'location :'+ data.location
        messageTwo.textContent = 'temperature:'+ data.temp 
        console.log(data)
    })
})
})