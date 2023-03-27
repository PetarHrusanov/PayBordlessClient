import { requestInterceptor } from './requestInterceptor';

const invoiceService = {
    baseUrl: 'http://localhost:5025/invoice',

    create: async (serviceId, quantity, total, recipientId) => {
        const request = requestInterceptor();
        const data = { serviceId, quantity, total, recipientId };
        await request.post(`${invoiceService.baseUrl}/upload`, data);
    },

    getAll: async () => {
        const request = requestInterceptor();
        const response = await request.get(`${invoiceService.baseUrl}/GetAll`);
        return response;
    },

    getByUserId: async () => {
        try {
            const request = requestInterceptor();
            const invoices = await request.get(`${invoiceService.baseUrl}/getByUser`);
            return invoices;
        } catch (error) {
            console.error('Error fetching invoices:', error);
            throw error;
        }
    },

    getUnapprovedByUserId: async () => {
            try {
                const request = requestInterceptor();
                const invoices = await request.get(`${invoiceService.baseUrl}/getUnapprovedByUserId`);
                return invoices;
            } catch (error) {
                console.error('Error fetching invoices:', error);
                throw error;
            }
        },

    edit: async (id, serviceId, quantity, total, recipientId) => {
        const request = requestInterceptor();
        const data = { id, serviceId, quantity, total, recipientId };
        await request.put(`${invoiceService.baseUrl}/edit`, data);
    },

    delete: async (id) => {
        const request = requestInterceptor();
        await request.delete(`${invoiceService.baseUrl}/delete/${id}`);
    },

};

export default invoiceService;
