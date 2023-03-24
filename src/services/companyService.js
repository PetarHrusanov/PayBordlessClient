import { requestInterceptor } from './requestInterceptor';

const companyService = {
    baseUrl: 'http://localhost:5025/company',

    create: async (name, vat, owner) => {
        const request = requestInterceptor();
        const data = { name, vat, owner };
        await request.post(`${companyService.baseUrl}/upload`, data);
    },

    getAll: async () => {
        const request = requestInterceptor();
        const response = await request.get(`${companyService.baseUrl}/all`);
        return response.json();
    },

    getByUserId: async () => {
        const request = requestInterceptor();
        const response = await request.get(`${companyService.baseUrl}/getByUser`);
        const code = response.code();
        console.log(response)
        const companies = await response.json(); // Make sure to await the JSON conversion
        return companies;
    },

    edit: async (id, name, vat, owner) => {
        const request = requestInterceptor();
        const data = { name, vat, owner };
        await request.put(`${companyService.baseUrl}/${id}`, data);
    },

    delete: async (id) => {
        const request = requestInterceptor();
        await request.delete(`${companyService.baseUrl}/${id}`);
    }
};

export default companyService;
