> Disclaimer: this code sample is provided as-is with no guarantee of functionality. This code sample is not covered under Twilio's Support SLA.

# Incident Response IVR
## [Watch the Demo Video](https://www.loom.com/share/f1e66a0934c14c4e997104449c47e8fd)


This repository allows you to create a basic incident response IVR on Twilio. It implements the following features:

* Dial a phone number to join an incident bridge.
* Page your team with voice calls.
* When a team member picks up and responds, they'll be placed in the bridge.
* When team members miss the call, they'll receive a voicemail and SMS instructing them to dial in.

## Setup
```shell
# Clone the repository:
git clone git@github.com:cweems/incident-management-ivr.git

# Change into the project directory:
cd incident-management-ivr

# Copy the environment variable template and add your team's phone numbers in e164 format:
cp .env.example .env

# Deploy to Twilio Serverless using Twilio CLI or NPM:
twilio serverless:deploy
# or
npm run deploy
```

Once your serverless instance has deployed, update your Twilio Phone number's voice configuration with the path to the `inbound-call` function.

1. Go to twilio.com/console
2. In the sidebar, click on `Phone Numbers > Manage > Active Numbers`. If Phone Numbers does not display, click on "Explore Products" at the base of the nav menu.
3. Click on the number that you want to update and scroll to the "Voice" configuration section.
4. Pick the serverless service you created and select `inbound-call` as the function to use.

## Local Development
Clone the repository and switch into the project directory, then:

```shell
# Install dependencies
npm install

# Copy the example .env file and add your API key, auth token, and dev domain:
cp .env.example .env

# Start your development server:
npm run start
```

With your server running locally, you'll need to provide Twilio with a way to make webhook requests to your localhost. [Ngrok](https://ngrok.com/) is a good way to do this.

Once you have an Ngrok tunnel pointing to your localhost you can update your phone webhook with that Ngrok URL.

