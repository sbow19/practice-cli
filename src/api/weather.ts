import axios from "axios";

const getWeather = ({city}: ConfigSettings)=>{
    return new Promise(async(resolve, reject)=>{
        const url = "https://api.open-meteo.com/v1/forecast";
        const weatherVariables = [
            "temperature_2m",
            "cloud_cover",
            "precipitation"
        ];

        
        try{
            const { data: {current} } = await axios.get(url, {
                params: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                    current: weatherVariables
                }
            });
            
            resolve(current);

        }catch(e){
            console.log(e);
            reject(e);
        }

    });
};

export const getGeolocation = (country: string, city: string): Promise<{latitude: number, longitude: number}>=>{
    return new Promise(async (resolve, reject)=>{
        const url = "https://geocoding-api.open-meteo.com/v1/search";
        const geoLocation = {
            latitude: 0,
            longitude: 0
        };

        try{
            const { data: {results} } = await axios.get(url, {
                params: {
                    name: city,
                    language: "en"
                }
            });

            const desiredResult = results.filter(result=>{
                if(result.country === country){
                    return true
                } else {
                    return false
                };
            });

            geoLocation.latitude = desiredResult[0].latitude;
            geoLocation.longitude = desiredResult[0].longitude;
            
            resolve(geoLocation);

        }catch(e){
            console.log(e);
            reject(e);
        }
        
    })
}

export default getWeather;