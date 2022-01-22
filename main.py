from time import sleep

start = [
    [1, 3, 4],
    [2, None, 7],
    [9, 8, 5]
]

# end = [
#     [1, 3, 4],
#     [9, 2, 7],
#     [None,8 , 5]
# ]

end = [
    [None, 1, 4],
    [2, 3, 7],
    [9,8, 5]
]

offsets = [(1, 0), (-1, 0), (0, 1), (0, -1)]

def compare_boards(b1, b2):
    for i in range(len(b1)):
        for j in range(len(b1[0])):
            if b1[i][j] != b2[i][j]:
                return False

    return True

def deep_copy_board(board):
    new_board = []
    for row in board:
        temp = []
        for val in row:
            temp.append(val)
            
        new_board.append(temp)

    return new_board


def print_board(board):
    print("-" * 10)
    for row in board:
        for val in row:
            print(val, end=" ")
        print("\n")
    print("-" * 10)

def compute(board, goal, steps, visited):
    
    sleep(0.3)

    print_board(board)

    if (compare_boards(board, goal)):
        return steps

    for i, row in enumerate(board):
        for j, val in enumerate(row):
            for ox, oy in offsets:
                new_x = j + ox;
                new_y = i + oy;

                if (val, i, j) in visited:
                    continue
                
                if new_x < 0 or new_x >= len(board[0]) or new_y < 0 or new_y >= len(board):
                    continue

                if board[new_y][new_x] == None:
                    # print(ox, oy)
                    new_board = deep_copy_board(board)
                    new_board[new_y][new_x] = board[i][j]
                    new_board[i][j] = None
                    x = compute(new_board, goal, steps + 1, visited  | {(val, i, j)})
                    if x == 1:
                        return x

# program se nevraci, zacykli se 
# program funguje jen na posunuti o jedno

print(compute(start, end, 0, set()))

class Board:

    def __init__(self, start, goal) -> None:
        self.goal = goal
        self._board = start

    def get_neighbours(self, x, y):
        offsets = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        res = []

        for (ox, oy) in offsets:
            new_x = ox + x
            new_y = oy + y

            if new_x < 0 or new_x >= len(self._board[0]) or new_y < 0 or new_y >= len(self._board):
                continue

            res.append((new_x, new_y))

    


