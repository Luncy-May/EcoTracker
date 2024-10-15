import React from 'react'
import { Slider } from '@mui/material'
const Drag = ({value, handleSlide}) => { // return a slider that can be adjusted
  return (
    <div>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" value={value}
        onChange={(event, newValue) => handleSlide(newValue)}/>
    </div>
  )
}

export default Drag
