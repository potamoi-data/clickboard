/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Button, useTheme } from '@mui/material';
import { memo, useCallback, useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { v4 as uuid } from 'uuid';

import {
    ChartType,
    Dashboard,
    getNewPanelPosition,
    getPanelEditorConfigFromPartial,
    PanelConfig,
    PanelEditor,
    PanelLayout,
    PanelLayoutEntry,
    PartialPanelEditorConfig,
} from '~/.';
import { unsafeGet } from '~/utils/array';

import { defaultPartialPanelEditorConfig, defaultPanelData } from '~demo/data/app';

const columns = 12;
const minPanelWidth = 3;
const maxPanelHeight = 2;
const initialPanelWidth = 6;
const initialPanelHeight = 1;
const rowHeight = 256;

const initialPanels: PanelLayout[] = [
    { x: 0, y: 0, height: 2, width: 6 },
    { x: 6, y: 0, height: 1, width: 6 },
    { x: 6, y: 1, height: 1, width: 3 },
    { x: 9, y: 1, height: 1, width: 3 },
];

interface CreatePanelOptions {
    title: string;
    layout: PanelLayout;
}

const _createPanel = (options: CreatePanelOptions): PanelConfig => {
    const { layout, title } = options;
    return {
        chart: {
            type: ChartType.line,
            xAxisColumn: unsafeGet(defaultPanelData.columnNames, 0),
            yAxisColumn: unsafeGet(defaultPanelData.columnNames, 1),
            groupColumn: unsafeGet(defaultPanelData.columnNames, 2),
            legends: true,
        },
        data: defaultPanelData,
        id: uuid(),
        layout,
        title,
    };
};

const _App = () => {
    const theme = useTheme();

    const panelIndexRef = useRef(0);

    const [panelEditorConfig, setPanelEditorConfig] = useState<PartialPanelEditorConfig>();

    const createPanel = useCallback((layout: PanelLayout) => {
        const panel = _createPanel({ title: `Panel ${panelIndexRef.current}`, layout });
        panelIndexRef.current++;
        return panel;
    }, []);

    const [panels, updatePanels] = useImmer<readonly PanelConfig[]>(() =>
        initialPanels.map(layout => createPanel(layout)),
    );

    const addPanel = useCallback(() => {
        setPanelEditorConfig(defaultPartialPanelEditorConfig);
    }, [setPanelEditorConfig]);

    const back = useCallback(() => {
        setPanelEditorConfig(undefined);
    }, [setPanelEditorConfig]);

    const savePanel = useCallback(() => {
        if (!panelEditorConfig) {
            return;
        }
        const filledConfig = getPanelEditorConfigFromPartial(panelEditorConfig);
        if (!filledConfig) {
            return;
        }
        updatePanels(panels => {
            const index = panels.findIndex(panel => panel.id === filledConfig.id);
            if (index === -1) {
                const [x, y] = getNewPanelPosition({
                    columns,
                    initialWidth: initialPanelWidth,
                    panels,
                });
                panels.push({
                    ...filledConfig,
                    layout: { x, y, height: initialPanelHeight, width: initialPanelWidth },
                });
            } else {
                const panel = unsafeGet(panels, index);
                panels[index] = { ...filledConfig, layout: panel.layout };
            }
        });
        setPanelEditorConfig(undefined);
    }, [panelEditorConfig, setPanelEditorConfig, updatePanels]);

    const onLayoutChange = useCallback(
        (entries: PanelLayoutEntry[]) => {
            updatePanels(panels => {
                for (const entry of entries) {
                    const panel = panels.find(panel => panel.id === entry.id);
                    if (panel) {
                        panel.layout = entry.layout;
                    }
                }
            });
        },
        [updatePanels],
    );

    const onPanelDelete = useCallback(
        (id: string) => {
            updatePanels(panels => {
                const index = panels.findIndex(panel => panel.id === id);
                if (index === undefined) {
                    return;
                }
                panels.splice(index, 1);
            });
        },
        [updatePanels],
    );

    const onPanelEdit = useCallback(
        (id: string) => {
            const panel = panels.find(panel => panel.id === id);
            if (panel) {
                setPanelEditorConfig(panel);
            }
        },
        [panels, setPanelEditorConfig],
    );

    const onPanelEditorConfigChange = useCallback(
        (config: PartialPanelEditorConfig) => {
            setPanelEditorConfig(config);
        },
        [setPanelEditorConfig],
    );

    const appCss = css`
        display: flex;
        flex-direction: column;
        height: 100%;
    `;

    const mainCss = css`
        flex: 1 0;
        height: 0;
    `;

    const controlsCss = css`
        display: flex;
        gap: 16px;
        border-top: 1px solid ${theme.palette.divider};
        padding: 16px;
    `;

    return (
        <div css={appCss}>
            <div css={mainCss}>
                {panelEditorConfig ? (
                    <PanelEditor
                        config={panelEditorConfig}
                        horizontalPadding={16}
                        onConfigChange={onPanelEditorConfigChange}
                        previewHeight={rowHeight * initialPanelHeight}
                        verticalPadding={16}
                    ></PanelEditor>
                ) : (
                    <Dashboard
                        columns={columns}
                        gap={16}
                        horizontalPadding={16}
                        maxPanelHeight={maxPanelHeight}
                        minPanelWidth={minPanelWidth}
                        onLayoutChange={onLayoutChange}
                        onPanelDelete={onPanelDelete}
                        onPanelEdit={onPanelEdit}
                        panels={panels}
                        rowHeight={rowHeight}
                        verticalPadding={16}
                    ></Dashboard>
                )}
            </div>
            <div css={controlsCss}>
                {panelEditorConfig ? (
                    <>
                        <Button onClick={back}>Back</Button>
                        <Button
                            disabled={!getPanelEditorConfigFromPartial(panelEditorConfig)}
                            onClick={savePanel}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <Button onClick={addPanel}>Add panel</Button>
                )}
            </div>
        </div>
    );
};

export const App = memo(_App);
