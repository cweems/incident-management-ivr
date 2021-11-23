// This function handles responses to the initial prompt

function getContacts(context) {
    let result = [];
    for (const [key, val] of Object.entries(context)) {
        if (key.startsWith("CONTACT")) {
            result.push(val);
        }
    }

    return result;
}

exports.handler = async function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    const client = context.getTwilioClient();
    let domain = context.DOMAIN_NAME;

    if (context.DOMAIN_NAME.includes('localhost')) {
        domain = context.DEV_DOMAIN_NAME;
    }

    // Fetch your contacts environment variables.
    const contacts = getContacts(context);

    // Add the caller directly to the bridge, or page the team.
    if (event.Digits === '1') {
        twiml.say({
            voice: 'Polly.Joanna'
        }, 'Now adding you to the incident bridge.');
        const dial = twiml.dial();
        dial.conference('IncidentConference');
        callback(null, twiml);
    } else if (event.Digits === '2') {
        twiml.say({
            voice: 'Polly.Joanna'
        }, 'Now paging your team and adding you to the incident bridge.');

        const callPromises = contacts.map( (phoneNumber) => {
            console.log(phoneNumber);
            return client.calls
                .create({
                    url: `https://${domain}/gather-page-response`,
                    to: phoneNumber,
                    from: decodeURIComponent(event.To)
                })
                .then(call => {
                    console.log('success', call.sid);
                    return call.sid;
                })
                .catch(err => {
                    console.log(err); 
                    throw new Error(err)
                });
        });

        const dial = twiml.dial();
        dial.conference('IncidentConference');

        Promise.all(callPromises)
            .then((results) => {
                console.log(results);
                callback(null, twiml);
            });
    }
  };