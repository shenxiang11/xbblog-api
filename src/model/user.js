import mongoose from '../util/connect-mongodb'

const schema = new mongoose.Schema({

  mail: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  identity: { type: String, enum: ['admin', 'common'], default: 'common' },

  // 短信验证? 现在只有admin有,用于登陆
  phone: { type: String, unique: true, sparse: true },

  website: { type: String },
  
  portrait: { type: String },

  portraitUploadGithub: { type: Boolean, default: false },

  nickname: { type: String, unique: true, sparse: true }
})

const User = mongoose.model('User', schema)

export default User