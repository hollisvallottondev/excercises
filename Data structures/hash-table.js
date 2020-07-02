/* 
Key elements of a hash table include: 

Hash function 
Load factor checking for resizing
The resizing function 
Handling collsions 

Basic functionality:

Get element 
Set element 
Delete element
*/

class HashTable {
	constructor(){
		this.size = 13;
		this.insertedElements = 0;
		this.elements = new Array(this.size);
	}
	hash(key){
		if(!key) return
		return key.split('').reduce((hash,character) =>  {
			return hash =  (17 * hash * character.charCodeAt(0)) % this.size
		}, 13); 
	}
	resize(){
		this.size = this.size * 2;
		this.insertedElements = 0;
		let newElements =  new Array(this.size);

		for(let hash of this.elements){
			if(hash){
				for(let [key, value] of hash){
					const index = this.hash(key); 
					if(newElements[index]){
						let exists = false;
						for(let i in newElements[index]){
							const [insertedKey, insertedValue] = newElements[index][i]; 
							if(key === insertedKey){
								newElements[index][i] = [key, value]; 
								exists = true;
								break;
							}
						}
						if(!exists){
							newElements[index].push([key, value]);
							this.insertedElements++;
						}
					}else{
						newElements[index] = [[key, value]]; 
						this.insertedElements++;
					}
				}
			}
		}
		this.elements = newElements; 
	}
	get(key){
		//Returns value 
		if(!key) return
		const index = this.hash(key); 
		if(!this.elements[index]) return;
		let elementResult;
		for(let element of this.elements[index]){
			if(element){
				const [insertedKey, insertedValue] = element; 
				if(insertedKey === key){
					elementResult = insertedValue;
					break;
				}
			}
		} 
		return elementResult;
	}
	set(key, value){
		if(!key) return
		const index = this.hash(key); 
		if(this.elements[index]){
			let exists = false;
			for(let i in this.elements[index]){
				const element = this.elements[index][i];
				if(element){
					const [insertedKey, insertedValue] = element; 
					if(key === insertedKey){
						this.elements[index][i] = [key, value]; 
						exists = true;
						break;
					}
				}
			}
			if(!exists){
				this.elements[index].push([key, value]);
				this.insertedElements++;
			}
		}else{
			this.elements[index] = [[key, value]]; 
			this.insertedElements++;
		}
		let loadFactor = this.insertedElements / this.size; 
		if(loadFactor > 0.80){
			this.resize();
		}
		return [key, value];
	}
	delete(key){
		if(!key) return
		const index = this.hash(key);
		if(!this.elements[index]) return;
		let returnElement;
		for(let i in this.elements[index]){
			const element = this.elements[index][i]; 
			if(element){
				const [insertedKey, insertedValue] = element;
				if(insertedKey === key){
					returnElement = element; 
					this.elements[index][i] = null;
					break;
				}
			}
		}
		return returnElement;
	}
}

let ideal_eleven = new HashTable(); 
ideal_eleven.set('GK', 'Iker Casillas'); 
ideal_eleven.set('RCB', 'John Terry'); 
ideal_eleven.set('LCB', 'Sergio Ramos'); 
ideal_eleven.set('LB', 'Marcelo'); 
ideal_eleven.set('RB', 'Danny Alves'); 
ideal_eleven.set('LCM', 'Tony Kroos')
ideal_eleven.set('RCM', 'Frank Lampard')
ideal_eleven.set('CAM', 'Zinedine Zidane');
ideal_eleven.set('RW', 'Lionel Messi');
ideal_eleven.set('LW', 'Kaka');
ideal_eleven.set('CF', 'Cristiano Ronaldo');


ideal_eleven.set('BGK', 'Iker Casillas'); 
ideal_eleven.set('BRCB', 'John Terry'); 
ideal_eleven.set('BLCB', 'Sergio Ramos'); 
ideal_eleven.set('BLB', 'Marcelo'); 
ideal_eleven.set('BRB', 'Danny Alves'); 
ideal_eleven.set('BLCM', 'Tony Kroos')
ideal_eleven.set('BRCM', 'Frank Lampard')
ideal_eleven.set('BCAM', 'Zinedine Zidane');
ideal_eleven.set('BRW', 'Lionel Messi');
ideal_eleven.set('BLW', 'Kaka');
ideal_eleven.set('BCF', 'Cristiano Ronaldo');

console.log('Messi on RW', ideal_eleven.get('RW') === 'Lionel Messi'); 
console.log('Kaka on LW', ideal_eleven.get('LW') === 'Kaka'); 
console.log('Ronaldo at CF', ideal_eleven.get('CF') === 'Cristiano Ronaldo'); 


ideal_eleven.delete('RW');
console.log('Messi out',  !ideal_eleven.get('RW')); 

ideal_eleven.delete('LW');
console.log('Kaka out', !ideal_eleven.get('LW')); 

ideal_eleven.delete('CF');
console.log('Ronald out', !ideal_eleven.get('CF'))

ideal_eleven.set('RW', 'Raul');
ideal_eleven.set('LW', 'Etoo');
ideal_eleven.set('CF', 'Didier Drogba');

console.log('Etoo in', ideal_eleven.get('LW')); 
console.log('Raul in', ideal_eleven.get('RW')); 
console.log('Drogba in', ideal_eleven.get('CF')); 

console.log(ideal_eleven.elements); 
