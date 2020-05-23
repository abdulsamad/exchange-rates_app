import React, { Fragment } from 'react';
import { Form, Col, Row } from 'react-bootstrap';

function CurrencyRow({
	currencyOptions,
	onChangeAmount,
	onChangeCurrency,
	amount,
	currency,
	error,
}) {
	return (
		<Fragment>
			<Row>
				<Col>
					<Form.Control
						type='text'
						placeholder='Enter Number'
						value={amount}
						onChange={onChangeAmount}
					/>
				</Col>
				<Col>
					<Form.Control as='select' value={currency} onChange={onChangeCurrency}>
						{currencyOptions.map((option) => (
							<option value={option} key={option}>
								{option}
							</option>
						))}
					</Form.Control>
				</Col>
			</Row>
			{error && <p className='form-text my-2'>Please enter a valid number</p>}
		</Fragment>
	);
}

export default CurrencyRow;
