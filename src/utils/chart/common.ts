import { ClickhouseCell } from '~/types/clickhouse';
import { unsafeGet } from '~/utils/array';

export type EchartsValue = Date | number | string;

export const getEchartsValue = (value: ClickhouseCell): EchartsValue => {
    switch (typeof value) {
        case 'boolean':
            return Number(value);
        case 'bigint':
            return Number(value);
        default:
            return value;
    }
};

export const groupRows = (
    rows: ClickhouseCell[][],
    groupColumnIndex: number,
): Map<string, ClickhouseCell[][]> => {
    const map = new Map<string, ClickhouseCell[][]>();
    for (const row of rows) {
        const group = unsafeGet(row, groupColumnIndex).toString();
        let groupRows = map.get(group);
        if (!groupRows) {
            groupRows = [];
            map.set(group, groupRows);
        }
        groupRows.push(row);
    }
    return map;
};

export const defaultStackValue = 'stack';
