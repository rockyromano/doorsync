import axios from 'axios';

class ContactsApi {
    static search(query) {
        //?q=testingapis
        return axios.get('/contacts/v1/search/query', {
            params: { query },
            credentials: 'same-origin',
            method: 'GET'
        }).then((res) => {
            debugger;
            return res.data || [];
        });
    }
}

export default ContactsApi;