"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlpacaApi = void 0;
class AlpacaApi {
    constructor() {
        this.name = 'alpacaApi';
        this.displayName = 'Alpaca API';
        this.properties = [
            {
                displayName: 'API Key ID',
                name: 'apiKeyId',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Your Alpaca API Key ID',
            },
            {
                displayName: 'API Secret Key',
                name: 'apiSecretKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
                description: 'Your Alpaca API Secret Key',
            },
            {
                displayName: 'Environment',
                name: 'environment',
                type: 'options',
                options: [
                    {
                        name: 'Paper Trading',
                        value: 'paper',
                    },
                    {
                        name: 'Live Trading',
                        value: 'live',
                    },
                ],
                default: 'paper',
                description: 'Select the trading environment',
            },
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://paper-api.alpaca.markets',
                description: 'Override the default base URL (optional)',
                displayOptions: {
                    show: {
                        environment: ['paper'],
                    },
                },
            },
        ];
    }
}
exports.AlpacaApi = AlpacaApi;
