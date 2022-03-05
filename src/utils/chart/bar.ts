import { BarSeriesOption, EChartsOption } from 'echarts';
import produce from 'immer';
import { merge } from 'lodash-es';

import { BarChartConfig, ChartType, PartialBarChartConfig } from '~/types/chart';
import { ClickhouseCell } from '~/types/clickhouse';
import { PanelData } from '~/types/panel-editor';
import { unsafeGet } from '~/utils/array';

import { getEchartsValue, groupRows } from './common';

export const isBarChartConfigComplete = (config: PartialBarChartConfig): config is BarChartConfig =>
    !!(config.type && config.xAxisColumn && config.yAxisColumn);

export interface GetBarSeriesOptions {
    chartConfig: BarChartConfig;
    panelData: PanelData;
}

export const fillBarChartConfig = (config: PartialBarChartConfig): PartialBarChartConfig =>
    produce(config, draft => {
        draft.type = ChartType.bar;
        draft.legends = !!draft.legends;
    });

export const getBarSeries = (
    options: GetBarSeriesOptions,
): BarSeriesOption | BarSeriesOption[] | undefined => {
    const { chartConfig, panelData } = options;

    const xAxisIndex = panelData.columnNames.findIndex(
        column => column === chartConfig.xAxisColumn,
    );
    if (xAxisIndex === -1) {
        return;
    }

    const yAxisIndex = panelData.columnNames.findIndex(
        column => column === chartConfig.yAxisColumn,
    );
    if (yAxisIndex === -1) {
        return;
    }

    const stackColumnIndex = panelData.columnNames.findIndex(
        column => column === chartConfig.stackColumn,
    );

    const getSeriesEntry = (rows: ClickhouseCell[][], stack?: string): BarSeriesOption => {
        const seriesEntry: BarSeriesOption = {
            type: 'bar',
            data: rows.map(row => {
                const x = unsafeGet(row, xAxisIndex);
                const y = unsafeGet(row, yAxisIndex);
                return [getEchartsValue(x), getEchartsValue(y)];
            }),
        };
        if (stack) {
            seriesEntry.name = stack;
            seriesEntry.stack = stack;
        }
        return seriesEntry;
    };

    if (stackColumnIndex === -1) {
        return getSeriesEntry(panelData.rows);
    }

    const stackToRows = groupRows(panelData.rows, stackColumnIndex);
    return Array.from(stackToRows).map(([stack, rows]) => getSeriesEntry(rows, stack));
};

export interface UpdateEchartsBarConfigOptions {
    chartConfig: BarChartConfig;
    echartsConfig: EChartsOption;
}

export const updateEchartsBarConfig = (options: UpdateEchartsBarConfigOptions) => {
    const { chartConfig, echartsConfig } = options;
    if (chartConfig.stackColumn) {
        const stackConfig: EChartsOption = {
            xAxis: {
                type: 'category',
            },
        };
        merge(echartsConfig, stackConfig);
    }
};
