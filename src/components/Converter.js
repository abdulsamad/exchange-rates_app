import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { $, multiply, divide } from 'moneysafe';
import CurrencyRow from './CurrencyRow';

function Converter() {
	const BASE_URL = 'https://api.exchangeratesapi.io/latest';
	const [base, setBase] = useState('USD');

	// eslint-disable-next-line
	const [currencyOptions, setCurrencyOptions] = useState([
		'AUD',
		'BGN',
		'BRL',
		'CAD',
		'CHF',
		'CNY',
		'CZK',
		'DKK',
		'EUR',
		'GBP',
		'HKD',
		'HRK',
		'HUF',
		'IDR',
		'ILS',
		'INR',
		'ISK',
		'JPY',
		'KRW',
		'MXN',
		'MYR',
		'NOK',
		'NZD',
		'PHP',
		'PLN',
		'RON',
		'RUB',
		'SEK',
		'SGD',
		'THB',
		'TRY',
		'USD',
		'ZAR',
	]);
	const [fromCurrency, setFromCurrency] = useState('USD');
	const [fromAmount, setFromAmount] = useState('');
	const [toCurrency, setToCurrency] = useState('INR');
	const [toAmount, setToAmount] = useState('');
	const [error, setError] = useState('');

	const [exchangeRates, setExchangeRates] = useState({});

	useEffect(() => {
		fetch(`${BASE_URL}?base=${base}`)
			.then((res) => res.json())
			.then((data) => {
				setExchangeRates(data.rates);
			});
	}, [base]);

	const onChangeCurrency = ({ target: { value } }, order) => {
		if (order === 'from') {
			setBase(value);
			setFromCurrency(value);
			setExchangeRate(toAmount, order);
		} else {
			setToCurrency(value);
			setExchangeRate(fromAmount, order);
		}
	};

	const onChangeAmount = ({ target: { value } }, order) => {
		if (value === null) return;
		setError(false);

		if (order === 'from') {
			setFromAmount(value);
			isNaN(Number(value)) ? setError('from') : setExchangeRate(value, order);
		} else {
			setToAmount(value);
			isNaN(Number(value)) ? setError('to') : setExchangeRate(value, order);
		}
	};

	const setExchangeRate = (amount, order) => {
		if (order === 'from') {
			let amnt;
			exchangeRates[base] < exchangeRates[toCurrency]
				? (amnt = multiply($(amount), exchangeRates[toCurrency]))
				: (amnt = divide($(amount), exchangeRates[toCurrency]));

			toCurrency === 'INR'
				? (amnt = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amnt))
				: (amnt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(amnt));

			setToAmount(parseFloat(amnt));
		} else {
			let amnt;
			exchangeRates[base] < exchangeRates[fromCurrency]
				? (amnt = multiply($(amount), exchangeRates[toCurrency]))
				: (amnt = divide($(amount), exchangeRates[toCurrency]));

			fromCurrency === 'INR'
				? (amnt = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amnt))
				: (amnt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(amnt));

			setFromAmount(parseFloat(amnt));
		}
	};

	return (
		<Form className='text-center'>
			<h4 className='mb-3'>Convert Currency</h4>
			<CurrencyRow
				amount={fromAmount}
				currency={fromCurrency}
				currencyOptions={currencyOptions.filter((option) => option !== toCurrency)}
				onChangeAmount={(ev) => onChangeAmount(ev, 'from')}
				onChangeCurrency={(ev) => onChangeCurrency(ev, 'from')}
				error={error === 'from'}
			/>
			<div className='display-4'>=</div>
			<CurrencyRow
				amount={toAmount}
				currency={toCurrency}
				currencyOptions={currencyOptions.filter((option) => option !== fromCurrency)}
				onChangeAmount={(ev) => onChangeAmount(ev, 'to')}
				onChangeCurrency={(ev) => onChangeCurrency(ev, 'to')}
				error={error === 'to'}
			/>
		</Form>
	);
}

export default Converter;
