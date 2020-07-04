class Node {
	constructor(value){
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(root = null){
		this.size = root? 1: 0;
		this.root = root;
	}
	size(){
		return this.size;
	}
	traverse(equalsAction, action, value){

		const searchTree = (node, newNode)  => {
			if(node.value === value){
				return equalsAction(node, null, newNode);
			}else{
				if(node.value > value){
					//Go left
					if(!node.left) {
						return action(node, 'left', newNode);
					}else{
						return searchTree(node.left, newNode);
					}
				}else{
					//Go right
					if(!node.right){
						return action(node, 'right', newNode);
					}else{
						return searchTree(node.right, newNode);
					}
				}
			}
		}

		return (start, newNode = null) => {
			return searchTree(start, newNode);
		}
	}
	contains(value){
		const searchForFunc = this.traverse(
			(node, direction, newNode) => {
				return true; 
			}, (node, direction, newModel) => {
				return false;
			}, value); 

		return searchForFunc(this.root, null);
	}
	insert(value){
		const newNode = new Node(value); 
		if(!this.root) {
			this.root = newNode;
			this.size++;
			return newNode;
		}

		const insertFunc = this.traverse((node, direction, newNode) => {
			throw `Cant'be equals when inserting`;
		}, (node, direction, newNode) => {
			node[direction] = newNode;
			return newNode;
		}, value);

		this.size++;
		return insertFunc(this.root, newNode);
	}
	allTheWay(direction){
		return () => {
			let current = this.root;
			while(current[direction]) current = current[direction];
			return current.value;
		}
	}
	explore(firstFunction, secondFunction, thirdFunction){
		return () => {
			let result = [];
			const traverse = (node) => {
				firstFunction(node, traverse, result);
				secondFunction(node, traverse, result);
				thirdFunction(node, traverse, result);
			}
			traverse(this.root);
			return result;
		}
	}
	next(direction){
		return (node, traverse) => {
			if(node[direction]) traverse(node[direction]);
		}
	}
	save(node, traverse, result) {
		result.push(node.value);
	}
	breathFirstSearch(){
		let result = [];
		let queue = [];
		queue.push(this.root);
		while(queue.length){
			let currentNode = queue.shift();
			if(currentNode.left) queue.push(currentNode.left);
			if(currentNode.right) queue.push(currentNode.right);
			result.push(currentNode.value);
		}

		return result;
	}
	min = this.allTheWay('left')
	max = this.allTheWay('right')
	goLeft = this.next('left')
	goRight = this.next('right')
	depthFirstInOrder = this.explore(this.goLeft, this.save, this.goRight)
	depthFirstPostOrder = this.explore(this.goLeft, this.goRight, this.save)
	depthFirstPreOrder = this.explore( this.save, this.goLeft, this.goRight)


}

const values = [15, 3, 36, 2, 12, 28, 39]; 

const tree = new Tree();

for(let value of values){
	tree.insert(value);
}

console.log('Min', tree.min());
console.log('Max', tree.max());
console.log('Contains 2', tree.contains(2));
console.log('Contains 9', tree.contains(9));

console.log('Depth first in order', tree.depthFirstInOrder()); 
console.log('Depth first pre order', tree.depthFirstPreOrder()); 
console.log('Depth first post order', tree.depthFirstPostOrder()); 
console.log('Bredth first search', tree.breathFirstSearch()); 


console.log('Tree', tree);