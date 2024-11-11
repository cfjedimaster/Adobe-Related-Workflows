// To use any npm package, just import it
// import axios from "axios"
async function delay(x) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), x);
	});
}

async function getJob(url, token, clientId) {

	let req = await fetch(url, {
		method:'GET',
		headers: {
			'X-API-Key':clientId,
			'Authorization':`Bearer ${token}`,
		}
	});

	return await req.json();

}

export default defineComponent({
  async run({ steps, $ }) {

	let done = false;
  let jobResult;
    
	while(!done) {
		jobResult = await getJob(steps.convert_to_pdf.$return_value, steps.get_access_token.$return_value, process.env.AAS_CLIENT_ID);
		console.log('Latest job status', jobResult);

		if(jobResult.status == 'in progress') {
			await delay(2 * 1000);
		} else done = true;

	}    
    
    return jobResult.status;
  },
})