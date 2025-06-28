'use client'
import {Paper, Slider} from '@mui/material';
import { useState } from 'react';

export default function Tracker({trackerProps}) {
  const [value, setValue] = useState(trackerProps.initialValue)
  
  function valuetext(value) {
    return `${value} ${trackerProps.measureUnit}`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className='mb-5 px-5 py-5' elevation={5}>
      <p className='text-center'>{trackerProps.title}</p>
      <p className='text-center'>{value} {trackerProps.measureUnit}</p>
      <Slider
        aria-label={trackerProps.title}
        defaultValue={trackerProps.initialValue}
        value={value}
        style={{color: trackerProps.color}}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
        shiftStep={trackerProps.stepValue}
        step={trackerProps.stepValue}
        marks
        min={trackerProps.minValue}
        max={trackerProps.maxValue}
        onChange={handleChange}
      />
    </Paper>
  );
}
