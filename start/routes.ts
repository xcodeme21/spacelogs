/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
'use strict'

import router from '@adonisjs/core/services/router'
import HomeController from '#controllers/home_controller'
import EcommercesController from '#controllers/ecommerces_controller'
import DealerPortalsController from '#controllers/dealer_portals_controller'
import ModalsController from '#controllers/modals_controller'
import LoginController from '#controllers/login_controller'
import SessionController from '#controllers/session_controller'
import DashboardController from '#controllers/dashboard_controller'

router.get('/', [HomeController, 'index']).as('home')
router.get('/api/oaa-queryimei', [HomeController, 'queryImei'])
router.get('/api/oaa-checkstock', [HomeController, 'checkStock'])
router.get('/api/opp-item', [HomeController, 'oppItem'])
router.get('/api/opp-checkout', [HomeController, 'oppCheckout'])
router.get('/api/kafka', [HomeController, 'kafka'])

router.get('/e-commerce', [EcommercesController, 'index']).as('e-commerce')
router.get('/api/e-commerce/oaa-stockquery', [EcommercesController, 'stockQuery'])
router.get('/api/e-commerce/opp-item', [EcommercesController, 'oppItem'])
router.get('/api/e-commerce/opp-checkout', [EcommercesController, 'oppCheckout'])

router.get('/dealer-portal', [DealerPortalsController, 'index']).as('dealer-portal')
router.get('/api/dealer-portal/oaa-stockquery', [DealerPortalsController, 'stockQuery'])
router.get('/api/dealer-portal/opp-item', [DealerPortalsController, 'oppItem'])
router.get('/api/dealer-portal/outstanding-ar', [DealerPortalsController, 'outstandingAR'])

router.get('/hit-count', [ModalsController, 'getHitCount'])
// router.on('/').render('pages/home')

router.get('/login', [LoginController, 'index']).as('login')
router.post('/login', [LoginController, 'login']).as('login.post')

router.get('/delete-sessions', [SessionController, 'delete']).as('delete-session')

router.get('/dashboard', [DashboardController, 'index']).as('dashboard')
