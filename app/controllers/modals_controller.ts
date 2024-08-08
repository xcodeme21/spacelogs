import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class ModalsController {
  public async getHitCount({ request, response }: HttpContext) {
    try {
      const tenMinutesAgo = DateTime.now().minus({ minutes: 10 }).toISO()
      const transactionTitle = request.input('transaction_title')
      const tableName = request.input('table_name')

      const list = await db
        .from(tableName)
        .select(db.raw('SUBSTRING(created_at, 1, 16) as Time_Minute'))
        .count('* as TicksInMinute')
        .where('transaction_title', transactionTitle)
        .where('created_at', '>=', tenMinutesAgo)
        .groupByRaw('SUBSTRING(created_at, 1, 16)')

      const data = list.map((item: { Time_Minute: number; TicksInMinute: number }) => ({
        timeMinute: item.Time_Minute,
        ticksInMinute: item.TicksInMinute,
      }))

      return response.json(data)
    } catch (error) {
      console.error(error)
      return response.status(500).send('Internal Server Error')
    }
  }
}
