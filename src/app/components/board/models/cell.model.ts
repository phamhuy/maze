export class Cell {
    constructor(
        public left: boolean,
        public right: boolean,
        public top: boolean,
        public bottom: boolean,
        public selected?: boolean,
        public start?: boolean,
        public end?: boolean,
        public dir?: string,
    ) { }
}