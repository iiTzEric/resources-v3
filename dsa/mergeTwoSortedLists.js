function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0)
    let current = dummy

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1
            list1 = list1.next
        } else {
            current.next = list2
            list2 = list2.next
        }
        current = current.next
        
    }
    current.next = list1 !== null ? list1 : list2
    return dummy.next
}


def mergeTwoLists(self, list1, list2):
        dummy = ListNode(0)
        current = dummy

        while list1 != None and list2 != None:
            if list1.val <= list2.val:
                current.next = list1
                list1 = list1.next
            else:
                current.next = list2
                list2 = list2.next
            current = current.next
        current.next = list1 if list1 is not None else list2
        return dummy.next
        