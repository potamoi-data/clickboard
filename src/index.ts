import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

export type { DashboardProps } from '~/components/dashboard';
export { Dashboard } from '~/components/dashboard';
export type { PanelEditorProps } from '~/components/panel-editor';
export { PanelEditor } from '~/components/panel-editor';
export { emptyPartialPanelEditorConfig } from '~/data/panel-editor';
export type {
    BarChartConfig,
    ChartConfig,
    LineChartConfig,
    PartialBarChartConfig,
    PartialChartConfig,
    PartialLineChartConfig,
} from '~/types/chart';
export { ChartType } from '~/types/chart';
export type { ClickhouseCell } from '~/types/clickhouse';
export { ClickhouseColumnType } from '~/types/clickhouse';
export type { PanelConfig, PanelLayout, PanelLayoutEntry } from '~/types/panel';
export type {
    PanelData,
    PanelEditorConfig,
    PartialPanelData,
    PartialPanelEditorConfig,
} from '~/types/panel-editor';
export type { GetNewPanelPositionOptions } from '~/utils/dashboard';
export { getNewPanelPosition } from '~/utils/dashboard';
export { getPanelEditorConfigFromPartial } from '~/utils/panel-editor';
