import { EChartsOption, SeriesOption } from 'echarts';

import { ChartConfig, ChartType, PartialChartConfig } from '~/types/chart';
import { PanelData } from '~/types/panel-editor';

import { getBarSeries, isBarChartConfigComplete, updateEchartsBarConfig } from './bar';
import {
    getCandlestickSeries,
    isCandlestickChartConfigComplete,
    updateEchartsCandlestickConfig,
} from './candlestick';
import { getLineSeries, isLineChartConfigComplete, updateEchartsLineConfig } from './line';

export { fillBarChartConfig } from './bar';
export { fillCandlestickChartConfig } from './candlestick';
export { fillLineChartConfig } from './line';

export const isChartConfigComplete = (config: PartialChartConfig): config is ChartConfig => {
    if (!config.type) {
        return false;
    }
    switch (config.type) {
        case ChartType.bar:
            return isBarChartConfigComplete(config);
        case ChartType.candlestick:
            return isCandlestickChartConfigComplete(config);
        case ChartType.line:
            return isLineChartConfigComplete(config);
    }
};

export interface GetEchartsConfigOptions {
    chartConfig: ChartConfig;
    panelData: PanelData;
}

export const getEchartsConfig = (options: GetEchartsConfigOptions): EChartsOption => {
    const { chartConfig, panelData } = options;

    let series: SeriesOption | SeriesOption[] | undefined;
    switch (chartConfig.type) {
        case ChartType.bar:
            series = getBarSeries({ chartConfig, panelData });
            break;
        case ChartType.candlestick:
            series = getCandlestickSeries({ chartConfig, panelData });
            break;
        case ChartType.line:
            series = getLineSeries({ chartConfig, panelData });
            break;
    }

    const echartsConfig: EChartsOption = {
        grid: {
            top: 16,
            right: 64,
            bottom: 'legends' in chartConfig && chartConfig.legends ? 64 : 48,
            left: 64,
        },
        xAxis: {},
        yAxis: {
            scale: true,
        },
        legend: {
            show: !!('legends' in chartConfig && chartConfig.legends),
            type: 'scroll',
            right: 64,
            bottom: 8,
            left: 64,
        },
    };
    if (series) {
        echartsConfig.series = series;
    }

    switch (chartConfig.type) {
        case ChartType.bar:
            updateEchartsBarConfig({ chartConfig, echartsConfig });
            break;
        case ChartType.candlestick:
            updateEchartsCandlestickConfig({ chartConfig, echartsConfig, panelData });
            break;
        case ChartType.line:
            updateEchartsLineConfig({ chartConfig, echartsConfig });
            break;
    }

    return echartsConfig;
};
