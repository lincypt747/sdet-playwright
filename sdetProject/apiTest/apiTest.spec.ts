import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

test.describe('API Testing with JSONPlaceholder', () => {

  // 1. GET Test Case
  test('GET test case', async ({ request }) => {
    const response = await request.get(apiUrl, {
      ignoreHTTPSErrors: true
    });
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy(); // Check if data is an array
    expect(data.length).toBeGreaterThan(0); // Ensure there is at least one todo item

    // Validate structure of the first item
    const firstItem = data[0];
    expect(firstItem).toHaveProperty('id');
    expect(firstItem).toHaveProperty('title');
    expect(firstItem).toHaveProperty('completed');
  });

  // 2. POST Test Case
  test('POST test case', async ({ request }) => {
    const newTodo = {
      title: 'New Todo Item',
      completed: false,
      userId: 1
    };

    const response = await request.post(apiUrl, {
      ignoreHTTPSErrors: true,
      data: newTodo
    });
    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty('id'); // ID is typically generated
    expect(data.title).toBe(newTodo.title);
    expect(data.completed).toBe(newTodo.completed);
  });

  // 3. Use API Returned Results in a Workflow
  test('Use API returned results in a workflow', async ({ request }) => {
    const getResponse = await request.get(apiUrl, {
      ignoreHTTPSErrors: true
    });
    const todos = await getResponse.json();

    // Use the first todo item to get details 
    const firstTodo = todos[0];
    const id = firstTodo.id;

    // log the todo item
    console.log(`First Todo Item:`, firstTodo);

    //update the todo item with a new title:
    const getUpdatedResponse = await request.put(apiUrl + `/${id}`, {
      ignoreHTTPSErrors: true,
      data: {
        title: "new value"
      }
    })
    expect(getUpdatedResponse.status()).toBe(200);
    const data = await getUpdatedResponse.json();
    expect(data.title).toBe('new value');
    console.log(data);
  });

  // 4. Collect Data and Create Artifact
  test('Collect data and create artifact', async ({ request }) => {
    const response = await request.get(apiUrl, {
      ignoreHTTPSErrors: true
    });
    const todos = await response.json();

    // Manipulation: Reverse the order and select the last 5 items
    const manipulatedData = todos.reverse().slice(0, 5);

    // Create artifact (JSON file)
    const artifact = JSON.stringify(manipulatedData, null, 2);
    const filePath = path.join(__dirname, 'artifact.json');
    fs.writeFileSync(filePath, artifact);

    // Validate the artifact creation
    const artifactData = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
    expect(artifactData).toHaveLength(5); // Check that we have 5 items
  });
});
