import { handleSuccess } from '../util/handle'

export default class {

  static async list(ctx) {
    try {
      handleSuccess({
        ctx,
        result: [
          { 
            label: '代码',
            value: 'code'
          },
          { 
            label: '思考',
            value: 'think'
          },
          { 
            label: '健身',
            value: 'fitness'
          }
        ]
      })
    } catch(err) {
      throw err
    }
  }
  
}
