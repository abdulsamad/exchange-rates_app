import React, { useState, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { $, multiply } from 'moneysafe';

function IntlToIndian() {
	const BASE_URL = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=INR';
	const [answer, setAnswer] = useState('');
	const [USD, setUSD] = useState(0);
	const [selectVal, setSelectVal] = useState('thousand');
	const [numberVal, setNumberVal] = useState('');
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(BASE_URL)
			.then((res) => res.json())
			.then((res) => setUSD(res.rates['INR'].toFixed(2)));
	}, []);

	const onChange = ({ target: { value } }) => {
		let total;
		setNumberVal(value);
		if (value === '' || value <= 0) {
			setAnswer('');
			return;
		}

		switch (selectVal) {
			case 'thousand':
				if (value.length < 4) {
					total = multiply($(value), $(USD * 1000));
				}
				break;

			case 'million':
				if (value.length < 4) {
					total = multiply($(value), $(USD * 1000000));
				}
				break;

			case 'billion':
				if (value.length < 4) {
					total = multiply($(value), $(USD * 1000000000));
				}
				break;

			case 'trillion':
				if (value.length < 4) {
					total = multiply($(value), $(USD * 1000000000000));
				}
				break;

			default:
				setAnswer("😄 It's not created for managing this much amount.");
		}

		FigureToWords(total);
	};

	const FigureToWords = (amnt) => {
		let str;
		const amount = Math.round(amnt).toString();
		const len = amount.length;
		const [unit, hundred, thousand, lakh, crore] = [
			parseInt(amount.slice(-2)) !== 0 ? amount.slice(-2) : '',
			parseInt(amount.slice(-3, -2)) !== 0 ? amount.slice(-3, -2) + ' Hundred' : '',
			parseInt(amount.slice(-5, -3)) !== 0 ? amount.slice(-5, -3) + ' Thousand' : '',
			parseInt(amount.slice(-7, -5)) !== 0 ? amount.slice(-7, -5) + ' Lakh' : '',
			parseInt(amount.slice(-20, -7)) !== 0 ? amount.slice(-20, -7) + ' Crore' : '',
		];
		setError(false);

		if (isNaN(amount)) {
			setError(true);
			return false;
		}

		switch (true) {
			case len > 0 && len <= 2:
				str = `₹ ${unit}`;
				break;
			case len > 2 && len <= 3:
				str = `₹ ${hundred} ${unit}`;
				break;
			case len > 3 && len <= 5:
				str = `₹ ${thousand} ${hundred} ${unit ? 'and ' + unit : ''}`;
				break;
			case len > 5 && len <= 7:
				str = `₹ ${lakh} ${thousand} ${hundred} ${unit ? 'and ' + unit : ''}`;
				break;
			case len > 7:
				str = `₹ ${crore} ${lakh} ${thousand} ${hundred} ${unit ? 'and ' + unit : ''}`;
				break;
			default:
				return null;
		}

		setAnswer(str.trim() + ' Approx');
	};

	return (
		<Form className='text-center'>
			<h5 className='mb-3'>Dollars (Millions) to Rupees (Crores)</h5>
			<Row>
				<Col>
					<Form.Control
						type='text'
						placeholder='Enter Number'
						pattern='\d*'
						maxLength='3'
						value={numberVal}
						onChange={onChange}
					/>
				</Col>
				<Col>
					<Form.Control
						value={selectVal}
						as='select'
						onChange={(ev) => {
							setSelectVal(ev.target.value);
							setNumberVal('');
							setAnswer('');
						}}>
						<option value='thousand'>Thousand</option>
						<option value='million'>Million</option>
						<option value='billion'>Billion</option>
						<option value='trillion'>Trillion</option>
					</Form.Control>
				</Col>
			</Row>
			{error && <p className='form-text my-2'>Please enter a valid number</p>}
			<div className='display-4'>=</div>
			<Row>
				<Col>
					<Form.Control type='text' value={answer} disabled />
				</Col>
			</Row>
		</Form>
	);
}

export default IntlToIndian;
