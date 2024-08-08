import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash';

export default class LoginController {
    public async index({ view }: HttpContext) {
      return view.render('pages/auth/login', {
        title: 'Login'
      })
    }

    async login({ request, response, session }: HttpContext) {
      const { email, password } = request.only(['email', 'password']);
    
      const user = await User.findBy('email', email);
    
      if (!user) {
        session.put('error', "Email not found.");
        return response.redirect('login');
      }
    
      const hashedPassword = user.password;
    
      console.log(password, hashedPassword)
      try {
        const isPasswordValid = await hash.verify(password, hashedPassword);
    
        if (!isPasswordValid) {
          session.put('error', "Incorrect password.");
          return response.redirect('login');
        }
    
        return response.redirect('/dashboard');
      } catch (err) {
        console.error('Error verifying password:', err);
        session.put('error', "An error occurred.");
        return response.redirect('login');
      }
    }
}
