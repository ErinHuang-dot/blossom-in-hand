import mitt from '@/methods/mitt'

export default function (response, title = '更新') {
  if (response.data.success) {
    mitt.emit('push-message', {
      style: 'success',
      title: `${title}成功`
    })
  } else {
    // 統一訊息的格式
    const message = typeof response.data.message === 'string'

      ? [response.data.message]
      : response.data.message

    mitt.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、')
    })
  }
}
