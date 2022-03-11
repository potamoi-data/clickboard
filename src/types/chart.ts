export enum ChartType {
    bar = 'bar',
    candlestick = 'candlestick',
    line = 'line',
}

export interface BarChartConfig {
    type: ChartType.bar;
    xAxisColumn: string;
    yAxisColumn: string;
    stackColumn?: string;
    legends?: boolean;
}

export interface CandlestickChartConfig {
    type: ChartType.candlestick;
    xAxisColumn: string;
    openColumn: string;
    closeColumn: string;
    lowestColumn: string;
    highestColumn: string;
}

export interface LineChartConfig {
    type: ChartType.line;
    xAxisColumn: string;
    yAxisColumn: string;
    groupColumn?: string;
    stack?: boolean;
    legends?: boolean;
}

export type ChartConfig = BarChartConfig | CandlestickChartConfig | LineChartConfig;

export type PartialCandlestickChartConfig = Partial<CandlestickChartConfig>;
export type PartialBarChartConfig = Partial<BarChartConfig>;
export type PartialLineChartConfig = Partial<LineChartConfig>;

export type PartialChartConfig =
    | PartialBarChartConfig
    | PartialCandlestickChartConfig
    | PartialLineChartConfig;
