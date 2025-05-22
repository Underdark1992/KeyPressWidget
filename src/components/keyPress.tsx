import { ReactElement, createElement, ReactNode, useEffect, useState, MouseEvent as ReactMouseEvent } from "react";
import { KeyBindsType } from "typings/KeyPressWidgetProps";
import { ActionValue } from "mendix";

export interface KeyPressProps {
    keyBindList: KeyBindsType[];
    widgetContent: ReactNode;
    defaultOnclickAction?: ActionValue;
}

export function KeyPress({ keyBindList, widgetContent, defaultOnclickAction }: KeyPressProps): ReactElement {
    // Track the last pressed key (if any)
    const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);

    // Pre-process keyBindList for faster lookups
    const keyBindMap = keyBindList.reduce((acc, keyBind) => {
        // Convert to lowercase for case-insensitive comparison
        const normalizedKey = keyBind.keyModifier.toLowerCase();
        acc[normalizedKey] = keyBind.onClickAction;
        return acc;
    }, {} as Record<string, KeyBindsType["onClickAction"]>);

    // Set up key event listeners
    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            setLastPressedKey(event.key.toLowerCase());
        };

        const keyUpHandler = () => {
            // Clear the key when released
            setLastPressedKey(null);
        };

        // Handle when user switches away from the window
        const blurHandler = () => {
            setLastPressedKey(null);
        };

        window.addEventListener("keydown", keyDownHandler);
        window.addEventListener("keyup", keyUpHandler);
        window.addEventListener("blur", blurHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
            window.removeEventListener("keyup", keyUpHandler);
            window.removeEventListener("blur", blurHandler);
        };
    }, []);

    // This will capture clicks before they reach Mendix buttons
    const handleCapture = (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        // Only intercept if there's a valid key binding for the pressed key
        if (lastPressedKey && keyBindMap[lastPressedKey]) {
            // Stop the event from reaching the Mendix button
            event.stopPropagation();
            event.preventDefault();
            
            const action = keyBindMap[lastPressedKey];
            if (action && action.canExecute && !action.isExecuting) {
                action.execute();
            }
        }
    };

    // Regular click handler for when no keys are pressed
    const handleClick = () => {
        // Only execute default action if no key is pressed
        if (!lastPressedKey && defaultOnclickAction?.canExecute && !defaultOnclickAction.isExecuting) {
            defaultOnclickAction.execute();
        }
    };

    return (
        <div 
            onClickCapture={handleCapture} // This runs first (capture phase)
            onClick={handleClick}         // This runs second (bubble phase)
        >
            {widgetContent}
        </div>
    );
}