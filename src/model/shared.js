import mongoose from '../util/connect-mongodb'

const schema = new mongoose.Schema({
	// 分享文章标题
	title:	{ type: String },

  url: { type: String, required: true, unique: true },

	// 分享文章描述
  description: String,
  
	// 分享文章缩略图
	thumb: String,

	// 文章分类
	category: { type: String, enum: ['code', 'fitness', 'think'] },

	// 发布日期
	create_at: { type: Date, default: Date.now },

	// 最后修改日期
	update_at: { type: Date, default: Date.now },
})

// 时间更新
schema.pre('findOneAndUpdate', function(next) {
	this.findOneAndUpdate({}, { update_at: Date.now() })
	next()
})

const Shared = mongoose.model('Shared', schema)

export default Shared