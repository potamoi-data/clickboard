import { produce } from 'immer';
import { memo } from 'react';

import { Autocomplete } from '~/components/form-control';
import { PartialCandlestickChartConfig } from '~/types/chart';
import { PartialPanelData } from '~/types/panel-editor';

export interface CandlestickChartEditorProps {
    chartConfig: PartialCandlestickChartConfig;
    onChartConfigChange: (chartConfig: PartialCandlestickChartConfig) => void;
    panelData: PartialPanelData;
}

const _CandlestickChartEditor = (props: CandlestickChartEditorProps) => {
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
                label="Opening Value"
                options={panelData.columnNames}
                value={chartConfig.openColumn}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            if (value) {
                                draft.openColumn = value;
                            } else {
                                delete draft.openColumn;
                            }
                        }),
                    );
                }}
            ></Autocomplete>
            <Autocomplete
                label="Closing Value"
                options={panelData.columnNames}
                value={chartConfig.closeColumn}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            if (value) {
                                draft.closeColumn = value;
                            } else {
                                delete draft.closeColumn;
                            }
                        }),
                    );
                }}
            ></Autocomplete>
            <Autocomplete
                label="Lowest Value"
                options={panelData.columnNames}
                value={chartConfig.lowestColumn}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            if (value) {
                                draft.lowestColumn = value;
                            } else {
                                delete draft.lowestColumn;
                            }
                        }),
                    );
                }}
            ></Autocomplete>
            <Autocomplete
                label="Highest Value"
                options={panelData.columnNames}
                value={chartConfig.highestColumn}
                onChange={value => {
                    onChartConfigChange(
                        produce(chartConfig, draft => {
                            if (value) {
                                draft.highestColumn = value;
                            } else {
                                delete draft.highestColumn;
                            }
                        }),
                    );
                }}
            ></Autocomplete>
        </>
    );
};

export const CandlestickChartEditor = memo(_CandlestickChartEditor);
