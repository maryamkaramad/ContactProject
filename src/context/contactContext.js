import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contact: {},
    setContact: () => { },
    contacts: {},
    setContacts: () => { },
    fillteredContacts: [],
    contactQuery: {},
    groups: [],
    onContactChange: () => { },
    deleteContact: () => { },
    updateContact: () => { },
    createContact: () => { },
    contactSearch: () => { },

})