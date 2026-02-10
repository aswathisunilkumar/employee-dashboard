/**
 * Shared utility types used across multiple features.
 * Feature-specific types stay in their own feature folder.
 */

/** Generic async-data state shape, used by any data-fetching hook. */
export interface AsyncState<T> {
    data: T;
    isLoading: boolean;
    error: string | null;
}

/** Reusable sort direction. */
export type SortOrder = 'asc' | 'desc';
