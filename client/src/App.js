import React, { useState, useContext } from 'react';
import { Upload } from './upload';
import { List } from './list';
import { Context } from './context';
import './App.css';
import axios from 'axios';

const App = () => {
	const [context, setContext] = useState(null);

	
	// File content to be displayed after
	// file upload is complete

	return (
		<Context.Provider value={[context, setContext]}>
			<div className="App">
				<Upload />
				<List/>
			</div>
		</Context.Provider>
	);
};

export default App;
