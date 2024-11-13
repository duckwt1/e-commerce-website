declare module 'material-ui-confirm' {
    import { ReactNode } from 'react';

    interface ConfirmOptions {
        title?: ReactNode;
        description?: ReactNode;
        confirmationText?: ReactNode;
        cancellationText?: ReactNode;
        dialogProps?: object;
        confirmationButtonProps?: object;
        cancellationButtonProps?: object;
    }

    interface ConfirmProviderProps {
        children: ReactNode;
    }

    export function useConfirm(): (options: ConfirmOptions) => Promise<void>;

    export const ConfirmProvider: React.FC<ConfirmProviderProps>;
}
