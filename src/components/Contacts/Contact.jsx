import React from 'react'
import { CURRENTLINE, PURPLE, ORANGE, CYAN, RED } from '../../helpers/Color'
const Contact = () => {
    return (
        <div className='col-md-6'>
            <div className='card my-2' style={{ backgroundColor: CURRENTLINE }}>
                <div className='card-body'>
                    <div className='row align-items-center d-flex justify-content-around'>
                        <div className='col-md-4 col-sm-4'>
                            <img className='img-fluid rounded' src='https://via.placeholder.com/200' alt='' style={{ border: `1px solid ${PURPLE}` }} />
                        </div>
                        <div className='col-md-7 col-sm-7'>
                            <ul className='list-group'>
                                <li className='list-group-item list-group-item-dark'>
                                    نام و نام خانوادگی:{""}
                                    <span className='fw-bold'>
                                        مریم کارامد
                                    </span>
                                </li>
                                <li className='list-group-item list-group-item-dark'>
                                    شماره موبایل:{""}
                                    <span className='fw-bold'>
                                        09162780255
                                    </span>
                                </li>
                                <li className='list-group-item list-group-item-dark'>
                                    آدرس ایمیل:
                                    <span className='fw-bold' >
                                        maryamkaramad73
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-1 col-sm-1 d-flex flex-column align-items-center'>
                            <button className='btn my-1 ' style={{ backgroundColor: ORANGE }}>
                                <i className='fa fa-eye'></i>
                            </button>
                            <button className='btn my-1 ' style={{ backgroundColor: CYAN }}>
                                <i className='fa fa-pen'></i>
                            </button>
                            <button className='btn my-1 ' style={{ backgroundColor: RED }}>
                                <i className='fa fa-trash'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact