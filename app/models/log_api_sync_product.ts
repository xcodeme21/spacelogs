import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class LogApiSyncProduct extends BaseModel {
  public static table = 'log_api_sync_product'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status_code: string

  @column()
  declare response: string

  @column()
  declare duration: number

  @column()
  declare transaction_title: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
