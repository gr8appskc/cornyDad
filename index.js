'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.45c33175-8876-4e39-8586-145acea39579';  // TODO replace with your app ID (OPTIONAL).


const languageStrings = {
    'en-GB': {
        translation: {
            FACTS: [
                'What time did the man go to the dentist? <break time="3s"/> Tooth hurt-y.',
                'Did you hear about the guy who invented Lifesavers? <break time="1s"/> They say he made a mint!',
                'A ham sandwich walks into a bar and orders a beer. Bartender says, Sorry we do not serve food here.',
                'Whenever the cashier at the grocery store asks my dad if he would like the milk in a bag he replies, No, just leave it in the carton!',
                'Why do chicken coops only have two doors? <break time="3s"/>Because if they had four, they would be chicken sedans!',
                'How do you make a Kleenex dance? <break time="3s"/>Put a little boogie in it!',
                'Whenever we drive past a graveyard my dad says, Do you know why I cannot be buried there? And we all say, Why not? And he says, Because I am not dead yet!',
                'Two peanuts were walking down the street. One was a salted.',
                'What is Beethoven\'s favorite fruit? <break time="3s"/> A ba-na-na-na.',
                'A three-legged dog walks into a bar and says to the bartender, I\'m looking for the man who shot my paw.',
                'What\'s Forrest Gump\'s password? <break time="3s"/> 1forrest1',
                'What\'s the difference between a poorly dressed man on a tricycle and a well dressed man on a bicycle? <break time="3s"/>Attire.',
                'What do you call a three humped camel? <break time="3s"/> Pregnant',
                'Why do bears have hairy coats? <break time="3s"/> Fur protection.',
                'What do you call a fish with no eyes? <break time="3s"/> A fshhhh.',
                'What do you call cheese by itself? <break time="3s"/> Provolone.',
                'Where does Fonzie like to go for lunch? <break time="3s"/> Chick-Fil-Eyyyyyyyy.',
                'Why did the A go to the bathroom and come out as an E? <break time="3s"/>Because he had a vowel movement.',
                'Where do you learn to make ice cream? <break time="3s"/> Sunday School.',
                'Me: Dad can you put my shoes on? <break time="1s"/> My dad reponds, I don\'t think they will fit.',
                'Last night I dreamt I was a muffler.<break time="1s"/> I woke up exhausted.',
                'What do you call a deer with no eyes? <break time="3s"/> No idea.',
            ],
            SKILL_NAME: 'British Corny Dad Jokes',
            GET_FACT_MESSAGE: "Here's your dad's corny joke: ",
            HELP_MESSAGE: 'You can say tell me a corny dad joke, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
                'What time did the man go to the dentist? <break time="3s"/> Tooth hurt-y.',
                'Did you hear about the guy who invented Lifesavers? <break time="1s"/> They say he made a mint!',
                'A ham sandwich walks into a bar and orders a beer. Bartender says, Sorry we do not serve food here.',
                'Whenever the cashier at the grocery store asks my dad if he would like the milk in a bag he replies, No, just leave it in the carton!',
                'Why do chicken coops only have two doors? <break time="3s"/>Because if they had four, they would be chicken sedans!',
                'How do you make a Kleenex dance? <break time="3s"/>Put a little boogie in it!',
                'Whenever we drive past a graveyard my dad says, Do you know why I cannot be buried there? And we all say, Why not? And he says, Because I am not dead yet!',
                'Two peanuts were walking down the street. One was a salted.',
                'What is Beethoven\'s favorite fruit? <break time="3s"/> A ba-na-na-na.',
                'A three-legged dog walks into a bar and says to the bartender, I\'m looking for the man who shot my paw.',
                'What\'s Forrest Gump\'s password? <break time="3s"/> 1forrest1',
                'What\'s the difference between a poorly dressed man on a tricycle and a well dressed man on a bicycle? <break time="3s"/>Attire.',
                'What do you call a three humped camel? <break time="3s"/> Pregnant',
                'Why do bears have hairy coats? <break time="3s"/> Fur protection.',
                'What do you call a fish with no eyes? <break time="3s"/> A fshhhh.',
                'What do you call cheese by itself? <break time="3s"/> Provolone.',
                'Where does Fonzie like to go for lunch? <break time="3s"/> Chick-Fil-Eyyyyyyyy.',
                'Why did the A go to the bathroom and come out as an E? <break time="3s"/>Because he had a vowel movement.',
                'Where do you learn to make ice cream? <break time="3s"/> Sunday School.',
                'Me: Dad can you put my shoes on? <break time="1s"/> My dad reponds, I don\'t think they will fit.',
                'Last night I dreamt I was a muffler.<break time="1s"/> I woke up exhausted.',
                'What do you call a deer with no eyes? <break time="3s"/> No idea.',
            ],
            SKILL_NAME: 'American Corny Dad Jokes',
            GET_FACT_MESSAGE: "Here's your dad's corny joke: ",
            HELP_MESSAGE: 'You can say tell me a corny dad joke, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetCornyDadJoke': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit('GetFact');  
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
