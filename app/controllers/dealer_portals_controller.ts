import { miliToSecond } from '#helpers/durationHelper'
import LogApi from '#models/log_api'
import LogApiDealer from '#models/log_api_dealer'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class DealerPortalsController {
  public async index({ view }: HttpContext) {
    return view.render('pages/dealer-portal', {
      title: 'Dealer Portal',
    })
  }

  public async stockQuery({ response }: HttpContext) {
    try {
      const tenMinutesAgo = DateTime.now().minus({ minutes: 10 }).toISO()

      const list = await LogApi.query()
        .select('id', 'status_code', 'response', 'duration')
        .where('transaction_title', 'Asfa Check Stock')
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
        table_name: 'log_api',
        transaction_title: 'Asfa Check Stock',
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

      const list = await LogApi.query()
        .select('id', 'status_code', 'response', 'duration', 'created_at')
        .where('transaction_title', 'Dealer Portal Catalog Price Product')
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
        table_name: 'log_api',
        transaction_title: 'Dealer Portal Catalog Price Product',
      }

      return response.json(dataResponse)
    } catch (error) {
      console.error(error)
      return response.status(500).send('Internal Server Error')
    }
  }

  public async outstandingAR({ response }: HttpContext) {
    try {
      const tenMinutesAgo = DateTime.now().minus({ minutes: 10 }).toISO()

      const list = await LogApiDealer.query()
        .select('id', 'status_code', 'response', 'duration')
        .where('transaction_title', 'Dealer Portal Get Outstanding AR')
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
        table_name: 'log_api_dealer',
        transaction_title: 'Dealer Portal Get Outstanding AR',
      }

      return response.json(dataResponse)
    } catch (error) {
      console.error(error)
      return response.status(500).send('Internal Server Error')
    }
  }
}
