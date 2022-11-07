const axios = require("axios");

exports.main = async (context = {}, sendResponse) => {
  
  const { firstname } = context.propertiesToSend;

  console.log("A test debug statement!");

  sendResponse({
    "sections": [
      {
        "type": "button",
        "text": "Iframe Button",
        "onClick": {
         "type": "IFRAME",
         "width": 890,
         "height": 748,
         "uri": "https://meetings.markedupconsulting.com/_hcms/api/echo-params",
         "associatedObjectProperties": []
        }
       }
    ]
  });
};