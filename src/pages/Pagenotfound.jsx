import React from 'react'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <div className='container-fluid'>
        <div className='row'>
        <div className="col-md-2"></div>
        <div className="col-md-8 d-flex justify-content-center align-items-center flex-column">
            <img src="https://i.pinimg.com/originals/a3/59/56/a35956ec9f42082d3eeee4ba1b506060.gif" alt="no image" className='w-50'/>
            <h2>Look like you're lost</h2>
            <h4>The page your looking is unavailable</h4>
            <Link to={'/'}><button className='btn btn-success mt-3 rounded-0'>GO HOME</button></Link>
        </div>
        <div className="col-md-2"></div>
        </div>

    </div>
  )
}

export default Pagenotfound