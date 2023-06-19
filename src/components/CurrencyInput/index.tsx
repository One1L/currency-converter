import React, { ChangeEventHandler, ReactNode } from 'react';
import Input from '@mui/material/Input';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AVAILABLE_CURRENCIES_CODES } from '../../config';
import { ReactComponent as BTCIcon } from '../../res/btc.svg';
import { ReactComponent as ETHIcon } from '../../res/eth.svg';
import { ReactComponent as USDTIcon } from '../../res/usdt.svg';
import classes from './styles.module.scss';

type CurrencyInputProps = {
  value: number;
  onAmountChange: ChangeEventHandler,
  currency: string,
  onCurrencyCodeChange: (event: SelectChangeEvent, child: ReactNode) => void,
};


const CURRENCY_CODE_TO_ICON: {[key: string]: React.ReactNode} = {
  BTC: <BTCIcon className={classes['currency-input__icon']} />,
  ETH: <ETHIcon className={classes['currency-input__icon']} />,
  USDT: <USDTIcon className={classes['currency-input__icon']} />,
};

const CurrencyInput: React.FunctionComponent<CurrencyInputProps> =
  ({value, onAmountChange, currency, onCurrencyCodeChange}) => {
    return (
      <div className={classes['currency-input']}>
        <Input className={classes['currency-input__input']}
          value={value.toString()} onChange={onAmountChange}
          type="number"
        />
        <Select value={currency} onChange={onCurrencyCodeChange}>
          {AVAILABLE_CURRENCIES_CODES
            .map((availableCurrency) =>
              <MenuItem value={availableCurrency} key={availableCurrency}>
                {CURRENCY_CODE_TO_ICON[availableCurrency]}
                {availableCurrency}
              </MenuItem>
            )
          }
        </Select>
      </div>
    );
  };

export default CurrencyInput;