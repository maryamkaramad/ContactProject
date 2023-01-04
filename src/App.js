import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Contacts from './components/contact/Contacts';

const App = () => {
  const [getContacts, setGetContacts] = useState([])
  const [loading, setLoading] = useState(false)
  return (
    <div className='App'>
      <Navbar />
      <Contacts contacts={getContacts} loading={loading} />
    </div>
  );
}

export default App;
