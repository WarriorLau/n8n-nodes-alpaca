import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class Alpaca implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Alpaca',
		name: 'alpaca',
		icon: 'file:alpaca.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Alpaca Markets API',
		defaults: {
			name: 'Alpaca',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'alpacaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Account',
						value: 'getAccount',
						description: 'Get account information',
						action: 'Get account information',
					},
					{
						name: 'Get Positions',
						value: 'getPositions',
						description: 'Get all open positions',
						action: 'Get all open positions',
					},
					{
						name: 'Get Orders',
						value: 'getOrders',
						description: 'Get orders',
						action: 'Get orders',
					},
					{
						name: 'Create Order',
						value: 'createOrder',
						description: 'Create a new order',
						action: 'Create a new order',
					},
					{
						name: 'Cancel Order',
						value: 'cancelOrder',
						description: 'Cancel an order',
						action: 'Cancel an order',
					},
					{
						name: 'Get Bars',
						value: 'getBars',
						description: 'Get historical bar data',
						action: 'Get historical bar data',
					},
					{
						name: 'Get Latest Bar',
						value: 'getLatestBar',
						description: 'Get latest bar data for symbols',
						action: 'Get latest bar data',
					},
					{
						name: 'Get Trades',
						value: 'getTrades',
						description: 'Get recent trades',
						action: 'Get recent trades',
					},
					{
						name: 'Get Quotes',
						value: 'getQuotes',
						description: 'Get recent quotes',
						action: 'Get recent quotes',
					},
				],
				default: 'getAccount',
			},
			{
				displayName: 'Symbol',
				name: 'symbol',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['createOrder', 'getBars', 'getLatestBar', 'getTrades', 'getQuotes'],
					},
				},
				default: '',
				required: true,
				description: 'Trading symbol (e.g., AAPL, TSLA)',
			},
			{
				displayName: 'Symbols',
				name: 'symbols',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getLatestBar'],
					},
				},
				default: '',
				description: 'Comma-separated list of symbols (e.g., AAPL,TSLA)',
			},
			{
				displayName: 'Order Type',
				name: 'orderType',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['createOrder'],
					},
				},
				options: [
					{
						name: 'Market',
						value: 'market',
					},
					{
						name: 'Limit',
						value: 'limit',
					},
					{
						name: 'Stop',
						value: 'stop',
					},
					{
						name: 'Stop Limit',
						value: 'stop_limit',
					},
				],
				default: 'market',
				required: true,
			},
			{
				displayName: 'Side',
				name: 'side',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['createOrder'],
					},
				},
				options: [
					{
						name: 'Buy',
						value: 'buy',
					},
					{
						name: 'Sell',
						value: 'sell',
					},
				],
				default: 'buy',
				required: true,
			},
			{
				displayName: 'Quantity',
				name: 'qty',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['createOrder'],
					},
				},
				default: 1,
				required: true,
				description: 'Number of shares',
			},
			{
				displayName: 'Limit Price',
				name: 'limitPrice',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['createOrder'],
						orderType: ['limit', 'stop_limit'],
					},
				},
				default: 0,
				description: 'Limit price',
			},
			{
				displayName: 'Stop Price',
				name: 'stopPrice',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['createOrder'],
						orderType: ['stop', 'stop_limit'],
					},
				},
				default: 0,
				description: 'Stop price',
			},
			{
				displayName: 'Time In Force',
				name: 'timeInForce',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['createOrder'],
					},
				},
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: 'GTC (Good Till Cancel)',
						value: 'gtc',
					},
					{
						name: 'OPG (Opening)',
						value: 'opg',
					},
					{
						name: 'CLS (Closing)',
						value: 'cls',
					},
					{
						name: 'IOC (Immediate Or Cancel)',
						value: 'ioc',
					},
					{
						name: 'FOK (Fill Or Kill)',
						value: 'fok',
					},
				],
				default: 'day',
				required: true,
			},
			{
				displayName: 'Order ID',
				name: 'orderId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['cancelOrder'],
					},
				},
				default: '',
				required: true,
				description: 'Order ID to cancel',
			},
			{
				displayName: 'Timeframe',
				name: 'timeframe',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['getBars'],
					},
				},
				options: [
					{
						name: '1 Minute',
						value: '1Min',
					},
					{
						name: '5 Minutes',
						value: '5Min',
					},
					{
						name: '15 Minutes',
						value: '15Min',
					},
					{
						name: '30 Minutes',
						value: '30Min',
					},
					{
						name: '1 Hour',
						value: '1Hour',
					},
					{
						name: '1 Day',
						value: '1Day',
					},
				],
				default: '1Day',
				required: true,
			},
			{
				displayName: 'Start Date',
				name: 'start',
				type: 'dateTime',
				displayOptions: {
					show: {
						operation: ['getBars', 'getTrades', 'getQuotes'],
					},
				},
				default: '',
				description: 'Start date/time (ISO 8601 format)',
			},
			{
				displayName: 'End Date',
				name: 'end',
				type: 'dateTime',
				displayOptions: {
					show: {
						operation: ['getBars', 'getTrades', 'getQuotes'],
					},
				},
				default: '',
				description: 'End date/time (ISO 8601 format)',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getBars', 'getOrders', 'getTrades', 'getQuotes'],
					},
				},
				default: 100,
				description: 'Maximum number of results',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				displayOptions: {
					show: {
						operation: ['getOrders'],
					},
				},
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Open',
						value: 'open',
					},
					{
						name: 'Closed',
						value: 'closed',
					},
				],
				default: 'all',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = (await this.getCredentials('alpacaApi')) as {
			apiKeyId: string;
			apiSecretKey: string;
			environment: string;
			baseUrl?: string;
		};

		const baseUrl =
			credentials.environment === 'live'
				? credentials.baseUrl || 'https://api.alpaca.markets'
				: credentials.baseUrl || 'https://paper-api.alpaca.markets';

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;

			let responseData;

			try {
				switch (operation) {
					case 'getAccount':
						responseData = await makeRequest.call(this, baseUrl, credentials, 'GET', '/v2/account');
						break;

					case 'getPositions':
						responseData = await makeRequest.call(this, baseUrl, credentials, 'GET', '/v2/positions');
						break;

					case 'getOrders':
						responseData = await getOrders.call(this, baseUrl, credentials, i);
						break;

					case 'createOrder':
						responseData = await createOrder.call(this, baseUrl, credentials, i);
						break;

					case 'cancelOrder':
						responseData = await cancelOrder.call(this, baseUrl, credentials, i);
						break;

					case 'getBars':
						responseData = await getBars.call(this, baseUrl, credentials, i);
						break;

					case 'getLatestBar':
						responseData = await getLatestBar.call(this, baseUrl, credentials, i);
						break;

					case 'getTrades':
						responseData = await getTrades.call(this, baseUrl, credentials, i);
						break;

					case 'getQuotes':
						responseData = await getQuotes.call(this, baseUrl, credentials, i);
						break;

					default:
						throw new Error(`Unknown operation: ${operation}`);
				}

				if (Array.isArray(responseData)) {
					returnData.push(
						...responseData.map((item) => ({
							json: item,
						})),
					);
				} else {
					returnData.push({
						json: responseData,
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

async function makeRequest(
	this: IExecuteFunctions,
	baseUrl: string,
	credentials: any,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: any,
): Promise<any> {
	const options = {
		method,
		url: `${baseUrl}${endpoint}`,
		headers: {
			'APCA-API-KEY-ID': credentials.apiKeyId,
			'APCA-API-SECRET-KEY': credentials.apiSecretKey,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	if (body) {
		(options as any).body = body;
	}

	return await this.helpers.httpRequest(options);
}

async function getOrders(
	this: IExecuteFunctions,
	baseUrl: string,
	credentials: any,
	itemIndex: number,
): Promise<any> {
	const status = this.getNodeParameter('status', itemIndex) as string;
	const limit = this.getNodeParameter('limit', itemIndex) as number;

	let endpoint = '/v2/orders?';
	if (status !== 'all') {
		endpoint += `status=${status}&`;
	}
	endpoint += `limit=${limit}`;

	return await makeRequest.call(this, baseUrl, credentials, 'GET', endpoint);
}

async function createOrder(
	this: IExecuteFunctions,
	baseUrl: string,
	credentials: any,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex) as string;
	const orderType = this.getNodeParameter('orderType', itemIndex) as string;
	const side = this.getNodeParameter('side', itemIndex) as string;
	const qty = this.getNodeParameter('qty', itemIndex) as number;
	const timeInForce = this.getNodeParameter('timeInForce', itemIndex) as string;

	const body: any = {
		symbol,
		side,
		type: orderType,
		qty: qty.toString(),
		time_in_force: timeInForce,
	};

	if (orderType === 'limit' || orderType === 'stop_limit') {
		const limitPrice = this.getNodeParameter('limitPrice', itemIndex) as number;
		body.limit_price = limitPrice.toString();
	}

	if (orderType === 'stop' || orderType === 'stop_limit') {
		const stopPrice = this.getNodeParameter('stopPrice', itemIndex) as number;
		body.stop_price = stopPrice.toString();
	}

	return await makeRequest.call(this, baseUrl, credentials, 'POST', '/v2/orders', body);
}

async function cancelOrder(
	this: IExecuteFunctions,
	baseUrl: string,
	credentials: any,
	itemIndex: number,
): Promise<any> {
	const orderId = this.getNodeParameter('orderId', itemIndex) as string;
	return await makeRequest.call(this, baseUrl, credentials, 'DELETE', `/v2/orders/${orderId}`);
}

async function getBars(
	this: IExecuteFunctions,
	baseUrl: string,
	credentials: any,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex) as string;
	const timeframe = this.getNodeParameter('timeframe', itemIndex) as string;
	const start = this.getNodeParameter('start', itemIndex) as string;
	const end = this.getNodeParameter('end', itemIndex) as string;
	const limit = this.getNodeParameter('limit', itemIndex) as number;

	let endpoint = `/v2/stocks/${symbol}/bars?timeframe=${timeframe}`;

	if (start) {
		endpoint += `&start=${new Date(start).toISOString()}`;
	}
	if (end) {
		endpoint += `&end=${new Date(end).toISOString()}`;
	}
	endpoint += `&limit=${limit}`;

	const response = await makeRequest.call(this, baseUrl, credentials, 'GET', endpoint);
	return response.bars || [];
}

async function getLatestBar(
	this: IExecuteFunctions,
	baseUrl: string,
	credentials: any,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex, '') as string;
	const symbols = this.getNodeParameter('symbols', itemIndex, '') as string;

	let symbolsList: string[] = [];
	if (symbols) {
		symbolsList = symbols.split(',').map((s) => s.trim());
	} else if (symbol) {
		symbolsList = [symbol];
	} else {
		throw new Error('Either symbol or symbols parameter is required');
	}

	const endpoint = `/v2/stocks/bars/latest?symbols=${symbolsList.join(',')}`;
	const response = await makeRequest.call(this, baseUrl, credentials, 'GET', endpoint);
	return response;
}

async function getTrades(
	this: IExecuteFunctions,
	baseUrl: string,
	credentials: any,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex) as string;
	const start = this.getNodeParameter('start', itemIndex) as string;
	const end = this.getNodeParameter('end', itemIndex) as string;
	const limit = this.getNodeParameter('limit', itemIndex) as number;

	let endpoint = `/v2/stocks/${symbol}/trades?`;

	if (start) {
		endpoint += `start=${new Date(start).toISOString()}&`;
	}
	if (end) {
		endpoint += `end=${new Date(end).toISOString()}&`;
	}
	endpoint += `limit=${limit}`;

	const response = await makeRequest.call(this, baseUrl, credentials, 'GET', endpoint);
	return response.trades || [];
}

async function getQuotes(
	this: IExecuteFunctions,
	baseUrl: string,
	credentials: any,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex) as string;
	const start = this.getNodeParameter('start', itemIndex) as string;
	const end = this.getNodeParameter('end', itemIndex) as string;
	const limit = this.getNodeParameter('limit', itemIndex) as number;

	let endpoint = `/v2/stocks/${symbol}/quotes?`;

	if (start) {
		endpoint += `start=${new Date(start).toISOString()}&`;
	}
	if (end) {
		endpoint += `end=${new Date(end).toISOString()}&`;
	}
	endpoint += `limit=${limit}`;

	const response = await makeRequest.call(this, baseUrl, credentials, 'GET', endpoint);
	return response.quotes || [];
}

