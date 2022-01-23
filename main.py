from time import sleep
from typing import List, Tuple
from board import Board
from collections import deque

start = Board([
    [1, 4, 3],
    [6, None, 7],
    [9, 2, 5]
])


end = Board([
    [1, None, 3],
    [6, 4, 7],
    [9, 2, 5]
])

# end = Board([
#     [1, 4, 3],
#     [None, 2, 7],
#     [6, 9, 5]
# ])

def solve(board: Board, goal: Board, steps: int, visited: set):
    q: deque[Board] = deque()
    q.appendleft(board)
    visited = set()
    prev = {}

    while q:
        b = q.pop()

        # if b == goal:
            # print(b)
            # return prev

        x, y = b.find_space()
        for (ox, oy) in b.get_neighbours(x, y):

            if ox < 0 or oy < 0 or ox >= len(b.get_board()[0]) or oy > len(b.get_board()):
                continue

            new_board = b.clone()
            new_board.set_value(x, y, b.get_value(ox, oy))
            new_board.set_value(ox, oy, None)

            if new_board in visited:
                continue

            visited.add(new_board)
            prev[new_board] = board
            q.appendleft(new_board)

        steps += 1

    return prev


def print_path(history: List[Board]):
    print(len(history))
    # for board in history:
    #     print(board)

# program se nevraci, zacykli se
# program funguje jen na posunuti o jedno

print_path(solve(start, end, 0, set()))
