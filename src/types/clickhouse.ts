export enum ClickhouseColumnType {
    boolean = 'boolean',
    date = 'date',
    float = 'float',
    int = 'int',
    string = 'string',
}

export type ClickhouseCell = bigint | boolean | Date | number | string;
