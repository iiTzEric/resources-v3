class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

const node1 = new Node(1)
const node2 = new Node(2)
const node3 = new Node(3)
const node4 = new Node(4)
const node5 = new Node(5)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5



function printList(head) {
    let current = head
    while (current !== null) {
        console.log(current.value)
        current = current.next
    }
}

printList(node1)