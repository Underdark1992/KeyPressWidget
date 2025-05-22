import { ReactElement, createElement } from "react";
import { KeyPress } from "./components/keyPress";

import { KeyPressWidgetContainerProps } from "../typings/KeyPressWidgetProps";

import "./ui/KeyPressWidget.css";

export function KeyPressWidget(props: KeyPressWidgetContainerProps): ReactElement {
    return (
        <KeyPress
            defaultOnclickAction = {props.defaultOnclickAction}
            keyBindList = {props.keyBinds}
            widgetContent = {props.content}
        />
    );
}
