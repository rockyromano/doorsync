import axios from 'axios';

class DealsApi {
    static getAllDeals() {
        return axios.get('/hubspotproxy/deals/v1/deal/paged?properties=dealname', {
            credentials: 'same-origin',
            method: 'GET'
        }).then((res) => {
            debugger;
            return res.data || [];
        });
    }
}

export default CompaniesApi;