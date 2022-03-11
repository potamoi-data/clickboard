import { produce } from 'immer';
import { memo } from 'react';

import { Autocomplete, Checkbox } from '~/components/form-control';
import { PartialLineChartConfig } from '~/types/chart';
import { PartialPanelData } from '~/types/panel-editor';

export interface LineChartEditorProps {
    chartConfig: PartialLineChartConfig;
    onChartConfigChange: (chartConfig: PartialLineChartConfig) => void;
    panelData: PartialPanelData;
}

const _LineChartEditor = (props: LineChartEditorProps) => {
    const { chartConfig, onChartConfigChange, panelData } = props;
    return (
        <>
            <Autocomplete
                label="X Axis"
                options={panelData.columnNames}
                value={chartConfig.xAxisColumn}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            if (value) {
                                draft.xAxisColumn = value;
                            } else {
                                delete draft.xAxisColumn;
                            }
                        }),
                    );
                }}
            ></Autocomplete>
            <Autocomplete
                label="Y Axis"
                options={panelData.columnNames}
                value={chartConfig.yAxisColumn}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            if (value) {
                                draft.yAxisColumn = value;
                            } else {
                                delete draft.yAxisColumn;
                            }
                        }),
                    );
                }}
            ></Autocomplete>
            <Autocomplete
                label="Group by"
                options={panelData.columnNames}
                value={chartConfig.groupColumn}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            if (value) {
                                draft.groupColumn = value;
                            } else {
                                delete draft.groupColumn;
                            }
                        }),
                    );
                }}
            ></Autocomplete>
            <Checkbox
                label="Stack"
                checked={chartConfig.stack}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            draft.stack = value;
                        }),
                    );
                }}
            ></Checkbox>
            <Checkbox
                label="Show Legends"
                checked={chartConfig.legends}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            draft.legends = value;
                        }),
                    );
                }}
            ></Checkbox>
        </>
    );
};

export const LineChartEditor = memo(_LineChartEditor);
