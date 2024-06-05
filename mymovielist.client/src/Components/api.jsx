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
export const getMyMovieList = async () => {
    try {
        const response = await fetch('/api/Movies/MyList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const myList = await response.json();

        return myList; 
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addMovieToMyList = async (movieId) => {
    try {
        const response = await fetch(`/api/Movies/AddToMyList/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') 
            },
            body: JSON.stringify({
                statusId: 1,
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
export const createMovie = async (movie) => {
    try {
        const response = await fetch('/api/Admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the JWT token is stored in local storage
            },
            body: JSON.stringify(movie),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Movie created:', data);
    } catch (error) {
        console.error(error);
    }
};


export const deleteAdmin = async (id) => {
    try {
        const response = await fetch(`/api/Admin/${id}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`Movie with id ${id} deleted successfully`);
    } catch (error) {
        console.error(error);
    }
};
export const getUser = async () => {
    try {
        const response = await fetch('/api/User', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();

        return user; 
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const deleteUser = async (id) => {
    try {
        const response = await fetch(`/api/User/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`User with id ${id} deleted successfully`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getUserRoles = async () => {
    try {
        const response = await fetch('/api/User/roles', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const roles = await response.json();

        return roles; 
    } catch (error) {
        return []; 
    }
};

