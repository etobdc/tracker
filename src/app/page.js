'use client'

import {Button, Container, Grid, TextField} from '@mui/material';
import Tracker from "@/components/tracker";
import { useState } from 'react';

export default function Home() {
  const oldList = window.localStorage.getItem('trackerList')
  const [trackerList, setTrackerList] = useState(oldList ? JSON.parse(oldList) : [])
  const [title, setTitle] = useState('Vida')
  const [measureUnit, setMeasureUnit] = useState('HP')
  const [initialValue, setInitialValue] = useState(80)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(100)
  const [stepValue, setStepValue] = useState(5)
  const [color, setColor] = useState('#2196f3')
  const [idTrack, setIdTrack] = useState(1)

  function addTrackerToList() {
    const newTracker = {
      id: idTrack,
      title,
      measureUnit,
      initialValue,
      value: initialValue,
      minValue,
      maxValue,
      stepValue,
      color,
    }
    setIdTrack(idTrack + 1)
    const attList = [...trackerList, newTracker]
    setTrackerList(attList)
    saveOffline(attList)
  }

  const removeTracker = (id) => {
    const attList = trackerList.filter((prevItem) => prevItem.id !== id)
    setTrackerList(attList);
    saveOffline(attList)
  }

  const changeValue = (id, newValue) => {
    let temp = [...trackerList]
    temp.map((prevItem) => {
      if (prevItem.id === id) {
        prevItem.value = newValue
      }
    })
    setTrackerList(temp);
    saveOffline(temp)
  }

  const saveOffline = (list) => {
    window.localStorage.setItem('trackerList', JSON.stringify(list))
  }

  return (
    <Container maxWidth="sm" className='mt-5'>
      <Grid container spacing={1}>
        <Grid size={6}>
          <TextField fullWidth variant="outlined" type="text" id="title" label="Tracker name" value={title}  onChange={(event) => setTitle(event.target.value)} />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth variant="outlined" type="text" id="measureUnit" label="Measure unit" value={measureUnit}  onChange={(event) => setMeasureUnit(event.target.value)} />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth variant="outlined" type="number" id="minValue" label="Minimum value" value={minValue} onChange={(event) => setMinValue(event.target.value)} />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth variant="outlined" type="number" id="maxValue" label="Maximum value" value={maxValue} onChange={(event) => setMaxValue(event.target.value)} />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth variant="outlined" type="number" id="initialValue" label="Initial value" value={initialValue} onChange={(event) => setInitialValue(event.target.value)} />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth variant="outlined" type="number" id="stepValue" label="Step value" value={stepValue} onChange={(event) => setStepValue(event.target.value)} />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth variant="outlined" type="color" id="color" label="Color" value={color} onChange={(event) => setColor(event.target.value)} />
        </Grid>
        <Grid size={12} justifyItems={'end'}>
          <Button size='large' color='success' variant="contained" onClick={() => addTrackerToList()}>
            Add New Tracker
          </Button>
        </Grid>
        <Grid size={12} className="mt-5">
          {trackerList.map((item) => (
            <Tracker 
              key={item.id}
              trackerProps={item}
              changeValue={changeValue}
              remove={() => removeTracker(item.id)}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
