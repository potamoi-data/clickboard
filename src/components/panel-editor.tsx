/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Shuffle } from '@mui/icons-material';
import {
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Draft, produce } from 'immer';
import { noop } from 'lodash-es';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { ChartEditor } from '~/components/chart-editor';
import { textfieldCss } from '~/components/form-control';
import { PanelEditorPreview } from '~/components/panel-editor-preview';
import { chartTypeNames } from '~/data/chart';
import { ChartType, PartialChartConfig } from '~/types/chart';
import { PartialPanelEditorConfig } from '~/types/panel-editor';
import { fillPartialPanelEditorConfig } from '~/utils/panel-editor';

export interface PanelEditorProps {
    config: PartialPanelEditorConfig;
    horizontalPadding: number;
    onConfigChange?: (config: PartialPanelEditorConfig) => void;
    onSubmit?: () => void;
    previewHeight: number;
    verticalPadding: number;
}

const _PanelEditor = (props: PanelEditorProps) => {
    const { config, horizontalPadding, onConfigChange, onSubmit, previewHeight, verticalPadding } =
        props;

    const [chartTypeId] = useState(uuid);

    type ProduceConfigCallback = (config: Draft<PartialPanelEditorConfig>) => void;
    const produceConfig = useCallback(
        (callback: ProduceConfigCallback) => {
            if (!onConfigChange) {
                return;
            }
            const newConfig = produce(config, draft => callback(draft));
            onConfigChange(newConfig);
        },
        [config, onConfigChange],
    );

    const onIdChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            produceConfig(config => {
                const { value } = event.target;
                if (value) {
                    config.id = value;
                } else {
                    delete config.id;
                }
            });
        },
        [produceConfig],
    );
    const generateId = useCallback(() => {
        produceConfig(config => {
            config.id = uuid();
        });
    }, [produceConfig]);

    const onTitleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            produceConfig(config => {
                const { value } = event.target;
                if (value) {
                    config.title = value;
                } else {
                    delete config.title;
                }
            });
        },
        [produceConfig],
    );

    const onQueryChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            produceConfig(config => {
                const { value } = event.target;
                if (value) {
                    config.data.query = value;
                } else {
                    delete config.data.query;
                }
            });
        },
        [produceConfig],
    );

    const onDescriptionChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>) => {
            produceConfig(config => {
                const { value } = event.target;
                if (value) {
                    config.description = value;
                } else {
                    delete config.description;
                }
            });
        },
        [produceConfig],
    );

    const onChartTypeChange = useCallback(
        (event: SelectChangeEvent<ChartType | ''>) => {
            const value = event.target.value as ChartType | '';
            if (value === '') {
                return;
            }
            produceConfig(config => {
                config.chart = {
                    type: value,
                };
            });
        },
        [produceConfig],
    );

    const onChartConfigChange = useCallback(
        (chartConfig: PartialChartConfig) => {
            produceConfig(config => {
                config.chart = chartConfig;
            });
        },
        [produceConfig],
    );

    const panelEditorCss = css`
        display: flex;
        flex-direction: column;
        gap: ${verticalPadding}px;
        box-sizing: border-box;
        height: 100%;
        padding: ${verticalPadding}px ${horizontalPadding}px;
    `;

    const previewCss = css`
        height: ${previewHeight}px;
    `;

    const controlsContainerCss = css`
        flex: 1 0;
        height: 0;
    `;

    const controlsCss = css`
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 16px;
        box-sizing: border-box;
        height: 100%;
        padding: ${verticalPadding}px ${horizontalPadding}px;
        overflow-y: auto;
    `;

    const dividerCss = css`
        align-self: stretch;
    `;

    return (
        <div css={panelEditorCss}>
            <div css={previewCss}>
                <PanelEditorPreview
                    config={fillPartialPanelEditorConfig(config)}
                ></PanelEditorPreview>
            </div>
            <Paper css={controlsContainerCss} elevation={2}>
                <form css={controlsCss} onSubmit={onSubmit ?? noop}>
                    <TextField
                        css={textfieldCss}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip title="Random">
                                        <IconButton onClick={generateId}>
                                            <Shuffle></Shuffle>
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                        label="ID"
                        onChange={onIdChange}
                        value={config.id ?? ''}
                    ></TextField>
                    <TextField
                        css={textfieldCss}
                        label="Title"
                        onChange={onTitleChange}
                        value={config.title ?? ''}
                    ></TextField>
                    <TextField
                        css={textfieldCss}
                        label="Query"
                        onChange={onQueryChange}
                        value={config.data.query ?? ''}
                    ></TextField>
                    <TextField
                        css={textfieldCss}
                        label="Description"
                        multiline
                        onChange={onDescriptionChange}
                        rows={3}
                        value={config.description ?? ''}
                    ></TextField>
                    <div css={dividerCss}>
                        <Divider></Divider>
                        <Typography color="text.secondary" variant="caption">
                            Chart
                        </Typography>
                    </div>
                    <FormControl css={textfieldCss}>
                        <InputLabel id={chartTypeId}>Chart Type</InputLabel>
                        <Select
                            labelId={chartTypeId}
                            label="Chart Type"
                            value={config.chart.type ?? ''}
                            onChange={onChartTypeChange}
                        >
                            {Object.entries(chartTypeNames).map(([chartType, name]) => (
                                <MenuItem key={chartType} value={chartType}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <ChartEditor
                        chartConfig={config.chart}
                        onChartConfigChange={onChartConfigChange}
                        panelData={config.data}
                    ></ChartEditor>
                </form>
            </Paper>
        </div>
    );
};

export const PanelEditor = memo(_PanelEditor);
