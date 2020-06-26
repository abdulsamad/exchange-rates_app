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
			<Nav />
			<div className='container-fluid p-4'>
				<Row className='mt-3 mb-5'>
					<Col lg={1}></Col>
					<Col lg={4} className='px-sm-2 px-lg-5'>
						<Converter />
					</Col>
					<Col lg={2}></Col>
					<Col lg={4} className='px-sm-5 px-lg-5 my-5 my-lg-0'>
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
			</div>
		</div>
	);
}

export default App;
