import { createContext } from 'react';

const InvoiceContext = createContext({
  pendingInvoices: 0,
  setPendingInvoices: () => {},
});

export default InvoiceContext;
