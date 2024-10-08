﻿# ViewChart - Stock Market Live Tracker with WebSocket, Candlestick Charts, and News Fetching

This project is a real-time stock market tracker that displays live stock price updates using WebSocket.io. It includes a candlestick chart that updates every few seconds, built with the `ReactApexChart` plugin. Additionally, the project fetches the latest stock-related news from the Finnhub API, allowing users to stay informed about market trends.

## Features

- **Live Stock Price Updates**: Real-time stock price updates using WebSocket.
- **Candlestick Chart**: Displays stock price movements using the ReactApexChart plugin.
- **Stock Search**: Search for specific stocks and view detailed stock information.
- **Favorite Stocks**: Add stocks to favorites for quick tracking.
- **News Fetching**: Retrieves the latest stock-related news for each stock symbol.
  
## Tech Stack

- **Frontend**: React, ReactApexChart for candlestick charts
- **Backend**: Node.js, Express, Socket.IO
- **API**: Finnhub API for stock data and news
- **WebSocket**: Socket.IO for real-time communication
- **Database**: MongoDB (for user and favorite stock data)
- **Styling**: Tailwind CSS

