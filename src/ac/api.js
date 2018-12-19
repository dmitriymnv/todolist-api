export default (callAPI, data) => {
	return new Promise((resolve, reject) => {
		fetch(callAPI[0], {
		method: callAPI[1],
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			"authorization": localStorage.getItem('todoJWT')
		}
		})
			.then(parseJSON)
			.then((response) => {
				if (response.ok) {
					return resolve(response.json);
				}
				return reject(response.json.errors);
			})
	});
}

function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
		}))
	);
}