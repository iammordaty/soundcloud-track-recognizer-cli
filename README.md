# soundcloud-track-recognizer-cli

Fetches comments and streams from SoundCloud and tries to recognize commented fragments via audio recognition services.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Further information](#further-information)
- [See also](#see-also)
- [License](#license)

## Requirements

- [ACRCloud Access Key and Access Secret](https://www.acrcloud.com/)
- [AudD API Token](https://audd.io)
- [FFmpeg](https://www.ffmpeg.org)
- [SoundCloud API Client Id](https://developers.soundcloud.com)

## Installation

```
$ npm install soundcloud-track-recognizer-cli
```

## Usage

```
$ node cli recognize -C ~/config.json username --filter id? --limit 10
Fetching user's comments and commented tracks data... Done.
Downloading tracks and extracting fragments... Done.
Recognizing fragments... Done.

Recognition results:

* Jody Wisternoff November 2018 Soundcloud DJ Mix on 56:20
  http://soundcloud.com/jodywisternoff/jody-wisternoff-november-2018-soundcloud-dj-mix
  Status: ACRCloud: success, AudDMusic: success
  - Junior Jack & Tube & Berger – E Samba 2018 (Kellerkind Remix) (E Samba 2018 Remixes) (released 2018-11-16 by Housesession Records) [ACRCloud, 100%]
  - Junior Jack & Tube & Berger – E Samba 2018 (Kellerkind Remix) (E Samba 2018 Remixes) (released 2018-11-16 by Housesession Records) [AudDMusic]

* Post Scriptum 057 - Paride Saraceni Summer Studio Mix on 35:27
  http://soundcloud.com/postscriptummusic/post-scriptum-057-paride-saraceni-summer-studio-mix
  Status: ACRCloud: success, AudDMusic: success
  - Marcelo Vasami – A Fantastic Fear of Everything - Cid Inc Remix (A Fantastic Fear of Everything) (released 2017-11-24 by Replug) [AudDMusic]

* Spectrum Ra1dio 080 by JORIS VOORN | LIVE at Spectrum ADE, Central Station Amsterdam Pt.2 on 42:20
  http://soundcloud.com/joris-voorn/spectrumradio080
  Status: ACRCloud: success, AudDMusic: success
  - No results

[...]
```

Type `node cli --help` for more information.

## Further information

- [ACRCloud HTTP API Reference](https://www.acrcloud.com/docs/acrcloud/audio-fingerprinting-api)
- [AudD Music Recognition HTTP API Reference](https://docs.audd.io)
- [SoundCloud HTTP API Reference](https://developers.soundcloud.com/docs/api/reference)

## See also

- [audio-recognizer](https://github.com/iammordaty/audio-recognizer)
- [soundcloud-api-client](https://github.com/iammordaty/soundcloud-api-client)
- [soundcloud-track-recognizer](https://github.com/iammordaty/soundcloud-track-recognizer)

## License

soundcloud-track-recognizer-cli is licensed under the MIT License.
