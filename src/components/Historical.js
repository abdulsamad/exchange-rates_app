import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

function Historical() {
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
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');
	const [currency, setCurrency] = useState('INR');
	const [base, setBase] = useState('USD');
	const [chartLabel, setChartLabel] = useState([]);
	const [datasets, setDatasets] = useState([]);
	const [prevDataset, setprevDataset] = useState([]);
	const lineChart = useRef();

	useEffect(() => {
		if (from === '' || to === '') return;
		fetch(
			`https://api.exchangeratesapi.io/history?start_at=${from}&end_at=${to}&base=${base}&symbols=${currency}`,
		)
			.then((res) => res.json())
			.then((res) => {
				let months;
				const keys = [];
				const values = [];
				const ratesArr = Object.entries(res.rates).sort();

				// Count Difference between dates
				let [d1, d2] = [new Date(from), new Date(to)];
				months = (d2.getFullYear() - d1.getFullYear()) * 12;
				months -= d1.getMonth();
				months += d2.getMonth();

				if (months < 2) {
					for (const [key, value] of ratesArr) {
						const year = key.slice(0, 4);
						const month = key.slice(5, 7);
						const days = key.slice(8, 10);

						if (!keys.includes(`${year} ${month}`)) {
							keys.push(`${days}-${month}`);
							values.push(value[currency].toFixed(2));
						}
					}
				} else if (months < 24) {
					for (const [key, value] of ratesArr) {
						const year = key.slice(0, 4);
						const month = key.slice(5, 7);

						if (!keys.includes(`${year} ${month}`)) {
							keys.push(`${year} ${month}`);
							values.push(value[currency].toFixed(2));
						}
					}
				} else {
					for (const [key, value] of ratesArr) {
						const year = key.slice(0, 4);

						if (!keys.includes(year)) {
							keys.push(year);
							values.push(value[currency].toFixed(2));
						}
					}
				}

				setChartLabel(keys);
				chart(values);
			})
			.catch((err) => {
				alert('Sorry! Cannot Find Data Right Now 😕');
			});

		// eslint-disable-next-line
	}, [from, to, currency, base]);

	const chart = (values) => {
		const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

		setDatasets([
			...prevDataset,
			{
				label: `${base} Against ${currency}`,
				fill: false,
				data: values,
				borderColor: randomColor,
				borderJointStyle: 'bevel',
				pointBackgroundColor: randomColor,
				borderWidth: 4,
			},
		]);
	};

	const formatDate = (date) => {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	};

	const addNewCurrencyChart = () => {
		setprevDataset(datasets);
		const filtered = currencyOptions.filter((option) => option !== currency);
		setCurrencyOptions(filtered);
	};

	const clearCurrencyChart = () => {
		setDatasets([]);
		setChartLabel([]);
		setprevDataset([]);
		setFrom('');
		setTo('');
		setCurrency('INR');
	};

	return (
		<Fragment>
			<Col lg={1}></Col>
			<Col lg={4} className='px-sm-1 px-lg-5'>
				<Form className='text-center'>
					<h5 className='mb-3'>Get Historical Data</h5>
					<Form.Group>
						<Form.Label>Base</Form.Label>
						<Form.Control as='select' value={base} onChange={(ev) => setBase(ev.target.value)}>
							{currencyOptions.map((option) => (
								<option value={option} key={option}>
									{option}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					{prevDataset.map((dataset, index) => (
						<Form.Group key={dataset.label}>
							<Form.Label>Freezed Currency #{++index}</Form.Label>
							<Form.Control value={dataset.label.slice(-3)} readOnly></Form.Control>
						</Form.Group>
					))}
					<Form.Group>
						<Form.Label>Currency</Form.Label>
						<Form.Control
							as='select'
							value={currency}
							onChange={(ev) => setCurrency(ev.target.value)}>
							{currencyOptions
								.filter((option) => option !== base)
								.map((option) => (
									<option value={option} key={option}>
										{option}
									</option>
								))}
						</Form.Control>
					</Form.Group>
					<Row className=' my-4'>
						<Col>
							<Button variant='primary' onClick={addNewCurrencyChart} block>
								Add New
							</Button>
						</Col>
						{from.length > 0 && to.length > 0 && (
							<Col>
								<Button variant='danger' onClick={clearCurrencyChart} block>
									Clear All
								</Button>
							</Col>
						)}
					</Row>
					<Row>
						<Col>
							<Form.Group controlId='from'>
								<Form.Label>From</Form.Label>
								<Form.Control
									type='date'
									value={from}
									min='2008-01-01'
									max={formatDate(new Date().setDate(new Date().getDate() - 7))}
									onChange={(ev) => setFrom(ev.target.value)}
									className=' text-center text-uppercase shadow-sm'
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId='to'>
								<Form.Label>To</Form.Label>
								<Form.Control
									type='date'
									value={to}
									max={formatDate(new Date())}
									onChange={(ev) => setTo(ev.target.value)}
									className=' text-center text-uppercase shadow-sm'
								/>
							</Form.Group>
						</Col>
					</Row>
				</Form>
			</Col>
			<Col lg={1} className='my-5'></Col>
			{datasets.length > 0 && (
				<Col lg={6}>
					<h4 className='mb-3 text-center'>Historical Chart</h4>
					<div className='bg-light'>
						<Line
							ref={lineChart}
							data={{
								labels: chartLabel,
								datasets: datasets,
							}}
							className='shadow-sm'
						/>
					</div>
				</Col>
			)}
		</Fragment>
	);
}

export default Historical;
