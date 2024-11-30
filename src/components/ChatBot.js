import React, { useEffect, useState } from 'react';
import {open} from '@play-ai/web-embed';

const ChatBot = () => {
    const webEmbedId = 'UM58k5vo1FJZMKwcPgAAf';
    const [text, setText] = useState('Hello, world!');

    useEffect(() => {
        const events = [
            {
                name: "change-text",
                when: "The user wants advice on a chess move",
                data: {
                    text: { type: "string", description: "The move to make" },
                },
            },
        ];

        const onEvent = (event) => {
            console.log('onEvent: ', event);
            if (event.name === 'change-text') {
                setText(event.data.text);
            }
        };

        const result = open(webEmbedId, {
            events,
            onEvent,
            customGreeting: "Let's play!",
            prompt: 'You are a chess player, playing against another player',
        });
        
    }, []);

    return (
        <div>
            <h1>{text}</h1>
        </div>
    );

}

export default ChatBot;