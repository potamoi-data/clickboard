import { Button } from '@mui/material';
import { memo, useCallback, useState } from 'react';

import {
    getNewPanelPosition,
    getPanelEditorConfigFromPartial,
    PanelEditor,
    PanelEditorProps,
    PartialPanelEditorConfig,
} from '~/.';
import { unsafeGet } from '~/utils/array';
import { removeUndefinedValues } from '~/utils/remove-undefined-values';

import { BottomControls } from '~demo/components/bottom-controls';
import { DemoConfig } from '~demo/data';
import { useUpdatePanels } from '~demo/hooks/update-panels';
import { getPanelFromDemoConfig } from '~demo/utils/panel-from-demo-config';

export interface PanelEditorPageProps {
    demoConfig: DemoConfig;
    initialPanelId?: string;
    onBack?: () => void;
    onDemoConfigChange?: (config: DemoConfig) => void;
    onSave?: () => void;
}

const defaultPanelEditorConfig: PartialPanelEditorConfig = {
    chart: {},
    data: {
        columnNames: [],
        columnTypes: [],
        rows: [],
    },
};

const _PanelEditorPage = (props: PanelEditorPageProps) => {
    const { demoConfig, initialPanelId, onBack, onDemoConfigChange, onSave } = props;
    const {
        columns,
        horizontalPadding,
        initialPanelWidth,
        minPanelHeight,
        rowHeight,
        verticalPadding,
    } = demoConfig;
    const { initialPanelHeight = minPanelHeight ?? 1 } = demoConfig;

    const [panelEditorConfig, setPanelEditorConfig] = useState(() => {
        const demoPanel = demoConfig.panels.find(panel => panel.id === initialPanelId);
        if (!demoPanel) {
            return defaultPanelEditorConfig;
        }
        return getPanelFromDemoConfig({ demoData: demoConfig.data, demoPanel });
    });

    const onConfigChange = useCallback(
        (config: PartialPanelEditorConfig) => {
            const { query } = config.data;
            if (query === undefined) {
                setPanelEditorConfig(config);
                return;
            }
            const data = demoConfig.data.find(
                panelData => panelData.query.toLowerCase() === query.toLowerCase(),
            );
            if (!data) {
                setPanelEditorConfig(config);
                return;
            }
            setPanelEditorConfig({ ...config, data });
        },
        [demoConfig.data, setPanelEditorConfig],
    );

    const updatePanels = useUpdatePanels(demoConfig, onDemoConfigChange);

    const savePanel = useCallback(() => {
        const filledConfig = getPanelEditorConfigFromPartial(panelEditorConfig);
        if (!filledConfig) {
            return;
        }
        const { data, ...otherProps } = filledConfig;
        updatePanels(panels => {
            const index = panels.findIndex(panel => panel.id === filledConfig.id);
            if (index === -1) {
                const [x, y] = getNewPanelPosition({
                    columns,
                    initialPanelWidth,
                    panels,
                });
                panels.push({
                    ...otherProps,
                    query: data.query,
                    layout: { x, y, height: initialPanelHeight, width: initialPanelWidth },
                });
            } else {
                const panel = unsafeGet(panels, index);
                panels[index] = { ...otherProps, query: data.query, layout: panel.layout };
            }
        });
        onSave?.();
    }, [columns, initialPanelHeight, initialPanelWidth, onSave, panelEditorConfig, updatePanels]);

    const panelEditorProps: PanelEditorProps = removeUndefinedValues({
        config: panelEditorConfig,
        horizontalPadding: horizontalPadding,
        onConfigChange,
        previewHeight: rowHeight * initialPanelHeight,
        verticalPadding: verticalPadding,
    });

    return (
        <BottomControls
            controls={
                <>
                    <Button onClick={onBack}>Back</Button>
                    <Button
                        disabled={!getPanelEditorConfigFromPartial(panelEditorConfig)}
                        onClick={savePanel}
                    >
                        Save
                    </Button>
                </>
            }
        >
            <PanelEditor {...panelEditorProps}></PanelEditor>
        </BottomControls>
    );
};

export const PanelEditorPage = memo(_PanelEditorPage);
