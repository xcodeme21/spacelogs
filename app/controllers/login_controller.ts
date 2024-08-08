import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
    public async index({ view }: HttpContext) {
      return view.render('pages/auth/login', {
        title: 'Login'
      })
    }

    async post({ request, response, session, auth }: HttpContext) {
      const { email, password } = request.only(['email', 'password'])
  
      const user = await User.findBy('email', email)
      if (!user) {
          return response.redirect('back')
      }
  
      try {
          await User.verifyCredentials(email, password)
          await auth.use('web').login(user)
          return response.redirect('/dashboard')
      } catch (error) {
          session.flash('notification', {
            type: 'error',
            message: 'Login Failed!'
          })
          
          response.redirect().back()
      }
    }
}
