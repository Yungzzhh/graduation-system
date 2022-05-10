const express = require('express');
const router = express.Router();

const baseUrl = `http://localhost:3000`

const multer = require('multer')
const upload = multer({dest: './public/file'})
const uploadAvatar = multer({dest: './public/avatars/'})

const pathLib = require('path');
const fs = require('fs');

const {getPublishList} = require('../dbUtils/publish')

const user = require('../db/userSql')
const connection = require('../db/sql.js');
const information = require('../db/information')
const titleList = require('../db/titleList')


const ResSend = require('../utils/resSend')

/* loginPage */
/* 登录 */
router.post('/api/loginPage/login', function(req, res, next) {
  let params = {
    email: req.body.email,
    password: req.body.password
  }
  connection.query(user.queryEmail(params), function(err, result) {
    // console.log(result);
    if(result.length>0) {
      connection.query(user.queryPassword(params),function(err, result) {
        if(result.length>0) {
          let identify = result[0].identify
          let list = []
          if(identify === 'false') {
            // 身份为老师
            list = [{
              title:'首页',
              name:'Index',
              id:0
            }, {
              title:'上传题目',
              name:'UploadWorks',
              id:1,
            }, {
              title:'我的学生',
              name:'MyStudent',
              id:2,
            }, {
              title:'个人信息',
              name:'PersonalInfomation',
              id:3,
            }, {
              title:'我的消息',
              name:'Message',
              id:4,
            }]
          } else {
            // 身份为学生
            list = [{
              title:'首页',
              name:'Index',
              id:0,
            }, {
              title:'上传作品',
              name:'UploadWorks',
              id:1,
            }, {
              title:'进度查询',
              name:'ProcessQuery',
              id:2,
            }, {
              title:'个人信息',
              name:'PersonalInfomation',
              id:3,
            }, {
              title:'我的消息',
              name:'Message',
              id:4,
            }]
          }
          //更改登录状态
          connection.query(user.Login(params),(err, r)=> {
            if(r) {
              res.send({
                code:200,
                data: {
                  success:true,
                  message:'登录成功',
                  list:list,
                  identify:identify === 'false' ? 'teacher' : 'student'
                }
              })              
            }
          })
        } else {
          res.send({
            code:302,
            data: {
              success:false,
              message:'登录失败,请再次确认信息'
            }
          })
        }
      })
    } else {
      res.send({
        code:301,
        data: {
          success: false,
          msg: '用户不存在'
        }
      })
    }
  })
});
/* 获取侧边栏 */
router.get('/api/loginPage/getSideBar',(req, res)=> {
  let params = {
    email: req.query.email
  }

  connection.query(user.queryEmail(params),(err,r) => {
    if(r[0].identify === 'false') {
      res.send({
        code:200,
        data: {
          list:[{
            title:'首页',
            name:'Index',
            id:0
          }, {
            title:'上传题目',
            name:'UploadWorks',
            id:1,
          }, {
            title:'我的学生',
            name:'MyStudent',
            id:2,
          }, {
            title:'个人信息',
            name:'PersonalInfomation',
            id:3,
          }, {
            title:'我的消息',
            name:'Message',
            id:4,
          }]
        }
      })
    } else {
      res.send({
        code:200,
        data: {
          list:[{
            title:'首页',
            name:'Index',
            id:0,
          }, {
            title:'上传作品',
            name:'UploadWorks',
            id:1,
          }, {
            title:'进度查询',
            name:'ProcessQuery',
            id:2,
          }, {
            title:'个人信息',
            name:'PersonalInfomation',
            id:3,
          }, {
            title:'我的消息',
            name:'Message',
            id:4,
          }]
        }
      })
    }
  })
})
/* 注册 */
router.post('/api/loginPage/register', function(req, res, next) {
  let params = {
    email : req.body.email,
    password : req.body.password,
    identify : req.body.identify
  }
  connection.query(user.queryEmail(params),function(err, result) {
    if(err) throw err
    if(result.length > 0) {
      res.send({
        code:200,
				data:{
					success:false,
					msg:'注册失败',
					data:'已有注册账号，请直接登录'
				}
			})
    } else {
      connection.query(user.userRegistration(params),function(err,result) {
        connection.query(user.queryEmail(params),function(e,r) {
          res.send({
            code:200,
            data:{
							success:true,
							msg:'注册成功',
						}
          })
        })
      })
    }
  })
});
/* 退出登录 */
router.post('/api/loginPage/loginOut', (req, res)=> {
  let params = {
    email: req.body.email
  }
  connection.query(user.logOut(params),(err,r)=> {
    
  })
})
/* 查看登录状态 */
router.get('/api/loginPage/check', (req, res)=> {
  let params = {
    email: req.query.email
  }
  connection.query(user.checkLogin(params),(err, r)=> {
    console.log(r);
    if(r !== []) {
      res.send({ 
        code:200,
        data: r[0].status
      })
    } else {
      console.log(r);
      res.send({
        code:201,
        data:'offline'
      })
    }
  })
})

/* home */
/* 获取题目列表 */
router.get('/api/home/getList', function(req,res) {
  let page = req.query.page
  connection.query(titleList.getList(page), function(err, result) {
    let list = result
    res.send({
      code:200,
      data:list
    })
  })
})
/* 分页功能 */
router.get('/api/home/pageSize',(req, res)=> {
  connection.query(titleList.getListSize(), function(err, result) {
    let length = result.length
    res.send({
      code:200,
      data:length
    })
  })
})
/* 模糊搜索 */
router.get('/api/home/search',(req, res)=> {
  let val = req.query.val
  // console.log();
  // console.log(titleList.search(val));
  connection.query(titleList.search(val),(err,r)=> {
    err? res.send({
      code: 500
    }) : res.send({
      code: 200,
      data: r
    })
  })
})

/* upload */
/* 查询题目 / 作品 id */
router.get('/api/upload/maxid',function(req,res){
  connection.query(titleList.maxid(), (err, result) => {
    if(result.length > 0) {
      res.send({
        code: 200,
        message: '获取成功',
        data: result[0]['max(titleId)']
      })
    } else {
      res.send({
        code: 500,
        message: err
      })
    }
  })
})
/* 上传作品文件 */
router.post('/api/upload/uploadFile',upload.single('file'),function(req, res) {
  var newName = req.file.path +pathLib.parse(req.file.originalname).ext;
  let pathName = newName.split("\\")
  fs.rename(req.file.path, newName, (err)=> {
    if(err) {
      res.send({
        code: 400,
        data: {
          success: false,
          message: `上传失败:${err}`
        }
      })
    } else {
      res.send({
        code:200,
        data: {
          success: true,
          message:'上传成功',
          url: req.file.destination+'/'+pathName[pathName.length-1]
        }
      })
    }
  })
})
/* 上传题目 / 作品 */
router.post('/api/upload/uploadTitle', function (req, res, next) {
  //定义接口
  let params = {
    title: req.body.title,
    author: req.body.author,
    teacher: req.body.teacher,
    teacherEmail: req.body.teacherEmail,
    contact: req.body.contact,
    remarks: req.body.remarks,
    uploadUrl: req.body.uploadUrl,
    id: req.body.id,
    imgSqlUrl: req.body.imgSqlUrl,
    identify: req.body.identify
  }
  connection.query(titleList.titleInsert(params), function(err, result) {
    if(err) {
      console.log(err.sql);
      res.send({
        code: 500,
        message: `上传失败${err}`
      })
    } else {
      res.send({
        code: 200,
        message: '上传成功'
      })
    }
  })
})
router.get('/api/upload/checkEmail',(req,res)=> { 
  const params = {
    email:req.query.email
  }
  connection.query(user.queryEmail(params),(err,r)=> {
    if(err) {
      console.log(err);
    } else {
      new ResSend(res, 200, r[0]).send()
    }
    // 123456teacher@qq.com
  })
})
let uploadImg = multer({
	storage: multer.diskStorage({
		//设置文件存储位置
		destination: function(req, file, cb) {
			let date = new Date();
			let year = date.getFullYear();
			let month = (date.getMonth() + 1).toString().padStart(2, '0');
			let day = date.getDate();
			let dir = "./public/titleImg/" + year + month + day;
			//判断目录是否存在，没有则创建
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, {
					recursive: true
				});
			}
			//dir就是上传文件存放的目录
			cb(null, dir);
		},
		//设置文件名称
		filename: function(req, file, cb) {
			let fileName =Date.now() + pathLib.extname(file.originalname);
			//fileName就是上传文件的文件名
			cb(null, fileName);
		}
	})
});
/* 多个图片上传 */
router.post('/api/upload/imgsUpload',uploadImg.array('file',3),(req, res) => {
	//req.files[0].path为上传文件数组中第一个文件的地址
	let list = []
  req.files.forEach(item => {
    list.push(item.path.substring(7).split("\\").reduce((all,cur,curIndex)=>
    all+'/'+cur
  ,""))
  })
  list.forEach(item=> {
    baseUrl+item
  })
  let id = 0
  let resList = list.map(item => {
    const obj = {}
    obj['url'] = baseUrl+''+item
    obj['id'] = id++
    return obj
  } )
  console.log(resList);
	res.send({code: 200,list: resList})
})
/* 通知审核 !! */
const {notice} = require('../db/uploadNotice')
router.post('/api/upload/notice',(req, res)=> {
  let params = {
    email: req.body.email
  }
  connection.query(notice(params),(err,r)=> {
    err? res.send({
      code:500,
      data:err
    }) : res.send({
      code: 200,
      data:r
    })
  })
})

/* information */
/* 获取个人信息 */
router.get('/api/information/get', (req,res) => {
  let params = {
    email:req.query.email
  } 
  connection.query(information.get(params),(err,r)=> {
    if(err) {
      res.send({
        code:500,
        message: err
      })
    } else {
      res.send({
        code:200,
        message:'success',
        data:r
      })
    }
  })
})
/* 修改个人信息 */
router.post('/api/information/set', (req,res) => {
  let params = {
    email: req.body.email,
    name: req.body.name,
    id: req.body.id,
    wechat: req.body.wechat,
    qq: req.body.qq,
    phone: req.body.phone,
  }
  connection.query(information.getAvatar(params),(err,r)=> {
    connection.query(information.set(params),(err, r)=> {
      if(err) {
        new ResSend(res, 500, err).send()
      } else {
        new ResSend(res, 200, r).send()
      }
    })
  })
})

/* avatar */
/* 上传头像 获取存储的路径 --> 存储到数据库中 --> 再进行获取*/
router.post('/api/avatar/getAvatarUrl',uploadAvatar.single('file'),(req, res)=> {
  if(req.file) {
    const avatarUrl = req.file.path.substring(6).replace(/\\/g, "/")
    // res.send({
    //   code:200,
    //   url:baseUrl + avatarUrl
    // })
    let url = baseUrl + avatarUrl
    new ResSend(res, 200, url).send()
  }
})
router.post('/api/avatar/postAvatar',(req,res) => {
  const params = {
    email: req.body.email,
    avatarUrl: req.body.avatarUrl
  }
  connection.query(information.postAvatar(params),(err,r) => {
    if(err) {
      new ResSend(res, 500, err).send()
    } else {
      new ResSend(res, 200, r).send()
    }
  })
})
/* 获取头像图片 */
router.get('/api/avatar/getAvator',(req, res) => {
  const params = {
    email: req.query.email
  }
  connection.query(information.getAvatar(params),(err, r) => {
    if(err) {
      new ResSend(res, 500, err).send()
    } else {
      new ResSend(res, 200, r).send()
    }
  })
})

/* 消息-进度 */
/* 离线存储通知 */
router.post('/api/offline/save',(req,res)=> {
  let params = {
    email: req.body.email,
    teacherEmail: req.body.teacherEmail,
    title: req.body.title,
    titleId: req.body.titleId,
    time: req.body.time,
  }
  connection.query(getPublishList(params.email),(err,r)=> {
    if(r.length>0) {
      // 证明已经选择了题目，不可以再选别的
      res.send({
        code: 201,
        message:'已重新申请，请等待审核'
      })
    } else {
      connection.query(`insert into publish_list (email,teacherEmail,titleId,time,process,status,title,teacher) values ("${params.email}","${params.teacherEmail}",${params.titleId},"${params.time}",0,0,(select title from title_list where titleId = ${params.titleId}),(select teacher from title_list where titleId = ${params.titleId}))`, (err,r)=> {
        err? res.send({
          code: 500
        }) : res.send({
          code: 200,
        })
      })
    }
  })
})
/* 获取消息列表 */
router.get('/api/offline/get',(req, res)=> {
  let params = {
    email: req.query.email,
    identify: req.query.identify,
  }
  if(params.identify === 'student') {
    //学生
    connection.query(getPublishList(params.email),(err,r)=> {
      if(r.length > 0 && r[0].status===0) {
        console.log(r);
        res.send({
          code:200,
          data:r
        })
      } else {
        res.send({
          code:404
        })
      }
    })
  } else {
    connection.query(`select * from publish_list where teacherEmail = "${params.email}" and status = 0`,(err,r)=> {// 有消息
      r.length > 0 ? 
        connection.query(`select name from userform where email in (select email from publish_list where teacherEmail = "${params.email}")`,(err,rr)=> {
          if(rr.length > 0) {
            r.forEach((item, index)=>item.name = rr[index]?.name)
            res.send({code: 201,data: r})
          }
        })
        :res.send({code: 404})// 没有消息
    })
  }
})

/* 通过验证 */
router.post('/api/offline/accept', (req, res)=> {
  let params = {
    email: req.body.email,
    title: req.body.title,
    titleId: req.body.titleId,
    teacherEmail: req.body.teacherEmail,
    time: req.body.time,
  }
  connection.query(`update publish_list set status = 1,process=1 where email = "${params.email}"`,(err,r)=> {
    if(r) {
      connection.query(`delete from publish_list where status != 1 and titleId = ${params.titleId}`,(err,r)=> {
        r
        ?connection.query(`update title_list set selected = 1 where titleId = ${params.titleId}`,(err,r)=> {r?res.send({code:200}) : res.send({code:500})})
        :res.send({code:500})
      })
    }
  })
})


/* 获取我的学生列表 || 进度查询列表 */
router.get('/api/process/get',(req, res)=> {
  let params = {
    email: req.query.email,
    identify: req.query.identify,
  }
  if(params.identify === 'student') {
    //学生
    connection.query(getPublishList(params.email),(err,r)=> {
      if(err) res.send(err)
      if(r.length>0) {
        if(r[0].status===0) {
          res.send({code:100})//申请中
        } else if(r[0].status===2) {
          res.send({code:500})//申请失败
        } else if(r[0].status===1) {
          res.send({code:200,data:r})// 申请成功
        }
      } else {
        res.send({code:404})
      }
    })
  } else {
    connection.query(`select userform.name,publish_list.email,publish_list.title,publish_list.titleId,publish_list.process from publish_list,userform where publish_list.teacherEmail = "${params.email}" and publish_list.status = 1 and publish_list.email = userform.email`,(err,r)=> {
      r.length>0
        ?res.send({code:200,data:r})
        :res.send({code:404})
    })
  }
})
/* 进度更新通知 */
router.post('/api/process/updateProcess',(req, res)=> {
  let params = {
    email: req.body.email,
    active: req.body.active
  }
  connection.query(`update publish_list set process = ${params.active+1} where email = "${params.email}"`,(err,r)=> {
    console.log(err);
    err? res.send({
      code: 500
    }) : res.send({
      code: 200,
    })
  })
})




module.exports = router;
