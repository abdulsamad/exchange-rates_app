import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Nav from './components/layout/Navbar';
import Converter from './components/Converter';
import './scss/App.scss';

function App() {
	return (
		<div className='app'>
			<Nav />
			<div className='container-fluid p-4 text-white'>
				<Row className='mt-3 mb-5'>
					<Col lg={1}></Col>
					<Col lg={4} className='px-5'>
						<Converter />
					</Col>
				</Row>
				<br />
			</div>
		</div>
	);
}

export default App;
