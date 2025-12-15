import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AlpacaApi implements ICredentialType {
	name = 'alpacaApi';
	displayName = 'Alpaca API';
	properties: INodeProperties[] = [
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
			displayName: 'Trading API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://paper-api.alpaca.markets',
			description: 'Override the default Trading API base URL (optional)',
			displayOptions: {
				show: {
					environment: ['paper'],
				},
			},
		},
		{
			displayName: 'Market Data API Base URL',
			name: 'marketDataBaseUrl',
			type: 'string',
			default: 'https://data.alpaca.markets',
			description: 'Market Data API base URL (for bars, trades, quotes). Default: https://data.alpaca.markets',
		},
	];
}

