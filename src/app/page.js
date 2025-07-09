'use client'

import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControlLabel,
  Grid,
  Skeleton,
  Slide,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Tracker from "@/components/tracker";
import React, { useEffect, useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const exempleTracker = {
  title: 'Health Points',
  measureUnit: 'HP',
  minValue: 0,
  maxValue: 100,
  initialValue: 100,
  stepValue: 1,
  color: '#2196f3'
}

export default function Home() {
  const [trackerList, setTrackerList] = useState([])
  const [title, setTitle] = useState(exempleTracker.title)
  const [measureUnit, setMeasureUnit] = useState(exempleTracker.measureUnit)
  const [minValue, setMinValue] = useState(exempleTracker.minValue)
  const [maxValue, setMaxValue] = useState(exempleTracker.maxValue)
  const [initialValue, setInitialValue] = useState(exempleTracker.initialValue)
  const [stepValue, setStepValue] = useState(exempleTracker.stepValue)
  const [color, setColor] = useState(exempleTracker.color)
  const [open, setOpen] = useState(false);
  const [exempleIsOn, setExempleIsOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackData, setSnackData] = useState({
    message: 'Tracker added',
    severity: 'success',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setSnackBar = (message, severity) => {
    setSnackData({
      message,
      severity
    })
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const onChangeExemple = (event) => {
    setExempleIsOn(event.target.checked)
    if (event.target.checked) {
        setTitle(exempleTracker.title)
        setMeasureUnit(exempleTracker.measureUnit)
        setMinValue(exempleTracker.minValue)
        setMaxValue(exempleTracker.maxValue)
        setInitialValue(exempleTracker.initialValue)
        setStepValue(exempleTracker.stepValue)
    } else {
      setTitle('')
      setMeasureUnit('')
      setMinValue('')
      setMaxValue('')
      setInitialValue('')
      setStepValue('')
    }
  }

  const addTrackerToList = (event) => {
    event.preventDefault();
    setLoading(true)
    setTimeout(() => {
      const newTracker = {
        id: new Date(),
        title,
        measureUnit,
        initialValue,
        value: initialValue,
        minValue,
        maxValue,
        stepValue,
        color,
      }
      const attList = [...trackerList, newTracker]
      setTrackerList(attList)
      saveOffline(attList)
      handleClose()
      setLoading(false)
      setSnackBar('Tracker added', 'success')
    }, 500);
  }

  const removeTracker = (id) => {
    const attList = trackerList.filter((prevItem) => prevItem.id !== id)
    setTrackerList(attList);
    saveOffline(attList)
    setSnackBar('Tracker deleted', 'success')
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
    if (typeof window !== "undefined") {
      window.localStorage.setItem('trackerList', JSON.stringify(list))
    }
  }
  
  useEffect(() => {
    const oldList = window.localStorage.getItem('trackerList')
    if (oldList) {
      setTrackerList(JSON.parse(oldList) )
      setSnackBar('Trackers loaded', 'info')
    }
    setLoading(false)
  }, [])

  return (
    <>
      <Container maxWidth="sm" className='mt-12 mb-10 relative w-full h-full max-h-[88vh] overflow-auto'>
        <Typography
        align='center'
        component="h1"
        variant='h4'
        className='z-10 py-2 bg-white fixed top-0 right-0 left-0 shadow'
        >
          Trackers by @etobdc
        </Typography>
        <div className=''>
          {!loading && trackerList.length === 0 && (
            <Alert elevation={3} variant='filled' severity="info" className="mt-[35vh]" >
              Add new trackers pressing the the {`"+"`} button bellow
            </Alert>
          )}
          {loading ? (
            <Grid container spacing={1} className="mt-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton key={item} className="mb-1" variant="rectangular" width={'100%'} height={118} />
              ))}
              </Grid>
            ) : (
            <Grid container spacing={1}>
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
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            slots={{
              transition: Transition,
            }}
          >
            <DialogTitle>New Tracker</DialogTitle>
            <DialogContent sx={{ paddingBottom: 1 }}>
              <FormControlLabel
                className='absolute top-5 right-5'
                control={<Switch
                  size='small'
                  checked={exempleIsOn}
                  onChange={onChangeExemple}
                />} 
                label="Exemple"
              />
              <Grid container spacing={1} className="pt-1">
                <Grid size={6}>
                  <TextField fullWidth variant="outlined" type="text" placeholder='Health' label="Tracker name" value={title}  onChange={(event) => setTitle(event.target.value)} />
                </Grid>
                <Grid size={6}>
                  <TextField fullWidth variant="outlined" type="text" placeholder='HP' label="Measure unit" value={measureUnit}  onChange={(event) => setMeasureUnit(event.target.value)} />
                </Grid>
                <Grid size={6}>
                  <TextField fullWidth variant="outlined" type="number" placeholder='0' label="Minimum value" value={minValue} onChange={(event) => setMinValue(event.target.value)} />
                </Grid>
                <Grid size={6}>
                  <TextField fullWidth variant="outlined" type="number" placeholder='100' label="Maximum value" value={maxValue} onChange={(event) => setMaxValue(event.target.value)} />
                </Grid>
                <Grid size={6}>
                  <TextField fullWidth variant="outlined" type="number" placeholder='100' label="Initial value" value={initialValue} onChange={(event) => setInitialValue(event.target.value)} />
                </Grid>
                <Grid size={6}>
                  <TextField fullWidth variant="outlined" type="number" placeholder='1' label="Step value" value={stepValue} onChange={(event) => setStepValue(event.target.value)} />
                </Grid>
                <Grid size={12}>
                  <TextField fullWidth variant="outlined" type="color" label="Color" value={color} onChange={(event) => setColor(event.target.value)} />
                </Grid>
              </Grid>
              <DialogActions sx={{ paddingX: 0, paddingTop: 2, justifyContent: 'space-between' }}>
                <Button loading={loading} disabled={loading} color='error' variant="contained" onClick={handleClose}>Cancel</Button>
                <Button loading={loading} disabled={loading} size='medium' color='success' variant="contained" onClick={addTrackerToList}>
                  Save
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center'  }}
          open={openSnack}
          autoHideDuration={5000}
          onClose={handleCloseSnack}
          variant="filled"
        >
          <Alert
            onClose={handleCloseSnack}
            severity={snackData.severity}
            variant="filled"
            sx={{ width: '70%' }}
            className='text-center'
          >
            {snackData.message}
          </Alert>
        </Snackbar>
        <div className='fixed bottom-2 right-2 z-20'>
          <Fab size='medium' onClick={handleClickOpen} color="success" aria-label="add" >
            <AddIcon />
          </Fab>
        </div>
        <Typography 
          align='center'
          className='z-10 py-2 bg-white fixed bottom-0 right-0 left-0 shadow-[0_0_10px_0_rgba(0,0,0,0.25)]'
          component={'span'}
          variant='caption'
        >
            v1.0
        </Typography>
      </Container>
    </>
  );
}
