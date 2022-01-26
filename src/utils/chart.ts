import { EChartsOption, LineSeriesOption } from 'echarts';

import { ChartConfig, PartialChartConfig } from '~/types/chart';
import { ClickhouseCell } from '~/types/clickhouse';
import { PanelData } from '~/types/panel-editor';
import { unsafeFindIndex, unsafeGet } from '~/utils/array';

export const isChartConfigComplete = (config: PartialChartConfig): config is ChartConfig =>
    !!(config.type && config.xAxisColumn && config.yAxisColumn);

export interface GetEchartsOption {
    chartConfig: ChartConfig;
    panelData: PanelData;
}

type EchartsValue = Date | number | string;
type EchartsDataEntry = [EchartsValue, EchartsValue];
type EchartsData = EchartsDataEntry[];

const getEchartsValue = (value: ClickhouseCell): EchartsValue => {
    switch (typeof value) {
        case 'boolean':
            return Number(value);
        case 'bigint':
            return Number(value);
        default:
            return value;
    }
};

const seriesCommon: LineSeriesOption = { type: 'line' };

export const getEchartsOption = (options: GetEchartsOption): EChartsOption => {
    const { chartConfig, panelData } = options;

    const xAxisIndex = unsafeFindIndex(
        panelData.columnNames,
        column => column === chartConfig.xAxisColumn,
    );
    const yAxisIndex = unsafeFindIndex(
        panelData.columnNames,
        column => column === chartConfig.yAxisColumn,
    );

    const defaultData: EchartsData = [];
    const groupValueToData = new Map<ClickhouseCell, EchartsData>();

    const getData = (() => {
        if (chartConfig.groupColumn === undefined) {
            return () => defaultData;
        }
        const groupColumnIndex = unsafeFindIndex(
            panelData.columnNames,
            column => column === chartConfig.groupColumn,
        );
        return (row: readonly ClickhouseCell[]) => {
            const value = unsafeGet(row, groupColumnIndex);
            let data = groupValueToData.get(value);
            if (!data) {
                data = [];
                groupValueToData.set(value, data);
            }
            return data;
        };
    })();

    for (const row of panelData.rows) {
        const data = getData(row);
        const x = unsafeGet(row, xAxisIndex);
        const y = unsafeGet(row, yAxisIndex);
        data.push([getEchartsValue(x), getEchartsValue(y)]);
    }

    const data: EchartsData[] = [];
    if (defaultData.length) {
        data.push(defaultData);
    }
    data.push(...groupValueToData.values());

    return {
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
        series:
            chartConfig.groupColumn === undefined
                ? [{ ...seriesCommon, data: defaultData }]
                : Array.from(groupValueToData).map(
                      ([groupValue, data]): LineSeriesOption => ({
                          ...seriesCommon,
                          name: groupValue.toString(),
                          data,
                      }),
                  ),
    };
};
