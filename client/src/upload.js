import React, { useState, useContext } from 'react';
import { post_api } from './api';
import { Context } from './context';

export const Upload = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

    //**context
	const [context, setContext] = useContext(Context);

	//**  On file upload (click the upload button)
	const onFileUpload = () => {
		setLoading(true);
		let formData = new FormData();
		if (selectedFile && selectedFile.name) {
			formData.append('file', selectedFile);
			formData.append('name', selectedFile.name);
			post_api('upload', formData).then((res) => {
				console.log(res);
				if (res.status == 200) {
					setContext(true);
				}
				setLoading(false);
				setMessage(res.data.Message);
			});
		} else {
			setLoading(false);
			selectedFile ? setMessage('Something went wrong,Try Again!!') : setMessage('Select a  file first!');
		}
	};

	//**On file select (from the pop up)
	const onFileChange = (event) => {
		// Update the state
		setSelectedFile(event.target.files[0]);
	};

	return (
		<>
			{loading ? 'Loading ...' : null}
			<div className="upload">
				<label for="myfile">Select a file to upload:</label>
				<input className="App-link" type="file" id="myfile" name="myfile" onChange={onFileChange} />
				<button className="button" onClick={onFileUpload}>Upload!</button>
				<p className="err">{message}</p>
			</div>
		</>
	);
};
