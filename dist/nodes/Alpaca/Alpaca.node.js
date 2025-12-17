"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alpaca = void 0;
const alpaca_trade_api_1 = __importDefault(require("@alpacahq/alpaca-trade-api"));
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = (await this.getCredentials('alpacaApi'));
        // 初始化 Alpaca 客户端
        const alpaca = getAlpacaClient(credentials);
        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i);
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
async function getAccount(alpaca) {
    try {
        return await alpaca.getAccount();
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get account: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        throw enhancedError;
    }
}
async function getPositions(alpaca) {
    try {
        return await alpaca.getPositions();
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get positions: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        throw enhancedError;
    }
}
async function getOrders(alpaca, itemIndex) {
    const status = this.getNodeParameter('status', itemIndex);
    const limit = this.getNodeParameter('limit', itemIndex);
    try {
        const params = {
            limit: limit,
        };
        if (status !== 'all') {
            params.status = status;
        }
        return await alpaca.getOrders(params);
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get orders: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        throw enhancedError;
    }
}
async function createOrder(alpaca, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex);
    const orderType = this.getNodeParameter('orderType', itemIndex);
    const side = this.getNodeParameter('side', itemIndex);
    const qty = this.getNodeParameter('qty', itemIndex);
    const timeInForce = this.getNodeParameter('timeInForce', itemIndex);
    const orderParams = {
        symbol,
        side,
        type: orderType,
        qty: qty,
        time_in_force: timeInForce,
    };
    if (orderType === 'limit' || orderType === 'stop_limit') {
        const limitPrice = this.getNodeParameter('limitPrice', itemIndex);
        orderParams.limit_price = limitPrice;
    }
    if (orderType === 'stop' || orderType === 'stop_limit') {
        const stopPrice = this.getNodeParameter('stopPrice', itemIndex);
        orderParams.stop_price = stopPrice;
    }
    try {
        return await alpaca.createOrder(orderParams);
    }
    catch (error) {
        const enhancedError = new Error(`Failed to create order: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        throw enhancedError;
    }
}
async function cancelOrder(alpaca, itemIndex) {
    const orderId = this.getNodeParameter('orderId', itemIndex);
    try {
        return await alpaca.cancelOrder(orderId);
    }
    catch (error) {
        const enhancedError = new Error(`Failed to cancel order: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        enhancedError.orderId = orderId;
        throw enhancedError;
    }
}
async function getBars(alpaca, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex);
    const timeframe = this.getNodeParameter('timeframe', itemIndex);
    const start = this.getNodeParameter('start', itemIndex);
    const end = this.getNodeParameter('end', itemIndex);
    const limit = this.getNodeParameter('limit', itemIndex);
    try {
        const params = {
            symbols: [symbol],
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
        const bars = [];
        for await (const bar of barsGenerator) {
            bars.push(bar);
        }
        return bars;
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get bars: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        throw enhancedError;
    }
}
async function getLatestBar(alpaca, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex, '');
    const symbols = this.getNodeParameter('symbols', itemIndex, '');
    let symbolsList = [];
    if (symbols) {
        symbolsList = symbols.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    }
    else if (symbol) {
        symbolsList = [symbol];
    }
    else {
        throw new Error('Either symbol or symbols parameter is required');
    }
    try {
        const bars = {};
        for (const sym of symbolsList) {
            const bar = await alpaca.getLatestBar(sym);
            if (bar) {
                bars[sym] = bar;
            }
        }
        return bars;
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get latest bars: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        throw enhancedError;
    }
}
async function getTrades(alpaca, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex);
    const start = this.getNodeParameter('start', itemIndex);
    const end = this.getNodeParameter('end', itemIndex);
    const limit = this.getNodeParameter('limit', itemIndex);
    try {
        const params = {
            symbols: [symbol],
            limit: limit,
        };
        if (start) {
            params.start = new Date(start).toISOString();
        }
        if (end) {
            params.end = new Date(end).toISOString();
        }
        const tradesGenerator = alpaca.getTradesV2(symbol, params);
        const trades = [];
        for await (const trade of tradesGenerator) {
            trades.push(trade);
        }
        return trades;
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get trades: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        throw enhancedError;
    }
}
async function getQuotes(alpaca, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex);
    const start = this.getNodeParameter('start', itemIndex);
    const end = this.getNodeParameter('end', itemIndex);
    const limit = this.getNodeParameter('limit', itemIndex);
    try {
        const params = {
            symbols: [symbol],
            limit: limit,
        };
        if (start) {
            params.start = new Date(start).toISOString();
        }
        if (end) {
            params.end = new Date(end).toISOString();
        }
        const quotesGenerator = alpaca.getQuotesV2(symbol, params);
        const quotes = [];
        for await (const quote of quotesGenerator) {
            quotes.push(quote);
        }
        return quotes;
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get quotes: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        throw enhancedError;
    }
}
function getAlpacaClient(credentials) {
    return new alpaca_trade_api_1.default({
        keyId: credentials.apiKeyId,
        secretKey: credentials.apiSecretKey,
        paper: credentials.environment === 'paper',
        baseUrl: credentials.baseUrl || undefined,
    });
}
async function getOrderById(alpaca, itemIndex) {
    const orderId = this.getNodeParameter('orderIdForGet', itemIndex);
    try {
        const order = await alpaca.getOrder(orderId);
        return order;
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get order: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        enhancedError.orderId = orderId;
        throw enhancedError;
    }
}
async function getNews(alpaca, itemIndex) {
    const symbol = this.getNodeParameter('symbol', itemIndex, '');
    const symbols = this.getNodeParameter('newsSymbols', itemIndex, '');
    const startDate = this.getNodeParameter('startDate', itemIndex, '');
    const endDate = this.getNodeParameter('endDate', itemIndex, '');
    const limit = this.getNodeParameter('newsLimit', itemIndex, 50);
    try {
        const params = {
            limit: limit,
        };
        // 处理symbols参数
        let symbolsList = [];
        if (symbols) {
            symbolsList = symbols.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
        }
        else if (symbol) {
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
    }
    catch (error) {
        const enhancedError = new Error(`Failed to get news: ${error.message || String(error)}`);
        enhancedError.statusCode = error.statusCode || error.status;
        enhancedError.response = error.response || error.body;
        enhancedError.params = { symbol, symbols, startDate, endDate, limit };
        throw enhancedError;
    }
}
