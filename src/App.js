
import './App.css'
import { useState } from 'react';
import { Contacts, Navbar, ViewContact } from "./components"
import { Routes, Route, Navigate } from 'react-router-dom';
import AddContact from './components/Contacts/AddContact';
import EditContact from './components/Contacts/EditContact';

const App = () => {
  const [getContacts, setGetContacts] = useState([])
  const [loading, setLoading] = useState(false)
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/contacts" />} />
        <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading} />} />
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit:contactId' element={<EditContact />} />
      </Routes>

    </div>
  );
}

export default App;
