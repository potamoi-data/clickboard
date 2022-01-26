/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import EChart from 'echarts-for-react';
import { memo, useMemo } from 'react';
import useResizeObserver from 'use-resize-observer';

import { ChartConfig } from '~/types/chart';
import { PanelData } from '~/types/panel-editor';
import { getEchartsOption } from '~/utils/chart';

export interface ChartProps {
    config: ChartConfig;
    data: PanelData;
}

const _Chart = (props: ChartProps) => {
    const { config, data } = props;
    const { height, width, ref } = useResizeObserver();

    const option = useMemo(
        () => getEchartsOption({ chartConfig: config, panelData: data }),
        [config, data],
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
