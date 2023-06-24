// ButtonComponent.js
import React from 'react';
import { updateState } from '../../../used/personalNote/stateManager';

const ButtonComponent = () => {
    const handleClick = () => {
        updateState('new value'); // Call the imported state-changing function
    };

    return (
        <button onClick={handleClick}>Update State</button>
    );
};

export default ButtonComponent;