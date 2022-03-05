export enum ChartType {
    bar = 'bar',
    line = 'line',
}

export interface BarChartConfig {
    type: ChartType.bar;
    xAxisColumn: string;
    yAxisColumn: string;
    stackColumn?: string;
    legends?: boolean;
}

export interface LineChartConfig {
    type: ChartType.line;
    xAxisColumn: string;
    yAxisColumn: string;
    groupColumn?: string;
    stack?: boolean;
    legends?: boolean;
}

export type ChartConfig = BarChartConfig | LineChartConfig;

export type PartialBarChartConfig = Partial<BarChartConfig>;
export type PartialLineChartConfig = Partial<LineChartConfig>;

export type PartialChartConfig = PartialBarChartConfig | PartialLineChartConfig;
