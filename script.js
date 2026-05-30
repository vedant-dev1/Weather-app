const cityNow = document.getElementById('city');
const tempshow = document.getElementById('tempshow');
const sun = document.getElementById('sun');
const chance = document.getElementById('chance');
const time = document.querySelectorAll('.time');
const inner_img = document.querySelectorAll('.inner-img');
const buttom = document.querySelectorAll('.buttom');
const lower = document.querySelectorAll('.lower');
const today_temp = document.querySelectorAll('.today-data');
const inner_sun = document.querySelectorAll('.inner-sun');
const weather_plan = document.querySelectorAll('.weather-plan');
const temp_plan = document.querySelectorAll('.temp-plan');
const btn = document.getElementById('btn');
btn.addEventListener("click", async () => {
    const city = document.getElementById('search').value;
    const api_key = 'YOUR_API_KEY';

    if(!city){
        alert("Please enter city name");
        return;
    }

    try {

        // CURRENT WEATHER
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
        );

        if(!currentResponse.ok){
            alert("City not found!");
            return;
        }

        const currentData = await currentResponse.json();

        // FORECAST
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`
        );

        const forecastData = await forecastResponse.json();

        console.log(currentData);
        console.log(forecastData);

        // CITY + TEMP
        cityNow.textContent = currentData.name;
        tempshow.textContent = Math.round(currentData.main.temp) + "°";

        // ICON
        sun.src =
        `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

        // TIME (LOCAL CITY TIME)
        const timezone = currentData.timezone;
        const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
        const cityTime = new Date(utc + timezone * 1000);

        chance.textContent = cityTime.toLocaleString();

        // LOWER DATA
        lower[0].textContent = Math.round(currentData.main.feels_like) + "°";
        lower[1].textContent = Math.round((forecastData.list[0].pop || 0) * 100) + "%";
        lower[2].textContent = (currentData.wind.speed * 3.6).toFixed(1) + " km/h";
        lower[3].textContent = currentData.main.humidity + "%";

        // FILTER FUTURE DATA
        const currentTime = Date.now();

        const futureData = forecastData.list.filter(item => {
            return item.dt * 1000 > currentTime;
        });

        // FORECAST LOOP (SAFE)
        for(let i = 0; i < 6 && i < futureData.length; i++){

            const item = futureData[i];

            const time_current = new Date(item.dt * 1000);

            time[i].textContent = time_current.toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit"
            });

            buttom[i].textContent =
            Math.round(item.main.temp) + "°";

            inner_img[i].src =
            `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        }

        // TODAY SECTION
        temp_plan[0].textContent = Math.round(currentData.main.temp) + "°";

        inner_sun[0].src =
        `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

        weather_plan[0].textContent =
        currentData.weather[0].description;
        temp_plan[0].textContent = Math.round(currentData.main.temp) + "°";

        inner_sun[0].src =
        `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

        weather_plan[0].textContent =
        currentData.weather[0].description;

        //temp-next 4 days
        temp_plan[1].textContent = Math.round(forecastData.list[4].main.temp) + "°";
        temp_plan[2].textContent = Math.round(forecastData.list[12].main.temp) + "°";
        temp_plan[3].textContent = Math.round(forecastData.list[24].main.temp) + "°";
        temp_plan[4].textContent = Math.round(forecastData.list[39].main.temp) + "°";

        //images-next 4 days
        inner_sun[1].src =
        `https://openweathermap.org/img/wn/${forecastData.list[4].weather[0].icon}@2x.png`;
        inner_sun[2].src =
        `https://openweathermap.org/img/wn/${forecastData.list[12].weather[0].icon}@2x.png`;
        inner_sun[3].src =
        `https://openweathermap.org/img/wn/${forecastData.list[24].weather[0].icon}@2x.png`;
        inner_sun[4].src =
        `https://openweathermap.org/img/wn/${forecastData.list[39].weather[0].icon}@2x.png`;
      
         //description-next 4 days 
         weather_plan[1].textContent =forecastData.list[4].weather[0].description;
         weather_plan[2].textContent =forecastData.list[12].weather[0].description;
         weather_plan[3].textContent =forecastData.list[24].weather[0].description;
         weather_plan[4].textContent =forecastData.list[39].weather[0].description;

         //days-next 4 days
        today_temp[0].textContent='Today';
        today_temp[1].textContent='Tomorrow';
        today_temp[2].textContent=forecastData.list[12].dt_txt.split(' ')[0];
        today_temp[3].textContent=forecastData.list[24].dt_txt.split(' ')[0];
        today_temp[4].textContent=forecastData.list[34].dt_txt.split(' ')[0];

        } catch (error) {
        console.log(error);
        alert("Something went wrong!");
       }   
    });
