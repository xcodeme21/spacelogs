
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios';

export default class LoginController {
    public async index({ view }: HttpContext) {
      return view.render('pages/auth/login', {
        title: 'Login'
      })
    }

    public async login({ request, response }: HttpContext) {
      const { email, password } = request.only(['email', 'password']);
  
      try {
        const apiResponse = await axios.post(
          'https://kong.eratech.id/auth/v1/cms/auth/login',
          {
            username: email,
            password: password,
          },
          {
            headers: {
              'accept': 'application/json, text/plain, */*',
              'content-type': 'application/json',
              'origin': 'https://cs-dashboard.eratech.id',
              'x-project': 'dashboard',
            },
          }
        );
  
        if (apiResponse.data && apiResponse.data.data && apiResponse.data.data.access_token) {
          const token = apiResponse.data.data.access_token;
  
          response.cookie('auth_token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: true,
          });
  
          return response.json({
            message: 'Login successful',
            token: token,
          });
        } else {
          return response.status(401).json({
            error: 'Login failed. Invalid response from the authentication server.',
          });
        }
      } catch (error) {
        return response.status(401).json({
          error: 'Login failed. Please check your credentials and try again.',
          details: error.response ? error.response.data : error.message,
        });
      }
    }
}
