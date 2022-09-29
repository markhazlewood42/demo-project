const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
  
  const { firstname } = context.propertiesToSend;

  console.log("A test debug statement!");

  sendResponse({
    "sections": [
      {
        "type": "text",
        "format": "markdown",
        "text": `The word ** ${firstname} ** is bolded, and the word [${firstname}](https://www.hubspot.com/) is a link. here's \`code\` and _italics_ too`
      }
    ]
  });
};