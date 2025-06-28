'use client'
import {Grid, Paper, Slider} from '@mui/material';
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
      <Grid container spacing={1}>
        <Grid size={6}>
          <p className='text-center font-black'>{trackerProps.title}</p>
        </Grid>
        <Grid size={6}>
          <p className='text-center font-black'>{value} {trackerProps.measureUnit}</p>
        </Grid>
        <Grid size={12}>
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
        </Grid>
      </Grid>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{trackerProps.minValue} {trackerProps.measureUnit}</span>
          <span>{trackerProps.maxValue / 2} {trackerProps.measureUnit}</span>
          <span>{trackerProps.maxValue} {trackerProps.measureUnit}</span>
        </Grid>
    </Paper>
  );
}
