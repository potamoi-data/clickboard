/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { memo, useCallback, useMemo } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import useResizeObserver from 'use-resize-observer';

import { Panel } from '~/components/panel';
import { dragClassName } from '~/data/panel';
import { PanelConfig, PanelLayoutEntry } from '~/types/panel';
import { filterLayoutChangeEntries } from '~/utils/dashboard';

export interface DashboardProps {
    columns: number;
    gap: number;
    horizontalPadding: number;
    maxPanelHeight: number;
    maxPanelWidth?: number;
    minPanelHeight?: number;
    minPanelWidth?: number;
    onLayoutChange: (opitons: PanelLayoutEntry[]) => void;
    onPanelDelete: (id: string) => void;
    panels: readonly PanelConfig[];
    rowHeight: number;
    verticalPadding: number;
}

const _Dashboard = (props: DashboardProps) => {
    const {
        columns,
        gap,
        horizontalPadding,
        maxPanelHeight,
        maxPanelWidth,
        minPanelHeight,
        minPanelWidth,
        onLayoutChange,
        onPanelDelete,
        panels,
        rowHeight,
        verticalPadding,
    } = props;

    const { ref, width } = useResizeObserver();

    const gridLayout = useMemo(
        () =>
            panels.map((panel): Layout => {
                const { layout } = panel;
                return {
                    i: panel.id,
                    x: layout.x,
                    y: layout.y,
                    w: layout.width,
                    h: layout.height,
                    minW: minPanelWidth,
                    maxW: maxPanelWidth,
                    minH: minPanelHeight,
                    maxH: maxPanelHeight,
                };
            }),
        [maxPanelHeight, minPanelHeight, maxPanelWidth, minPanelWidth, panels],
    );

    const onGridLayoutChange = useCallback(
        (layouts: Layout[]) => {
            const entries = layouts.map(layout => ({
                id: layout.i,
                layout: {
                    x: layout.x,
                    y: layout.y,
                    width: layout.w,
                    height: layout.h,
                },
            }));
            const filteredEntries = filterLayoutChangeEntries(entries, panels);
            if (filteredEntries.length) {
                onLayoutChange(filteredEntries);
            }
        },
        [onLayoutChange, panels],
    );

    const dashboardCss = css`
        height: 100%;
        width: 100%;
        overflow-y: auto;
    `;

    const panelElements = panels.map(panel => {
        const onDelete = () => {
            onPanelDelete(panel.id);
        };
        return (
            <div key={panel.id}>
                <Panel config={panel} onDelete={onDelete}></Panel>
            </div>
        );
    });

    return (
        <div css={dashboardCss} ref={ref}>
            {!width ? null : (
                <GridLayout
                    cols={columns}
                    containerPadding={[verticalPadding, horizontalPadding]}
                    draggableHandle={`.${dragClassName}`}
                    layout={gridLayout}
                    margin={[gap, gap]}
                    onLayoutChange={onGridLayoutChange}
                    rowHeight={rowHeight}
                    width={width}
                >
                    {panelElements}
                </GridLayout>
            )}
        </div>
    );
};

export const Dashboard = memo(_Dashboard);
