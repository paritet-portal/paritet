export async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
        let errorMessage = response.statusText;

        if (isJson) {
            try {
                const errorBody = (await response.json()) as { message?: string };
                if (errorBody.message) {
                    errorMessage = errorBody.message;
                }
            } catch {

            }
        }

        throw new Error(`API Error: ${errorMessage}`);
    }

    if (isJson) {
        return response.json() as Promise<T>;
    }

    return {} as T;
}
