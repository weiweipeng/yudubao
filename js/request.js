$(function () {
	var localhostDev=true;
    //如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
	//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://60.205.139.23:10012’
	var _host= localhostDev ? 'http://180.168.86.30:3246' : '';
	window.httpUrl={
		'Login':_host+'/api/Account/Login',//登陆
		'TeacherTaskStatisticsDetailList':_host+'/api/TeacherTask/TeacherTaskStatisticsDetailList',//成绩统计班级信息
		'GetTeacherInfo':_host+'/api/Teacher/GetTeacherInfo',//获取老师信息
		'GetStudentInfo':_host+'/api/Student/GetStudentInfo',//获取学生信息
		'GetPageEnglishArticleTaskHistoryBase':_host+'/api/EnglishArticleTaskHistoryBase/GetPageEnglishArticleTaskHistoryBase',//查询英语历史任务
		// 'GetPageEnglishArticleTaskHistoryBase':_host+'/GetPageEnglishArticleTaskHistoryBase',//查询英语历史任务
		'GetPageClassStudent':_host+'/api/ClassStudent/GetPageClassStudent',//获取学生的班级列表
		'GetStudentsListByClassID':_host+'/api/ClassManager/GetStudentsListByClassID',//获取班级学生列表
		'TeacherTaskPersonalListAll':_host+'/api/TeacherTask/TeacherTaskPersonalListAll',//教师发布的个人任务
		'TeacherTaskListAll':_host+'/api/TeacherTask/TeacherTaskListAll',//获取老师发布的任务
		'GetPageClassTaskList':_host+'/api/EnglishArticleTaskHistoryBase/GetPageClassTaskList',//学生查询班级任务
		'TeacherTaskStatisticsList':_host+'/api/TeacherTask/TeacherTaskStatisticsList',//获取成绩列表
		'GetQuestionListByPersonalTaskId':_host+'/api/TeacherTask/GetQuestionListByPersonalTaskId',//教师发布个人任务详情
		'SendPersonalTask':_host+'/api/TeacherTask/SendPersonalTask',//发布个人任务
		'TeacherTaskListClassAll':_host+'/api/TeacherTask/TeacherTaskListClassAll',//指定班级老师发布的任务
		'GetClassListByTeacherID':_host+'/api/ClassManager/GetClassListByTeacherID',//获取班级信息
		'GetUnitList':_host+'/api/EnglishArticleQuestion/GetUnitList',//获取单元列表
		'GetStudentInfo':_host+'/api/Student/GetStudentInfo',//获取学生信息
		'SendClassTask':_host+'/api/TeacherTask/SendClassTask',//发送任务
		'GetLoginAccount':_host+'/api/UserAccount/GetLoginAccount',//获取当前账户信息
		'GetSMSCode':_host+'/api/Verification/GetSMSCode',//获取短信验证码
		'GetVerifyCode':_host+'/api/Verification/GetVerifyCode',//获取图片验证码
		'UpdatePwdByPhone':_host+'/api/Account/UpdatePwdByPhone',//更新密码
		'VerifyRegPhoneNumber':_host+'/api/Account/VerifyRegPhoneNumber',//验证手机号
		'VerifyRegAccount':_host+'/api/Account/VerifyRegAccount',//验证用户名、账号是否被注册
		'RegUserAccount':_host+'/api/Account/RegUserAccount',//注册
		'GetArticleList':_host+'/api/EnglishArticleQuestion/GetArticleList',//获取章节列表
		'GetAreaList':_host+'/api/Areas/GetAreaList',//获取区域列表
		'GetSchoolListByArea':_host+'/api/School/GetSchoolListByArea',//注册时获取学校列表
		'GetEnglishArticleWithQuestion':_host+'/api/EnglishArticleQuestion/GetEnglishArticleWithQuestion',//获取班级任务列表
		'TeacherTaskListAll':_host+'/api/TeacherTask/TeacherTaskListAll',//获取老师发布的所有的任务列表
		'GetQuestionListByPersonalTaskId':_host+'/api/TeacherTask/GetQuestionListByPersonalTaskId',//任务列表查看题目
		'TeacherTaskListClassAllWithoutFuture':_host+'/api/TeacherTask/TeacherTaskListClassAllWithoutFuture',//获取学生练习篇章列表
		'GetQuestionListByClassTaskId':_host+'/api/TeacherTask/GetQuestionListByClassTaskId',//更具班级获取题目篇章
		'AddEnglishArticleTaskHistoryBase':_host+'/api/EnglishArticleTaskHistoryBase/AddEnglishArticleTaskHistoryBase',//学生提交答案
		'GetEnglishArticleTaskHistoryBaseRepeatList':_host+'/api/EnglishArticleTaskHistoryBase/GetEnglishArticleTaskHistoryBaseRepeatList',//学生成绩列表详情
	    'GetPageEnglishArticleTaskWrongBase':_host+'/api/EnglishArticleTaskWrongBase/GetPageEnglishArticleTaskWrongBase',//学生错题库
	    'GetEnglishArticleTaskWrongBaseList':_host+'/api/EnglishArticleTaskWrongBase/GetEnglishArticleTaskWrongBaseList',//学生错题详情
	    'TeacherTaskListClassAll':_host+'/api/TeacherTask/TeacherTaskListClassAll',//老师指定班级所有任务
	    'TeacherTaskPersonalListAll':_host+'/api/TeacherTask/TeacherTaskPersonalListAll',//老师制定学生个人所有任务
	    'TeacherTaskListWrong':_host+'/api/TeacherTask/TeacherTaskListWrong',//老师错题库列表
	    'LiteraryStyle':_host+'/api/TeacherStatistics/LiteraryStyle',//文体统计评估
	    'BigKnowledgePoint':_host+'/api/TeacherStatistics/BigKnowledgePoint',//大能力点统计
	    'ScoreAndSpeed':_host+'/api/TeacherStatistics/ScoreAndSpeed',//成绩与速度统计
	    'QuestionType':_host+'/api/TeacherStatistics/QuestionType',//题型统计
	    'SmallKnowledgePoint':_host+'/api/TeacherStatistics/SmallKnowledgePoint',//小能力点统计
	    'GetStuRankingTaskHistoryBase':_host+'/api/EnglishArticleTaskHistoryBase/GetStuRankingTaskHistoryBase',//学生排行榜
	    'Topic':_host+'/api/TeacherStatistics/Topic',//老师话题统计
	    'sTopic':_host+'/api/StudentStatistics/Topic',//学生话题统计
	    'SLiteraryStyle':_host+'/api/StudentStatistics/LiteraryStyle',//学生问题统计
	    'SScoreAndSpeed':_host+'/api/StudentStatistics/ScoreAndSpeed',//学生成绩和速度统计
	    'SBigKnowledgePoint':_host+'/api/StudentStatistics/BigKnowledgePoint',//学生大能力点统计
	    'SQuestionType':_host+'/api/StudentStatistics/QuestionType',//学生题型统计
	    'SSmallKnowledgePoint':_host+'/api/StudentStatistics/SmallKnowledgePoint',//学生小能力点统计
	    'AddEnglishArticleTaskHistoryBase':_host+'/api/EnglishArticleTaskHistoryBase/AddEnglishArticleTaskHistoryBase',//提交学生练习
	    'ConfirmHistoryBaseStatus':_host+'/api/EnglishArticleTaskHistoryBase/ConfirmHistoryBaseStatus',//检测学生练习是否提交成功
        'GetStudentTaskHistoryBaseStatistics':_host+'/api/EnglishArticleTaskHistoryBase/GetStudentTaskHistoryBaseStatistics',//学生成绩统计
        'TeacherTaskPersonalStudentList':_host+'/api/TeacherTask/TeacherTaskPersonalStudentList',//获取
        'GetStudentsListByClassIDNoApproved':_host+'/api/ClassManager/GetStudentsListByClassIDNoApproved',//获取申请加入班级的学生列表
        'ApprovedClassStudent':_host+'/api/ClassManager/ApprovedClassStudent',//学生申请加入班级信息
        'TeacherTaskListClassAllMarking':_host+'/api/TeacherTask/TeacherTaskListClassAllMarking',//阅卷界面任务列表
        'TeacherTaskStudentList':_host+'/api/TeacherTask/TeacherTaskStudentList',//阅卷获取学生信息
        'StudentWriting':_host+'/api/TeacherTask/StudentWriting',//阅卷获取阅卷的信息

        'GetCourseList':_host+'/api/Course/GetCourseList',//购买页面获取课程列表
        'GetEditionList':_host+'/api/Edition/GetEditionList',//购买页面获取版本列表
        'GetGradeList':_host+'/api/Grade/GetGradeList',//购买页面获取年级列表
        'AddGoodsList':_host+'/api/ShoppingCart/AddGoodsList',//添加到购物车
        'AddGoods':_host+'/api/ShoppingCart/AddGoods',//添加单个商品
        'SubtractGoods':_host+'/api/ShoppingCart/SubtractGoods',//移除单个商品
        'GetShoppingCartList':_host+'/api/ShoppingCart/GetShoppingCartList',//获取商品信息
        'RemoGoods':_host+'/api/ShoppingCart/RemoGoods',//移除多个商品
        'SaveOrders':_host+'/api/Orders/SaveOrders',//保存订单
        'GetPayQRCode':_host+'/api/Orders/GetPayQRCode',//获取订单返回码
        'MakeQRCode':_host+'/api/Verification/MakeQRCode',//生成二维码
        'QueryyQrCodeState':_host+'/api/Orders/QueryyQrCodeState',//查询是否支付成功
	} 
	
    return httpUrl;
	
});