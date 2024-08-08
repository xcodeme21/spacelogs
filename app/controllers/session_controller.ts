import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  public async delete({ session, response }: HttpContext) {
    session.forget('error')
    return response.json({ success: true })
  }
}
