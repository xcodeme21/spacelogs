import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
    public async index({ view }: HttpContext) {
      return view.render('pages/auth/login', {
        title: 'Login'
      })
    }
}