import { Direction } from './direction.enum';

export class Wall {
    constructor(
        public row: number,
        public col: number,
        public dir: Direction
    ) { }
}