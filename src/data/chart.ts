import { ChartType } from '~/types/chart';

export const chartTypeNames: Readonly<Record<ChartType, string>> = {
    [ChartType.bar]: 'Bar chart',
    [ChartType.candlestick]: 'Candlestick chart',
    [ChartType.line]: 'Line chart',
};
