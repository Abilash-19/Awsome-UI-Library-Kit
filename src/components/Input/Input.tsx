import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { useTheme } from '@/theme';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    inputSize?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            inputSize = 'md',
            id,
            disabled,
            ...props
        },
        ref
    ) => {
        const { theme } = useTheme();
        const generatedId = useId();
        const inputId = id || generatedId;
        const errorId = error ? `${inputId}-error` : undefined;
        const helperId = helperText ? `${inputId}-helper` : undefined;

        const baseStyles =
            'flex w-full border bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-secondary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-secondary-800 dark:text-secondary-100 dark:placeholder:text-secondary-500';

        const sizes = {
            sm: 'h-8 text-xs',
            md: 'h-10',
            lg: 'h-12 text-base',
        };

        const themeStyles: Record<string, string> = {
            '--radius': theme.radius,
            '--input-border': error ? theme.colors.error[500] : theme.colors.secondary[300],
            '--input-ring': error ? theme.colors.error[500] : theme.colors.primary[500],
            '--label-text': theme.colors.secondary[700],
            '--error-text': theme.colors.error[600],
            '--helper-text': theme.colors.secondary[500],
        };

        return (
            <div className="w-full" style={themeStyles as React.CSSProperties}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-2 block text-sm font-medium text-[var(--label-text)] dark:text-secondary-300"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        baseStyles,
                        'rounded-[var(--radius)] border-[var(--input-border)] focus-visible:ring-[var(--input-ring)]',
                        sizes[inputSize],
                        className
                    )}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={cn(errorId, helperId)}
                    {...props}
                />
                {error && (
                    <p
                        id={errorId}
                        className="mt-1 text-sm text-[var(--error-text)] dark:text-red-400"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p
                        id={helperId}
                        className="mt-1 text-sm text-[var(--helper-text)] dark:text-secondary-400"
                    >
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };
