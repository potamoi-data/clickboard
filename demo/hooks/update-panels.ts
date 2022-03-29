import produce, { Draft } from 'immer';
import { useCallback } from 'react';

import { DemoConfig, DemoPanelConfig } from '~demo/data';

export const useUpdatePanels = (
    demoConfig: DemoConfig,
    onDemoConfigChange?: (config: DemoConfig) => void,
) => {
    const updatePanels = useCallback(
        (callback: (draft: Draft<DemoPanelConfig[]>) => void) => {
            const newDemoConfig = produce(demoConfig, draft => {
                callback(draft.panels);
            });
            onDemoConfigChange?.(newDemoConfig);
        },
        [demoConfig, onDemoConfigChange],
    );
    return updatePanels;
};
