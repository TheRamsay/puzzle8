from typing import List, Tuple
from copy import deepcopy


class Node:

    def __init__(self, start, parent: "Node", depth) -> None:

        self._board = start
        self.parent = parent
        self.depth = depth
        self.zero_pos = self.find(0)

    def get_neighbours(self, pos) -> List[Tuple[int, int]]:
        offsets = [(1), (-1), (3), (-3)]
        res = []

        for offset in offsets:
            new_pos = pos + offset

            if new_pos < 0 or new_pos >= len(self._board):
                continue

            res.append(new_pos)

        return res

    def find(self, value: int) -> int:
        for idx, val in enumerate(self._board):
            if val == value:
                return idx

        return -1

    def get_value(self, pos: int):
        return self._board[pos]

    def set_value(self, pos: int, val):
        self._board[pos] = val

    def str_to_arr(self, data: str):
        arr = []
        temp = []
        for idx, ch in enumerate(data):
            if idx % 3 == 0 and idx != 0:
                arr.append(temp)
                temp = []

            temp.append(int(ch))
        arr.append(temp)

        return arr

    def get_board(self):
        return self._board

    def __eq__(self, other: "Node"):
        return hash(self) == hash(other)

    def __ne__(self, other: "Node"):
        return not (self == other)

    def __hash__(self):
        return hash(str(self._board))

    def make_child(self, new_pos) -> "Node":
        new_board = deepcopy(self._board)
        pos = self.zero_pos
        new_board[pos] = self.get_value(new_pos)
        new_board[new_pos] = 0

        return Node(new_board, self, self.depth + 1)

    def __str__(self):
        output = ""
        for idx, val in enumerate(self._board):
            if idx % 3 == 0 and idx:
                output += "\n"
            output += f" {val}"
        return output

    def __repr__(self) -> str:
        return "".join([str(val) for row in self._board for val in row])

    def get_manhattan_distance(self, goal) -> int:
        score = 0
        for (y, row) in enumerate(self._board):
            for (x, val) in enumerate(row):
                target_x, target_y = goal.find(val)
                score += abs(target_x - x) + abs(target_y - y)

        return score

    def get_cost(self, goal: "Node") -> int:
        h = self.get_manhattan_distance(goal)
        g = self.depth
        return g + h
