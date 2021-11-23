// This function reads a message to the incident responder
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    action: '/accept-page',
    method: 'get',
    numDigits: 1,
    timeout: 10,
    actionOnEmptyResult: 'true',
  });

  gather.say({
    voice: 'Polly.Joanna'
  }, 'You have been paged for an incident by a team member. Press 1 to join the conference bridge now.');
  
  callback(null, twiml);
};