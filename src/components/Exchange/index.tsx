
import React, { ChangeEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import bigDecimal from 'js-big-decimal';
import { SelectChangeEvent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CURRENCY_CODE_TO_LABEL } from '../../config';
import CurrencyInput from '../CurrencyInput';
import { RootState } from '../../store';
import { ReactComponent as ExchangeIcon } from '../../res/exchange.svg';
import classes from './styles.module.scss';

const Exchange = () => {
  const rates = useSelector((state: RootState) => state.rates);
  const [firstAmount, setFirstAmount] = useState(0);
  const [secondAmount, setSecondAmount] = useState(0);
  const [firstCurrencyCode, setFirstCurrencyCode] = useState<string>('USDT');
  const [secondCurrencyCode, setSecondCurrencyCode] = useState<string>('BTC');

  const fetchRatesValuesDateTimeStr: string = useMemo(() => {
    return Intl.DateTimeFormat('default',
      {
        day: 'numeric', month: 'numeric', year: 'numeric',
        hour: 'numeric', minute: 'numeric',
      }
    ).format(rates.fetchDateTime || undefined);
  }, [rates.fetchDateTime]);

  if (rates.values === null) return <></>;
  return <Grid container className={classes.exchange} rowSpacing={2}>
    <Grid item md={2} xs={0} />
    <Grid item md={3} sm={5} xs={12}>
      <CurrencyInput
        value={firstAmount}
        onAmountChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (rates.values === null) return;
          setFirstAmount(+event.target.value);
          setSecondAmount(
            +bigDecimal.multiply(
              rates.values[firstCurrencyCode][secondCurrencyCode],
              +event.target.value,
            )
          );
        }}
        currency={firstCurrencyCode}
        onCurrencyCodeChange={(event: SelectChangeEvent) => {
          if (rates.values === null) return;
          setFirstCurrencyCode(event.target.value)
          setSecondAmount(
            +bigDecimal.multiply(
              rates.values[event.target.value][secondCurrencyCode],
              firstAmount,
            )
          );
        }}
      />
    </Grid>
    <Grid item sm={2} xs={12} display="flex" justifyContent="center" alignItems="center">
      <ExchangeIcon className={classes.exchange__icon} />
    </Grid>
    <Grid item md={3} sm={5} xs={12}>
      <CurrencyInput
        value={secondAmount}
        onAmountChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (rates.values === null) return;
          setSecondAmount(+event.target.value);
          setFirstAmount(
            +bigDecimal.multiply(
              rates.values[secondCurrencyCode][firstCurrencyCode],
              +event.target.value,
            )
          );
        }}
        currency={secondCurrencyCode}
        onCurrencyCodeChange={(event: SelectChangeEvent) => {
          if (rates.values === null) return;
          setSecondCurrencyCode(event.target.value)
          setSecondAmount(
            +bigDecimal.multiply(
              rates.values[firstCurrencyCode][event.target.value],
              firstAmount,
            )
          );
        }}
      />
    </Grid>
    <Grid item md={2} />
    <Grid item md={2} />
    <Grid item md={10}>
      <Typography>
        1 {CURRENCY_CODE_TO_LABEL[firstCurrencyCode]} = {parseFloat(rates.values[firstCurrencyCode][secondCurrencyCode].toFixed(8))} {CURRENCY_CODE_TO_LABEL[secondCurrencyCode]}
      </Typography>
      <Typography variant="subtitle2">
        Данные носят ознакомительный характер · {fetchRatesValuesDateTimeStr}, вермя браузера
      </Typography>
    </Grid>
  </Grid>
};

export default Exchange;