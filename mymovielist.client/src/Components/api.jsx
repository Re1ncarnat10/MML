export const getMoviesFromDatabase = async () => {
    try {
        const response = await fetch('/api/Movies');
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch movies');
    }
};

export const addMovieToMyList = async (movieId) => {
    try {
        const response = await fetch(`/api/Movies/AddToMyList/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // token is a string
            },
            body: JSON.stringify({
                statusId: 2,
                isFavorite: false,
                rating: 0
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add movie to your list');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to add movie to your list');
    }
};


export const updateMyList = async (movieId, updates) => {
    try {
        const response = await fetch(`/api/Movies/UpdateMyList/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updates),
        });
        if (!response.ok) {
            throw new Error('Failed to update movie');
        }
        // Optionally, you can return response.json() if needed
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to update movie');
    }
};
export const removeFromMyList = async (movieId) => {
    try {
        const response = await fetch(`/api/Movies/RemoveFromMyList/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to remove movie from list');
        }
        // Optionally, you can return response.json() if needed
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to remove movie from list');
    }
};