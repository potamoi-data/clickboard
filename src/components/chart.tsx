/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import EChart from 'echarts-for-react';
import { memo, useMemo } from 'react';
import useResizeObserver from 'use-resize-observer';

import { PanelConfig } from '~/types/panel';
import { getEchartsOption } from '~/utils/chart';

export interface ChartProps {
    panel: PanelConfig;
}

const _Chart = (props: ChartProps) => {
    const { panel } = props;
    const { height, width, ref } = useResizeObserver();

    const option = useMemo(
        () => getEchartsOption({ chartConfig: panel.chartConfig, panelData: panel.data }),
        [panel],
    );

    const chartCss = css`
        height: 100%;
        width: 100%;
    `;

    return (
        <div ref={ref} css={chartCss}>
            {!(height && width) ? null : (
                <EChart lazyUpdate notMerge option={option} style={{ height, width }}></EChart>
            )}
        </div>
    );
};

export const Chart = memo(_Chart);
