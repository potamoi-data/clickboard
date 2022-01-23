/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Button, useTheme } from '@mui/material';
import { memo, useCallback, useRef } from 'react';
import { useImmer } from 'use-immer';
import { v4 as uuid } from 'uuid';

import {
    ChartType,
    ClickhouseColumnType,
    Dashboard,
    getNewPanelPosition,
    PanelConfig,
    PanelLayout,
    PanelLayoutEntry,
} from '~/.';

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
    const xAxisColumn = 'x';
    const yAxisColumn = 'y';
    const groupColumn = 'z';
    return {
        chartConfig: {
            type: ChartType.line,
            xAxisColumn,
            yAxisColumn,
            groupColumn,
            legends: true,
        },
        data: {
            columnNames: [xAxisColumn, yAxisColumn, groupColumn],
            columnTypes: [
                ClickhouseColumnType.float,
                ClickhouseColumnType.float,
                ClickhouseColumnType.string,
            ],
            rows: [
                [0, 1, 'group0'],
                [3, 5, 'group0'],
                [2, 1, 'group1'],
                [6, 7, 'group1'],
            ],
            query: 'query',
        },
        id: uuid(),
        layout,
        title,
    };
};

const _App = () => {
    const theme = useTheme();

    const panelIndexRef = useRef(0);

    const createPanel = useCallback((layout: PanelLayout) => {
        const panel = _createPanel({ title: `Panel ${panelIndexRef.current}`, layout });
        panelIndexRef.current++;
        return panel;
    }, []);

    const [panels, updatePanels] = useImmer<readonly PanelConfig[]>(() =>
        initialPanels.map(layout => createPanel(layout)),
    );

    const addPanel = useCallback(() => {
        updatePanels(panels => {
            const [x, y] = getNewPanelPosition({
                panels,
                columns,
                initialWidth: initialPanelWidth,
            });
            return [
                ...panels,
                createPanel({ x, y, height: initialPanelHeight, width: initialPanelWidth }),
            ];
        });
    }, [createPanel, updatePanels]);

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

    const appCss = css`
        display: flex;
        flex-direction: column;
        height: 100%;
    `;

    const dashboardCss = css`
        flex: 1 0;
        height: 0;
    `;

    const controlsCss = css`
        display: flex;
        border-top: 1px solid ${theme.palette.divider};
        padding: 16px;
    `;

    return (
        <div css={appCss}>
            <div css={dashboardCss}>
                <Dashboard
                    columns={columns}
                    gap={16}
                    horizontalPadding={16}
                    maxPanelHeight={maxPanelHeight}
                    minPanelWidth={minPanelWidth}
                    onLayoutChange={onLayoutChange}
                    onPanelDelete={onPanelDelete}
                    panels={panels}
                    rowHeight={rowHeight}
                    verticalPadding={16}
                ></Dashboard>
            </div>
            <div css={controlsCss}>
                <Button onClick={addPanel}>Add panel</Button>
            </div>
        </div>
    );
};

export const App = memo(_App);
