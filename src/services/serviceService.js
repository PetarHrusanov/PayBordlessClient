import { requestInterceptor } from './requestInterceptor';

const serviceService = {
    baseUrl: 'http://localhost:5025/service',

    create: async (name, price, companyId) => {
        const request = requestInterceptor();
        const data = { name, price, companyId };
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



    edit: async (id, name, price, companyId) => {
        const request = requestInterceptor();
        const data = { id, name, price, companyId };
        await request.put(`${serviceService.baseUrl}/edit`, data);
    },

   delete: async (id) => {
       const request = requestInterceptor();
       await request.delete(`${serviceService.baseUrl}/delete/${id}`);
   },

};

export default serviceService;
