import { ChartConfig } from '~/types/chart';
import { ClickhouseCell, ClickhouseColumnType } from '~/types/clickhouse';

export interface PanelLayout {
    height: number;
    width: number;
    x: number;
    y: number;
}

export interface PanelLayoutEntry {
    id: string;
    layout: PanelLayout;
}

export interface PanelData {
    columnNames: string[];
    columnTypes: ClickhouseColumnType[];
    query: string;
    rows: ClickhouseCell[][];
}

export interface PanelEditorConfig {
    chartConfig: ChartConfig;
    data: PanelData;
    description?: string;
    id: string;
    layout: PanelLayout;
    title: string;
}

export interface PanelConfig {
    chartConfig: ChartConfig;
    data: PanelData;
    description?: string;
    id: string;
    layout: PanelLayout;
    title: string;
}
