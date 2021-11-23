// This function plays an initial prompt for inbound callers.
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    action: '/gather-conference-or-page',
    method: 'get',
    numDigits: 1
  });
 
  gather.say({
    voice: 'Polly.Joanna'
  }, 'This is your incident response line. Press 1 to join the incident management conference or press 2 to page the team.');
  
  callback(null, twiml);
};
