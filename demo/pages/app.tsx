import { memo, useCallback, useState } from 'react';

import { removeUndefinedValues } from '~/utils/remove-undefined-values';

import { defaultDemoConfig } from '~demo/data';
import { DashboardPage } from '~demo/pages/dashboard';
import { PanelEditorPage, PanelEditorPageProps } from '~demo/pages/panel-editor';

enum Page {
    dashboard = 'dashboard',
    panelEditor = 'panelEditor',
}

interface DashboardPageData {
    type: Page.dashboard;
}

interface PanelEditorPageData {
    type: Page.panelEditor;
    initialPanelId?: string;
}

type PageData = DashboardPageData | PanelEditorPageData;

const _App = () => {
    const [demoConfig, setDemoConfig] = useState(defaultDemoConfig);
    const [pageData, setPageData] = useState<PageData>({ type: Page.dashboard });

    const onAddPanel = useCallback(() => {
        setPageData({ type: Page.panelEditor });
    }, [setPageData]);

    const onPanelEdit = useCallback(
        (panelId: string) => {
            setPageData({ type: Page.panelEditor, initialPanelId: panelId });
        },
        [setPageData],
    );

    const onBack = useCallback(() => {
        setPageData({ type: Page.dashboard });
    }, [setPageData]);

    switch (pageData.type) {
        case Page.dashboard:
            return (
                <DashboardPage
                    demoConfig={demoConfig}
                    onAddPanel={onAddPanel}
                    onDemoConfigChange={setDemoConfig}
                    onPanelEdit={onPanelEdit}
                ></DashboardPage>
            );
        case Page.panelEditor: {
            const props: PanelEditorPageProps = removeUndefinedValues({
                demoConfig,
                initialPanelId: pageData.initialPanelId,
                onBack,
                onDemoConfigChange: setDemoConfig,
                onSave: onBack,
            });
            return <PanelEditorPage {...props}></PanelEditorPage>;
        }
    }
};

export const App = memo(_App);
