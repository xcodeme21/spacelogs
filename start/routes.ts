/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import HomeController from '#controllers/home_controller'

router.get('/', [HomeController, 'index'])
router.get('/api/oaa-queryimei', [HomeController, 'queryImei'])
router.get('/api/oaa-checkstock', [HomeController, 'checkStock'])
router.get('/api/opp-item', [HomeController, 'oppItem'])
router.get('/api/opp-checkout', [HomeController, 'oppCheckout'])
router.get('/api/kafka', [HomeController, 'kafka'])

// router.on('/').render('pages/home')
