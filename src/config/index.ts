import { Config } from './default'

let configs = {
    default: require('./default'),
    production: require('./production')
}

let env = process.env.NODE_ENV

let ConfigImpl = configs[env] || configs.default

export default new ConfigImpl.Config() as Config