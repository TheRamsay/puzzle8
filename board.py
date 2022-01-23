from typing import List, Tuple


class Board:

    def __init__(self, start) -> None:
        self._board = start

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
                if val is None:
                    return (x, y)

        return (-1, -1)

    def get_value(self, x: int, y: int):
        return self._board[y][x]

    def set_value(self, x: int, y: int, val):
        self._board[y][x] = val

    def get_board(self):
        return self._board

    def __eq__(self, other: "Board"):
        for i in range(len(self._board)):
            for j in range(len(self._board[0])):
                if self.get_value(j, i) != other.get_value(j, i):
                    return False

        return True

    def __ne__(self, other: "Board"):
        return not (self == other)

    def __hash__(self):
       return hash("".join([str(val) for row in self._board for val in row]))

    def clone(self) -> "Board":
        new_board = []
        for row in self._board:
            temp = []
            for val in row:
                temp.append(val)

            new_board.append(temp)

        return Board(new_board)

    def __str__(self):
        output = ""
        for row in self._board:
            for val in row:
                output += f"{val} "
            output += "\n"

        return output
