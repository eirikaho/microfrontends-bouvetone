module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3002, 
    https: false,
    hotOnly: false,
  }
}
