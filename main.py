from time import sleep
from typing import List, Tuple, Set
from node import Node
from collections import deque
from sys import setrecursionlimit

setrecursionlimit(1000)

start = Node([
    [8, 2, 3],
    [0, 6, 1],
    [5, 7, 4]
], None, 0)


# start = Node([
#     [1, 2, 3],
#     [0, 5, 6],
#     [4, 7, 8]
# ], None, 0)

end = Node([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
], None, -1)

def solve(node: Node, goal: Node, visited: set):

    visited.add(str(node))

    if node == goal:
        return (node, len(visited))


    x, y = node.find(0)
    for (ox, oy) in node.get_neighbours(x, y):

        new_node = node.make_child()
        new_node.set_value(x, y, node.get_value(ox, oy))
        new_node.set_value(ox, oy, 0)

        if str(new_node) in visited:
            continue

        solve(new_node, goal, visited)



    return None, -1


def print_path(history: List[Node]):
    print(history)
    for node in history:
        print(node)

def find_lowest_cost(goal, open):
    lowest = None
    for node in open:
        if lowest is None:
            lowest = node
            continue
        if node.get_cost(goal) < lowest.get_cost(goal):
            lowest = node

    return lowest


# program se nevraci, zacykli se
# program funguje jen na posunuti o jedno
end_node, visited = solve(start, end, set())
i = 0
path = []
while True:
    path.append(end_node)
    if end_node.parent is not None:
        end_node = end_node.parent
        i += 1
    else:
        break

for state in reversed(path):
    print(state)

print("Path length:", i)
print("Visited:", visited)
# print_path(path)

