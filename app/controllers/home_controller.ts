// import type { HttpContext } from '@adonisjs/core/http'
import LogApiPos from '#models/log_api_pos'
import LogApiPromo from '#models/log_api_promo'
import LogApiSyncProduct from '#models/log_api_sync_product'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class HomeController {
    public async index({ view }: HttpContext) {
        return view.render('pages/home')
    }

    public async queryImei({ response }: HttpContext) {
        try {
            const tenMinutesAgo = DateTime.now().minus({ minutes: 10 }).toISO()

            const list = await LogApiPos.query()
            .select('id', 'status_code', 'response', 'duration')
            .where('transaction_title', 'oaaqueryimei')
            .andWhere('created_at', '>=', tenMinutesAgo)
            .orderBy('id', 'desc')
            .limit(100)

            const data = list.map((item) => ({
            status_code: item.status_code,
            response: item.response,
            duration: this.miliToSecond(item.duration.toString()),
            }))

            const avgDuration = data.length ? data.reduce((sum, item) => sum + item.duration, 0) / data.length : 0

            const dataResponse = {
            data,
            avg: avgDuration,
            table_name: 'log_api_pos',
            transaction_title: 'oaaqueryimei',
            }

            return response.json(dataResponse)
        } catch (error) {
            console.error(error)
            return response.status(500).send('Internal Server Error')
        }
    }

    private miliToSecond(duration: string) {
        let durationSecond = parseFloat(duration);
      
        if (duration.endsWith('ms')) {
          durationSecond = parseFloat(duration) / 1000;
        } else if (duration.endsWith('m')) {
          durationSecond = parseFloat(duration) * 60;
        } else {
          const durationRaw = duration.split('.');
      
          durationSecond = parseFloat(durationRaw[0]);
      
          if (durationRaw[0].includes('m')) {
            const durationRawMinute = durationRaw[0].split('m');
            durationSecond = (parseFloat(durationRawMinute[0]) * 60) + parseFloat(durationRawMinute[1]);
          }
        }
      
        return durationSecond;
    }

    public async checkStock({ response }: HttpContext) {
        try {
            const tenMinutesAgo = DateTime.now().minus({ minutes: 10 }).toISO()

            // Query the database
            const list = await LogApiSyncProduct.query()
                .select('id', 'status_code', 'response', 'duration', 'created_at')
                .where('transaction_title', 'stockquery')
                .andWhere('created_at', '>=', tenMinutesAgo)
                .orderBy('id', 'desc')
                .limit(100)

            // Process data
            const data = list.map((item) => ({
                status_code: item.status_code,
                response: item.response,
                duration: this.miliToSecond(item.duration.toString()),
            }))

            // Calculate average duration
            const avgDuration = data.length ? data.reduce((sum, item) => sum + item.duration, 0) / data.length : 0

            const dataResponse = {
                data,
                avg: avgDuration,
                table_name: 'log_api_sync_product',
                transaction_title: 'stockquery'
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

            // Query the database
            const list = await LogApiPromo.query()
                .select('id', 'status_code', 'response', 'duration', 'created_at')
                .where('transaction_title', 'promotionlistitem')
                .andWhere('created_at', '>=', tenMinutesAgo)
                .orderBy('id', 'desc')
                .limit(100)

            // Process data
            const data = list.map((item) => ({
                status_code: item.status_code,
                response: item.response,
                duration: this.miliToSecond(item.duration.toString()),
            }))

            // Calculate average duration
            const avgDuration = data.length ? data.reduce((sum, item) => sum + item.duration, 0) / data.length : 0

            const dataResponse = {
                data,
                avg: avgDuration,
                table_name: 'log_api_promo',
                transaction_title: 'promotionlistitem'
            }

            return response.json(dataResponse)
        } catch (error) {
            console.error(error)
            return response.status(500).send('Internal Server Error')
        }
    }
}