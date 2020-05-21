import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Nav from './components/layout/Navbar';
import Converter from './components/converter/Converter';
import './scss/App.scss';

function App() {
	return (
		<div className='app'>
			<Nav />
			<div className='container-fluid px-2'>
				<Row className='my-3'>
					<Col md={4}>
						<Converter />
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default App;
