// This function adds the responder to the bridge or sends them an SMS if they did not respond.
exports.handler = async function(context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    const client = context.getTwilioClient();
    
    if (event.Digits === '1') {
        twiml.say({
            voice: 'Polly.Joanna'
        }, 'Now adding you to the incident conference room.');
        
        const dial = twiml.dial();
        dial.conference('IncidentConference');
        return callback(null, twiml);
    }

    const formattedNumber = event.From.substring(1).split("").join(" ");
    console.log({formattedNumber});
    twiml.say({
        voice: 'Polly.Joanna'
    }, `We did not receive your acknowledgement of this incident page. Please call back at ${formattedNumber} to join the incident bridge.`);

    await client.messages.create({
        from: event.From,
        to: event.To,
        body: `A team member paged you for an IT incident. Please call back at ${event.From} to join the incident bridge.`
    })

    callback(null, twiml);
};