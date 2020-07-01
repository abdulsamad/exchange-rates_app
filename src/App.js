import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Nav from './components/layout/Navbar';
import Converter from './components/Converter';
import IntlToIndian from './components/IntlToIndian';
import Historical from './components/Historical';
import './scss/App.scss';

function App() {
	return (
		<div className='app'>
			<div className='bg-shape position-fixed' aria-hidden='true'></div>
			<Nav />
			<div className='container-fluid p-4'>
				<Row className='my-3'>
					<Col lg={1}></Col>
					<Col lg={4} className='px-sm-1 px-lg-5'>
						<Converter />
					</Col>
					<Col lg={2} className='my-5'></Col>
					<Col lg={4} className='px-sm-1 px-lg-5'>
						<IntlToIndian />
					</Col>
					<Col lg={1}></Col>
				</Row>
				<br />
				<Row className='my-3'>
					<Historical />
				</Row>
			</div>
			<div className='text-center'>
				<p className='lead'>
					<strong>Note:</strong> This real amount may vary because of data updation frequency.
				</p>
				<p>
					<small className='font-weight-light'>
						Powered by{' '}
						<a href='https://exchangeratesapi.io' className='font-weight-bold'>
							ExchangeRatesAPI
						</a>
					</small>
				</p>
			</div>
		</div>
	);
}

export default App;
