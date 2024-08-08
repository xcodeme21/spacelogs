import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify } from 'edge-iconify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//const edge = new Edge({ cache: env.get('NODE_ENV') === 'production' })

/**
 * Register a plugin
 */
edge.use(edgeIconify)

/**
 * Define a global property
 */
edge.global('appUrl', env.get('APP_URL'))

edge.mount(join(__dirname, '..', 'resources', 'views'))

export default edge
