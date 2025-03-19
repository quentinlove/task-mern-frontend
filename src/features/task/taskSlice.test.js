// taskSlice.test.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Not needed explicitly – configureStore includes it by default.
import taskReducer, { getTasks } from './taskSlice';
// If you have an auth reducer, import it; otherwise, create a dummy reducer.
import authReducer from '../auth/authSlice'; 
import taskService from './taskService';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// Set up Axios mock adapter
const mock = new MockAdapter(axios);

describe('taskSlice', () => {
  let store;

  beforeEach(() => {
    // Create a real Redux store with your reducers and a preloaded state.
    store = configureStore({
      reducer: {
        task: taskReducer,
        auth: authReducer, // Or replace with a dummy: (state = { user: { token: 'mock_token' } }) => state,
      },
      preloadedState: {
        task: {
          tasks: [],
          isError: false,
          isSuccess: false,
          isLoading: false,
          message: '',
        },
        auth: {
          user: { token: 'mock_token' },
        },
      },
    });
  });

  afterEach(() => {
    // Reset axios mocks after each test
    mock.reset();
  });

  test('calls the taskService to fetch tasks', async () => {
    const token = 'mock_token';
    const tasks = [
      {
        _id: '67d843ec8a88786d061a87b6',
        text: 'i need to go to miami',
        user: '67d437fe69afd4c22ecb533e',
        createdAt: '2025-03-17T15:46:52.378+00:00',
        updatedAt: '2025-03-17T15:46:52.378+00:00',
        __v: 0,
      },
    ];

    // Spy on the taskService.getTasks method and return the fake tasks
    const getTasksSpy = jest
      .spyOn(taskService, 'getTasks')
      .mockResolvedValue(tasks);

    // Dispatch the thunk action from your store
    await store.dispatch(getTasks());

    // Assert the service was called with the correct token
    expect(getTasksSpy).toHaveBeenCalledWith(token);

    // (Optional) Verify state updates if your reducer logic supports it.
    // For example, if your fulfilled case sets state.tasks to the returned tasks:
    const state = store.getState().task;
    // expect(state.tasks).toEqual(tasks);
  });
});
