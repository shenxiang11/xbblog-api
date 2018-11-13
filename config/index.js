const ENV = process.env.NODE_ENV

const config = ENV === 'development' ? require('./dev.config').default : require('./prod.config').default

export default config
