export const handleError = ({ ctx, code = 400, message = '操作失败', err }) => {
  ctx.throw(code, message || err.message, err)
}

export const handleSuccess = ({ ctx, message = '操作成功', result }) => {
  ctx.body = {
    message,
    result
  }
}
