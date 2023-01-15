
import './App.css'
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Contacts, Navbar, ViewContact } from "./components"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AddContact from './components/Contacts/AddContact';
import EditContact from './components/Contacts/EditContact';
import { getAllContacts, getAllGroups, createContact, deleteContact } from "../src/services/contactService"
import { ContactContext } from './context/contactContext';
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/Color"
const App = () => {
  const [contacts, setContacts] = useState([])

  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState()
  const [contactQuery, setContactQuery] = useState({ text: "" })
  const [fillteredContacts, setFillteredContacts] = useState([])
  const [contact, setContact] = useState({
    fullname: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
    id: "",
  })
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: contactData } = await getAllContacts()
        const { data: contactGroup } = await getAllGroups()
        setContacts(contactData)
        setFillteredContacts(contactData)
        setGroups(contactGroup)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])


  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(contact);

      if (status === 201) {
        setContact({});

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };
  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };


  const removeContact = async (contactId) => {
    try {
      setLoading(true)
      const response = await deleteContact(contactId)
      if (response) {
        const { data: contactData } = await getAllContacts()
        setContact(contactData)
        setLoading(false)
      }

    } catch (err) {
      console.log(err.message)
      setLoading(false)
    }
  }

  const contactSearch = (event) => {
    setContactQuery({ ...contactQuery, text: event.target.value });
    const allContacts = contacts.filter((contact) => {
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase());

    });

    setFillteredContacts(allContacts);
  };
  return (
    <ContactContext.Provider value={{
      loading,
      contact,
      contactQuery,
      groups,
      setLoading,
      fillteredContacts,
      createContact: createContactForm,
      onContactChange,
      setContact,
      contactSearch,
      deleteContact: confirmDelete,

    }}>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/contacts" />} />
          <Route path='/contacts' element={<Contacts contacts={fillteredContacts} loading={loading} confirmDelete={confirmDelete} />} />
          <Route path='/contacts/add' element={<AddContact loading={loading}
            setContactInfo={onContactChange}
            contact={contact}
            groups={groups}
            createContactForm={createContactForm} />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
          <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        </Routes>

      </div>
    </ContactContext.Provider>

  );
}

export default App;
