import { useEffect } from 'react';
import { OnSuccess } from '../../types';
import { useSaveContext } from './useSaveContext';

/**
 * A hook that registers a function to call when the save operation from the current SaveContext succeeds.
 * @param callback The function to be called.
 */
export const useRegisterPostSuccessCallback = (callback: OnSuccess) => {
    const {
        registerPostSuccessCallback,
        unregisterPostSuccessCallback,
    } = useSaveContext();

    useEffect(() => {
        registerPostSuccessCallback(callback);
        return () => {
            unregisterPostSuccessCallback(callback);
        };
    }, [callback, registerPostSuccessCallback, unregisterPostSuccessCallback]);
};
