import { PanelConfig, PanelData } from '~/.';

import { DemoPanelConfig } from '~demo/data';

interface GetPanelFromDemoConfigOptions {
    demoData: PanelData[];
    demoPanel: DemoPanelConfig;
}

const getDefaultPanelData = (query: string): PanelData => ({
    query,
    columnNames: [],
    columnTypes: [],
    rows: [],
});

export const getPanelFromDemoConfig = (options: GetPanelFromDemoConfigOptions): PanelConfig => {
    const { demoData, demoPanel } = options;
    const { query, ...otherProps } = demoPanel;
    const data =
        demoData.find(panelData => panelData.query.toLowerCase() === query.toLowerCase()) ??
        getDefaultPanelData(query);
    return { ...otherProps, data };
};
