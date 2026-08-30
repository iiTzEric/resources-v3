function reverseList(head) {
    let prev = null
    let current = head

    while (current !== null) {
        const next = current.next
        current.next = prev
        prev = current
        current = next
    }
    return prev
}

// def reverseList(self, head):
//         prev = None
//         current = head

//         while current != None:
//             next = current.next
//             current.next = prev
//             prev = current
//             current = next
//         return prev