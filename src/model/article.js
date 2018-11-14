import mongoose from '../util/connect-mongodb'

const schema = new mongoose.Schema({
	// 文章标题
	title:	{ type: String, required: true, unique: true },

	// 文章描述
	description: String,

	// 文章内容
	content: { type: String, required: true },

	// 缩略图
	thumb: String,

	// 文章发布状态
  state: { type: String, enum: ['draft', 'published'] },
  
  // 文章标签
	tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],

	// 文章分类
	category: { type: String, enum: ['code', 'fitness', 'think'] },

  // view
  view: { type: Number, default: 0 },

  style: { type: String },

  // script 可以执行的脚本
  script: { type: String },

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

const Article = mongoose.model('Article', schema)

export default Article