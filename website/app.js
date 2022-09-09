/* Global Variables */
const apiKey = '&appid=9e26d3f2109529f57c7ffc31ba097255&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

const generateButton = document.querySelector('#generate').addEventListener('click', () => {
    try {
        const newZIP = document.getElementById('zip').value;
        const content = document.getElementById('feelings').value;
        getWetherData(newZIP, apiKey)
            .then((data) => {
                console.log(data);
                postData('/newData', {
                    date: newDate,
                    temp: data.main.temp,
                    content,
                })
            }).then(() => update())
    } catch (error) {
        console.log("there is an error", error);
    }
});

const getWetherData = async (apiKey, zipCode) => {
    let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    const res = await fetch(baseURL);
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("there is an error", error);
    }
}



const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const update = async () => {
    const req = await fetch('/all');
    try {
        const allTheData = await req.json();
        document.querySelector('date').innerHTML = allTheData.date;
        document.querySelector('content').innerHTML = allTheData.content;
        document.querySelector('temp').innerHTML = Math.round(allTheData.temp) + 'degrees';
    } catch (error) {
        console.log("there is an error", error);
    }
}