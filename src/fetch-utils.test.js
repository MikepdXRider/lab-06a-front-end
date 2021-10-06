import { createTea, getTeas, getTeaTypes } from './fetch-utils.js';


test('getTeas function retrieves data from teas SQL table as expected.', async () => {
    const expected = {
        id: expect.any(Number),
        tea_name: expect.any(String),
        description: expect.any(String),
        url: expect.any(String),
        tea_type: expect.any(String),
        north_america_native: expect.any(Boolean),
        owner_id: expect.any(Number)
        };

    const actual = await getTeas();

    expect(actual[0]).toEqual(expected);
});

test('getTeaTypes function retrieves data from tea_types SQL table as expected.', async () => {
    const expected = {
        id: expect.any(Number),
        tea_type: expect.any(String),
        };

    const actual = await getTeaTypes();

    expect(actual[0]).toEqual(expected);
});

test('createTeas function creates a tea in SQL', async () => {
    const newTeaObj = {
        tea_name: 'Struggle-tea',
        description:'cool tea I discovered with Yosef, Karl and Soraya',
        url: 'https://placekitten.com/200/200',
        type_id: 2,
        north_america_native: 'true',
        owner_id: 1
        };

    const expected = {
        "description": "cool tea I discovered with Yosef, Karl and Soraya",
        "id": 8,
        "north_america_native": true,
        "owner_id": 1,
        "tea_name": "Struggle-tea",
        "tea_type": "green",
        "url": "https://placekitten.com/200/200"
    }

    await createTea(newTeaObj);

    const actual = await getTeas()

    expect(actual).toEqual(expect.arrayContaining([expected]));
});


