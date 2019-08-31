import {API_BASE_URL} from '../../config';
import TokenService from '../../services/Token-services';

const yourProductsService = {
    getProfitColor(profit) {
        //Style profit red or green depending on positive or negative
        let profitColor = {color: 'rgb(0, 73, 0)'}
        if (parseFloat(profit) < 0) {
            profitColor = {color: 'rgb(105, 1, 1)'};
        }
        return profitColor;
    },

    fetchPatchProduct(updatedProduct) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/yourProducts/${updatedProduct.creator_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    },
                    body: JSON.stringify(updatedProduct)
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

    getSalesInfo(userId, productId) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/yourProducts/${userId}/${productId}`, {
                    method: "GET",
                    headers: {
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    },
                })
                .then(data => {
                    return (!data.ok)
                        ? data.json().then(e => {reject (e)})
                        : resolve(data.json());
                })
            }
            catch(error) {
                reject(error);
            }
        })
    }
}

export default yourProductsService;