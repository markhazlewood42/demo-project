const axios = require("axios");
const hubspot = require('@hubspot/api-client');


exports.main = async (context = {}, sendResponse) => {
  
  // Set up HubSpot API client using the access token of the private app
  // where this function lives
  const hubspotClient = new hubspot.Client({ "accessToken": context.secrets.PRIVATE_APP_ACCESS_TOKEN });  

  try {

    // Make a HubSpot API call 
    // (must be available to this app's requested scopes, which are set in the app.json file)
    const apiResponse = await hubspotClient.crm.deals.basicApi.getPage(10);
    
    // Make an external API call
    const { data } = await axios.get("https://zenquotes.io/api/random");

    // Send the card response, which defines the UI and content for this card.
    sendResponse({
      results: [
        {
          objectId: 1,
          link: "https://zenquotes.io/",
          title: "Inspirational quotes provided by ZenQuotes API",

          sections: [
            {
              "type": "descriptionList",
              "items": [
                {
                  "label": "Quote",
                  "value": data[0].q
                },
                {
                  "label": "Author",
                  "value": data[0].a
                },
                {
                  "label": "Test field",
                  "value": "A field added just for testing."
                }
              ]
            }
          ],
          actions: [
            {
              "type": "IFRAME",
              "width": 890,
              "height": 748,
              "uri": "https://www.google.com",
              "label": "Custom action",
              "associatedObjectProperties": []
            }
          ]
        },
      ],
      primaryAction: {
        type: "SERVERLESS_ACTION_HOOK",
        serverlessFunction: "zenQuotes-card-response",
        label: "Get Inspired",
      }
    });
  } catch (error) {
    throw new Error(`There was an error fetching the quote: ${error.message}`);
  }
};