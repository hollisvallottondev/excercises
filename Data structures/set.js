class CustomSet {
	constructor(initialValues) {
		this.collection = [];
		this.valuesHash = {};
		if(initialValues){
			for(let initialValue of initialValues){
				this.add(initialValue);
			};
		};
	}
	has(value){
		return (this.valuesHash[value]);
	}
	values(){
		return this.collection;
	}
	add(value){
		if(!this.has(value)){
			this.valuesHash[value] = true; 
			this.collection.push(value);
		}
	}
	remove(value){
		if(this.has(value)){
			delete this.valuesHash[value];
			const index = this.collection.indexOf(value);
			delete this.collection[index];
		}
	}
	size(){
		return this.collection.length; 
	}
	union(otherSet){
		const firstSet = this.values();
		const secondSet = otherSet.values(); 
		const unionSet = new CustomSet();
		firstSet.forEach( value => unionSet.add(value)); 
		secondSet.forEach( value => unionSet.add(value));
		return unionSet;
	}
	intersection(otherSet){
		const intersectionSet = new CustomSet();
        const firstSet = this.values();
        firstSet.forEach(value => {
            if(otherSet.has(value)){
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
	}
	difference(otherSet){
		const differenceSet = new CustomSet();
        const firstSet = this.values();
        firstSet.forEach(value => {
            if(!otherSet.has(value)){
                differenceSet.add(value);
            }
        });
        return differenceSet;
	}
	isSubSetOf(otherSet){
		const firstSet = this.values();
		return firstSet.every( value => otherSet.has(value)); 
	}
	hasSubSet(otherSet){
		const secondSet = otherSet.values();
		return secondSet.every( value => this.has(value));
	}
}

var setA = new CustomSet();  
var setB = new CustomSet();  
setA.add("a");  
setB.add("b");  
setB.add("c");  
setB.add("a");  
setB.add("d");  

//SetA [a]
//SetB [a, b, c, d]
console.log(setA.isSubSetOf(setB));
console.log(setA.intersection(setB).values());
console.log(setB.difference(setA).values());
console.log(setB.hasSubSet(setA));

var setC = new Set();  
var setD = new Set();  
setC.add("a");  
setD.add("b");  
setD.add("c");  
setD.add("a");  
setD.add("d");  
console.log(setD.values())
setD.delete("a");
console.log(setD.has("a"));
console.log(setD.add("d"));
