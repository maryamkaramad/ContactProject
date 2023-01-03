import React from 'react'
import { PINK, CURRENTLINE, ORANGE } from '../../helpers/Color'
import Contact from './Contact';

const Contacts = ({ contacts }) => {
    return (
        <>
            <section className='container my-2' >
                <div className='grid'>
                    <div className='row'>
                        <div className='col' >
                            <p className='h3'>
                                <button className='btn mx-2' style={{ backgroundColor: PINK }}>
                                    ساخت مخاطب جدید
                                    <i className='fa fa-plus-circle mx-2' />
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='container'>
                <div className='row'>
                    {
                        contacts.length > 0 ? contacts.map(c => (
                            <Contact key={c.id} Contact={c} />
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
        </>
    )
}

export default Contacts