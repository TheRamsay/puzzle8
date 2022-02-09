from time import sleep
from typing import List, Tuple, Set
from node import Node
from collections import deque
from queue import PriorityQueue
from sys import setrecursionlimit
from dataclasses import dataclass, field
from typing import Any
from time import time

setrecursionlimit(1000)



start = Node([
    [8, 6, 7],
    [2, 5, 4],
    [3, 0, 1]
], None, 0)

end = Node([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
], None, -1)

startt = time()
closed = set()
q = deque()
q.append(start)
res = None

while True:
    node = q.popleft()

    if node == end:
        res = node
        break

    x, y = node.find(0)
    for [ox, oy] in node.get_neighbours(x, y):
        new_node: Node = node.make_child()
        new_node.set_value(x, y, node.get_value(ox, oy))
        new_node.set_value(ox, oy, 0)

        if (new_node in closed):
            continue

        q.append(new_node)

    closed.add(node)

if res:
    print(res)
    print("Elapsed time", time() - startt)
    print(len(closed))
    count = 0
    while node.parent is not None:
        count +=1
        node = node.parent
    print("Length", count)
