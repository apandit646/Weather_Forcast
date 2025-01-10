const submitBt = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const temp_status = document.getElementById("temp_status")



const getInfo = async(event) => {
    event.preventDefault(); // Prevents the default form submission

    const cityValue = cityName.value.trim(); // Trim to remove unnecessary spaces
    

    if (cityValue === '') {
        city_name.innerText = "Enter City Name";
        return; // Exit the function if city name is empty
    } else {
        try {
            console.log(cityValue)
            
            let API_key='36915aa1619f0d8f8df617fd45d5a4af'
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_key}`;
            
            let response = await fetch(url);
            
            let data = await response.json();
            let arrData=[data];
            let tempValue=(arrData[0].main.temp-273.15).toFixed(2);
            
            
            temp.innerText = `Temperature : ${tempValue}°C`;
            temp_status.innerText = `Weather Status : ${arrData[0].weather[0].description}`;
            console.log(arrData)


            
        } catch {
            city_name.innerText = "Error fetching weather data!";
            return; // Exit the function if there's an error fetching data
            
        }
        city_name.innerText = `City : ${cityValue}...`;
    
    }
};

submitBt.addEventListener('click', getInfo);
