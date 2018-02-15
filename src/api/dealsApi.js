import cookies from 'cookies-js';

class DealsApi {
    static getAllDeals() {
        return fetch('/hubspotproxy/contacts/v1/lists/all/contacts/all', {
            credentials: 'same-origin',
            method: 'GET'
        }).then(res => {
            return res.data;
        });
    }
}

export default DealsApi;