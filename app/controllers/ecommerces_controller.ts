// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http";

export default class EcommercesController {
    public async index({ view }: HttpContext) {
      return view.render('pages/home')
    }
}