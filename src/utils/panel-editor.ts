import { produce } from 'immer';

import { ChartType } from '~/types/chart';
import {
    PanelData,
    PanelEditorConfig,
    PartialPanelData,
    PartialPanelEditorConfig,
} from '~/types/panel-editor';
import { isChartConfigComplete } from '~/utils/chart';

export const fillPartialPanelEditorConfig = (
    config: PartialPanelEditorConfig,
): PartialPanelEditorConfig =>
    produce(config, draft => {
        // @todo
        draft.chart.type = ChartType.line;
        draft.chart.legends = !!draft.chart.legends;
    });

export const isPanelDataComplete = (data: PartialPanelData): data is PanelData => !!data.query;

export const isPanelEditorConfigComplete = (
    config: PartialPanelEditorConfig,
): config is PanelEditorConfig =>
    isChartConfigComplete(config.chart) &&
    isPanelDataComplete(config.data) &&
    config.id !== undefined &&
    config.title !== undefined;

export const getPartialPanelEditorConfigFromPartial = (
    config: PartialPanelEditorConfig,
): PanelEditorConfig | undefined => {
    const filledConfig = fillPartialPanelEditorConfig(config);
    return isPanelEditorConfigComplete(filledConfig) ? filledConfig : undefined;
};
