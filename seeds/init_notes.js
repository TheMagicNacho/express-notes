/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const table = 'notes_table';

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex(table).del()
  await knex(table).insert([
    { title: 'test1', data: "Cool stuff goes here -- wow" },
    { title: 'test2', data: "Cool stuff goes here -- wow" },
    { title: 'test3', data: "Cool stuff goes here -- wow" }
  ]);
}
