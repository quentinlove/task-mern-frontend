import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import taskService from "./taskService";

const mock = new MockAdapter(axios);

describe('taskService',()=>{
    afterEach(()=>{
        mock.reset();
    })
   test('fetches tasks successfully',async()=>{
    const token ='mock_token';
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
    mock.onGet('/api/tasks/').reply((config) => {
        if (config.headers.Authorization === `Bearer ${token}`) {
            return [200, tasks];
        }
        return [401];
    });
    
    const response = await taskService.getTasks(token);
    expect(response).toEqual(tasks)
});
});