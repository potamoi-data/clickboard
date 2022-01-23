import { isEqual, sortBy } from 'lodash-es';

import { PanelConfig, PanelLayoutEntry } from '~/types/panel';

export const filterLayoutChangeEntries = (
    entries: readonly PanelLayoutEntry[],
    panels: readonly PanelConfig[],
): PanelLayoutEntry[] => {
    const idToOldEntry = new Map(
        panels.map((panel): [string, PanelLayoutEntry] => [
            panel.id,
            {
                id: panel.id,
                layout: panel.layout,
            },
        ]),
    );
    return entries.filter(entry => {
        const oldEntry = idToOldEntry.get(entry.id);
        if (!oldEntry) {
            return false;
        }
        return !isEqual(entry, oldEntry);
    });
};

export interface GetNewPanelPositionOptions {
    columns: number;
    initialWidth: number;
    panels: readonly PanelLayoutEntry[];
}

// @todo Optimize by not going through all panels
export const getNewPanelPosition = (options: GetNewPanelPositionOptions): [number, number] => {
    const { columns, initialWidth, panels } = options;

    const rowToPanels = new Map<number, PanelLayoutEntry[]>();
    for (const panel of panels) {
        const { layout } = panel;
        const startRow = layout.y;
        const endRow = layout.y + layout.height - 1;
        for (let row = startRow; row <= endRow; row++) {
            let rowPanels = rowToPanels.get(row);
            if (!rowPanels) {
                rowPanels = [];
                rowToPanels.set(row, rowPanels);
            }
            rowPanels.push(panel);
        }
    }

    let startEmptyRow;
    const rowToPanelsEntries = sortBy(Array.from(rowToPanels), ([row]) => row).reverse();
    for (const [row, panels] of rowToPanelsEntries) {
        let startEmpty = true;
        for (const panel of panels) {
            const { layout } = panel;
            if (startEmpty && layout.x < initialWidth) {
                startEmpty = false;
            }
        }
        if (startEmpty) {
            startEmptyRow = row;
            continue;
        }
        if (startEmptyRow !== undefined) {
            return [0, startEmptyRow];
        }
        let lastColumn = 0;
        for (const panel of panels) {
            const { layout } = panel;
            lastColumn = Math.max(lastColumn, layout.x + layout.width);
        }
        if (lastColumn + initialWidth > columns) {
            return [0, row + 1];
        }
        return [lastColumn, row];
    }

    return [0, 0];
};
