import { PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { AVAILABLE_CURRENCIES_CODES } from '../config';
import { setRatesValues } from './rates-slice';

type SymbolData = {
  symbol: string,
  baseAsset: string,
  quoteAsset: string,
}

const middleware = ({ dispatch }: { dispatch: Function }) => {
  (async () => {
    const {data: {symbols: currenciesSymbols}} =
      await axios.get('https://api.binance.com/api/v3/exchangeInfo');
    const availSymbolsData = currenciesSymbols
      .filter(({baseAsset, quoteAsset}: SymbolData) =>
        AVAILABLE_CURRENCIES_CODES.includes(baseAsset)
        && AVAILABLE_CURRENCIES_CODES.includes(quoteAsset)
      );
    const {data: availableSymbolsPrices} =
      await axios.get('https://api.binance.com/api/v3/ticker/price', {
        params: {
          symbols: JSON.stringify(
            availSymbolsData.map(({symbol}: SymbolData) => symbol)
          ),
        }
      });
    const currenciesRates = availSymbolsData.reduce(
      (acc: {[key: string]: {[key: string]: number}}, {symbol, baseAsset, quoteAsset}: SymbolData) => {
        acc[baseAsset] = acc[baseAsset] || {[baseAsset]: 1};
        acc[quoteAsset] = acc[quoteAsset] || {[quoteAsset]: 1};
        const symbolPrice = +availableSymbolsPrices
          .find((symbolPriceData: {symbol: string}) => symbolPriceData.symbol === symbol)
          .price;
        acc[baseAsset][quoteAsset] = symbolPrice;
        acc[quoteAsset][baseAsset] = 1 / symbolPrice;
        return acc;
      },
      {},
    );
    dispatch(setRatesValues(currenciesRates));
    
  })();
  return (next: Function) => (action: PayloadAction) => next(action);
};

export default middleware;