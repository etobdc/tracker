'use client'
import {Button, Grid, IconButton, TextField, Paper, Slider} from '@mui/material';
import { useState } from 'react';
import {Close, RemoveCircle, AddCircle } from '@mui/icons-material';


export default function Tracker({trackerProps, changeValue, remove}) {
  const [value, setValue] = useState(trackerProps.value)
  const [newValue, setNewValue] = useState(trackerProps.stepValue)
  
  function valuetext(value) {
    return `${value} ${trackerProps.measureUnit}`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeValue(trackerProps.id, newValue)
  };

  const subtractValue = () => {
    const result = value - newValue
    setNewValue(trackerProps.stepValue)
    const val = result >= 0 ? result : 0
    setValue(val)
    changeValue(trackerProps.id, val)
  };

  const addValue = () => {
    const result = value + newValue
    setNewValue(trackerProps.stepValue)
    const val = result <= trackerProps.maxValue ? result : trackerProps.maxValue
    setValue(val)
    changeValue(trackerProps.id, val)
  };

  return (
    <Paper className='mb-5 relative' elevation={5}>
      <div className="absolute right-0 top-0">
        <IconButton onClick={remove} color="error" aria-label="delete tracker">
          <Close />
        </IconButton>
      </div>
      <Grid container spacing={0}>
        <Grid size={5}>
          <Grid container spacing={0}>
            <Grid size={6} className="py-6 bg-emerald-400">
              <p className='text-center text-md font-black'>{value} {trackerProps.measureUnit}</p>
            </Grid>
            <Grid size={6} className="py-6 bg-amber-400">
              <p className='text-center text-md font-black'>{trackerProps.title}</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={7} className="py-2 bg-amber-50">
          <Grid container spacing={0} alignItems={'center'} className="h-full">
            <Grid size={3} className="flex justify-end">
              <Button variant='outlined' onClick={subtractValue} color="error" aria-label="delete tracker">
                <RemoveCircle />
              </Button>
            </Grid>
            <Grid size={5} className="px-2" justifyContent={'center'}>
              <TextField fullWidth variant="outlined" type="number" id="newValue" label="Value" value={newValue} onChange={(event) => setNewValue(event.target.value)} />
            </Grid>
            <Grid size={3} className="flex justify-start">
              <Button className="py-5" variant='outlined' onClick={addValue} color="success" aria-label="delete tracker">
                <AddCircle />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} className="px-3 py-2">
          <Slider
            aria-label={trackerProps.title}
            defaultValue={trackerProps.value}
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
        </Grid>
      </Grid>
    </Paper>
  );
}
