export async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    let errorMessage = response.statusText; // Default

    if (!response.ok) {
        if (isJson) {
            try {
                const errorBody = await response.json() as { message?: string; error?: string }; // Be more specific with potential keys
                if (errorBody.message) {
                    errorMessage = errorBody.message;
                } else if (errorBody.error) { // Common key in some frameworks
                    errorMessage = errorBody.error;
                } else {
                    errorMessage = `API responded with status ${response.status}`;
                }
            } catch (e) {
                errorMessage = `Failed to parse JSON error response: ${e.message}`;
            }
        }
        if (!isJson && errorMessage === response.statusText) {
             errorMessage = `API Error: Received non-JSON response with status ${response.status}`;
        }
        throw new Error(`API Error: ${errorMessage}`);
    }

    if (isJson) {
        return response.json() as Promise<T>;
    }

    if (!isJson) {
         console.warn("Received non-JSON response for an OK status.");
         return {} as T; // Or throw new Error("Expected JSON response");
    }

    return response.json() as Promise<T>;
}

// export async function handleResponse<T>(response: Response): Promise<T> {
//     const contentType = response.headers.get('content-type');
//     const isJson = contentType?.includes('application/json');

//     if (!response.ok) {
//         let errorMessage = response.statusText;

//         if (isJson) {
//             try {
//                 const errorBody = (await response.json()) as { message?: string };
//                 if (errorBody.message) {
//                     errorMessage = errorBody.message;
//                 }
//             } catch {

//             }
//         }

//         throw new Error(`API Error: ${errorMessage}`);
//     }

//     if (isJson) {
//         return response.json() as Promise<T>;
//     }

//     return {} as T;
// }
