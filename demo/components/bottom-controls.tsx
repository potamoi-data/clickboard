/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { memo, ReactNode } from 'react';

export interface BottomControlsProps {
    children?: ReactNode;
    controls?: ReactNode;
}

const _BottomControls = (props: BottomControlsProps) => {
    const { children, controls } = props;

    const theme = useTheme();

    const containerCss = css`
        display: flex;
        flex-direction: column;
        height: 100%;
    `;

    const mainCss = css`
        flex: 1 0;
        height: 0;
    `;

    const controlsCss = css`
        display: flex;
        gap: 16px;
        border-top: 1px solid ${theme.palette.divider};
        padding: 16px;
    `;

    return (
        <div css={containerCss}>
            <div css={mainCss}>{children}</div>
            <div css={controlsCss}>{controls}</div>
        </div>
    );
};

export const BottomControls = memo(_BottomControls);
