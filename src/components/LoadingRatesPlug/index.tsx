import React from 'react';
import Typography from '@mui/material/Typography';
import classes from './styles.module.scss';

const LoadingRatesPlug = () => 
  <Typography className={classes['loading-rates']}>Загружаем курс валют...</Typography>;

export default LoadingRatesPlug;
