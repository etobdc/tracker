'use client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Paper,
  Slider,
  Typography,
}
from '@mui/material';
import { useState } from 'react';
import {Close, RemoveCircle, AddCircle } from '@mui/icons-material';


export default function Tracker({trackerProps, changeValue, remove}) {
  const [value, setValue] = useState(trackerProps.value)
  const [newValue, setNewValue] = useState(trackerProps.stepValue)
  const [open, setOpen] = useState(false);

  const handleOpenDelete = () => {
    setOpen(true);
  };

  const handleCloseDelete = () => {
    setOpen(false);
  };

  function valuetext(value) {
    return `${value} ${trackerProps.measureUnit}`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeValue(trackerProps.id, newValue)
  };

  const subtractValue = () => {
    const result = Number(value) - Number(newValue)
    setNewValue(trackerProps.stepValue)
    const val = result >= 0 ? result : 0
    setValue(val)
    changeValue(trackerProps.id, val)
  };

  const addValue = () => {
    const result = Number(value) + Number(newValue)
    setNewValue(trackerProps.stepValue)
    const val = result <= trackerProps.maxValue ? result : trackerProps.maxValue
    setValue(val)
    changeValue(trackerProps.id, val)
  };

  return (
    <Paper className='mb-3 relative' elevation={5}>
      <div className="absolute right-0 top-0">
        <IconButton onClick={handleOpenDelete} color="error" aria-label="delete tracker">
          <Close />
        </IconButton>
      </div>
      <Grid container spacing={0}>
        <Grid size={12}>
          <Grid container spacing={0}>
            <Grid size={4} className="py-2 bg-emerald-400">
              <p className='text-center text-md font-black'>{value} {trackerProps.measureUnit}</p>
            </Grid>
            <Grid size={8} className="py-2 bg-amber-400">
              <p className='text-center text-md font-black'>{trackerProps.title}</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} className="pt-4">
          <Grid container spacing={0} alignItems={'center'} justifyContent={'center'} className="h-full">
            <Grid size={4} className="flex justify-end">
              <Button variant='outlined' onClick={subtractValue} color="error" aria-label="delete tracker">
                <RemoveCircle />
              </Button>
            </Grid>
            <Grid size={4} className="px-2" justifyContent={'center'}>
              <TextField fullWidth size='small' variant="outlined" type="number" label="Value" value={newValue} onChange={(event) => setNewValue(event.target.value)} />
            </Grid>
            <Grid size={4} className="flex justify-start">
              <Button className="py-5" variant='outlined' onClick={addValue} color="success" aria-label="delete tracker">
                <AddCircle />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12} className="px-3 pb-1 relative">
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
            className='absolute bottom-1 left-0 w-full px-3'
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography component={'span'} variant='caption'>
              {trackerProps.minValue} {trackerProps.measureUnit}
            </Typography>
            <Typography component={'span'} variant='caption'>
              {trackerProps.maxValue / 2} {trackerProps.measureUnit}
            </Typography>
            <Typography component={'span'} variant='caption'>
              {trackerProps.maxValue} {trackerProps.measureUnit}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
       <Dialog
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete {`"${trackerProps.title}"`}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this tracker?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button color='error' onClick={remove} autoFocus>
            Yes, delete tracker
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
