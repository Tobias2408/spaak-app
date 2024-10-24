// services/parliamentService.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchLaws } from './parliamentService';

describe('fetchLaws', () => {
  it('should fetch the laws data correctly', async () => {
    // Initialize the mock adapter on the axios instance
    const mock = new MockAdapter(axios);

    // Mock the API response for the endpoint
    const mockResponse = {
      value: [
        {
          id: 67905,
          typeid: 5,
          kategoriid: 15,
          statusid: 16,
          titel: "Test Law Title",
          periodeid: 160,
        },
      ],
    };

    // Mock the GET request to return the above mockResponse
    mock.onGet('https://oda.ft.dk/api/Sag?$filter=(typeid eq 3 or typeid eq 5 or typeid eq 9) and (periodeid eq 160)')
        .reply(200, mockResponse);

    // Call the fetchLaws function
    const result = await fetchLaws();

    // Assertions
    expect(result).toEqual(mockResponse.value);
  });

  it('should handle errors correctly', async () => {
    // Initialize the mock adapter on the axios instance
    const mock = new MockAdapter(axios);

    // Mock an error response
    mock.onGet('https://oda.ft.dk/api/Sag?$filter=(typeid eq 3 or typeid eq 5 or typeid eq 9) and (periodeid eq 160)')
        .reply(500);

    // Assertions
    await expect(fetchLaws()).rejects.toThrow('Request failed with status code 500');
  });
});
