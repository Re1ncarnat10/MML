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

export const addToMyList = async (movieId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/Movies/AddToMyList/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                StatusId: 2,
                IsFavorite: false,
                Rating: null
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
