const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express(); 

app.use('/api', createProxyMiddleware({
  target: 'http://backend:8080/api',
  changeOrigin: true
}))

app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
app.use(express.static('dist'))

app.listen(5000, 
() => console.log(`[bootup]: Server is running at port: 5000`));
