import React from 'react'
import Spinnergif from "../assets/Spinner.gif"
const Spinner = () => {
    return (
        <>
            <img src={Spinnergif} className="d-block m-auto" style={{ width: "200px" }} />
        </>
    )
}

export default Spinner