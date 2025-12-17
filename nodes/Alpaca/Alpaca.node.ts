import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
} from 'n8n-workflow';

import AlpacaClient from '@alpacahq/alpaca-trade-api';

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
					{
						name: 'Get Order By ID',
						value: 'getOrderById',
						description: 'Get order by order ID',
						action: 'Get order by ID',
					},
					{
						name: 'Get News',
						value: 'getNews',
						description: 'Get news articles',
						action: 'Get news articles',
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
						operation: ['createOrder', 'getBars', 'getLatestBar', 'getTrades', 'getQuotes', 'getNews'],
					},
				},
				default: '',
				required: true,
				description: 'Trading symbol (e.g., AAPL, TSLA)',
			},
			{
				displayName: 'Order ID',
				name: 'orderIdForGet',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getOrderById'],
					},
				},
				default: '',
				required: true,
				description: 'Order ID to retrieve',
			},
			{
				displayName: 'Symbols',
				name: 'newsSymbols',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getNews'],
					},
				},
				default: '',
				description: 'Comma-separated list of symbols (e.g., AAPL,TSLA). Leave empty for all symbols.',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				displayOptions: {
					show: {
						operation: ['getNews'],
					},
				},
				default: '',
				description: 'Start date for news (ISO 8601 format)',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				displayOptions: {
					show: {
						operation: ['getNews'],
					},
				},
				default: '',
				description: 'End date for news (ISO 8601 format)',
			},
			{
				displayName: 'Limit',
				name: 'newsLimit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getNews'],
					},
				},
				default: 50,
				description: 'Maximum number of news articles to return',
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
			marketDataBaseUrl?: string;
		};

		// 初始化 Alpaca 客户端
		const alpaca = getAlpacaClient(credentials);

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;

			let responseData;

			try {
				switch (operation) {
					case 'getAccount':
						responseData = await getAccount.call(this, alpaca);
						break;

					case 'getPositions':
						responseData = await getPositions.call(this, alpaca);
						break;

					case 'getOrders':
						responseData = await getOrders.call(this, alpaca, i);
						break;

					case 'createOrder':
						responseData = await createOrder.call(this, alpaca, i);
						break;

					case 'cancelOrder':
						responseData = await cancelOrder.call(this, alpaca, i);
						break;

					case 'getBars':
						responseData = await getBars.call(this, alpaca, i);
						break;

					case 'getLatestBar':
						responseData = await getLatestBar.call(this, alpaca, i);
						break;

					case 'getTrades':
						responseData = await getTrades.call(this, alpaca, i);
						break;

					case 'getQuotes':
						responseData = await getQuotes.call(this, alpaca, i);
						break;

					case 'getOrderById':
						responseData = await getOrderById.call(this, alpaca, i);
						break;

					case 'getNews':
						responseData = await getNews.call(this, alpaca, i);
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
			} catch (error: any) {
				// 构建详细的错误输出对象，包含所有 Alpaca API 返回的字段
				const errorOutput: any = {
					error: true,
					message: error instanceof Error ? error.message : String(error),
				};
				
				// 复制错误对象的所有属性到 errorOutput
				// 这样可以将 code、existing_order_id、reject_reason 等所有字段都包含进来
				if (error && typeof error === 'object') {
					Object.keys(error).forEach(key => {
						// 跳过一些内部属性，但保留所有有用的错误信息
						if (key !== 'stack' && key !== 'name') {
							errorOutput[key] = (error as any)[key];
						}
					});
				}
				
				// 确保这些关键字段存在
				if (error.statusCode) {
					errorOutput.statusCode = error.statusCode;
				}
				if (error.endpoint) {
					errorOutput.endpoint = error.endpoint;
				}
				if (error.method) {
					errorOutput.method = error.method;
				}
				if (error.response) {
					errorOutput.response = error.response;
				}
				if (error.url) {
					errorOutput.url = error.url;
				}
				
				// 如果 continueOnFail 启用，返回错误对象而不是抛出异常
				if (this.continueOnFail()) {
					returnData.push({
						json: errorOutput,
					});
					continue;
				}
				
				// 构建详细的错误消息
				let errorMessage = errorOutput.message || 'Unknown error';
				
				// 添加状态码
				if (errorOutput.statusCode) {
					errorMessage = `${errorMessage} (HTTP ${errorOutput.statusCode})`;
				}
				
				// 添加错误代码（如果有）
				if (errorOutput.code) {
					errorMessage = `${errorMessage} [Code: ${errorOutput.code}]`;
				}
				
				// 添加拒绝原因（如果有）
				if (errorOutput.reject_reason) {
					errorMessage = `${errorMessage} [Reason: ${errorOutput.reject_reason}]`;
				}
				
				// 添加现有订单ID（如果有）
				if (errorOutput.existing_order_id) {
					errorMessage = `${errorMessage} [Existing Order ID: ${errorOutput.existing_order_id}]`;
				}
				
				// 添加端点信息（如果有）
				if (errorOutput.endpoint) {
					errorMessage = `${errorMessage} - Endpoint: ${errorOutput.method || 'GET'} ${errorOutput.endpoint}`;
				}
				
				// 创建新的错误对象，保留所有原始信息
				const finalError = new Error(errorMessage);
				// 将 errorOutput 的所有属性复制到最终错误对象
				Object.keys(errorOutput).forEach(key => {
					(finalError as any)[key] = errorOutput[key];
				});
				
				throw finalError;
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
	const options: any = {
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
		options.body = body;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response;
	} catch (error: any) {
		// n8n的httpRequest在遇到HTTP错误时会抛出异常
		// 错误对象中通常包含response字段，里面有statusCode和body
		let statusCode: number | undefined;
		let responseBody: any;
		let errorMessage = error.message || 'Unknown error';

		// 尝试从错误对象中提取HTTP响应信息
		if (error.response) {
			// 标准HTTP错误响应结构
			statusCode = error.response.statusCode || error.response.status;
			responseBody = error.response.body;
		} else if (error.statusCode) {
			// 错误对象直接包含statusCode
			statusCode = error.statusCode;
			responseBody = error.response || error.body;
		} else if (error.status) {
			// 某些情况下使用status字段
			statusCode = error.status;
			responseBody = error.body;
		}

		// 如果有响应体，尝试提取Alpaca API的错误消息
		if (responseBody) {
			if (typeof responseBody === 'string') {
				try {
					const parsed = JSON.parse(responseBody);
					errorMessage = parsed.message || parsed.error || parsed.msg || errorMessage;
					responseBody = parsed;
				} catch {
					errorMessage = responseBody.substring(0, 200);
				}
			} else if (typeof responseBody === 'object') {
				// 从响应对象中提取错误消息
				errorMessage = responseBody.message || 
				              responseBody.error || 
				              responseBody.msg || 
				              responseBody.detail ||
				              errorMessage;
			}
		}

		// 构建详细的错误信息
		let detailedMessage = `Alpaca API Error`;
		if (statusCode) {
			detailedMessage += ` (HTTP ${statusCode})`;
		}
		detailedMessage += `: ${errorMessage}`;

		const enhancedError = new Error(detailedMessage);
		(enhancedError as any).statusCode = statusCode;
		(enhancedError as any).response = responseBody;
		(enhancedError as any).endpoint = endpoint;
		(enhancedError as any).method = method;
		(enhancedError as any).url = `${baseUrl}${endpoint}`;
		(enhancedError as any).originalError = error;

		// 如果是网络错误
		if (error.code && (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND')) {
			(enhancedError as any).networkError = true;
		}

		throw enhancedError;
	}
}

async function getAccount(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
): Promise<any> {
	try {
		return await alpaca.getAccount();
	} catch (error: any) {
		throw handleAlpacaError(error, 'get account');
	}
}

async function getPositions(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
): Promise<any> {
	try {
		return await alpaca.getPositions();
	} catch (error: any) {
		throw handleAlpacaError(error, 'get positions');
	}
}

async function getOrders(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const status = this.getNodeParameter('status', itemIndex) as string;
	const limit = this.getNodeParameter('limit', itemIndex) as number;

	try {
		const params: any = {
			limit: limit,
			status: status, // 显式传递 status，包括 'all'
		};

		return await alpaca.getOrders(params);
	} catch (error: any) {
		throw handleAlpacaError(error, 'get orders');
	}
}

async function createOrder(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex) as string;
	const orderType = this.getNodeParameter('orderType', itemIndex) as string;
	const side = this.getNodeParameter('side', itemIndex) as string;
	const qty = this.getNodeParameter('qty', itemIndex) as number;
	const timeInForce = this.getNodeParameter('timeInForce', itemIndex) as string;

	const orderParams: any = {
		symbol,
		side,
		type: orderType,
		qty: qty,
		time_in_force: timeInForce,
	};

	if (orderType === 'limit' || orderType === 'stop_limit') {
		const limitPrice = this.getNodeParameter('limitPrice', itemIndex) as number;
		orderParams.limit_price = limitPrice;
	}

	if (orderType === 'stop' || orderType === 'stop_limit') {
		const stopPrice = this.getNodeParameter('stopPrice', itemIndex) as number;
		orderParams.stop_price = stopPrice;
	}

	try {
		return await alpaca.createOrder(orderParams);
	} catch (error: any) {
		throw handleAlpacaError(error, 'create order');
	}
}

async function cancelOrder(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const orderId = this.getNodeParameter('orderId', itemIndex) as string;
	
	try {
		return await alpaca.cancelOrder(orderId);
	} catch (error: any) {
		const enhancedError = handleAlpacaError(error, 'cancel order');
		(enhancedError as any).orderId = orderId;
		throw enhancedError;
	}
}

async function getBars(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex) as string;
	const timeframe = this.getNodeParameter('timeframe', itemIndex) as string;
	const start = this.getNodeParameter('start', itemIndex) as string;
	const end = this.getNodeParameter('end', itemIndex) as string;
	const limit = this.getNodeParameter('limit', itemIndex) as number;

	try {
		// getBarsV2 的第一个参数是 symbol，第二个参数是 options
		// options 中不应该包含 symbols，因为 symbol 已经作为第一个参数传递了
		const params: any = {
			timeframe: timeframe,
			limit: limit,
		};

		if (start) {
			params.start = new Date(start).toISOString();
		}
		if (end) {
			params.end = new Date(end).toISOString();
		}

		const barsGenerator = alpaca.getBarsV2(symbol, params);
		const bars: any[] = [];
		for await (const bar of barsGenerator) {
			bars.push(bar);
		}
		return bars;
	} catch (error: any) {
		throw handleAlpacaError(error, 'get bars');
	}
}

async function getLatestBar(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex, '') as string;
	const symbols = this.getNodeParameter('symbols', itemIndex, '') as string;

	let symbolsList: string[] = [];
	if (symbols) {
		symbolsList = symbols.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
	} else if (symbol) {
		symbolsList = [symbol];
	} else {
		throw new Error('Either symbol or symbols parameter is required');
	}

	try {
		const bars: any = {};
		for (const sym of symbolsList) {
			const bar = await alpaca.getLatestBar(sym);
			if (bar) {
				bars[sym] = bar;
			}
		}
		return bars;
	} catch (error: any) {
		throw handleAlpacaError(error, 'get latest bars');
	}
}

async function getTrades(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex) as string;
	const start = this.getNodeParameter('start', itemIndex) as string;
	const end = this.getNodeParameter('end', itemIndex) as string;
	const limit = this.getNodeParameter('limit', itemIndex) as number;

	try {
		// getTradesV2 的第一个参数是 symbol，第二个参数是 options
		// options 中不应该包含 symbols，因为 symbol 已经作为第一个参数传递了
		const params: any = {
			limit: limit,
		};

		if (start) {
			params.start = new Date(start).toISOString();
		}
		if (end) {
			params.end = new Date(end).toISOString();
		}

		const tradesGenerator = alpaca.getTradesV2(symbol, params);
		const trades: any[] = [];
		for await (const trade of tradesGenerator) {
			trades.push(trade);
		}
		return trades;
	} catch (error: any) {
		throw handleAlpacaError(error, 'get trades');
	}
}

async function getQuotes(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex) as string;
	const start = this.getNodeParameter('start', itemIndex) as string;
	const end = this.getNodeParameter('end', itemIndex) as string;
	const limit = this.getNodeParameter('limit', itemIndex) as number;

	try {
		// getQuotesV2 的第一个参数是 symbol，第二个参数是 options
		// options 中不应该包含 symbols，因为 symbol 已经作为第一个参数传递了
		const params: any = {
			limit: limit,
		};

		if (start) {
			params.start = new Date(start).toISOString();
		}
		if (end) {
			params.end = new Date(end).toISOString();
		}

		const quotesGenerator = alpaca.getQuotesV2(symbol, params);
		const quotes: any[] = [];
		for await (const quote of quotesGenerator) {
			quotes.push(quote);
		}
		return quotes;
	} catch (error: any) {
		throw handleAlpacaError(error, 'get quotes');
	}
}

/**
 * 统一的 Alpaca API 错误处理函数
 * 从 SDK 错误中提取所有详细信息，包括 code、message、existing_order_id、reject_reason 等
 */
function handleAlpacaError(error: any, operation: string): Error {
	// 初始化增强错误对象
	const enhancedError: any = new Error();
	
	// 基础错误消息
	let errorMessage = error.message || String(error);
	
	// 提取状态码
	let statusCode: number | undefined;
	if (error.statusCode) {
		statusCode = error.statusCode;
	} else if (error.status) {
		statusCode = error.status;
	} else if (error.response?.statusCode) {
		statusCode = error.response.statusCode;
	} else if (error.response?.status) {
		statusCode = error.response.status;
	}
	
	// 提取响应体（可能包含详细的错误信息）
	let responseBody: any = error.response || error.body || error.responseBody;
	
	// 如果 responseBody 是字符串，尝试解析为 JSON
	if (typeof responseBody === 'string') {
		try {
			responseBody = JSON.parse(responseBody);
		} catch {
			// 如果解析失败，保持为字符串
		}
	}
	
	// 从响应体中提取 Alpaca API 的详细错误信息
	if (responseBody && typeof responseBody === 'object') {
		// 提取所有可能的错误字段
		if (responseBody.message) {
			errorMessage = responseBody.message;
		} else if (responseBody.error) {
			errorMessage = responseBody.error;
		} else if (responseBody.msg) {
			errorMessage = responseBody.msg;
		}
		
		// 将响应体的所有字段附加到错误对象
		Object.keys(responseBody).forEach(key => {
			enhancedError[key] = responseBody[key];
		});
	}
	
	// 构建详细的错误消息
	let detailedMessage = `Failed to ${operation}`;
	if (statusCode) {
		detailedMessage += ` (HTTP ${statusCode})`;
	}
	detailedMessage += `: ${errorMessage}`;
	
	// 如果有额外的错误信息，添加到消息中
	if (enhancedError.code) {
		detailedMessage += ` [Code: ${enhancedError.code}]`;
	}
	if (enhancedError.reject_reason) {
		detailedMessage += ` [Reason: ${enhancedError.reject_reason}]`;
	}
	if (enhancedError.existing_order_id) {
		detailedMessage += ` [Existing Order ID: ${enhancedError.existing_order_id}]`;
	}
	
	enhancedError.message = detailedMessage;
	enhancedError.statusCode = statusCode;
	enhancedError.response = responseBody;
	enhancedError.originalError = error;
	
	// 保留原始错误的所有属性
	if (error.endpoint) {
		enhancedError.endpoint = error.endpoint;
	}
	if (error.method) {
		enhancedError.method = error.method;
	}
	if (error.url) {
		enhancedError.url = error.url;
	}
	
	return enhancedError as Error;
}

function getAlpacaClient(credentials: any): AlpacaClient {
	return new AlpacaClient({
		keyId: credentials.apiKeyId,
		secretKey: credentials.apiSecretKey,
		paper: credentials.environment === 'paper',
		baseUrl: credentials.baseUrl || undefined,
	});
}

async function getOrderById(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const orderId = this.getNodeParameter('orderIdForGet', itemIndex) as string;
	
	try {
		const order = await alpaca.getOrder(orderId);
		return order;
	} catch (error: any) {
		const enhancedError = handleAlpacaError(error, 'get order');
		(enhancedError as any).orderId = orderId;
		throw enhancedError;
	}
}

async function getNews(
	this: IExecuteFunctions,
	alpaca: AlpacaClient,
	itemIndex: number,
): Promise<any> {
	const symbol = this.getNodeParameter('symbol', itemIndex, '') as string;
	const symbols = this.getNodeParameter('newsSymbols', itemIndex, '') as string;
	const startDate = this.getNodeParameter('startDate', itemIndex, '') as string;
	const endDate = this.getNodeParameter('endDate', itemIndex, '') as string;
	const limit = this.getNodeParameter('newsLimit', itemIndex, 50) as number;

	try {
		const params: any = {
			limit: limit,
		};

		// 处理symbols参数
		let symbolsList: string[] = [];
		if (symbols) {
			symbolsList = symbols.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
		} else if (symbol) {
			symbolsList = [symbol];
		}
		
		if (symbolsList.length > 0) {
			params.symbols = symbolsList;
		}

		if (startDate) {
			params.start = new Date(startDate).toISOString();
		}
		if (endDate) {
			params.end = new Date(endDate).toISOString();
		}

		const news = await alpaca.getNews(params);
		return news;
	} catch (error: any) {
		const enhancedError = handleAlpacaError(error, 'get news');
		(enhancedError as any).params = { symbol, symbols, startDate, endDate, limit };
		throw enhancedError;
	}
}
