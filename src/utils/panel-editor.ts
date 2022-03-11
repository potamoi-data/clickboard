import { produce } from 'immer';

import { ChartType, PartialChartConfig } from '~/types/chart';
import {
    PanelData,
    PanelEditorConfig,
    PartialPanelData,
    PartialPanelEditorConfig,
} from '~/types/panel-editor';
import {
    fillBarChartConfig,
    fillCandlestickChartConfig,
    fillLineChartConfig,
    isChartConfigComplete,
} from '~/utils/chart';

const fillChartConfig = (config: PartialChartConfig): PartialChartConfig => {
    if (!config.type) {
        return config;
    }
    switch (config.type) {
        case ChartType.bar:
            return fillBarChartConfig(config);
        case ChartType.candlestick:
            return fillCandlestickChartConfig(config);
        case ChartType.line:
            return fillLineChartConfig(config);
    }
};

export const fillPartialPanelEditorConfig = (
    config: PartialPanelEditorConfig,
): PartialPanelEditorConfig =>
    produce(config, draft => {
        // @todo
        draft.chart = fillChartConfig(draft.chart);
    });

export const isPanelDataComplete = (data: PartialPanelData): data is PanelData => !!data.query;

export const isPanelEditorConfigComplete = (
    config: PartialPanelEditorConfig,
): config is PanelEditorConfig =>
    isChartConfigComplete(config.chart) &&
    isPanelDataComplete(config.data) &&
    config.id !== undefined &&
    config.title !== undefined;

export const getPanelEditorConfigFromPartial = (
    config: PartialPanelEditorConfig,
): PanelEditorConfig | undefined => {
    const filledConfig = fillPartialPanelEditorConfig(config);
    return isPanelEditorConfigComplete(filledConfig) ? filledConfig : undefined;
};
