import { requestInterceptor } from './requestInterceptor';

const serviceService = {
    baseUrl: 'http://localhost:5025/service',

    create: async (name, vat, owner) => {
        const request = requestInterceptor();
        const data = { name, vat, owner };
        await request.post(`${serviceService.baseUrl}/upload`, data);
    },

    getAll: async () => {
        const request = requestInterceptor();
        const response = await request.get(`${serviceService.baseUrl}/GetAll`);
        return response;
    },

    getByUserId: async () => {
        try {
            const request = requestInterceptor();
            const companies = await request.get(`${serviceService.baseUrl}/getByUser`);
            return companies;
        } catch (error) {
            console.error('Error fetching companies:', error);
            throw error;
        }
    },

    edit: async (id, name, vat, owner, userId) => {
        const request = requestInterceptor();
        const data = { id, name, vat, owner, userId };
        await request.put(`${serviceService.baseUrl}/edit`, data);
    },

    delete: async (id) => {
        const request = requestInterceptor();
        await request.delete(`${serviceService.baseUrl}/${id}`);
    },

    // getServicesByCompanyId: async (companyId) => {
    //     try {
    //         const request = requestInterceptor();
    //         const response = await request.get(`${serviceService.baseUrl}/${companyId}/services`);
    //         const data = response.data;
    //         return data;
    //     } catch (error) {
    //         console.error('Error fetching services by company ID:', error);
    //         throw error;
    //     }
    // }

};

export default serviceService;
