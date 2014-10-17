function $(id) {
	return (!!id) ? document.getElementById(id) : null;
}

(function(windows) {
	function Drag() {
		//alert("hello!");
	}
	
	Drag.prototype = {
		constructor : Drag,
		sayName : function() {
			alert("sayName");
		}
	};
	var drag = new Drag();
	drag.sayName();
})(window);


