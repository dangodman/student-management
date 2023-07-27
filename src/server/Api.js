var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql= require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
var jsonWrite = function(res,ret){
  if(typeof ret === 'undefined'){
    res.josn({
      code:'1',
      msg:'操作失败'
    })
  } else {
    res.josn(ret)
  }
}


