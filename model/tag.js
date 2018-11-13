import mongoose from '../util/connect-mongodb'

const schema = new mongoose.Schema({
	// 标签名称
	name: { type: String, required: true, unique: true },

	// 标签描述
	description: String,

  // 标签所属分类
  category: { type: String, enum: ['code', 'think', 'fitness'] }
})

const Tag = mongoose.model('Tag', schema)

export default Tag