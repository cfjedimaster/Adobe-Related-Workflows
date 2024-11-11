
export default defineComponent({
  async run({ steps, $ }) {

  	let body = {
      "input": {
        "uri":steps.trigger.event.link,
        "storage":'DROPBOX'
      },
      "output": {
        "uri":steps.get_upload_link.$return_value.link,
        storage:'DROPBOX'
      }
    }

    let resp = await fetch('https://pdf-services.adobe.io/operation/createpdf', {
  		method: 'POST', 
  		headers: {
  			'Authorization':`Bearer ${steps.get_access_token.$return_value}`, 
  			'X-API-KEY':process.env.AAS_CLIENT_ID,
  			'Content-Type':'application/json'
  		},
  		body:JSON.stringify(body)
  	});

  	return resp.headers.get('location');
      
  },
})