import { memo } from 'react';

import { ChartType, PartialChartConfig } from '~/types/chart';
import { PartialPanelData } from '~/types/panel-editor';

import { BarChartEditor, BarChartEditorProps } from './bar';
import { LineChartEditor, LineChartEditorProps } from './line';

export interface ChartEditorProps {
    chartConfig: PartialChartConfig;
    onChartConfigChange: (chartConfig: PartialChartConfig) => void;
    panelData: PartialPanelData;
}

const _ChartEditor = (props: ChartEditorProps) => {
    const { chartConfig } = props;
    if (!chartConfig.type) {
        return null;
    }
    switch (chartConfig.type) {
        case ChartType.bar:
            return <BarChartEditor {...(props as BarChartEditorProps)}></BarChartEditor>;
        case ChartType.line:
            return <LineChartEditor {...(props as LineChartEditorProps)}></LineChartEditor>;
    }
};

export const ChartEditor = memo(_ChartEditor);
