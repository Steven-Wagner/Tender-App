import TokenService from './services/Token-services';
import {API_BASE_URL} from './config';

const AppService = {
    fetchGetUsersPopularProducts(user_id) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/yourProducts/popular/${user_id.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    },

    fetchGetPopularProducts(user_id){
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/shopProducts/popular/${user_id.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    },

    fetchPurchasedProducts(user_id) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/yourProducts/purchased/${user_id.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    },

    fetchGetShopProducts(user_id) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/shopProducts/${user_id.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    },
    
    fetchGetUserInfo(user_id) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/userInfo/${user_id.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    },

    fetchYourProducts(user_id) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/yourProducts/${user_id.id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => {reject (e)})
                        : resolve(res.json())
                })
            }
            catch(error) {
                reject(error);
            }
        })
    }
}

export default AppService;