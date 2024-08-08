import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Agus Siswanto',
        email: 'agus.siswanto@erajaya.com',
        password: await hash.make('secret'),
      },
      {
        fullName: 'Dealitha Winata',
        email: 'dealitha.winata@erajaya.com',
        password: await hash.make('secret'),
      },
    ])
  }
}
