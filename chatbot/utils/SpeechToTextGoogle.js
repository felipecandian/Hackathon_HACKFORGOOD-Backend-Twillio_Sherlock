// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const filename = 'Local path to audio file, e.g. /path/to/audio.raw';
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'BCP-47 language code, e.g. en-US';


function convertAudioToText(filename) {

	const config = {
		encoding: encoding,
		sampleRateHertz: sampleRateHertz,
		languageCode: languageCode,
	};
	const audio = {
		content: fs.readFileSync(filename).toString('base64'),
	};

	const request = {
		config: config,
		audio: audio,
	};

	// Detects speech in the audio file. This creates a recognition job that you
	// can wait for now, or get its result later.
	const [operation] = await client.longRunningRecognize(request);

	// Get a Promise representation of the final result of the job
	const [response] = await operation.promise();
	const transcription = response.results
		.map(result => result.alternatives[0].transcript)
		.join('\n');
	console.log(`Transcription: ${transcription}`);
	return transcription

}

module.exports = {
	convertAudioToText: convertAudioToText
}