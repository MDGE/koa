const Router = require('koa-router')
const router = new Router()
const mysql = require('mysql');
const send = require('koa-send')
const path = require('path');
const { rejects } = require('assert');
const fs = require('fs')
// createConnection 性能开销高,所以用数据库连接池
var pool = mysql.createPool({
    host     : 'bj-cdb-2taage3m.sql.tencentcdb.com',       
    user     : 'root',              
    password : '123Abc$com',       
    port: '61249',                   
    database: 'csj'  
})

router.get('/',async ctx=>{
    await ctx.html('html/index.html')
})
router.get('/info',async(ctx,next)=>{
    ctx.response.status = 200
    let query = ()=>{
      return new Promise((resolve)=>{
        // FROM Student WHERE s_id=01
        pool.getConnection((err,connection)=>{
          if(err){
            console.log('数据库连接失败')
            rejects(err)
          }else{
            pool.query("SELECT * FROM Student",async(err,result)=>{
              resolve(result)
            })
          }
        })
        
      })
    }
    ctx.body = await query()
})
router.get('/all',async (ctx)=>{
    ctx.response.status = 200
    let query = ()=>{
      return new Promise((resolve)=>{
        pool.query("SELECT * FROM Teacher",async(err,result)=>{
          resolve(result)
        })
      })
    }
    ctx.body = await query()
})

router.get('/download',async (ctx)=>{
  const pathUrl = path.join(__dirname, '/小白.pdf');
  // ctx.set('Content-disposition', 'attachment; filename=' + '1.pdf');
  // ctx.set('Content-type', 'application/pdf');
  ctx.body = fs.createReadStream(pathUrl)

})
router.get('/id/:id',async ctx=>{
  console.log(ctx.params)
  ctx.response.status = 200
    let query = ()=>{
      return new Promise((resolve)=>{
        pool.query(`SELECT * FROM Student where s_id = ${ctx.params.id}`,async(err,result)=>{
          resolve(result)
        })
      })
    }
    ctx.body = await query()
})
router.get('/other',async ctx=>{
  const txt = 'hello bai'
  await ctx.render('index',{txt})
  // await ctx.html('html/control.html')
})

module.exports = router
