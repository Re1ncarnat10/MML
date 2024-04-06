import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviesPage from './MoviesPage';

const RoutesComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path="/movies" element={<MoviesPage />} />
            </Routes>
        </Router>
    );
};

export default RoutesComponent;

