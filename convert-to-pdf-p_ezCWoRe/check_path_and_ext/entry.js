// To use any npm package, just import it
// import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {

    if(!steps.trigger.event.path_lower.includes('/input')) $.flow.exit('Not an input change.');

    let ext = steps.trigger.event.path_lower.split('.').pop().toLowerCase();
    const valid_ext = ['bmp', 'doc', 'docx', 'gif', 'jpeg', 'jpg', 'png', 'ppt', 'pptx', 'rtf', 'tif', 'tiff', 'txt', 'xls', 'xlsx'];

    if(!valid_ext.includes(ext)) $.flow.exit(`The file, ${steps.trigger.event.name}, had an extension (${ext}) that is not allowed.`);
    
    // Reference previous step data using the steps object and return data to use it in future steps
    return steps.trigger.event;
  },
})