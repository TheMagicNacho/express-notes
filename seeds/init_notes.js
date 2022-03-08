/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('notes_table').del()
  await knex('notes_table').insert([
    { title: 'test1', data: "Cool stuff goes here -- wow" },
    { title: 'test2', data: "Cool stuff goes here -- wow" },
    { title: 'test3', data: "Cool stuff goes here -- wow" }
  ]);
}
