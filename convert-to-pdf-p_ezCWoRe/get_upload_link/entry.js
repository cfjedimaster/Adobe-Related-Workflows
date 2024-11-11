import { axios } from "@pipedream/platform"
export default defineComponent({
  props: {
    dropbox: {
      type: "app",
      app: "dropbox",
    }
  },
  async run({steps, $}) {

    let newPath = steps.trigger.event.path_lower.replace('/input','/output');
    let parts = newPath.split('.');
    parts.pop();
    newPath = parts.join('.') + '.pdf';
    
    const data = {
      "commit_info":{
        "path": newPath
      }
    };

    return await axios($, {
      method: "post",
      url: `https://api.dropboxapi.com/2/files/get_temporary_upload_link`,
      headers: {
        Authorization: `Bearer ${this.dropbox.$auth.oauth_access_token}`,
        "Content-Type": `application/json`,
      },
      data,
    })
    
  },
})
