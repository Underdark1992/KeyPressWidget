/**
 * This file was generated from KeyPressWidget.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue } from "mendix";

export type KeyModifierEnum = "Control" | "Alt" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

export interface KeyBindsType {
    keyModifier: KeyModifierEnum;
    onClickAction?: ActionValue;
}

export interface KeyBindsPreviewType {
    keyModifier: KeyModifierEnum;
    onClickAction: {} | null;
}

export interface KeyPressWidgetContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    keyBinds: KeyBindsType[];
    content?: ReactNode;
}

export interface KeyPressWidgetPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    keyBinds: KeyBindsPreviewType[];
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
}
