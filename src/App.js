import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Contacts from './components/contact/Contacts';

const App = () => {
  const [getContacts, setGetContacts] = useState([])
  return (
    <div className='App'>
      <Navbar />
      <Contacts contacts={getContacts} />
    </div>
  );
}

export default App;
