import React from 'react'
import { PURPLE } from '../../helpers/Color'
import { useContext } from 'react'
import { ContactContext } from '../../context/contactContext'
const SearchContact = () => {
    const { contactSearch } = useContext(ContactContext)
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: PURPLE }}>
                <i className="fas fa-search" />
            </span>
            <input dir="rtl" type="text" style={{ borderColor: PURPLE }}
                className="form-control"
                placeholder="جست و جوی مخاطب"
                aria-label="Search"
                aria-describtion='basic-addon1'
                onChange={(event) => contactSearch(event.target.value)}
            />
        </div>
    )
}

export default SearchContact