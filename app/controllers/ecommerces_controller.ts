import { miliToSecond } from "#helpers/durationHelper";
import LogApiPromo from "#models/log_api_promo";
import LogApiSyncProduct from "#models/log_api_sync_product";
import { HttpContext } from "@adonisjs/core/http";
import { DateTime } from 'luxon'

export default class EcommercesController {
    public async index({ view }: HttpContext) {
      return view.render('pages/e-commerce', {
        title: 'e-Commerce'
      })
    }

    public async stockQuery({ response }: HttpContext) {
      try {
        const tenMinutesAgo = DateTime.now().minus({ minutes: 10 }).toISO()
  
        const list = await LogApiSyncProduct.query()
          .select('id', 'status_code', 'response', 'duration')
          .where('transaction_title', 'stockquery')
          .andWhere('created_at', '>=', tenMinutesAgo)
          .orderBy('id', 'desc')
          .limit(100)
  
        const data = list.map((item) => ({
          status_code: item.status_code,
          response: item.response,
          duration: miliToSecond(item.duration.toString()),
        }))
  
        const avgDuration = data.length
          ? data.reduce((sum, item) => sum + item.duration, 0) / data.length
          : 0
  
        const dataResponse = {
          data,
          avg: avgDuration,
          table_name: 'log_api_sync_product',
          transaction_title: 'stockquery',
        }
  
        return response.json(dataResponse)
      } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
      }
    }

    public async oppItem({ response }: HttpContext) {
      try {
        const tenMinutesAgo = DateTime.now().minus({ minutes: 10 }).toISO()
  
        const list = await LogApiPromo.query()
          .select('id', 'status_code', 'response', 'duration', 'created_at')
          .where('transaction_title', 'promotionlistitem')
          .andWhere('created_at', '>=', tenMinutesAgo)
          .orderBy('id', 'desc')
          .limit(100)
  
        const data = list.map((item) => ({
          status_code: item.status_code,
          response: item.response,
          duration: miliToSecond(item.duration.toString()),
        }))
  
        const avgDuration = data.length
          ? data.reduce((sum, item) => sum + item.duration, 0) / data.length
          : 0
  
        const dataResponse = {
          data,
          avg: avgDuration,
          table_name: 'log_api_promo',
          transaction_title: 'promotionlistitem',
        }
  
        return response.json(dataResponse)
      } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
      }
    }
  
    public async oppCheckout({ response }: HttpContext) {
      try {
        const tenMinutesAgo = DateTime.now().minus({ minutes: 10 }).toISO()
  
        const list = await LogApiPromo.query()
        .select('id', 'status_code', 'response', 'duration')
        .where('transaction_title', 'Simulate Promo Payment Level')
        .andWhere('created_at', '>=', tenMinutesAgo)
        .orderBy('id', 'desc')
        .limit(100);
  
        const data = list.map((item) => ({
          status_code: item.status_code,
          response: item.response,
          duration: miliToSecond(item.duration.toString()),
        }))
  
        const avgDuration = data.length
          ? data.reduce((sum, item) => sum + item.duration, 0) / data.length
          : 0
  
        const dataResponse = {
          data,
          avg: avgDuration,
          table_name: 'log_api_promo',
          transaction_title: 'Simulate Promo Payment Level',
        }
  
        return response.json(dataResponse)
      } catch (error) {
        console.error(error)
        return response.status(500).send('Internal Server Error')
      }
    }
}