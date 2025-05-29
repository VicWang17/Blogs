#### 给定两个链表，链表的末尾有公共区域，找到起始的公共节点

如果一个个拿B链表的数据去A比较，看看是不是和A的一样，就会很麻烦，一个非常巧妙的办法是做两个新链表，分别是LA+LB,LB+LA，这样两个链表的长度就相同了，而且末尾是对齐的，也就是说公共区域也是对齐的，这样两边一起next,next就能找到公共区域。

代码:

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        p1 = headA
        p2 = headB
        cnt = 0 
        while(p1 and p2):
            if(p1 == p2):
                return p1
            p1 = p1.next
            p2 = p2.next
            if(cnt<2 and p1 == None):
                p1 = headB
                cnt = cnt +1
            if(cnt<2 and p2 == None):  #最多变轨两次，不然会timeout
                p2 = headA
                cnt = cnt +1
        return None
```

