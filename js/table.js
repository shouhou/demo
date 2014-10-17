selectedRow = [];
//设置行选中状态
var trs = BaseJs.getByTagName("tr", BaseJs.$("tab"));
for (var i = 0; i < trs.length; i++) {
	(function() {
		var tr = trs[i];
		trs[i].onclick = function() {
			if (tr.selected) {
				tr.style.background = "#FAFCFE";
				tr.selected = false;
				for ( i = 0; i < selectedRow.length; i++) {
					if (selectedRow[i] == tr.id) {
						selectedRow.splice(i, 1);
					}
				};
				BaseJs.$("mid").value = selectedRow.join(",");
			} else {
				tr.style.background = '#B8CCF0';
				tr.selected = true;
				selectedRow.push(tr.id);
				BaseJs.$("mid").value = selectedRow.join(",");
			}
		};
	})();
}

table = new BaseJs.EditTable({
	// 表对象
	table : BaseJs.$("tab"),
	// 从第几行第几列开始可编辑
	start : [2, 1],
	// 到哪一行哪一列结束编辑 不写默认所有,写一个参数代表列,行不限
	end : [],
	// 新增操作
	addAction : {
		// (button)执行操作的按钮,
		button : BaseJs.$('add'),
		// callback:执行操作后的回调函数，能够加入一些自定义操作
		callback : function(tr) {
			tr.onclick = function() {
				var trs = BaseJs.getByTagName("tr", BaseJs.$("tab"));
				for (var i = 0; i < trs.length; i++) {
					trs[i].style.background = '#FAFCFE';
				}
				tr.style.background = '#B8CCF0';
			};
		}
	},
	// 保存新增或更新操作
	saveOrUpdateAction : {
		button : BaseJs.$('save'),
		// 提交更新url,后台取参数data,为json字符串
		url : 'saveOrUpdateActionUrl',
		//返回true执行保存操作
		beforeCallback : function(data) {
			alert("提交给后台url:saveOrUpdateActionUrl?data=" + BaseJs.encode(data));
			return false;
		},
		afterCallback : function(mo) {
			alert("提交修改后的数据:" + mo);
			//document.location.reload();
		}
	},
	// 删除操作
	delAction : {
		button : BaseJs.$('delete'),
		// 删除url 可用函数返回动态url
		url : function() {
			return 'delActionUrl&mid=' + document.getElementById("mid").value;
		},
		//返回true执行删除操作
		beforeCallback : function() {
			alert("提交给后台url:delActionUrl?ids=" + document.getElementById("mid").value);
			return false;
		},
		afterCallback : function() {
			document.location.reload();
		}
	},
	// id名(记录的id值需要保存在tr.id上)
	primaryKey : 'id',
	// 要全并的列数集合 [0]代表第一列要执行合并操作,[0,1]代表1，2列有合并操作
	mergeColumn : [],
	// 列描述对象 ,包含一个数组，数组中每一个对象说明一个列编辑对象和相关处理
	column : [{
		name : 'year',
		// 选择型
		editorType : 'select',
		// 加载select数据url,返回json数据，格式应为:[{display:'',value:''},{display:'',value:''}]
		dataUrl : 'WaterQualityAction?method=AjaxSelect&para=LEVEL',
		//可以动态返回
		//dataUrl : function(me){
		//  return  'WaterQualityAction?method=AjaxSelect&para=LEVEL';
		//},
		//本地数据 有此选项时dataUrl无效
		data : "[{display:'2005年',value:'2005'},{display:'2004年',value:'2004'},{display:'2003年',value:'2003'},{display:'2002年',value:'2002'},{display:'2001年',value:'2001'}]",
		// 新增默认值，不写使用默认
		defaultValue : '2008年',
		// 检验输入数据正确性,返回true通过验证
		validate : function(v, obj) {
			alert("现在检验输入数据合法性!");
			return true;
		}
	}, {
		name : 'com',
		editorType : 'text',
		defaultValue : '请输入',
		validate : function(v, obj) {
			if (!/^[0-9]+$/.test(v)) {
				alert("必须是数字");
				return false;
			};
			return true;
		}
	}, {
		name : 'cn',
		editorType : 'text',
		defaultValue : '请输入',
		validate : function(v, obj) {
			if (!/^[0-9]+$/.test(v)) {
				alert("必须是数字");
				return false;
			};
			return true;
		}
	}, {
		name : 'date_month',
		// 日期型
		editorType : 'date',
		// 格式化日期样式,默认yyyy-MM
		format : 'yyyy年MM月份',
		//自定义默认值
		defaultValue : BaseJs.Utils.format.date(new Date(), 'yyyy年MM月份')
	}]
});
