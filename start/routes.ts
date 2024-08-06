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
import EcommercesController from '#controllers/ecommerces_controller'

router.get('/', [HomeController, 'index'])
router.get('/api/oaa-queryimei', [HomeController, 'queryImei'])
router.get('/api/oaa-checkstock', [HomeController, 'checkStock'])
router.get('/api/opp-item', [HomeController, 'oppItem'])
router.get('/api/opp-checkout', [HomeController, 'oppCheckout'])
router.get('/api/kafka', [HomeController, 'kafka'])


router.get('/e-commerce', [EcommercesController, 'index'])
// router.get('/api/e-commerce/oaa-queryimei', [EcommercesController, 'queryImei'])
// router.get('/api/e-commerce/oaa-checkstock', [EcommercesController, 'checkStock'])
// router.get('/api/e-commerce/opp-item', [EcommercesController, 'oppItem'])
// router.get('/api/e-commerce/opp-checkout', [EcommercesController, 'oppCheckout'])
// router.get('/api/e-commerce/kafka', [EcommercesController, 'kafka'])

// router.on('/').render('pages/home')
