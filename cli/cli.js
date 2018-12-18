'use strict';

const { readFileSync } = require('fs');
const moment = require('moment');
const SoundCloudTrackRecognizer = require('soundcloud-track-recognizer');

require('moment-duration-format');

const DEFAULT_CLI_CONFIG_PATH = './cli/config.json';

/**
 * @param {String} pathname
 * @return {Object}
 */
const loadConfig = pathname => {
    const contents = readFileSync(pathname);

    return JSON.parse(contents);
};

/**
 * @param {Object} config
 * @param {Object} params
 * @return {Promise}
 */
const recognize = (config, params) => {
    const recognizer = new SoundCloudTrackRecognizer(config);

    process.stdout.write("Fetching user's comments and commented track data...");

    const results = recognizer
        .getCommentedTracks(params)
        .then(commentedTracks => {
            process.stdout.write(` Done.\n`);
            process.stdout.write(`Downloading tracks and extracting fragments...`);

            return recognizer.createFragments(commentedTracks);
        })
        .then(fragments => {
            process.stdout.write(' Done.\n');
            process.stdout.write('Recognizing fragments...');

            return recognizer.recognize(fragments);
        }).then(results => {
            console.log(' Done.\n');

            return results;
        }).catch(e => console.error('An error occurred:', e));

    return results;
};

/**
 * @param {Array} results
 * @return {undefined}
 */
const printResults = results => {
    console.info(`Recognition results:\n`);

    results.forEach(({ comment, track, fragment }) => {
        const { status, results } = fragment.recognize;
        const statuses = status.map(({ provider, status }) => `${provider}: ${status}`).join(', ');
        const commentTime = new Date(comment.created_at).toLocaleString();
        const formattedCommentTimestamp = formatTimestamp(comment.timestamp, 'hh:mm:ss');

        console.log(`* ${track.title} on ${formattedCommentTimestamp} created at ${commentTime}`);
        console.log(`  ${track.permalink_url}`);
        console.log(`  Status: ${statuses}`);

        if (!results.length) {
            console.log('  - No results');
        }

        results.forEach(track => printTrack(track));

        console.log('');
    });
};

/**
 * @param {Object} track
 * @return {undefined}
 */
const printTrack = ({ artist, title, album, release_date, label, score, provider: providerName }) => {
    process.stdout.write(`  - ${artist} – ${title}`);

    if (album) {
        process.stdout.write(` (${album})`);
    }

    if (release_date || label) {
        const released = [ release_date, label ? `by ${label}` : '' ].filter(i => i).join(' ');

        process.stdout.write(` (released ${released})`);
    }

    const provider = [ providerName, score ? `${score}%` : '' ].filter(i => i).join(', ');

    process.stdout.write(` [${provider}]\n`);
};

/**
 * @param {Number} timestamp
 * @param {String} format
 * @return {String}
 */
const formatTimestamp = (timestamp, format) => {
    const duration = moment.duration(timestamp, 'ms');
    const formatted = duration.format(format, { trim: 'large', stopTrim: 'm' });

    return formatted;
};

module.exports = {
    DEFAULT_CLI_CONFIG_PATH,
    loadConfig,
    printResults,
    recognize
};
