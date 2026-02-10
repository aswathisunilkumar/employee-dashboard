interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner = ({ message = 'Loading…' }: LoadingSpinnerProps) => {
    return (
        <div
            role="status"
            className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-gray-500"
        >
            <svg
                className="h-8 w-8 animate-spin text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
}
