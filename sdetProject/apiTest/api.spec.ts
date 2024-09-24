import { test, expect } from '@playwright/test';

test.describe.parallel("API test", () => {
    const baseurl = 'https://jsonplaceholder.typicode.com';
    test("Simple API request", async({ request }) => {
        const response = await request.get(`${baseurl}/todos/2`,{
            ignoreHTTPSErrors: true
        });
        expect((response).status()).toBe(200);
        const responsebody = JSON.parse(await (await response).text());
        console.log(responsebody);
    })

    test("Get request - get todo details", async ({ request }) => {
        const response = await request.get(`${baseurl}/todos/1`, {
            ignoreHTTPSErrors: true
        }); 
        const responsebody = JSON.parse(await (await response).text());
        expect((response).status()).toBe(200);
        expect(responsebody.id).toBe(1);
        expect(responsebody.title).toContain('delectus aut autem');
        expect(responsebody.completed).toBeFalsy();
    })

    test('post request - Create new todo', async ({ request }) => {
            const response = await request.post(`${baseurl}/todos`, {
            ignoreHTTPSErrors: true,    
            data: {
            userId: 10,
            id: 201,
            title: 'test data',
            completed: true,
            }
        })
        const resposebody = JSON.parse(await response.text());
        console.log(resposebody);
        expect(resposebody.id).toBe(201);
    })

    test("put request - Update Todo", async({ request }) => {
            const response = await request.put(`${baseurl}/todos/2`, {
            ignoreHTTPSErrors: true ,   
            data: {
            title: 'test update data',
            completed: true,
            },
        });
        const responsebody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responsebody.title).toBe('test update data');
        expect(responsebody.completed).toBeTruthy();
        console.log(responsebody)
    })

    test("Delete rquest - Delete Todo ", async({ request }) => {
        const response = await request.delete(`${baseurl}/todos/201`, {
            ignoreHTTPSErrors: true
        });
        expect(response.status()).toBe(200);

    })
})

