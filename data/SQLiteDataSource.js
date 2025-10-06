// data/SQLiteDataSource.js
// ---------------------------------------------------------------------------
// ✅ Works with Expo SDK 54+ using the new async SQLite API (expo-sqlite/next)
// Keeps the same function names and signatures so AppContext works unchanged.
// ---------------------------------------------------------------------------

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'tce_admission.db';

export default class SQLiteDataSource {
  constructor() {
    this.db = null;
  }

  // initialize tables
  async init() {
    this.db = await SQLite.openDatabaseAsync(DB_NAME);

    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        phone TEXT,
        dob TEXT,
        tenth_mark TEXT,
        twelfth_mark TEXT,
        ug_cgpa TEXT,
        application_no TEXT,
        status TEXT
      );
    `);

    return true;
  }

  // insert student and return inserted row
  async insertStudent(student) {
    const query = `
      INSERT INTO students
        (name, email, password, phone, dob, tenth_mark, twelfth_mark, ug_cgpa, application_no, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const params = [
      student.name,
      student.email,
      student.password,
      student.phone,
      student.dob,
      student.tenth_mark,
      student.twelfth_mark,
      student.ug_cgpa,
      student.application_no,
      student.status,
    ];

    const result = await this.db.runAsync(query, params);
    const insertedId = result.lastInsertRowId;

    const row = await this.db.getFirstAsync(
      'SELECT * FROM students WHERE id = ?;',
      [insertedId]
    );
    return row;
  }

  // get by email + password (for login)
  async getStudentByEmailAndPassword(email, password) {
    const row = await this.db.getFirstAsync(
      'SELECT * FROM students WHERE email = ? AND password = ? LIMIT 1;',
      [email, password]
    );
    return row || null;
  }

  async getStudentById(id) {
    const row = await this.db.getFirstAsync(
      'SELECT * FROM students WHERE id = ? LIMIT 1;',
      [id]
    );
    return row || null;
  }

  async updateStudent(student) {
    await this.db.runAsync(
      `UPDATE students
       SET name=?, phone=?, dob=?, tenth_mark=?, twelfth_mark=?, ug_cgpa=?
       WHERE id = ?;`,
      [
        student.name,
        student.phone,
        student.dob,
        student.tenth_mark,
        student.twelfth_mark,
        student.ug_cgpa,
        student.id,
      ]
    );
    const updated = await this.getStudentById(student.id);
    return updated;
  }
}
