/*var name;
exports.setName=function(_name){
	name=_name;
};
exports.getName=function(){
	console.log('Hello:'+name);
};*/


function Hello(){
	var name;
	this.setName=function(_name){
		name=_name;
	};
	this.getName=function(){
		console.log('Hello:'+name);
	}
}
modules.exports=Hello;
