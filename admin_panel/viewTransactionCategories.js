// admin_panel/viewTransactionCategories.js

import React from 'react';
import { toast } from 'react-toastify';
import { fetchCategoriesFromServer } from './apiService'; // Hypothetical API service for fetching categories
import Loading from './Loading'; // Component to display loading state
import Info from './Info'; // Component to show informational messages
import { Toaster } from 'react-hot-toast'; // Using react-hot-toast for notifications

/**
 * Fetches the list of transaction categories from the server.
 * @returns {Promise<Array>} - The list of transaction categories.
 */
export const fetchTransactionCategories = async () => {
    try {
        const response = await fetchCategoriesFromServer();
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const categories = await response.json();
        return categories; // Returning the fetched categories
    } catch (error) {
        toast.error("Failed to fetch transaction categories: " + error.message); // Handling fetch error
        return []; // Returning empty array on error
    }
};

/**
 * Renders the transaction categories in the admin view.
 * @param {Array} categories - The list of transaction categories to render.
 * @returns {JSX.Element} - The rendered categories section.
 */
export const renderTransactionCategories = (categories) => {
    if (categories.length === 0) {
        return <Info text={"No categories found!"} />;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Category Name</th>
                    {/* Add more headers as needed */}
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        {/* Add more fields as necessary */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// Main component to display transaction categories
const TransactionCategoriesView = () => {
    const [data, setData] = React.useState([]);
    const [isFetching, setIsFetching] = React.useState(true);

    React.useEffect(() => {
        const loadCategories = async () => {
            const fetchedCategories = await fetchTransactionCategories();
            setData(fetchedCategories);
            setIsFetching(false);
        };

        loadCategories();
    }, []);

    return (
        <Container activeNavId={6}>
            <Header title="Transaction Categories" />
            <Toaster />
            {isFetching && <Loading />}
            {!isFetching && renderTransactionCategories(data)}
        </Container>
    );
};

export default TransactionCategoriesView;
