import { ReactElement, createElement } from "react";
import { KeyPress } from "./components/keyPress";

export function preview(): ReactElement {
    return <KeyPress keyBindList={[]} widgetContent={undefined}  />;
}

export function getPreviewCss(): string {
    return require("./ui/KeyPressWidget.css");
}
