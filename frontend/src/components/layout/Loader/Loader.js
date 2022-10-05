import React from 'react'
import "./Loader.css"

function Loader() {
  return (
    <div className='loading'>
        
        <div className="wrapper">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="shadow"></div>
    <div className="shadow"></div>
    <div className="shadow"></div>
</div>
    </div>
  )
}

export default Loader