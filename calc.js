var ten = bigInt(10);

function reverse(x){
	var temp = "";
	x = x.toString();
	for(var i = x.length - 1; i >= 0; i--){
		temp += x[i];
	}
	return bigInt(temp);
}


function f(x){
	var output = "The reverse of 2 ^ " + x + " is <br><br>";
	var temp = async_pow(x);
	if (temp == -1)
		return -1;
	x = reverse(temp);
	if (x == -1)
		return;
	var s = x.toString();
	for(var i = 0; i < s.length; i++){
		output += s[i];
		if (i % 100 == 99)
			output += "<br>"
	}
	var times = 0;
	while(true){
		if (x.equals(1))
			return output + "<br><br>It is exactly 5 ^ " + times + ".";
		var r = x.divmod(5);
		if (!r["remainder"].equals(0))
			return output + "<br><br>It is divisible by 5 \"" + times + "\" times.<br><br><br>";
		times ++;
		x = r["quotient"];
	}
	
}

mem_pow = {1: bigInt(2), 0: bigInt(1)}

function async_pow(p){
	if (mem_pow[p] != undefined)
		return mem_pow[p];
	var todo = {}
	todo = Object.keys(async_add(p, todo)).sort(function(a, b){
		return a - b;
	});
	async_pow_calc(todo, 0);
	return -1;
}

function async_add(p, todo){
	if (todo[p] != undefined || mem_pow[p] != undefined)
		return;
	todo[p] = 0;
	var p1 = Math.floor(p / 2);
	var p2 = p - p1;
	async_add(p1, todo);
	async_add(p2, todo);
	return todo;
}

function async_pow_calc(todo, i){
	if (todo.length <= i)
		return;
	if (mem_pow[p] != undefined)
		return;
	var p = todo[i];
	var p1 = Math.floor(p / 2);
	var p2 = p - p1;
	mem_pow[p] = mem_pow[p1].times(mem_pow[p2]); 
	if (p > 100000)
		setTimeout(function(){async_pow_calc(todo, i + 1)}, 500);
	if (p > 1000)
		setTimeout(function(){async_pow_calc(todo, i + 1)}, 200);
	else
		setTimeout(function(){async_pow_calc(todo, i + 1)}, 10);
}

function do_stuff(x){
	var temp = f(x);
	if (f(x) == -1)
		return false;
	$("#text").append(f(x));
	return true;
}

var cur = 1;

function calc(){
	if (do_stuff(cur))
		cur++;
	setTimeout(calc, 10);
}

calc();

function skipAhead(){
	
	var temp = parseInt($("#skipahead").val());
	if (!isNaN(temp)){
		$("#text").text("");
		cur = temp;
	}
	
}