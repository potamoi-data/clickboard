/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Shuffle } from '@mui/icons-material';
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    TextFieldProps,
    Tooltip,
    Typography,
} from '@mui/material';
import { Draft, produce } from 'immer';
import { noop } from 'lodash-es';
import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import { PanelEditorPreview } from '~/components/panel-editor-preview';
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

const textFieldWidth = 256;

const _PanelEditor = (props: PanelEditorProps) => {
    const { config, horizontalPadding, onConfigChange, onSubmit, previewHeight, verticalPadding } =
        props;

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

    const textFieldCss = css`
        width: ${textFieldWidth}px;
    `;

    const xAxisOptions = useMemo(() => config.data.columnNames, [config]);
    const xAxisInput = useCallback(
        (params: AutocompleteRenderInputParams) => (
            <TextField
                css={textFieldCss}
                {...(params as TextFieldProps)}
                label="X Axis"
            ></TextField>
        ),
        [textFieldCss],
    );
    const onXAxisChange = useCallback(
        (_event: unknown, value: string | null) => {
            produceConfig(config => {
                if (value) {
                    config.chart.xAxisColumn = value;
                } else {
                    delete config.chart.xAxisColumn;
                }
            });
        },
        [produceConfig],
    );

    const yAxisOptions = useMemo(() => config.data.columnNames, [config]);
    const yAxisInput = useCallback(
        (params: AutocompleteRenderInputParams) => (
            <TextField
                css={textFieldCss}
                {...(params as TextFieldProps)}
                label="Y Axis"
            ></TextField>
        ),
        [textFieldCss],
    );
    const onYAxisChange = useCallback(
        (_event: unknown, value: string | null) => {
            produceConfig(config => {
                if (value) {
                    config.chart.yAxisColumn = value;
                } else {
                    delete config.chart.yAxisColumn;
                }
            });
        },
        [produceConfig],
    );

    const chartGroupOptions = useMemo(() => config.data.columnNames, [config]);
    const chartGroupInput = useCallback(
        (params: AutocompleteRenderInputParams) => (
            <TextField
                css={textFieldCss}
                {...(params as TextFieldProps)}
                label="Group by"
            ></TextField>
        ),
        [textFieldCss],
    );
    const onChartGroupChange = useCallback(
        (_event: unknown, value: string | null) => {
            produceConfig(config => {
                if (value) {
                    config.chart.groupColumn = value;
                } else {
                    delete config.chart.groupColumn;
                }
            });
        },
        [produceConfig],
    );

    const onChartLegendsChange = useCallback(
        (_event: unknown, value: boolean) => {
            produceConfig(config => {
                config.chart.legends = value;
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
                        css={textFieldCss}
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
                        css={textFieldCss}
                        label="Title"
                        onChange={onTitleChange}
                        value={config.title ?? ''}
                    ></TextField>
                    <TextField
                        css={textFieldCss}
                        label="Query"
                        onChange={onQueryChange}
                        value={config.data.query ?? ''}
                    ></TextField>
                    <TextField
                        css={textFieldCss}
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
                    <Autocomplete
                        onChange={onXAxisChange}
                        options={xAxisOptions}
                        renderInput={xAxisInput}
                        value={config.chart.xAxisColumn ?? null}
                    ></Autocomplete>
                    <Autocomplete
                        onChange={onYAxisChange}
                        options={yAxisOptions}
                        renderInput={yAxisInput}
                        value={config.chart.yAxisColumn ?? null}
                    ></Autocomplete>
                    <Autocomplete
                        onChange={onChartGroupChange}
                        options={chartGroupOptions}
                        renderInput={chartGroupInput}
                        value={config.chart.groupColumn ?? null}
                    ></Autocomplete>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={onChartLegendsChange}
                                checked={!!config.chart.legends}
                            ></Checkbox>
                        }
                        label="Show Legends"
                    ></FormControlLabel>
                </form>
            </Paper>
        </div>
    );
};

export const PanelEditor = memo(_PanelEditor);
