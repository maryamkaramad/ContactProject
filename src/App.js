
import './App.css'
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Contacts, Navbar, ViewContact } from "./components"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AddContact from './components/Contacts/AddContact';
import EditContact from './components/Contacts/EditContact';
import { getAllContacts, getAllGroups, createContact } from "../src/services/contactService"
import { deleteContact } from './services/contactService';
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/Color"
const App = () => {
  const [getContacts, setGetContacts] = useState([])
  const [forceRender, setForceRender] = useState(false)
  const [loading, setLoading] = useState(false)
  const [getGroups, setGroups] = useState()
  const [getContact, setContact] = useState({
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
        setGetContacts(contactData)
        setGroups(contactGroup)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: contactData } = await getAllContacts()
        setGetContacts(contactData)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchData()
  }, [forceRender])

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);

      if (status === 201) {
        setContact({});
        setForceRender(!forceRender)
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name]: event.target.value,
    });
  };
  const confirm = (contactId, contactFullname) => {
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

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/contacts" />} />
        <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading} confirmDelete={confirm} />} />
        <Route path='/contacts/add' element={<AddContact loading={loading}
          setContactInfo={setContactInfo}
          contact={getContact}
          groups={getGroups}
          createContactForm={createContactForm} />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact setForceRender={setForceRender} forceRender={forceRender} />} />
      </Routes>

    </div>
  );
}

export default App;
