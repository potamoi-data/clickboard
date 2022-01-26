import { ChartConfig, PartialChartConfig } from '~/types/chart';
import { ClickhouseCell, ClickhouseColumnType } from '~/types/clickhouse';

export interface PartialPanelData {
    columnNames: string[];
    columnTypes: ClickhouseColumnType[];
    query?: string;
    rows: ClickhouseCell[][];
}

export interface PanelData extends PartialPanelData {
    query: string;
}

export interface PartialPanelEditorConfig {
    chart: PartialChartConfig;
    data: PartialPanelData;
    description?: string;
    id?: string;
    title?: string;
}

export interface PanelEditorConfig extends PartialPanelEditorConfig {
    chart: ChartConfig;
    data: PanelData;
    id: string;
    title: string;
}
