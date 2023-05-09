
import './App.css'
import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Contacts, Navbar, ViewContact } from "./components"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AddContact from './components/Contacts/AddContact';
import EditContact from './components/Contacts/EditContact';
import _ from 'lodash'
import { getAllContacts, getAllGroups, createContact, deleteContact } from "../src/services/contactService"
import { ContactContext } from './context/contactContext';
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/Color"
// import { contactSchema } from './validations/contactValidation';
import { useImmer } from 'use-immer';
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  // throw new Error("errrrrrorrrrr")
  const [contacts, setContacts] = useImmer([])
  const [loading, setLoading] = useImmer(false)
  const [groups, setGroups] = useImmer()
  const [fillteredContacts, setFillteredContacts] = useImmer([])
  // const [contact, setContact] = useImmer({
  //   fullname: "",
  //   mobile: "",
  //   email: "",
  //   job: "",
  //   group: "",
  //   id: "",
  // })
  // const [errors, setErrors] = useState([])
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


  const createContactForm = async (values) => {
    // event.preventDefault();
    try {
      // setLoading((prveLoading) => !prveLoading)
      setLoading(draft => !draft)
      // await contactSchema.validate(contact, { abortEarly: false });
      const { status, data } = await createContact(values);

      if (status === 201) {

        // const allContacts = [...contacts, data]
        // setContacts(allContacts)
        // setFillteredContacts(allContacts)
        // setContact({});
        // setErrors([]);
        setContacts(draft => {
          draft.push(data)
        })
        setFillteredContacts(draft => {
          draft.push(data)
        })
        setLoading((prveLoading) => !prveLoading)
        navigate("/contacts");
        toast.success("مخاطب با موفقیت ساخته شد")
      }
    } catch (err) {
      console.log(err.inner);
      // setErrors(err.inner);
      setLoading((prveLoading) => !prveLoading)
    }
  };

  // const onContactChange = (event) => {
  //   setContact({
  //     ...contact,
  //     [event.target.name]: event.target.value,
  //   });
  // };
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
    const contactsBackup = [...contacts]
    try {


      // const updatetContacts = contacts.filter(c => c.id !== contactId)
      // setContacts(updatetContacts)
      // setFillteredContacts(updatetContacts)
      setContacts((draft) => contacts.filter((c) => c.id !== contactId));
      setFillteredContacts((draft) =>
        contacts.filter((c) => c.id !== contactId)
      );

      const { status } = await deleteContact(contactId)
      toast.error("مخاطب با موفیقت حذف شد")

      if (status !== 200) {
        setContacts(contactsBackup)
        setFillteredContacts(contactsBackup)

      }

    } catch (err) {
      console.log(err.message)
      setContacts(contactsBackup)
      setFillteredContacts(contactsBackup)
    }
  }
  // let filterTimeOut;
  const contactSearch = _.debounce((query) => {
    // clearTimeout(filterTimeOut)
    if (!query) return setFillteredContacts(contacts)
    // filterTimeOut = setTimeout(() => {
    // setFillteredContacts(contacts.filter((contact) => {
    //   return contact.fullname.toLowerCase().includes(query.toLowerCase());
    // })

    // );
    setFillteredContacts((draft) => draft.filter((contact) => {
      return contact.fullname.toLowerCase().includes(query.toLowerCase());
    })

    );
    // }, 1000);

  }, 1000);
  return (
    <ContactContext.Provider value={{
      loading,

      groups,
      contacts,
      // errors,
      setContacts,
      setLoading,
      setFillteredContacts,
      fillteredContacts,
      createContact: createContactForm,


      contactSearch,
      deleteContact: confirmDelete,


    }}>
      <div className='App'>
        <ToastContainer rtl={true} position='top-center' theme='colored' />
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/contacts" />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/contacts/add' element={<AddContact />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
          <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        </Routes>

      </div>
    </ContactContext.Provider>

  );
}

export default App;
