
import './App.css'
import { useState, useEffect } from 'react';

import { Contacts, Navbar, ViewContact } from "./components"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AddContact from './components/Contacts/AddContact';
import EditContact from './components/Contacts/EditContact';
import { getAllContacts, getAllGroups, createContact } from "../src/services/contactService"
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


  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/contacts" />} />
        <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading} />} />
        <Route path='/contacts/add' element={<AddContact loading={loading}
          setContactInfo={setContactInfo}
          contact={getContact}
          groups={getGroups}
          createContactForm={createContactForm} />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit:contactId' element={<EditContact />} />
      </Routes>

    </div>
  );
}

export default App;
