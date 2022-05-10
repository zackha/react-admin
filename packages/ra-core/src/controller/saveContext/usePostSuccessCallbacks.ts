import { useCallback, useMemo, useRef } from 'react';
import { OnSuccess } from '../../types';

/**
 * Internal hook used to handle post success callbacks for create and edit controllers.
 */
export const usePostSuccessCallbacks = (): [
    OnSuccess[],
    UsePostSaveCallbacksResult
] => {
    const callbacks = useRef<OnSuccess[]>([]);

    const registerPostSuccessCallback = useCallback((callback: OnSuccess) => {
        callbacks.current.push(callback);
    }, []);

    const unregisterPostSuccessCallback = useCallback((callback: OnSuccess) => {
        callbacks.current = callbacks.current.filter(cb => cb !== callback);
    }, []);

    const functions = useMemo<UsePostSaveCallbacksResult>(
        () => ({
            registerPostSuccessCallback,
            unregisterPostSuccessCallback,
        }),
        [registerPostSuccessCallback, unregisterPostSuccessCallback]
    );

    return [callbacks.current, functions];
};

export interface UsePostSaveCallbacksResult {
    registerPostSuccessCallback: (callback: OnSuccess) => void;
    unregisterPostSuccessCallback: (callback: OnSuccess) => void;
}
