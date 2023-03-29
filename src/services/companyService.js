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
        const response = await request.get(`${companyService.baseUrl}/GetAll`);
        return response;
    },

    getByUserId: async () => {
        try {
            const request = requestInterceptor();
            const companies = await request.get(`${companyService.baseUrl}/getByUser`);
            return companies;
        } catch (error) {
            console.error('Error fetching companies:', error);
            throw error;
        }
    },

    edit: async (id, name, vat, owner, userId) => {
        const request = requestInterceptor();
        const data = { id, name, vat, owner, userId };
        await request.put(`${companyService.baseUrl}/edit`, data);
    },

    delete: async (id) => {
        const request = requestInterceptor();
        await request.delete(`${companyService.baseUrl}/delete/${id}`);
    },

    getServicesByCompanyId: async (companyId) => {
        try {
            const request = requestInterceptor();
            const response = await request.get(`${companyService.baseUrl}/GetServicesById/${companyId}`);
            return response;
        } catch (error) {
            console.error('Error fetching services by company ID:', error);
            throw error;
        }
    }

};

export default companyService;
