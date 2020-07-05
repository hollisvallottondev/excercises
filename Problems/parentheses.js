const calculateMinInserParentheses = (s) => {
	let result = 0;
	let open = []; 
	for(let parenthesis of s){
		if(parenthesis === ')'){
			let value = open.pop();
			if(!value){
				result++;
			} 
		}else{
			open.push(parenthesis);
		}
	}
	return result + open.length;
}


let min = calculateMinInserParentheses(')()()'); 
console.log('Needed', min);