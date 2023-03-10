import React from 'react'
import { PINK, CURRENTLINE, ORANGE } from '../../helpers/Color'
import { Spinner, Contact } from "../../components"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ContactContext } from '../../context/contactContext'
const Contacts = () => {
    const { fillteredContacts, loading, deleteContact } = useContext(ContactContext)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/contacts/add")
    }

    return (
        <>
            <section className='container my-2' >
                <div className='grid'>
                    <div className='row'>
                        <div className='col' >
                            <p className='h3'>
                                <button onClick={handleClick} className='btn mx-2' style={{ backgroundColor: PINK }}>
                                    ساخت مخاطب جدید
                                    <i className='fa fa-plus-circle mx-2' />
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? <Spinner /> : (
                <section className='container'>
                    <div className='row'>
                        {
                            fillteredContacts.length > 0 ? fillteredContacts.map(c => (
                                <Contact key={c.id} contact={c} deleteContact={() => deleteContact(c.id, c.fullname)} />
                            )) :
                                (
                                    <div className='text-center py-5' style={{ backgroundColor: CURRENTLINE }}>
                                        <p className='h3' style={{ color: ORANGE }}>
                                            مخاطب یافت نشد....
                                        </p>
                                        <img src={require("../../assets/no-found.gif")} alt="" className='w-25' />
                                    </div>
                                )
                        }
                    </div>
                </section>
            )}

        </>
    )
}

export default Contacts