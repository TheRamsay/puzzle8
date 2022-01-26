from time import sleep
from typing import List, Tuple
from node import Node
from collections import deque

start= Node("123405678", None)

end = Node("123456780", None)

# end = Board([
#     [1, 4, 3],
#     [None, 2, 7],
#     [6, 9, 5]
# ])

def solve(start: Node, goal: Node, steps: int, visited: set):
    q: deque[Node] = deque()
    q.appendleft(start)
    visited = set()

    while q:
        b = q.pop()

        if b == goal:
            print("JAJAJJA")
            return b, len(visited)

        x, y = b.find_space()
        for (ox, oy) in b.get_neighbours(x, y):

            if ox < 0 or oy < 0 or ox >= len(b.get_board()[0]) or oy > len(b.get_board()):
                continue

            new_board = b.make_child()
            new_board.set_value(x, y, b.get_value(ox, oy))
            new_board.set_value(ox, oy, 0)

            if new_board in visited:
                continue

            visited.add(new_board)
            q.appendleft(new_board)

        steps += 1

    return None, 0


def print_path(history: List[Node]):
    print(history)
    for node in history:
        print(node)

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

