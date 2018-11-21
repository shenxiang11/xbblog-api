import mongoose from '../util/connect-mongodb'

const schema = new mongoose.Schema({
	message: { type: String, required: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  
  create_at: { type: Date, default: Date.now }
})

const Guestbook = mongoose.model('Guestbook', schema)

export default Guestbook