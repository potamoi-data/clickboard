import { produce } from 'immer';

import { ClickhouseColumnType, emptyPartialPanelEditorConfig, PanelData } from '~/.';

export const defaultPanelData: PanelData = {
    query: 'Query',
    columnNames: ['column_0', 'column_1', 'column_2', 'column_3'],
    columnTypes: [
        ClickhouseColumnType.float,
        ClickhouseColumnType.float,
        ClickhouseColumnType.float,
        ClickhouseColumnType.float,
    ],
    rows: [
        [0, 1, 10, 20],
        [3, 5, 10, 21],
        [2, 1, 11, 20],
        [6, 7, 11, 21],
    ],
};

export const defaultPartialPanelEditorConfig = produce(emptyPartialPanelEditorConfig, config => {
    config.data = defaultPanelData;
});
