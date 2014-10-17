function validator(options) {
	this.options = options;
	this.fillOptions = function() {
		for (var name in this.options) {
			this.rules[name] = options[name];
		}
	};
	this.rules = {
		email : {
			/**
			 * 表单类型为email的验证方法
			 */
			validate : function(value) {
				return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
			},
			errorMsg : '请输入正确的邮箱地址', // 错误提示信息
			defaultValue : 'kerbores@gmail.com'// 默认值
		},
		phone : {
			validate : function(value) {
				return /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/.test(value);
			},
			defaultValue : '13888888888',
			errorMsg : '电话号码不符合规范'
		},
		number : {
			validate : function(value) {
				return /^[\d]+$/.test(value);
			},
			defaultValue : '0',
			errorMsg : '只能输入数字'
		},
		integer : {
			validate : function(value) {
				return /^[\d]+$/.test(value) && value >= 0;
			},
			defaultValue : '0',
			errorMsg : '只能输入正数'
		},
		chinese : {
			validate : function(value) {
				return /^[\u4e00-\u9fa5]*$/.test(value);
			},
			defaultValue : '中文',
			errorMsg : '只能输入中文汉字'
		},
		url : {
			validate : function(value) {
				return /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/.test(value);
			},
			defaultValue : 'http://www.kerbores.com',
			errorMsg : '请输入正确的url地址'
		}
	};
	/**
	 * 验证结束时的回调
	 *
	 * @param status
	 *          验证状态
	 * @param dom
	 *          被验证的表单
	 * @param errorMsg
	 *          错误信息
	 * @param defaultValue
	 *          默认值
	 */
	this.validationcallBack = function(status, dom, errorMsg, defaultValue) {
		// 验证失败时候调用
		$(dom).addClass( status ? "success" : "fail").removeClass( status ? "fail" : "success");
		// 成功的时候添加成功样式,失败的时候添加失败样式
		status ? $.noop() : function() {
			// 默认弹出错误提示并将表单的值设置成默认值
			alert(errorMsg);
			$(dom).val(defaultValue);
		}.call();
		// 成功的话什么都不做,失败的话就调用这个匿名函数
	};
	this.validationForm = function(input, callback) {
		callback = callback ? callback : this.validationcallBack;
		// 检查是否传入了回调,没有传入的话就按照默认的进行处理
		var value = $(input).val();
		// 值
		var type = $(input).attr("v-type");
		// 类型
		var defultValue = $(input).attr("defaultValue") ? $(input).attr("defaultValue") : this.rules[type].defaultValue;
		// 默认值
		var errorMsg = $(input).attr("errorMsg") ? $(input).attr("errorMsg") : this.rules[type].errorMsg;
		// 错误信息
		var reg_ = type == "reg" ? eval($(input).attr("reg")) : /^$/;
		// 正则
		var check_result = type != "reg" ? this.rules[type].validate(value) : reg_.test(value);
		// 提供回调处理验证结果的提示方式 详见demo
		callback(check_result, input, errorMsg, defultValue);
		return check_result;
	}, this.addRule = function(name, value) {
		this.rules[name] = value;
	};
}

// 扩展成插件,此函数返回的失败则是整个form中的表单项的验证结果,只要有一项未通过,那么就是未通过
$.fn.validation = function() {
	var v1 = arguments[0];
	var v2 = arguments[1];
	var callback = $.isFunction(v1) ? v1 : undefined;
	var options = $.isFunction(v1) ? v2 : v1;
	var va = new validator(options);
	va.fillOptions();
	if (!this.length) {
		console ? console.warn("Nothing selected, can't validate, returning nothing.") : $.noop();
		return;
	};
	var flag = {};
	// 验证结果数组
	$(this).each(function(i, item) {
		var result = va.validationForm(item, callback);
		flag[i] = result;
	});
	for (var i in flag) {
		if (!flag[i]) {
			return flag[i];
		}
	}
	return true;
};

//扩展一个邮编验证器
var options = {
	post : {
		validate : function(value) {
			return /^[1-9]\d{5}(?!\d)$/.test(value);
		},
		defaultValue : '400000',
		errorMsg : '来一个邮政编码'
	}
};
//使用默认的回调进行处理
function submit() {
	$("input").validation(options);
}

function submit1() {
	$("input").validation(function(status, dom, errorMsg, defaultValue) {
		$(dom).addClass( status ? "success" : "fail").removeClass( status ? "fail" : "success");
		status ? $.noop() : function() {
			$(dom).val(errorMsg);
			//将错误信息填入表单让用户看到提示而且界面不会有抖动
		}.call();
	}, options);
}