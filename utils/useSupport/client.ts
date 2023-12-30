import { LinearClient } from "@linear/sdk";

let _linear: LinearClient | null = null;

const linearClient = (): LinearClient => {
    if (!_linear) {
        _linear = new LinearClient({
            apiKey: process.env.LINEAR_API_KEY
        });
    }

    return _linear;
};

export const linear = linearClient();
