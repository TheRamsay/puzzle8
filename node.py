from typing import List, Tuple


class Node:

    def __init__(self, start, parent: "Node", depth) -> None:

        self._board = start
        self.parent = parent
        self.depth = depth

    def get_neighbours(self, x, y) -> List[Tuple[int, int]]:
        offsets = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        res = []

        for (ox, oy) in offsets:
            new_x = ox + x
            new_y = oy + y

            if new_x < 0 or new_x >= len(self._board[0]) or new_y < 0 or new_y >= len(self._board):
                continue

            res.append((new_x, new_y))

        return res

    def find_space(self) -> Tuple[int, int]:
        for (y, row) in enumerate(self._board):
            for (x, val) in enumerate(row):
                if val == 0:
                    return (x, y)

        return (-1, -1)

    def get_value(self, x: int, y: int):
        return self._board[y][x]

    def set_value(self, x: int, y: int, val):
        self._board[y][x] = val

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
        return hash("".join([str(val) for row in self._board for val in row]))

    def make_child(self) -> "Node":
        new_board = []
        for row in self._board:
            temp = []
            for val in row:
                temp.append(val)

            new_board.append(temp)

        return Node(new_board, self, self.depth + 1)

    def __str__(self):
        output = ""
        for row in self._board:
            for val in row:
                output += f"{val} "
            output += "\n"

        return output


    def get_manhattan_distance(self, x, y) -> int:
        target_x, target_y = self.find_space()
        return abs(target_x - x) + (target_y - y)

        # temp = 0
        # for i in range(0, 3):
        #     for j in range(0, 3):
        #         if self._board[i][j] != goal._board[i][j] and self._board[i][j] != '0':
        #             temp += 1
        # return temp

    def get_cost(self, goal: "Node") -> int:
        h = self.get_manhattan_distance(*goal.find_space())
        g = self.depth
        return g + h

