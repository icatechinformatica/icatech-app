import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosRequest = axios.create({
    // baseURL: 'https://redicatech.com/api/'
    // baseURL: 'http://10.0.2.2:8000/api/'
    // baseURL: 'http://192.168.100.33:8000/api/'
    baseURL: 'https://red.icatech.gob.mx/api/'
});

axiosRequest.interceptors.request.use(
    async (config) => {
        if(config.url != 'api/sanctum/token') {
            let token = await AsyncStorage.getItem('token');
            config.headers.common = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosRequest;