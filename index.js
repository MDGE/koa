const Koa = require('koa' );
const cors = require('@koa/cors')
const router = require('./controller')
// const serve = require('koa-static')
const static = require('static-resource-plugin')
const htmlRender = require('koa-html-render')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const app = new Koa();

app.use(static(''))
app.use(htmlRender())
app.use(bodyParser()) //可以获取url,请求方法
app.use(cors()) //跨域中间件
app.use(
    views("page",{
        map:{html:"ejs"}
    })
)
app.use(async (ctx,next)=>{
    ctx.state.commondata = '我是公共数据'
    if(ctx.status === 404){
        ctx.body = '404界面'
    }
    await next()
})
app.listen(7001,function(){
    console.log('监听7001端口成功')
})
app.use(router.routes()) //启动路由
app.use(router.allowedMethods())






// app.use(serve(__dirname+'/public',{extensions:['html']}))




