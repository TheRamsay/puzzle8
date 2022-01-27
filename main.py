from time import sleep
from typing import List, Tuple, Set
from node import Node
from collections import deque

start = Node([
    [0, 1, 2],
    [8, 6, 4],
    [7, 5, 3]
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

def solve(start: Node, goal: Node, steps: int, visited: set):

    open: Set[Node] = set()
    close: Set[Node] = set()
    open.add(start)

    while len(open) != 0:
        node = find_lowest_cost(goal, open)

        if node == goal:
            print("JAJAJJA")
            return node, steps

        x, y = node.find_space()
        for (ox, oy) in node.get_neighbours(x, y):

            new_node = node.make_child()
            new_node.set_value(x, y, node.get_value(ox, oy))
            new_node.set_value(ox, oy, 0)

            if new_node in close or new_node in open:
                continue


            open.add(new_node)

        steps += 1

        open.remove(node)
        close.add(node)

    return None, 0


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
end_node, visited = solve(start, end, 0, set())
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

