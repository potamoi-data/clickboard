import { CandlestickSeriesOption, EChartsOption } from 'echarts';
import produce from 'immer';
import { merge } from 'lodash-es';

import { CandlestickChartConfig, ChartType, PartialCandlestickChartConfig } from '~/types/chart';
import { PanelData } from '~/types/panel-editor';
import { unsafeGet } from '~/utils/array';

import { getEchartsAxisValue, getEchartsValue } from './common';

export const isCandlestickChartConfigComplete = (
    config: PartialCandlestickChartConfig,
): config is CandlestickChartConfig =>
    !!(
        config.type &&
        config.xAxisColumn &&
        config.openColumn &&
        config.closeColumn &&
        config.lowestColumn &&
        config.highestColumn
    );

export interface GetCandlestickSeriesOptions {
    chartConfig: CandlestickChartConfig;
    panelData: PanelData;
}

export const fillCandlestickChartConfig = (
    config: PartialCandlestickChartConfig,
): PartialCandlestickChartConfig =>
    produce(config, draft => {
        draft.type = ChartType.candlestick;
    });

export const getCandlestickSeries = (
    options: GetCandlestickSeriesOptions,
): CandlestickSeriesOption | CandlestickSeriesOption[] | undefined => {
    const { chartConfig, panelData } = options;

    const openIndex = panelData.columnNames.findIndex(column => column === chartConfig.openColumn);
    if (openIndex === -1) {
        return;
    }

    const closeIndex = panelData.columnNames.findIndex(
        column => column === chartConfig.closeColumn,
    );
    if (closeIndex === -1) {
        return;
    }

    const lowestIndex = panelData.columnNames.findIndex(
        column => column === chartConfig.lowestColumn,
    );
    if (lowestIndex === -1) {
        return;
    }

    const highestIndex = panelData.columnNames.findIndex(
        column => column === chartConfig.highestColumn,
    );
    if (highestIndex === -1) {
        return;
    }

    return {
        type: 'candlestick',
        data: panelData.rows.map(row => {
            const openValue = unsafeGet(row, openIndex);
            const closeValue = unsafeGet(row, closeIndex);
            const lowestValue = unsafeGet(row, lowestIndex);
            const highestValue = unsafeGet(row, highestIndex);
            return [
                getEchartsValue(openValue),
                getEchartsValue(closeValue),
                getEchartsValue(lowestValue),
                getEchartsValue(highestValue),
            ];
        }),
    };
};

export interface UpdateEchartsCandlestickConfigOptions {
    chartConfig: CandlestickChartConfig;
    echartsConfig: EChartsOption;
    panelData: PanelData;
}

export const updateEchartsCandlestickConfig = (options: UpdateEchartsCandlestickConfigOptions) => {
    const { chartConfig, echartsConfig, panelData } = options;

    const xAxisIndex = panelData.columnNames.findIndex(
        column => column === chartConfig.xAxisColumn,
    );
    if (xAxisIndex !== -1) {
        const stackConfig: EChartsOption = {
            xAxis: {
                data: panelData.rows.map(row => getEchartsAxisValue(unsafeGet(row, xAxisIndex))),
            },
        };
        merge(echartsConfig, stackConfig);
    }
};
