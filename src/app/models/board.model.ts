import { Column } from "./column.model";

export class Board {
    public Name: string;
    public Columns: Column[];
    constructor(
        public name: string,
        public columns: Column[],
    ) {
        this.Name = name;
        this.Columns = columns
    }
}