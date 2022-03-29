import { Button } from '@mui/material';
import { memo, useCallback } from 'react';

import { Dashboard, DashboardProps, PanelLayoutEntry } from '~/.';
import { removeUndefinedValues } from '~/utils/remove-undefined-values';

import { BottomControls } from '~demo/components/bottom-controls';
import { DemoConfig } from '~demo/data';
import { useUpdatePanels } from '~demo/hooks/update-panels';
import { getPanelFromDemoConfig } from '~demo/utils/panel-from-demo-config';

export interface DashboardPageProps {
    demoConfig: DemoConfig;
    onAddPanel?: () => void;
    onDemoConfigChange?: (config: DemoConfig) => void;
    onPanelEdit?: (id: string) => void;
}

const _DashboardPage = (props: DashboardPageProps) => {
    const { demoConfig, onAddPanel, onDemoConfigChange, onPanelEdit } = props;
    const {
        columns,
        gap,
        horizontalPadding,
        maxPanelHeight,
        maxPanelWidth,
        minPanelHeight,
        minPanelWidth,
        rowHeight,
        verticalPadding,
    } = demoConfig;

    const updatePanels = useUpdatePanels(demoConfig, onDemoConfigChange);

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

    const dashboardProps: DashboardProps = removeUndefinedValues({
        columns,
        gap,
        horizontalPadding,
        maxPanelHeight,
        maxPanelWidth,
        minPanelHeight,
        minPanelWidth,
        onLayoutChange,
        onPanelDelete,
        onPanelEdit,
        panels: demoConfig.panels.map(demoPanel =>
            getPanelFromDemoConfig({ demoData: demoConfig.data, demoPanel }),
        ),
        rowHeight,
        verticalPadding,
    });

    return (
        <BottomControls controls={<Button onClick={onAddPanel}>Add panel</Button>}>
            <Dashboard {...dashboardProps}></Dashboard>
        </BottomControls>
    );
};

export const DashboardPage = memo(_DashboardPage);
