export enum ChartType {
    line = 'line',
}

export interface LineChartConfig {
    type: ChartType.line;
    xAxisColumn: string;
    yAxisColumn: string;
    groupColumn?: string;
    legends?: boolean;
}

export type ChartConfig = LineChartConfig;
