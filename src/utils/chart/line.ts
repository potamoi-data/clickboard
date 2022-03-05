import { EChartsOption, LineSeriesOption } from 'echarts';
import produce from 'immer';
import { merge } from 'lodash-es';

import { ChartType, LineChartConfig, PartialLineChartConfig } from '~/types/chart';
import { ClickhouseCell } from '~/types/clickhouse';
import { PanelData } from '~/types/panel-editor';
import { unsafeGet } from '~/utils/array';

import { defaultStackValue, getEchartsValue, groupRows } from './common';

export const isLineChartConfigComplete = (
    config: PartialLineChartConfig,
): config is LineChartConfig => !!(config.type && config.xAxisColumn && config.yAxisColumn);

export interface GetLineSeriesOptions {
    chartConfig: LineChartConfig;
    panelData: PanelData;
}

export const fillLineChartConfig = (chart: PartialLineChartConfig): PartialLineChartConfig =>
    produce(chart, draft => {
        draft.type = ChartType.line;
        draft.stack = !!draft.stack;
        draft.legends = !!draft.legends;
    });

export const getLineSeries = (
    options: GetLineSeriesOptions,
): LineSeriesOption | LineSeriesOption[] | undefined => {
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

    const groupColumnIndex = panelData.columnNames.findIndex(
        column => column === chartConfig.groupColumn,
    );

    const getSeriesEntry = (rows: ClickhouseCell[][], group?: string): LineSeriesOption => {
        const seriesEntry: LineSeriesOption = {
            type: 'line',
            data: rows.map(row => {
                const x = unsafeGet(row, xAxisIndex);
                const y = unsafeGet(row, yAxisIndex);
                return [getEchartsValue(x), getEchartsValue(y)];
            }),
        };
        if (group) {
            seriesEntry.name = group;
        }
        if (chartConfig.stack) {
            seriesEntry.stack = defaultStackValue;
        }
        return seriesEntry;
    };

    if (groupColumnIndex === -1) {
        return getSeriesEntry(panelData.rows);
    }

    const groupToRows = groupRows(panelData.rows, groupColumnIndex);
    return Array.from(groupToRows).map(([group, rows]) => getSeriesEntry(rows, group));
};

export interface UpdateEchartsLineConfigOptions {
    chartConfig: LineChartConfig;
    echartsConfig: EChartsOption;
}

export const updateEchartsLineConfig = (options: UpdateEchartsLineConfigOptions) => {
    const { chartConfig, echartsConfig } = options;
    if (chartConfig.stack) {
        const stackConfig: EChartsOption = {
            xAxis: {
                type: 'category',
            },
        };
        merge(echartsConfig, stackConfig);
    }
};
