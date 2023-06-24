// stateManager.js
const stateListeners = [];
let stateValue = []


export const getState = {
    subscribe: (listener) => {
        stateListeners.push(listener);
    },
    unsubscribe: (listener) => {
        const index = stateListeners.indexOf(listener);
        if (index !== -1) {
            stateListeners.splice(index, 1);
        }
    },
};

export const updateState = (newValueArray) => {
    stateValue = newValueArray;
    stateListeners.forEach(listener => listener(stateValue));
};
