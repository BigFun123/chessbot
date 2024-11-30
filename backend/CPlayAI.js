class CPlayAI {
    _apikey="ak-d03791bd9b334d55a87760b71dfaa922";
    _userid="NrJ7QIMaHzOiYdG9da2YOWSjDtG2";

    createChatbot() {
        const setupAgent = {
            "id": "f0gZrOKBKL7veJ6o1M",
            "voice": "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json",
            "voiceSpeed": 1.2,
            "displayName": "Chester",
            "description": "I like Chess and riding my bike",
            "greeting": "Hello! Do you want to play?",
            "prompt": "You are a young chess player. Another player is playing chess with you. I will send you moves and what happened, e.g. a piece was taken, and you can react with expressions and fun comments\n",
            "criticalKnowledge": "Chess games, chess players, chess history, chess recreation",
            "visibility": "public",
            /* "llm": {
               "baseURL": "https://my.own.llm.api.example.com",
               "apiKey": "abcdefghijklmnopqrstuvwxyz",
               "baseParams": {
                 "defaultHeaders": {
                   "x-my-extra-key": "some-value-for-extra-key"
                 },
                 "model": "gpt-3.5-turbo",
                 "temperature": 0,
                 "maxTokens": 3000
               }
             },*/
            "answerOnlyFromCriticalKnowledge": false,
            "avatarPhotoUrl": "https://api.play.ai/api/v1/agents/as43fed1477465823255f9/avatar-photo",
            /* "criticalKnowledgeFiles": [
               {
                 "id": "e0e92064e26257fed14774658218f59a",
                 "name": "whatever you want.pdf",
                 "url": "https://api.play.ai/api/v1/agents/as43fed1477465823255f9/critical-knowledge-files/e0e92064e26257fed14774658218f59a",
                 "size": 108439,
                 "type": "pdf"
               }
             ],*/
            /*"phoneNumbers": [
              {
                "phoneNumber": 13659874563,
                "country": "US",
                "locality": "Malibu"
              }
            ]*/
        }
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                AUTHORIZATION: this._apikey,
                'X-USER-ID': this._userid
            },
            body: JSON.stringify(setupAgent)
        };

        fetch('https://api.play.ai/api/v1/agents', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
}