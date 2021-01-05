import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

//当前版本号
Vue.prototype.soft_name = '学时';
Vue.prototype.company_name = '上海育文教育科技有限公司';
Vue.prototype.co_name = '育文';
Vue.prototype.version = '1.0';

//缓存标识
Vue.prototype.USERS_KEY = "userinfo";
Vue.prototype.Temp_KEY = "tempinfo";
Vue.prototype.temp_status = 0; //临时状态,调试用,=1时,debugger起作用

Vue.prototype.STUDYTIME = "2020-06-01";

//服务器
Vue.prototype.WebUrl = "http://api.yuwenjiaoyu.net/";
Vue.prototype.Method = "post"; //请求方式

/* Vue.prototype.WebUrl = "http://www.tp5.com/";
Vue.prototype.Method = "get"; //请求方式 */

Vue.prototype.errorinfo = 0 ; //是否显示错误


Vue.prototype.payAccount = {
	/* "alipaylist":{
		"app_id":"2021001130636164",
		"biz_content":"会员续费",
		"charset":"gbk",		
		"method":"alipay.trade.app.pay",		
		"notify_url":"http://www.yuwenjiaoyu.net/index/notify/notify",
		
		"product_code":"FACE_TO_FACE_PAYMENT",
		"sign_type":"RSA2",
		"subject":"会员续费",
		"timestamp":'2020-10-12 09:09:08',
		"version":"1.0",
		"sign":'YYyeHxmpbPSEBce1ixU7gg==',
		"auth_code":""		
	},
	"wxlist":{
		"appid":"",
		"AppSecret":''
	} */
}; //支付帐号


Vue.prototype.biglogo = "";// /static/img/indeximg.png
Vue.prototype.logo = "/static/img/logo.png"; //

//图片地址
Vue.prototype.PicUrl = Vue.prototype.WebUrl + "uploadfile/" ;

//api接口变量
Vue.prototype.GeneralUrl = Vue.prototype.WebUrl + "index/general/"; //通用地址
Vue.prototype.ParentUrl = Vue.prototype.WebUrl + "index/parents/";   //家长地址
Vue.prototype.CompanyUrl = Vue.prototype.WebUrl + "index/company/"; //公司地址
Vue.prototype.CompanyTeacherUrl = Vue.prototype.WebUrl + "index/teacher/"; //公司地址


//在线支付地址
/* Vue.prototype.AlipayUrl = Vue.prototype.AlipayUrl + "alipay" //支付宝支付
Vue.prototype.WxpayUrl = Vue.prototype.wxpayUrl + "wxpay" //微信支付 */
Vue.prototype.AlipayUrl = Vue.prototype.WebUrl + "index/ywalipay/alipay"; //支付宝支付地址
Vue.prototype.WxpayUrl = Vue.prototype.WebUrl + "index/ywwxpay/"; //微信支付地址
Vue.prototype.DiscountayUrl = Vue.prototype.WebUrl + "index/discountpay/discountpay"; //优惠券支付



Vue.prototype.getTestUrl = Vue.prototype.GeneralUrl + "gettest" //测试页面

//通用功能
Vue.prototype.getUsersInfoUrl = Vue.prototype.GeneralUrl + "getuserinfo" //个人信息
Vue.prototype.LoginUrl = Vue.prototype.GeneralUrl + "dl" //登录地址
Vue.prototype.CheckTokenUrl = Vue.prototype.GeneralUrl + "checktoken" //检测是否登录，每天第一次打开进行检测
Vue.prototype.RegisterUrl = Vue.prototype.GeneralUrl + "register" //注册新用户
Vue.prototype.ResetPasswordrUrl = Vue.prototype.GeneralUrl + "resetpassword" //重置密码
Vue.prototype.getSessionUrl = Vue.prototype.GeneralUrl + "getsessionid" //生成session
Vue.prototype.SendSmsUrl = Vue.prototype.GeneralUrl + "sendsms" //发短信
Vue.prototype.SearchCourseUrl = Vue.prototype.GeneralUrl + "search" //查找机构
Vue.prototype.showCourseUrl = Vue.prototype.GeneralUrl + "showcourse" //显示课程详情
Vue.prototype.getMemberCostUrl = Vue.prototype.GeneralUrl + "getcost" //获取会员费用
Vue.prototype.GonggaoshowUrl = Vue.prototype.GeneralUrl + "getarticleshow" //公告内容

Vue.prototype.UpgradeUrl = Vue.prototype.GeneralUrl + "upgrade" //升级申请
Vue.prototype.ModifyUserInfoUrl = Vue.prototype.GeneralUrl + "modifyuserinfo" //修改个人信息
Vue.prototype.ModifyParentfaceUrl = Vue.prototype.GeneralUrl + "modifyparentface" //修改家长头像
Vue.prototype.MessagelistUrl = Vue.prototype.GeneralUrl + "getmessagelist" //某人短信列表
Vue.prototype.MessageshowUrl = Vue.prototype.GeneralUrl + "messageshow" //某人短信详情


Vue.prototype.ArticleListUrl = Vue.prototype.GeneralUrl + "getarticlelist" //获取文章信息
Vue.prototype.helpshowUrl = Vue.prototype.GeneralUrl + "getarticleshow" //获取帮助信息

Vue.prototype.ChangeUserFaceUrl = Vue.prototype.GeneralUrl + "changeface" //更换头像
Vue.prototype.SaveDisplaySiteUrl = Vue.prototype.GeneralUrl + "savedisplaysite" //显示设置

Vue.prototype.BilllistUrl = Vue.prototype.GeneralUrl + "getbilllist"; //续费记录

//家长相关
Vue.prototype.KousuanCsUrl = Vue.prototype.ParentUrl + "kousuancs" //口算参数
Vue.prototype.KousuanUrl = Vue.prototype.ParentUrl + "kousuan" //口算地址

Vue.prototype.DayClassUrl = Vue.prototype.ParentUrl + "dayclass" //当天课程
Vue.prototype.AllChildrenUrl = Vue.prototype.ParentUrl + "getallchildren" //全部孩子
Vue.prototype.ShowChildrenUrl = Vue.prototype.ParentUrl + "getchildren" //获取单个孩子
Vue.prototype.ModifyChildrenUrl = Vue.prototype.ParentUrl + "modifychildren" //修改单个孩子
Vue.prototype.ModifyChildrenfaceUrl = Vue.prototype.ParentUrl + "modifychildrenface" //修改单个孩子头像
Vue.prototype.DelChildrenUrl = Vue.prototype.ParentUrl + "delchildren" //删除单个孩子
Vue.prototype.AllOrganUrl = Vue.prototype.ParentUrl + "organlist" //所有课程机构
Vue.prototype.OrganUrl = Vue.prototype.ParentUrl + "organshow" //所有课程机构
Vue.prototype.ModifyOrganUrl = Vue.prototype.ParentUrl + "organmodify" //所有课程机构
Vue.prototype.DelOrganUrl = Vue.prototype.ParentUrl + "organdel" //删除课程机构
Vue.prototype.ChildWeekUrl = Vue.prototype.ParentUrl + "childweeklist" //某一孩子一周课程安排
Vue.prototype.ChildCourseWeekUrl = Vue.prototype.ParentUrl + "getchildcourseweelist" //某一孩子某门课一周程安排
Vue.prototype.ModifyChildPlanUrl = Vue.prototype.ParentUrl + "childplanmodify" //某一孩子修改或者添加计划
Vue.prototype.DelChildPlanUrl = Vue.prototype.ParentUrl + "childplandel" //删除某一孩子的计划
Vue.prototype.ShowChildPlanUrl = Vue.prototype.ParentUrl + "childplanshow" //显示某一计划 
Vue.prototype.AllEnlistUrl = Vue.prototype.ParentUrl + "getallenlist" //获取所有报名课程

Vue.prototype.GetDayChildCourseUrl = Vue.prototype.ParentUrl + "getdaychildcourselist" //获取某个孩子某天的课程
Vue.prototype.updateChildCourseTiaokeSignUrl = Vue.prototype.ParentUrl + "updatechildcoursetiaokesign" //更新调课内容
Vue.prototype.updateChildCourseQingjiaSignUrl = Vue.prototype.ParentUrl + "updatechildcourseqingjiasign" //请假
Vue.prototype.EnlistBiomingUrl = Vue.prototype.ParentUrl + "enlistbiaming" //报名
Vue.prototype.CompanyInfoUrl = Vue.prototype.ParentUrl + "companyinfo" //公司及其下课程详情
Vue.prototype.GetChildStatisticsUrl = Vue.prototype.ParentUrl + "getchildstatistics" //孩子上课统计(按年)


Vue.prototype.SaveRemindUrl = Vue.prototype.ParentUrl + "saveremindsiteup" //个性设置


//老师相关
//老师当天要接的孩子
Vue.prototype.GetTeacherCurrentStudents = Vue.prototype.CompanyTeacherUrl + "getcurrentstudents" //要接送的学生

//公司相关
//优惠券
Vue.prototype.GetAllDiscountsUrl = Vue.prototype.CompanyUrl + "getalldiscountlist" //获取优惠券列表
Vue.prototype.CreateDiscountsUrl = Vue.prototype.CompanyUrl + "creatediscount" //生成优惠券列表

//当天要接的孩子
Vue.prototype.GetCurrentStudents = Vue.prototype.CompanyUrl + "getcurrentstudents" //要接送的学生
Vue.prototype.GetCurrentCFStudents = Vue.prototype.CompanyUrl + "getcurrentcfstudents" //吃饭的学生
Vue.prototype.GetCurrentNOCFStudents = Vue.prototype.CompanyUrl + "getcurrentnocfstudents" //当天不吃饭的学生
Vue.prototype.SetStudentsExtrameal = Vue.prototype.CompanyUrl + "setextrameal" //某个学生加餐
Vue.prototype.GetCurrentYgStudents = Vue.prototype.CompanyUrl + "getcurrentygchildren" //员工
Vue.prototype.GetNoSignStudents = Vue.prototype.CompanyUrl + "getnosignstudents" //获取未签到的学生

Vue.prototype.GetAllStudents = Vue.prototype.CompanyUrl + "getallstudents"  //某一用户的所有企业下的学生
Vue.prototype.GetStudentsDetail = Vue.prototype.CompanyUrl + "getstudentsdetail" //学生的详细资料
Vue.prototype.GetStudentsCategory = Vue.prototype.CompanyUrl + "getstudentscategory"//学生所报的课程分类
Vue.prototype.GetStudentssign = Vue.prototype.CompanyUrl + "getstudentssign" //学生签到查询
Vue.prototype.SetsignUrl = Vue.prototype.CompanyUrl + "setsign" //设置签到
Vue.prototype.RepairsignUrl = Vue.prototype.CompanyUrl + "repairsign" //补签
Vue.prototype.GetBirthdaytStudentsUrl = Vue.prototype.CompanyUrl + "getbirthdaystudents"  //获取一周内过生日的学生
Vue.prototype.SetStudentsTemperatureUrl = Vue.prototype.CompanyUrl + "savestudentstemperature"  //保存体温

Vue.prototype.GetAllSubCompanyUrl = Vue.prototype.CompanyUrl + "getsubcompanylist"  //获取子公司
Vue.prototype.GetCompanyCategory = Vue.prototype.CompanyUrl + "getcompanycategory"  //获取子公司的培训课程
Vue.prototype.GetCompanyStatisticUrl = Vue.prototype.CompanyUrl + "getcompanystatistic"  //获取子公司某一课程的统计结果
Vue.prototype.GetAllSubCompanyCategoryUrl = Vue.prototype.CompanyUrl + "getsubcompanycategorylist"  //获取子公司所有分类
Vue.prototype.GetCategoryInfoUrl = Vue.prototype.CompanyUrl + "getcategoryinfo" //获取分类信息
Vue.prototype.UpdateCategoryInfoUrl = Vue.prototype.CompanyUrl + "updatecategoryinfo" //修改分类信息
Vue.prototype.DelCategoryInfoUrl = Vue.prototype.CompanyUrl + "delcategoryinfo" //删除分类信息

Vue.prototype.GetCompanyInfoUrl = Vue.prototype.CompanyUrl + "getcompanyinfo" //获取公司信息
Vue.prototype.UpdateCompanyInfoUrl = Vue.prototype.CompanyUrl + "updatecompanyinfo" //修改公司信息
Vue.prototype.DelCompanyInfoUrl = Vue.prototype.CompanyUrl + "delcompanyinfo" //删除公司信息

Vue.prototype.GetAllSchoolUrl = Vue.prototype.CompanyUrl + "getallschoollist" //获取所有学校
Vue.prototype.GetSchoolInfoUrl = Vue.prototype.CompanyUrl + "getschoolinfo" //获取学校信息
Vue.prototype.UpdateSchoolInfoUrl = Vue.prototype.CompanyUrl + "updateschoolinfo" //修改学校信息
Vue.prototype.DelSchoolInfoUrl = Vue.prototype.CompanyUrl + "delschoolinfo" //删除学校信息
Vue.prototype.GetAllCompanySchoolUrl = Vue.prototype.CompanyUrl + "getcompanyschool" //根据com_id获取所有学校

Vue.prototype.GetAllStudentsUrl = Vue.prototype.CompanyUrl + "getallstudentslist" //获取所有学生
Vue.prototype.GetStudentsInfoUrl = Vue.prototype.CompanyUrl + "getstudentsinfo" //获取学生信息
Vue.prototype.UpdateStudentsInfoUrl = Vue.prototype.CompanyUrl + "updatestudentsinfo" //修改学生信息
Vue.prototype.DelStudentsInfoUrl = Vue.prototype.CompanyUrl + "delstudentsinfo" //删除学生信息

Vue.prototype.GetAllGradeUrl = Vue.prototype.CompanyUrl + "getallgrade" //获取年级
Vue.prototype.GetAllGradelistUrl = Vue.prototype.CompanyUrl + "getallgradelist" //获取年级
Vue.prototype.DelGradeinfoUrl = Vue.prototype.CompanyUrl + "delgradeinfo" //删除年级
Vue.prototype.GetGradeInfoUrl = Vue.prototype.CompanyUrl + "getgradeinfo" //获取学生信息
Vue.prototype.UpdateGradeInfoUrl = Vue.prototype.CompanyUrl + "updategradeinfo" //修改年级信息

//班级
Vue.prototype.GetAllClassUrl = Vue.prototype.CompanyUrl + "getallclass" //获取班级(列表)
Vue.prototype.GetAllClassUrl = Vue.prototype.CompanyUrl + "getclasslist" //获取班级(下拉)
Vue.prototype.DelClassinfoUrl = Vue.prototype.CompanyUrl + "delclassinfo" //删除班级
Vue.prototype.GetClassInfoUrl = Vue.prototype.CompanyUrl + "getclassinfo" //获取班级信息
Vue.prototype.UpdateClassInfoUrl = Vue.prototype.CompanyUrl + "updateclassinfo" //修改班级信息

//教室
Vue.prototype.GetAllClassroomUrl = Vue.prototype.CompanyUrl + "getallclassroom" //获取教室(列表)

Vue.prototype.GetAllClassroomUrl = Vue.prototype.CompanyUrl + "getclassroomlist" //获取教室(下拉)
Vue.prototype.DelClassroominfoUrl = Vue.prototype.CompanyUrl + "delclassroominfo" //删除教室
Vue.prototype.GetClassroomInfoUrl = Vue.prototype.CompanyUrl + "getclassroominfo" //获取教室信息
Vue.prototype.UpdateClassroomInfoUrl = Vue.prototype.CompanyUrl + "updateclassroominfo" //修改教室信息

//安排
Vue.prototype.GetAllCompanyplanUrl = Vue.prototype.CompanyUrl + "getcompanyplanlist" //获取安排
Vue.prototype.DelCompanyplaninfoUrl = Vue.prototype.CompanyUrl + "delcompanyplaninfo" //删除安排
Vue.prototype.GetCompanyplanInfoUrl = Vue.prototype.CompanyUrl + "getcompanyplaninfo" //获取安排信息
Vue.prototype.AddCompanyplanInfoUrl = Vue.prototype.CompanyUrl + "addcompanyplaninfo" //添加安排信息
Vue.prototype.UpdateCompanyplanInfoUrl = Vue.prototype.CompanyUrl + "updatecompanyplaninfo" //修改安排信息

//员工
Vue.prototype.GetAllMemberUrl = Vue.prototype.CompanyUrl + "getmemberlist" //获取未签到员工
Vue.prototype.DelMemberinfoUrl = Vue.prototype.CompanyUrl + "delmemberinfo" //删除员工
Vue.prototype.GetMemberInfoUrl = Vue.prototype.CompanyUrl + "getmemberinfo" //获取员工信息
Vue.prototype.AddMemberInfoUrl = Vue.prototype.CompanyUrl + "addmemberinfo" //添加员工信息
Vue.prototype.UpdateMemberInfoUrl = Vue.prototype.CompanyUrl + "updatememberinfo" //修改员工信息
Vue.prototype.GetCurrentMemberlistUrl = Vue.prototype.CompanyUrl + "getcurrentmemberlist" //获取今天上班的员工
Vue.prototype.GetAllMemberlistUrl = Vue.prototype.CompanyUrl + "getallmemberlist" //获取所有员工
Vue.prototype.GetAllSubCompanyMemberlistUrl = Vue.prototype.CompanyUrl + "getsubcompanymemberlist" //根据comid来获取子公司所有员工
Vue.prototype.GetAllSubCompanyMemberStatisticsUrl = Vue.prototype.CompanyUrl + "getsubcompanymemberstatistics" //员工统计数据

Vue.prototype.GetAllMemberGroupUrl = Vue.prototype.CompanyUrl + "getmembergrouplist" //获取员工接人组
Vue.prototype.GetMemberGroupInfoUrl = Vue.prototype.CompanyUrl + "getmembergroupinfo" //获取某个员工接人组信息
Vue.prototype.AddMemberGroupUrl = Vue.prototype.CompanyUrl + "addmembergroupinfo" //添加员工接人组
Vue.prototype.DelMemberGroupUrl = Vue.prototype.CompanyUrl + "delmembergroupinfo" //删除员工接人组


Vue.prototype.GetTeacherGroupUrl = Vue.prototype.CompanyUrl + "getteachergrouplist" //获取老师开班设置
Vue.prototype.GetTeacherGroupInfoUrl = Vue.prototype.CompanyUrl + "getteachergroupinfo" //获取某个老师开班设置
Vue.prototype.AddTeacherGroupUrl = Vue.prototype.CompanyUrl + "addteachergroupinfo" //添加老师开班设置
Vue.prototype.DelTeacherGroupUrl = Vue.prototype.CompanyUrl + "delteachergroupinfo" //删除老师开班设置
Vue.prototype.GetAllSubCompanyTeachergroupByComidUrl = Vue.prototype.CompanyUrl + "getcompanyteachergroup" //获取某个公司下开课设置


Vue.prototype.GetCompanyTeacherplanUrl = Vue.prototype.CompanyUrl + "getcompanyteacherplanlist" //获取某个老师的计划
Vue.prototype.GetCompanyTeacherplanInfoUrl = Vue.prototype.CompanyUrl + "getcompanyteacherplaninfo" //获取某个老师一周课程的计划详情
Vue.prototype.DelCompanyTeacherplanInfoUrl = Vue.prototype.CompanyUrl + "delcompanyteacherplaninfo" //删除某个老师某门课的计划
Vue.prototype.UpdateCompanyTeacherplanInfoUrl = Vue.prototype.CompanyUrl + "updatecompanyteacherplaninfo" //修改某个老师某门课的计划的时间
Vue.prototype.GetCompanyTeacherOneplanInfoUrl = Vue.prototype.CompanyUrl + "getcompanyteacheroneplaninfo" //获取某个老师某门课的计划详情
Vue.prototype.AddCompanyTeacherplanInfoUrl = Vue.prototype.CompanyUrl + "addcompanyteacherplaninfo" //添加某个老师某门课的计划
Vue.prototype.SelectCompanyTeacherplanCategorylistUrl = Vue.prototype.CompanyUrl + "getcompanyteacherplacategorynweeklist" //查询某个老师某门课一周的计划


Vue.prototype.GetTwtatisticsUrl = Vue.prototype.CompanyUrl + "gettwtatistics" //某学生的体温数据查询
Vue.prototype.GetAllSubCompanyCategoryByComidUrl = Vue.prototype.CompanyUrl + "getsubcompanycategory"  //通过com_id获取子公司所有分类
Vue.prototype.GetAllStudentsByComidCatidUrl = Vue.prototype.CompanyUrl + "getstudentsbycategory"  //通过com_id，catid获取所有学生

Vue.prototype.SetCompanyTiaokeUrl = Vue.prototype.CompanyUrl + "setcompanytiaoke"  //通过com_id，catid获取所有学生

//常用函数
Vue.prototype.ScanAudio = function(str){
	var music = null;
	music = uni.createInnerAudioContext(); //创建播放器对象
	music.autoplay = "policy";
	//music.src= url; //选择播放的音频  
	music.src= "/static/music/"+str+".mp3"; //选择播放的音频   
	music.play(); //执行播放        
}


//获取年份
Vue.prototype.GetStudyYear = function () {	
	var startdate = new Date(this.STUDYTIME);
	var enddate = new Date();	
	var year_e = enddate.getFullYear(); //获取当前日期的年份
	var year_s = 2019; //获取开始日期的年份
	
	var arr = new Array();
	var y = year_s;
	var len = (year_e - y + 1);	
	var str;
	for(var i = 0; i < len; i++){		
		arr[i] = y+i;
	}	
	//把数组给反过来
	return arr.reverse();
}


//获取月份
Vue.prototype.GetStudyMonth = function () {	
	var startdate = new Date(this.STUDYTIME);
	var enddate = new Date();			   	
	var year_s = startdate.getFullYear(); //获取开始日期的年份
	var month_s = startdate.getMonth(); //获取开始日期的月份
	
	var year_e = enddate.getFullYear(); //获取当前日期的年份
	var month_e = enddate.getMonth() ; //获取当前日期的月份
	
	var arr = new Array();
	var y = year_s;
	var m = month_s;
	var len = (year_e - y)*12 - m + month_e;	
	m = m + 1;
	var str;
	for(var i = 0; i < len; i++){
		m = m + 1;
		if(m > 12){
			y = y + 1;
			m = 1;
		}
		str = "00"+m;
		arr[i] = y + "-" + str.substr(str.length-2,str.length);
	}	
	//把数组给反过来
	return arr.reverse();
}



Vue.prototype.getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(this.USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

//强制返回到前一个页面
Vue.prototype.reLaunchurl = function(url){	
	uni.reLaunch({
		url: url,
	});	
}
//普通跳转到某一页面
Vue.prototype.navigateTo = function(url){	
	uni.navigateTo({
		url: url,
	});	
}

//获取缓存中的用户信息
Vue.prototype.getUserInfo = function(){
	let ret = uni.getStorageSync(this.USERS_KEY);
	if(!ret){
		ret = '[]';
	}	
	return ret;
}

//退出
Vue.prototype.quit = function(){
	try {
		uni.clearStorageSync();  
	} catch (e) {  
	// error  
	}
	//this.logout();
	
	/**
	 * 如果需要强制登录跳转回登录页面
	 */	
	this.reLaunchurl('/pages/users/login/login');
}

//检查用户登录状态
Vue.prototype.checkLogin = function(identity){
	let that = this;
	let ret = that.getUserInfo();
	if(ret == undefined || ret == "" || ret.identity == undefined || ret.identity == ""){
		uni.reLaunch({
		    url: '/pages/users/login/login',
		});
	}
	let status = 1;
	//检查身份,1为家长 2为机构 3为老师
	if(parseInt(identity) > 0){ //检查此人身份能否查看这个栏目里面的内容
		if(parseInt(identity) == parseInt(ret.identity)) {
			status = 1;
		}else{
			status = 0;
		}
	}
	
	if(status == 1){		
		var now = new Date();
		var year = now.getFullYear(); //得到年份
		var month = now.getMonth();//得到月份
		var date = now.getDate();//得到日期
		month = month + 1;
		if (month < 10) month = "0" + month;
		if (date < 10) date = "0" + date;
		var time = "";
		time = year + "-" + month + "-" + date;
		
		var ret_time = ret.time
		if(ret_time != time){ //去服务器上验证一次
			/* that.sendRequest({
			url : that.CheckTokenUrl,
				method :that.Method,
				data : {
					"token": ret.token,
					"guid": ret.guid,
					"username":ret.username,
					"t":Math.random()
				},
				hideLoading : false,
				success: (res) => {
						var data = res;
						if(data.status == 1){
							try {
								uni.removeStorageSync(that.USERS_KEY);
							} catch (e) {
								
							}           
							uni.setStorage({
								key:that.USERS_KEY,
								data:{
									id:ret.id,
									mobile:ret.mobile,
									username:ret.username,
									guid:ret.guid,
									token:ret.token,
									time:time,
									identity:ret.user_identity,
									is_brithday:data.is_brithday,
									pay_status:data.pay_status,
									manageid:data.manageid
								}
							});					
						}else{
							uni.reLaunch({
								url: '/pages/users/login/login',
							});
						}				
					}
				
			},"1",""); */
		}
	}else{
		try {
			uni.removeStorageSync(that.USERS_KEY);
		} catch (e) {
			
		} 
		uni.reLaunch({
			url: '/pages/users/login/login',
		});
	}
}

//重置密码
Vue.prototype.ResetPassword = function(userInfo){
	let _self = this;	
	_self.sendRequest({
			url : this.ResetPasswordrUrl,
		    method : _self.Method,
		    data : {
				"mobile": userInfo.mobile,
				"password":userInfo.password,
				"againpassword":userInfo.againpassword,
				"code":userInfo.code,
				"t":Math.random()
			},
		    hideLoading : false,
		    success:function (res) {
				var data = res;
				switch(parseInt(data.status)){
					case 0:{
						uni.showToast({
							title: '两次密码不一致，请更换',
							mask: true,
							duration: 1500
						});
						break;
						}
					case 1:{
						uni.showToast({
							title: '手机号码不存在',
							mask: true,
							duration: 1500
						});
						break;
					}
					case 2:{
						uni.showToast({
							title: '手机号码已被使用，请更换',
							mask: true,
							duration: 1500
						});
						break;
					}
					case 3:{
						uni.showToast({
							title: '重置密码成功，请登录!',
							mask: true,
							duration: 1500,
							success: function(){
								setTimeout(function() {
								    uni.reLaunch({  
										url: '../login/login'  
									});
								}, 2000);
							}  
						});
						break;
					}				
					case 4:{
						uni.showToast({
							title: '验证码不正确',
							mask: true,
							duration: 1500
						});
						break;
					}
					default:{
						uni.showToast({
						    title: '重置密码失败，请检查'
						});
						break;
					}
				}
				
				
		    }
		},"1","");
}

Vue.prototype.addUsers = function(userInfo){
	//if(userinfo == undefined) return;
	uni.request({
		url:this.RegisterUrl,
		header: {
	             "Content-Type": "application/x-www-form-urlencoded"							 
	    },
	    data: {
	        "mobile": userInfo.mobile,
			"password":userInfo.password,
			"againpassword":userInfo.againpassword,
			"code":userInfo.code,
			"recommend":userInfo.recommend,
			"t":Math.random()
	    },
	    method: this.Method,
		success: (res) => {
			var data = res.data;
			switch(parseInt(data.status)){
				case 0:{
					uni.showToast({
						title: '两次密码不一致，请更换',
						mask: true,
						duration: 1500
					});
					break;
					}
				case 1:{
					uni.showToast({
						title: '用户名已被使用，请更换',
						mask: true,
						duration: 1500
					});
					break;
				}
				case 2:{
					uni.showToast({
						title: '手机号码已被使用，请更换',
						mask: true,
						duration: 1500
					});
					break;
				}
				case 3:{
					uni.showToast({
						title: '注册成功，请登录!',
						mask: true,
						duration: 1500,
						success: function(){  
							setTimeout(function() {
							    uni.reLaunch({  
									url: '../login/login'  
								});
							}, 2000);
						}  
					});
					break;
				}				
				case 4:{
					uni.showToast({
						title: '验证码不正确',
						mask: true,
						duration: 1500
					});
					break;
				}
				default:{
					uni.showToast({
					    title: '注册失败，请检查'
					});
					break;
				}
			}
		}
	});
}

/*
catid:1 课签到 2吃饭签到 3员工签到
status:1签到 2请假 3旷课
ulist:学生id
url:返回的Url地址
*/
Vue.prototype.setSign = function (catid,status,ulist,url,length) {
    let that = this;
	let ret = that.getUserInfo();
	const data = {
	    guid: ret.guid,
	    token: ret.token
	};
	uni.request({
		url: that.SetsignUrl,
		header: {
	        "Content-Type": "application/x-www-form-urlencoded"							 
	    },
	    data: {
			"guid": data.guid,
			"token":data.token,
			"status":status,
			"catid":catid,
			"uidlist":ulist,
			"t":Math.random()
	    },
	    method: that.Method,
		success: (res) => {
			if(res.data){
				let str = '学生';
				if(catid == 3){
					str = '员工';
				}
				let data = res.data.list; 
				switch(parseInt(res.data.status)){
					case 0:{
						uni.showToast({
							title: '操作失败',
							icon: 'none',
						});
					}
					case 2:{						
						uni.showToast({
							title: '请选择要操作的'+str,
							icon: 'none',
						});
					}
					case 3:{
						var items = that.ulist;
						var v1,v2,com_id,category_id,uid;
						var num;
						if(catid < 3){  //学生签到和吃饭签到//删除掉已经签到的记录
							for(var i = 0;i < items.length;i++){ //存在ulist中的记录,已经被删除掉了
								v1 = items[i];
								for(var j = 0;j<that.dataList.length;j++){
									com_id = that.dataList[j].com_id;
									let categorylist = that.dataList[j].categorylist;			
									for(var jj = 0; jj < categorylist.length; jj++){
										category_id = categorylist[jj].cat_id;
										let studentslist = categorylist[jj].studentslist;
										num = -1;
										for(var k = 0; k < studentslist.length; k++){
											uid = studentslist[k].uid;
											v2 = com_id + '-' + category_id +'-' + uid;
											num ++;
											if(v1 == v2){
												that.dataList_num -- ;
												that.dataList[j].categorylist[jj].studentslist.splice(num, 1);
											}
										}
									}
								}
							}
						}else{
							/* debugger;*/
							//员工签到 删除掉已经签到的记录
							for(var i = 0;i < items.length;i++){ //存在ulist中的记录,已经被删除掉了
								v1 = items[i];
								for(var j = 0;j<that.dataList.length;j++){
									com_id = that.dataList[j].com_id;
									let memberlist = that.dataList[j].memberlist;
									num = -1;
									for(var k = 0; k < memberlist.length; k++){
										uid = memberlist[k].id;
										v2 = uid;
										num ++;
										if(v1 == v2){
											that.dataList_num -- ;
											that.dataList[j].memberlist.splice(num, 1);
										}
									}
									
								}
							} 
							
						}
						if(num == that.dataList_num && that.dataList_num > 0){
							that.isCheckedAll = true;
						}else{
							that.isCheckedAll = false;
						}
						uni.showModal({
						    title: "签到成功",
						    content: '请选择返回的页面',
							cancelText:'留在本页',
							confirmText:'返回主页',
						    success: function (res) {
						        if (res.confirm) {
									that.navigateTo('/pages/company/company/index');
									
						        } else if (res.cancel) {
									//that.navigateTo('/pages/company/company/'+url);
						        }
						    }
						});
						
					}
				}
			}
		}
	});	
}

//获取临时sessionid
Vue.prototype.getcurrentsession = function(){
	let that = this;
	uni.removeStorage({
	    key:that.Temp_KEY,
	    success:function() {
	        //console.log(' 移除成功')　　　　　
	    }
	});
	let ret = uni.getStorageSync(that.Temp_KEY);
	if(!ret){//如果不能获取的话，获取新的sessionid
		that.getsessionsi();
	}
}

Vue.prototype.getsessionsi = function(){
	uni.request({
		url:this.getSessionUrl,
		header: {
	        "Content-Type": "application/x-www-form-urlencoded"
	    },
	    data: {
			"t":Math.random()
	    },
	    method: this.Method,
		success: (res) => {	
			var data = res.data;
			if( parseInt(data.status) == 3){
				uni.setStorage({
					key:this.Temp_KEY,
					data:data 
				});
			}
		}
	});	
}

//用于取回密码
Vue.prototype.sendsms = function (userInfo) {	
	uni.request({
		url:this.SendSmsUrl,
		header: {
	             "Content-Type": "application/x-www-form-urlencoded"							 
	    },
	    data: {
			"token":userInfo.token,
	        "mobile": userInfo.mobile,
			"t":Math.random()
	    },
	   method: this.Method,
		success: (res) => {
			var data = res.data;
			switch(parseInt(data.status)){
				case 0:{ //
					uni.showToast({
						title: '出错',
						mask: true,
						duration: 1500
					});
					break;
					}
				case 1:{ //
					uni.showToast({
						title: '出错2',
						mask: true,
						duration: 1500
					});
					break;
				}
				case 2:{
					uni.showToast({
						title: '手机号码已被使用，请更换',
						mask: true,
						duration: 1500
					});
					break;
				}
				case 3:{
					uni.showToast({
						title: '发送成功,请在5分钟内输入',
						mask: true,
						duration: 1500
					});
					break;
				}				
				case 4:{
					uni.showToast({
						title: '验证码不正确',
						mask: true,
						duration: 1500
					});
					break;
				}
				default:{
					uni.showToast({
					    title: '操作失败，请检查'
					});
					break;
				}
			}
		}
	});
}

/*
 datainfo.status=1发送验证码短信，2取回密码短信，3生日祝福短信
*/
//发送短信
Vue.prototype.sendsms2 = function(datainfo){
	var _self = this;	
	_self.sendRequest({
	       url : _self.SendSmsUrl,
	       method : _self.Method,
	       data : {
			"token":datainfo.token,
			"mobile":datainfo.mobile,
			"status":datainfo.status,
			"smsid":datainfo.smsid,
			"t":Math.random()
		   },
	       hideLoading : false,
	       success:function (res) {
			var data = res;
			switch(parseInt(data.status)){
				case 1:{
					let str = '';
					switch(parseInt(datainfo.status)){
						case 1:{
							str = '此号码已经存在,无法注册';
							break;
						}
						case 2:{
							str = '此号码不存在，无法取回密码';
							break;
						}						
					}					
					uni.showToast({
						title: str,
						mask: true,
						duration: 1500
					});
					
					break;
				} 
				case 2:{
					uni.showToast({
						title: '短信已获取，请在5分钟后再次点击获取',
						mask: true,
						duration: 1500
					});
					break;
				}
				case 3:{
					uni.showToast({
						title: '短信发送成功，请在5分钟内填写',
						mask: true,
						icon:"none",
						duration: 1500
					});
					_self.gonext(); //跳回到下一页 
					break;
				}
				case 5:{					
					uni.showToast({
						title: '此号码已被使用，无法更换',
						mask: true,
						icon:"none",
						duration: 1500
					});
					break;
				}
				
				default:{
					uni.showToast({
						title: '发送失败',
						mask: true,
						duration: 1500
					}); 
					break;
				}
			}
	       }
	   },"1","");
}

Vue.prototype.navTo = function (item,index) {
	let _this = this;
	if (item.nav !== _this.currentPage) {
	    var isUrl = `/pages/${item.url}`;
	    const that = this;
		uni.navigateTo({
		    url: isUrl
		});
	} else {
	        /* this.$parent.toTop() */
	}
}

Vue.prototype.ScanAudio = function(mp3_name){
	var music = null;
	music = uni.createInnerAudioContext(); //创建播放器对象
	music.src= "/static/music/"+mp3_name+".mp3"; //选择播放的音频
	music.play(); //执行播放
}

//网络请求封装
Vue.prototype.sendRequest = function(param, backtype,backpage){
	var backpage = '';
	if(backpage == '') {
		backpage = '/pages/users/login/login';
	}
	
	var _self = this,
	url = param.url,
	method = param.method,
	header = {},
	data = param.data || {}, 
	token = "",
	hideLoading = param.hideLoading || false;        
    
	//console.log("当前url:" + url);
    //拼接完整请求地址
    var requestUrl = url;
    //固定参数:仅仅在小程序绑定页面通过code获取token的接口默认传递了参数token = login
   /* if(!data.token){//其他业务接口传递过来的参数中无token
        token = uni.getStorageSync(_self.USERS_KEY);//参数中无token时在本地缓存中获取
        console.log("当前token:" + token);
        if(!token){//本地无token需重新登录(退出时清缓存token)
            _self.login(backpage, backtype);
            return;
        }else{
            data.token = token;
        }
    } */
    var timestamp = Date.parse(new Date());//时间戳
    data["timestamp"] = timestamp;
    // #ifdef MP-WEIXIN
		data["device"] = "wxapp";
		data["ver"] = "1.1.30";
    // #endif
    // #ifdef APP-PLUS || H5
		data["device"] = "iosapp";
		data["ver"] = "1.0.0";
    // #endif
    //请求方式:GET或POST(POST需配置header: {'content-type' : "application/x-www-form-urlencoded"},)
    if(method){
        method = method.toUpperCase();//小写改为大写
		header = {'content-type' : "application/x-www-form-urlencoded"};
        /* if(method=="POST"){
            header = {'content-type' : "application/x-www-form-urlencoded"};
        }else{
            header = {'content-type' : "application/json"};
        } */
    }else{
        method = "GET";
        header = {'content-type' : "application/json"};
    }
    //用户交互:加载圈
    if (!hideLoading) {
        uni.showLoading({title:'加载中...'});
    }
    
    //console.log("网络请求start");
    //网络请求
    uni.request({
        url: requestUrl,
        method: method,
        header: header,
        data: data,
        success: res => {
            //console.log("网络请求success:" + JSON.stringify(res));
            if (res.statusCode && res.statusCode != 200) {//api错误
				if(_self.errorinfo == 1){
					uni.showModal({
						content:"" + res.errMsg
					});
				}
                return;
            }
            if (res.data.code) {//返回结果码code判断:0成功,1错误,-1未登录(未绑定/失效/被解绑)
                if (res.data.code == "-1") { //未登录
                    _self.login(backpage, backtype);
                    return;
                }
                if (res.data.code != "0") { //错误
					if(_self.errorinfo == 1){
						uni.showModal({
							showCancel:false,
							content:"" + res.data.msg
						});
					}
                    return;
                }
            } /* else{
                uni.showModal({
                    showCancel:false,
                    content:"No ResultCode:" + res.data.msg
                });
                return;
            } */
            typeof param.success == "function" && param.success(res.data);
        },
        fail: (e) => {
            //console.log("网络请求fail:" + JSON.stringify(e));
			if(_self.errorinfo == 1){
				uni.showModal({
					//content:"" + e.errMsg + "==" +requestUrl
					content:"" + e.errMsg
				});
			}
            typeof param.fail == "function" && param.fail(e.data);
        },
        complete: () => {
            //console.log("网络请求complete");
            if (!hideLoading) {
                uni.hideLoading();
            }
            typeof param.complete == "function" && param.complete();
            return;
        }
    });
}


App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
