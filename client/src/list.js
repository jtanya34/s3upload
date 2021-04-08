import React, { useState, useEffect, useContext } from 'react';
import { get_api } from './api';
import { Context } from './context';

export const List = () => {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [url, setUrl] = useState('');
	const [message, setMessage] = useState('');
	const [context, setContext] = useContext(Context);

	useEffect(() => {
		get_api('list').then((res) => {
			console.log(res.data);
			let filesUrl = [];
			setFiles(res.data.files);
			setLoading(false);
		});
	}, [context, loading]);

	const download = async (file) => {
		var element = document.getElementById(file.id);
		let blob = await fetch(file.url).then((r) => r.blob());

		let url = await URL.createObjectURL(blob);
		element.href = url;
		element.click();
		setUrl(url);
	};

	return (
		<>
			{loading ? (
				'Loading ...'
			) : (
				<ul>
					{files &&
						files.length > 0 &&
						files.map((each, index) => (
							<li className="list" key={each.id}>
								<h4>{index + 1}</h4>
								<h4>
									{each.name}
									<a className="App-link" id={each.id} href={url} download></a>
								</h4>
								<button className="button" onClick={() => download(each)}>
									Download
								</button>
							</li>
						))}
				</ul>
			)}
		</>
	);
};
