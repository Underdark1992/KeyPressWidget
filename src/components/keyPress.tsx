import { createElement, ReactElement, ReactNode, useEffect, useState } from "react";
import { KeyBindsType } from "typings/KeyPressWidgetProps";

export interface KeyPressProps {
    keyBindList: KeyBindsType[];
    widgetContent: ReactNode;
}

export function KeyPress({ keyBindList, widgetContent }: KeyPressProps): ReactElement {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

    const keyActionMap = keyBindList.reduce((acc, keyBind) => {
        acc[keyBind.keyModifier.toLowerCase()] = keyBind.onClickAction;
        return acc;
    }, {} as Record<string, KeyBindsType["onClickAction"]>);

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            setPressedKeys(prev => new Set(prev).add(event.key.toLowerCase()));
        };

        const keyUpHandler = (event: KeyboardEvent) => {
            setPressedKeys(prev => {
                const newKeys = new Set(prev);
                newKeys.delete(event.key.toLowerCase());
                return newKeys;
            });
        };

        window.addEventListener("keydown", keyDownHandler);
        window.addEventListener("keyup", keyUpHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
            window.removeEventListener("keyup", keyUpHandler);
        };
    }, []);

    const handleClick = () => {
        pressedKeys.forEach(key => {
            const action = keyActionMap[key];
            if (action && action.canExecute && !action.isExecuting) {
                action.execute();
            }
        });
    };

    return <div onClick={handleClick}>
        {widgetContent}
    </div>;
}
