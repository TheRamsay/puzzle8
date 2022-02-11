from time import sleep
from typing import List, Tuple, Set
from node import Node
from collections import deque
from queue import Queue
from queue import PriorityQueue
from sys import setrecursionlimit
from dataclasses import dataclass, field
from typing import Any
from time import time

setrecursionlimit(1000)

start = Node([8, 6, 7, 2, 5, 4, 3, 0, 1], None, 0)

end = Node(
    [1, 2, 3, 4, 5, 6, 7, 8, 0], None, -1)

startt = time()
closed = set()
q = Queue()
q.put(item=start)
res = None

while q.not_empty:
    node = q.get()

    if str(node) == str(end):
        res = node
        break

    for offset in node.get_neighbours(node.zero_pos):
        new_node: Node = node.make_child(offset)

        if str(new_node) in closed:
            continue

        q.put(new_node)
    closed.add(str(node))

if res:
    print(res)
    print("Elapsed time", time() - startt)
    print(len(closed))
    count = 0
    while node.parent is not None:
        count += 1
        node = node.parent
    print("Length", count)
