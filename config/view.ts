// import { Env } from "@adonisjs/core/env";

export default {
  /*
  |--------------------------------------------------------------------------
  | Views path
  |--------------------------------------------------------------------------
  |
  | The location where views are stored.
  |
  */
  locations: ['resources/views'],

  /*
  |--------------------------------------------------------------------------
  | Edge Template Engine
  |--------------------------------------------------------------------------
  |
  | Edge is a powerful, yet simple and minimal templating engine. This object
  | contains the settings for the edge template engine.
  |
  */
  edge: {
    // cache: Env.get('CACHE_VIEWS', false),
  },
}
