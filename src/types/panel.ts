import { PanelEditorConfig } from '~/types/panel-editor';

export interface PanelLayout {
    height: number;
    width: number;
    x: number;
    y: number;
}

export interface PanelLayoutEntry {
    id: string;
    layout: PanelLayout;
}

export interface PanelConfig extends PanelEditorConfig {
    layout: PanelLayout;
}
