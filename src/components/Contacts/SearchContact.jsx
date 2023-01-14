import React from 'react'
import { PURPLE } from '../../helpers/Color'
const SearchContact = ({ search, query }) => {
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
                value={query.text}
                onChange={search}
            />
        </div>
    )
}

export default SearchContact