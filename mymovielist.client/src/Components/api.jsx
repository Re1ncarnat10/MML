export const getMoviesFromDatabase = async () => {
    try {
        const response = await fetch('/api/Movies');
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch movies');
    }
};

export const addToMyList = async (movieId) => {
    try {
        const response = await fetch(`/api/Movies/AddToMyList/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
               /* Authorization: `Bearer ${YOUR_AUTH_TOKEN}`,  Include your authentication token if required*/
            },
        });
        if (!response.ok) {
            throw new Error('Failed to add movie to your list');
        }
        // Optionally, you can return response.json() if needed
    } catch (error) {
        throw new Error('Failed to add movie to your list');
    }
};
