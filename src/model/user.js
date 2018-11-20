import mongoose from '../util/connect-mongodb'

const schema = new mongoose.Schema({

  mail: { type: String, required: true, unique: true },

  password: { type: String, required: true },

})

const User = mongoose.model('User', schema)

export default User