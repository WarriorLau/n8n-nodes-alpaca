"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alpaca = void 0;
class Alpaca {
    constructor() {
        this.description = {
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = (await this.getCredentials('alpacaApi'));
        const baseUrl = credentials.environment === 'live'
            ? credentials.baseUrl || 'https://api.alpaca.markets'
            : credentials.baseUrl || 'https://paper-api.alpaca.markets';
        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i);
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
                    returnData.push(...responseData.map((item) => ({
                        json: item,
                    })));
                }
                else {
                    returnData.push({
                        json: responseData,
                    });
                }
            }
            catch (error) {
                const errorOutput = {
                    error: true,
                    message: error instanceof Error ? error.message : String(error),
                };
                // 添加详细的错误信息
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
                if (this.continueOnFail()) {
                    returnData.push({
                        json: errorOutput,
                    });
                    continue;
                }
                // 格式化错误消息以便更好地显示
                let errorMessage = errorOutput.message;
                if (error.statusCode) {
                    errorMessage = `${errorMessage} (Status: ${error.statusCode})`;
                }
                if (error.endpoint) {
                    errorMessage = `${errorMessage} - Endpoint: ${error.method} ${error.endpoint}`;
                }
                throw new Error(errorMessage);
            }
        }
        return [returnData];
    }
}
exports.Alpaca = Alpaca;
async function makeRequest(baseUrl, credentials, method, endpoint, body) {
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
        options.body = body;
    }
    try {
        const response = await this.helpers.httpRequest(options);
        return response;
    }
    catch (error) {
        // n8n的httpRequest在遇到HTTP错误时会抛出异常
        // 错误对象中通常包含response字段，里面有statusCode和body
        let statusCode;
        let responseBody;
        let errorMessage = error.message || 'Unknown error';
        // 尝试从错误对象中提取HTTP响应信息
        if (error.response) {
            // 标准HTTP错误响应结构
            statusCode = error.response.statusCode || error.response.status;
            responseBody = error.response.body;
        }
        else if (error.statusCode) {
            // 错误对象直接包含statusCode
            statusCode = error.statusCode;
            responseBody = error.response || error.body;
        }
        else if (error.status) {
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
                }
                catch {
                    errorMessage = responseBody.substring(0, 200);
                }
            }
            else if (typeof responseBody === 'object') {
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
        enhancedError.statusCode = statusCode;
        enhancedError.response = responseBody;
        enhancedError.endpoint = endpoint;
        enhancedError.method = method;
        enhancedError.url = `${baseUrl}${endpoint}`;
        enhancedError.originalError = error;
        // 如果是网络错误
        if (error.code && (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND')) {
            enhancedError.networkError = true;
        }
        throw enhancedError;
    }
}
async function getOrders(baseUrl, credentials, itemIndex) {
    const status = this.getNodeParameter('status', itemIndex);
    const limit = this.getNodeParameter('limit', itemIndex);
    let endpoint = '/v2/orders?';
    if (status !== 'all') {
        endpoint += `status=${status}&`;
    }
    endpoint += `limit=${limit}`;
    return await makeRequest.call(this, baseUrl, credentials, 'GET', endpoint);
}
async function createOrder(baseUrl, credentials, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex);
    const orderType = this.getNodeParameter('orderType', itemIndex);
    const side = this.getNodeParameter('side', itemIndex);
    const qty = this.getNodeParameter('qty', itemIndex);
    const timeInForce = this.getNodeParameter('timeInForce', itemIndex);
    const body = {
        symbol,
        side,
        type: orderType,
        qty: qty.toString(),
        time_in_force: timeInForce,
    };
    if (orderType === 'limit' || orderType === 'stop_limit') {
        const limitPrice = this.getNodeParameter('limitPrice', itemIndex);
        body.limit_price = limitPrice.toString();
    }
    if (orderType === 'stop' || orderType === 'stop_limit') {
        const stopPrice = this.getNodeParameter('stopPrice', itemIndex);
        body.stop_price = stopPrice.toString();
    }
    return await makeRequest.call(this, baseUrl, credentials, 'POST', '/v2/orders', body);
}
async function cancelOrder(baseUrl, credentials, itemIndex) {
    const orderId = this.getNodeParameter('orderId', itemIndex);
    return await makeRequest.call(this, baseUrl, credentials, 'DELETE', `/v2/orders/${orderId}`);
}
async function getBars(baseUrl, credentials, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex);
    const timeframe = this.getNodeParameter('timeframe', itemIndex);
    const start = this.getNodeParameter('start', itemIndex);
    const end = this.getNodeParameter('end', itemIndex);
    const limit = this.getNodeParameter('limit', itemIndex);
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
async function getLatestBar(baseUrl, credentials, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex, '');
    const symbols = this.getNodeParameter('symbols', itemIndex, '');
    let symbolsList = [];
    if (symbols) {
        symbolsList = symbols.split(',').map((s) => s.trim());
    }
    else if (symbol) {
        symbolsList = [symbol];
    }
    else {
        throw new Error('Either symbol or symbols parameter is required');
    }
    const endpoint = `/v2/stocks/bars/latest?symbols=${symbolsList.join(',')}`;
    const response = await makeRequest.call(this, baseUrl, credentials, 'GET', endpoint);
    return response;
}
async function getTrades(baseUrl, credentials, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex);
    const start = this.getNodeParameter('start', itemIndex);
    const end = this.getNodeParameter('end', itemIndex);
    const limit = this.getNodeParameter('limit', itemIndex);
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
async function getQuotes(baseUrl, credentials, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex);
    const start = this.getNodeParameter('start', itemIndex);
    const end = this.getNodeParameter('end', itemIndex);
    const limit = this.getNodeParameter('limit', itemIndex);
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
