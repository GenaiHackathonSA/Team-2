// admin_panel/viewTransactionCategories.test.js

import axios from 'axios';
import { fetchTransactionCategories, renderTransactionCategories } from './viewTransactionCategories'; // Adjust the import based on where the functions are defined

// Mock implementation for axios
jest.mock('axios');

describe('Transaction Categories Tests', () => {
    // Test for fetchTransactionCategories
    describe('fetchTransactionCategories', () => {
        it('should fetch transaction categories from the API', async () => {
            // Arrange
            const categoriesMock = [{ id: 1, name: 'Groceries' }, { id: 2, name: 'Utilities' }];
            axios.get.mockResolvedValue({ data: categoriesMock });
            
            // Act
            const result = await fetchTransactionCategories();
            
            // Assert
            expect(result).toEqual(categoriesMock);
            expect(axios.get).toHaveBeenCalledWith('/api/transaction/categories'); // Adjust the URL based on actual implementation
        });

        it('should handle errors correctly', async () => {
            // Arrange
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValue(new Error(errorMessage));
            
            // Act & Assert
            await expect(fetchTransactionCategories()).rejects.toThrow(errorMessage);
        });
    });

    // Test for renderTransactionCategories
    describe('renderTransactionCategories', () => {
        it('should render transaction categories correctly', () => {
            // Arrange
            const categories = [{ id: 1, name: 'Groceries' }, { id: 2, name: 'Utilities' }];
            const expectedOutput = '<li>Groceries</li><li>Utilities</li>'; // Adjust as necessary based on actual render implementation
            
            // Act
            const result = renderTransactionCategories(categories);
            
            // Assert
            expect(result).toEqual(expectedOutput);
        });

        it('should return an empty string when no categories are provided', () => {
            // Arrange
            const categories = [];
            
            // Act
            const result = renderTransactionCategories(categories);
            
            // Assert
            expect(result).toEqual('');
        });
    });
});
