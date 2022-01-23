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
    [1, 4, 3],
    [None, 2, 7],
    [6, 9, 5]
])


def solve(board: Board, goal: Board, steps: int, visited: set):
    q: deque[Board] = deque()
    q.appendleft(board)
    visited = set()
    results = []

    while q:
        b = q.pop()
        if b in visited:
            continue
        visited.add(b)
        print(b)

        if b == goal:
            # print(b)
            return steps

        x, y = b.find_space()
        for (ox, oy) in b.get_neighbours(x, y):

            if ox < 0 or oy < 0 or ox >= len(b.get_board()[0]) or oy > len(b.get_board()):
                continue

            new_board = b.clone()
            new_board.set_value(x, y, b.get_value(ox, oy))
            new_board.set_value(ox, oy, None)
            q.appendleft(new_board)

        steps += 1




# program se nevraci, zacykli se
# program funguje jen na posunuti o jedno

print(solve(start, end, 0, set()))
