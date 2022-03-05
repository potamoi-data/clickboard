import { EChartsOption, SeriesOption } from 'echarts';

import { ChartConfig, ChartType, PartialChartConfig } from '~/types/chart';
import { PanelData } from '~/types/panel-editor';

import { getBarSeries, isBarChartConfigComplete, updateEchartsBarConfig } from './bar';
import { getLineSeries, isLineChartConfigComplete, updateEchartsLineConfig } from './line';

export { fillBarChartConfig } from './bar';
export { fillLineChartConfig } from './line';

export const isChartConfigComplete = (config: PartialChartConfig): config is ChartConfig => {
    if (!config.type) {
        return false;
    }
    switch (config.type) {
        case ChartType.bar:
            return isBarChartConfigComplete(config);
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
        case ChartType.line:
            series = getLineSeries({ chartConfig, panelData });
            break;
    }

    const echartsConfig: EChartsOption = {
        grid: {
            top: 16,
            right: 32,
            bottom: chartConfig.legends ? 64 : 32,
            left: 32,
        },
        xAxis: {},
        yAxis: {},
        legend: {
            show: !!chartConfig.legends,
            type: 'scroll',
            right: 128,
            bottom: 8,
            left: 32,
        },
    };
    if (series) {
        echartsConfig.series = series;
    }

    switch (chartConfig.type) {
        case ChartType.bar:
            updateEchartsBarConfig({ chartConfig, echartsConfig });
            break;
        case ChartType.line:
            updateEchartsLineConfig({ chartConfig, echartsConfig });
            break;
    }

    return echartsConfig;
};
