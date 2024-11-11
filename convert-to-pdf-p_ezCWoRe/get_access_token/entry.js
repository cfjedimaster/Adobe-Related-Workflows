// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {

  	let params = new URLSearchParams();
  	params.append('client_id', process.env.AAS_CLIENT_ID);
  	params.append('client_secret', process.env.AAS_CLIENT_SECRET);
  
  	let resp = await fetch('https://pdf-services-ue1.adobe.io/token', { 
  		method: 'POST', 
  		headers: {
  			'Content-Type':'application/x-www-form-urlencoded'
  		},
  		body:params 
  	});
  	let data = await resp.json();
  	return data.access_token;  
  
  },
})