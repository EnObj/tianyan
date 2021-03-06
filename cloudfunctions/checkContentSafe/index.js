// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)

  const content = event.content

  try {

    const result = await cloud.openapi.security.msgSecCheck({
      content
    })
    console.log(result)

    return result

  } catch (err) {
    console.log(err)
    return err
  }
}