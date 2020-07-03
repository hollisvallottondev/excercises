class Node {
	constructor(data, type){
		this.data = data;
		this.next = null;
		if(type === 'double-linked' || type === 'double-circular') this.previous = null;
	}
}

class List {
	constructor(type = 'linked'){
		this.type = type;
		this.head = null;
		this.last = null;
		this.size = 0;
	}
	insertFront(data){
		const node = new Node(data, this.type)
		if(!this.head) {
			this.head = node;
			this.last = node;
		}else{
			switch(this.type){		
				case 'double-linked':
					node.previous = this.head.previous;
					this.head.previous = node;
					break;
				case 'circular':
					node.next = this.head;
					this.last.next = node;
					break;
				case 'double-circular':
					node.previous = this.last;
					node.next = this.head;
					this.head.previous = node;
					this.last.next = node;
					break;
			}
			node.next = this.head;
			this.head = node;
		}
		this.size++;
	}
	insertLast(data){
		const node = new Node(data, this.type)
		if(!this.head) {
			this.head = node;
			this.last = node;

		}else{
			switch(this.type){		
				case 'double-linked':
					node.previous = this.last;
					break;
				case 'circular':
					node.next = this.head;
					break;
				case 'double-circular':
					node.previous = this.last;
					node.next = this.head;
					break;
			}
			this.last.next = node;
			this.last = node;
		}
		this.size++;
	}
	insertAt(index, data){
		if( index > this.size) return
		let current = this.head;
		let previous;
		for(let i = 0; i < index; i++){
			previous = current;
			current = current.next;
		}
		const node = new Node(data);
		previous.next= node;
		node.next = current;

		switch(this.type){		
			case 'double-linked':
				node.previous = previous;
				current.previous = node;
				break;
			case 'circular':
				node.next = current || this.head;
				break;
			case 'double-circular':
				node.previous = previous;
				current.previous = node;
				node.next = current || this.head;
				break;
		}
	}
	removeAt(index){
		if( index > this.size) return
		let current = this.head;
		let previous;
		for(let i = 0; i < index; i++){
			previous = current;
			current = current.next;
		}
		previous.next= current.next;

		switch(this.type){		
			case 'double-linked':
				if(current.next) current.next.previous = previous;
				break;
			case 'double-circular':
				current.next.previous = previous;
				break;
		}

		if(this.last === current){
			this.last = previous;
		}

		this.size--;
	}
	print(){
		let current = this.head;
		do{
			console.log(`${current.previous? current.previous.data: null} -> Current: ${current.data} -> ${current.next? current.next.data: null}`);
			current = current.next;
		}while(current && current !== this.head)
	}
}

let list = new List('double-linked');
list.insertLast(1);
list.insertLast(2);
list.insertLast(3);
list.insertLast(4);
list.insertLast(5);
list.insertFront(0);
list.insertFront(-2);
list.insertAt(1, -1);
list.removeAt(7);

list.print();

console.log(list);