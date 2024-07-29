import axios from "axios";

const configureAxiosDefaults = (config:ConfigSettings) => {
    axios.defaults.timeout = 3000; 
    
    //Interceptor
}


export default configureAxiosDefaults;