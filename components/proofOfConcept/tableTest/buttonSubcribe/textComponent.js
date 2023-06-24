// TextComponent.js
import React, { useState, useEffect } from 'react';
import { getState } from '../../../used/personalNote/stateManager';

const TextComponent = () => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        // Listen for changes in the state
        const handleChange = (newValue) => {
            setDisplayText(newValue);
        };

        // Subscribe to state changes
        getState.subscribe(handleChange);

        // Unsubscribe from state changes when the component unmounts
        return () => {
            getState.unsubscribe(handleChange);
        };
    }, []);

    return (
        <div>{displayText}</div>
    );
};

export default TextComponent;
