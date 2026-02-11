interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div
      role="alert"
      className="rounded-lg border border-[var(--color-error-border)] bg-[var(--color-error-bg)] p-4"
    >
      <p className="text-sm font-medium text-[var(--color-error-text)]">
        Error: {message}
      </p>
    </div>
  );
};
