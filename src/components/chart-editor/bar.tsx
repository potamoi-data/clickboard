import { produce } from 'immer';
import { memo } from 'react';

import { Autocomplete, Checkbox } from '~/components/form-control';
import { PartialBarChartConfig } from '~/types/chart';
import { PartialPanelData } from '~/types/panel-editor';

export interface BarChartEditorProps {
    chartConfig: PartialBarChartConfig;
    onChartConfigChange: (chartConfig: PartialBarChartConfig) => void;
    panelData: PartialPanelData;
}

const _BarChartEditor = (props: BarChartEditorProps) => {
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
                label="Stack by"
                options={panelData.columnNames}
                value={chartConfig.stackColumn}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            if (value) {
                                draft.stackColumn = value;
                            } else {
                                delete draft.stackColumn;
                            }
                        }),
                    );
                }}
            ></Autocomplete>
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

export const BarChartEditor = memo(_BarChartEditor);
