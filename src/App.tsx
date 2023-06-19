import React from 'react';
import { useSelector } from 'react-redux';
import LoadingRatesPlug from './components/LoadingRatesPlug';
import Exchange from './components/Exchange';
import { RootState } from './store';

const App = () => {
  const ratesValues = useSelector((state: RootState) => state.rates.values);
  if (ratesValues === null) {
    return <LoadingRatesPlug />;
  } else {
    return <Exchange />;
  }
};

export default App;