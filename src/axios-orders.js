import axios from 'axios'

const instance = axios.create({
    baseURL: "https://react-my-burger-dff56.firebaseio.com/"
});

export default instance;