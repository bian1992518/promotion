/**
 * Created by bianlongting on  16/12/15.
 * Email 1137060420@qq.com
 */

var express = require("express");
var router = express.Router();

/**
 * 车漆引流页面
 */
router.get('/',function ( req,res,next ) {
    res.render('cq/index',{
        title: '单面车漆修复,低至158元'
    })
})
    .get('/buy',function ( req,res,next ) {     //购买页
    res.render('cq/buy',{
        title: '单面车漆修复,低至158元'
    })
})
    .get('/end',function ( req,res,next ) {     //活动结束
    res.render('cq/end',{
        title: '活动已结束'
    })
})

module.exports = router;
