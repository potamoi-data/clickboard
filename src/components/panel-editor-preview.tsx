/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Paper, Typography } from '@mui/material';
import { memo, RefObject } from 'react';

import { Chart } from '~/components/chart';
import { dragClassName } from '~/data/panel';
import { PartialPanelEditorConfig } from '~/types/panel-editor';
import { isChartConfigComplete } from '~/utils/chart';
import { isPanelDataComplete } from '~/utils/panel-editor';

export interface PanelEditorPreviewProps {
    config: PartialPanelEditorConfig;
    menuButtonRef?: RefObject<HTMLButtonElement>;
    onMenuButtonClick?: () => void;
}

const _PanelEditorPreview = (props: PanelEditorPreviewProps) => {
    const { config, onMenuButtonClick, menuButtonRef } = props;

    const panelCss = css`
        display: flex;
        flex-direction: column;
        height: 100%;
    `;

    const headerCss = css`
        display: flex;
        align-items: center;
    `;

    const titleCss = css`
        flex: 1 0;
        align-self: stretch;
        display: flex;
        align-items: center;
        cursor: move;
        width: 0;
        padding: 8px 8px 8px 16px;
    `;

    const menuCss = css`
        padding: 8px 8px 8px 0;
        visibility: ${menuButtonRef || onMenuButtonClick ? 'visible' : 'hidden'};
    `;

    const chartCss = css`
        flex: 1 0;
        height: 0;
    `;

    return (
        <Paper css={panelCss} elevation={2}>
            <div css={headerCss}>
                <div css={titleCss} className={dragClassName}>
                    <Typography variant="subtitle1" noWrap>
                        {config.title}
                    </Typography>
                </div>
                <div css={menuCss}>
                    <IconButton ref={menuButtonRef} onClick={onMenuButtonClick}>
                        <MoreVert></MoreVert>
                    </IconButton>
                </div>
            </div>
            <div css={chartCss}>
                {isChartConfigComplete(config.chart) && isPanelDataComplete(config.data) && (
                    <Chart config={config.chart} data={config.data}></Chart>
                )}
            </div>
        </Paper>
    );
};

export const PanelEditorPreview = memo(_PanelEditorPreview);
