
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent = "loading..."
    message2.textContent =""
    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
response.json().then((data)=>{
    if(data.error)
   message1.textContent = data.error
    else
    {
 message1.textContent = data.place
 
 message2.textContent = "It is "+data.forecast.descriptions+". The current temperature is "+data.forecast.current_temperature+"℃ and feels like "+data.forecast.feels_temperature+"℃."
    }
})
})
})