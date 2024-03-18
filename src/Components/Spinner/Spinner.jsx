import React from 'react'
import SpinnerImg from '../../Assets/Image/Spinner.gif'

const Spinner = () => {
  return (
    <div>
        <img src={SpinnerImg} alt="Spinner not found" className='d-block m-auto' style={{width:"500px"}} />
    </div>
  )
}

export default Spinner
