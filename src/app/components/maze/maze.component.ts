import { Component, OnInit } from '@angular/core';
import { Cell } from '../board/models/cell.model';
import { Wall } from '../board/models/wall.model';
import { Direction } from '../board/models/direction.enum';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {

  board: Cell[][];
  start: number[];
  end: number[];
  N: number;

  constructor() { }

  ngOnInit(): void {
    this.N = 20;
    this.buildBoard();
  }

  buildBoard() {
    this.board = [];

    // Build outer edges
    for (let i = 0; i < this.N; i++) {
      const tmp: Cell[] = [];
      for (let j = 0; j < this.N; j++) {
        const left = j == 1;
        const right = j == 0 || j == this.N - 1;
        const top = i == 1;
        const bottom = i == 0 || i == this.N - 1;
        tmp.push(new Cell(left, right, top, bottom));
      }
      this.board.push(tmp);
    }

    // Set start and end
    this.start = [1, 1];
    this.end = [this.N - 1, this.N - 1];
    this.board[this.start[0]][this.start[1]].start = true;
    this.board[this.end[0]][this.end[1]].end = true;

    // Build the internal walls
    this.buildInternalWalls();

    // Remove first row and first col
    this.board = this.board.slice(1, this.N);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = this.board[i].splice(1, this.N);
    }

    // Reset start and end
    this.start[0]--;
    this.start[1]--;
    this.end[0]--;
    this.end[1]--;

  }

  buildInternalWalls() {
    const walls: Wall[] = this.createWalls();

    // Adding walls
    while (walls.length != 0) {
      // Remove a random wall from the list
      const wall: Wall = this.removeRandomWall(walls);

      if (wall.dir == Direction.BOTTOM) {
        // Put the wall to the board
        this.board[wall.row][wall.col].bottom = true;

        // Remove the wall from the board if the it blocks start to current or bottom cell
        if (!this.isReachable([wall.row, wall.col]) ||
          wall.row + 1 < this.N && !this.isReachable([wall.row + 1, wall.col])) {
          this.board[wall.row][wall.col].bottom = false;
        }

      } else if (wall.dir == Direction.RIGHT) {
        // Put the wall to the board
        this.board[wall.row][wall.col].right = true;

        // Remove the wall from the board if the it blocks start to current or or right cell
        if (!this.isReachable([wall.row, wall.col]) ||
          wall.col + 1 < this.N && !this.isReachable([wall.row, wall.col + 1])) {
          this.board[wall.row][wall.col].right = false;
        }
      }
    }
  }

  isReachable(end: number[]): boolean {
    // Init visited
    const visited: boolean[][] = [];
    for (let i = 0; i < this.N; i++) {
      visited[i] = [];
      for (let j = 0; j < this.N; j++) {
        visited[i].push(i == this.start[0] && j == this.start[0] || i == 0 || j == 0);
      }
    }

    return this.dfs(this.start, end, visited);
  }

  dfs(cur: number[], end: number[], visited: boolean[][]): boolean {
    const i = cur[0];
    const j = cur[1];
    if (i == end[0] && j == end[1]) return true;

    // left
    if (!this.board[i][j - 1].right && !visited[i][j - 1]) {
      visited[i][j - 1] = true;
      if (this.dfs([i, j - 1], end, visited)) return true;
    }

    // right
    if (!this.board[i][j].right && !visited[i][j + 1]) {
      visited[i][j + 1] = true;
      if (this.dfs([i, j + 1], end, visited)) return true;
    }

    // top
    if (!this.board[i - 1][j].bottom && !visited[i - 1][j]) {
      visited[i - 1][j] = true;
      if (this.dfs([i - 1, j], end, visited)) return true;
    }

    // bottom
    if (!this.board[i][j].bottom && !visited[i + 1][j]) {
      visited[i + 1][j] = true;
      if (this.dfs([i + 1, j], end, visited)) return true;
    }

    return false;
  }

  createWalls() {
    const walls: Wall[] = [];
    for (let i = 1; i < this.N; i++) {
      for (let j = 1; j < this.N; j++) {
        if (j != this.N - 1)
          walls.push(new Wall(i, j, Direction.RIGHT));
        if (i != this.N - 1)
          walls.push(new Wall(i, j, Direction.BOTTOM));
      }
    }
    return walls;
  }

  removeRandomWall(walls: Wall[]): Wall {
    const N = walls.length;
    const i = Math.floor(Math.random() * N);
    const tmp = walls[i];
    walls[i] = walls[N - 1];
    walls[N - 1] = tmp;
    return walls.pop();
  }

  addWallToBoard(wall: Wall) {
    if (wall.dir == Direction.BOTTOM) {
      this.board[wall.row][wall.col].bottom = true;
    } else if (wall.dir == Direction.RIGHT) {
      this.board[wall.row][wall.col].right = true;
    }
  }

  removeWallFromBoard(wall: Wall) {
    if (wall.dir == Direction.BOTTOM) {
      this.board[wall.row][wall.col].bottom = false;
    } else if (wall.dir == Direction.RIGHT) {
      this.board[wall.row][wall.col].right = false;
    }
  }

  onGenerate() {
    this.buildBoard();
  }

  onSolution() {
    // Init visited
    const visited: boolean[][] = [];
    for (let i = 0; i < this.N; i++) {
      visited[i] = [];
      for (let j = 0; j < this.N; j++) {
        visited[i].push(i == this.start[0] && j == this.start[0]);
      }
    }

    this.dfs2(this.start, this.end, visited);
  }

  dfs2(cur: number[], end: number[], visited: boolean[][]): boolean {
    const i = cur[0];
    const j = cur[1];
    if (i == end[0] && j == end[1]) return true;

    // left
    if (j - 1 >= 0 && !this.board[i][j - 1].right && !visited[i][j - 1]) {
      visited[i][j - 1] = true;
      this.board[i][j - 1].selected = true;
      this.board[i][j].dir = '←';
      if (this.dfs2([i, j - 1], end, visited)) return true;
      this.board[i][j].dir = '';
      this.board[i][j - 1].selected = false;
    }

    // right
    if (j + 1 < this.board.length && !this.board[i][j].right && !visited[i][j + 1]) {
      visited[i][j + 1] = true;
      this.board[i][j + 1].selected = true;
      this.board[i][j].dir = '→';
      if (this.dfs2([i, j + 1], end, visited)) return true;
      this.board[i][j].dir = '';
      this.board[i][j + 1].selected = false;
    }

    // top
    if (i - 1 >= 0 && !this.board[i - 1][j].bottom && !visited[i - 1][j]) {
      visited[i - 1][j] = true;
      this.board[i - 1][j].selected = true;
      this.board[i][j].dir = '↑';
      if (this.dfs2([i - 1, j], end, visited)) return true;
      this.board[i][j].dir = '';
      this.board[i - 1][j].selected = false;
    }

    // bottom
    if (i + 1 < this.board.length && !this.board[i][j].bottom && !visited[i + 1][j]) {
      visited[i + 1][j] = true;
      this.board[i + 1][j].selected = true;
      this.board[i][j].dir = '↓';
      if (this.dfs2([i + 1, j], end, visited)) return true;
      this.board[i][j].dir = '';
      this.board[i + 1][j].selected = false;
    }

    return false;
  }

}
