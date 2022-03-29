import { getNewPanelPosition } from './dashboard';

describe('getNewPanelPosition', () => {
    test('No panels', () => {
        expect(getNewPanelPosition({ columns: 12, initialPanelWidth: 6, panels: [] })).toEqual([
            0, 0,
        ]);
    });
    test('Row full', () => {
        expect(
            getNewPanelPosition({
                columns: 12,
                initialPanelWidth: 6,
                panels: [
                    { id: '0', layout: { x: 0, y: 0, height: 1, width: 6 } },
                    { id: '1', layout: { x: 6, y: 0, height: 1, width: 6 } },
                    { id: '2', layout: { x: 0, y: 1, height: 1, width: 6 } },
                ],
            }),
        ).toEqual([6, 1]);
    });
    test('Row start empty', () => {
        expect(
            getNewPanelPosition({
                columns: 12,
                initialPanelWidth: 6,
                panels: [
                    { id: '0', layout: { x: 0, y: 0, height: 1, width: 6 } },
                    { id: '1', layout: { x: 6, y: 0, height: 1, width: 6 } },
                    { id: '2', layout: { x: 6, y: 1, height: 1, width: 6 } },
                    { id: '2', layout: { x: 6, y: 2, height: 1, width: 6 } },
                ],
            }),
        ).toEqual([0, 1]);
    });
});
