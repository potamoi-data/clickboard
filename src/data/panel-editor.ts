import { PartialPanelEditorConfig } from '~/types/panel-editor';

export const emptyPartialPanelEditorConfig: PartialPanelEditorConfig = {
    chart: {},
    data: {
        columnNames: [],
        columnTypes: [],
        rows: [],
    },
};
