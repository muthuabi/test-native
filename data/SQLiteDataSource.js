// data/SQLiteDataSource.js
// Encapsulates all SQLite operations. Methods return Promises so the context
// can use them interchangeably with the JSON data source.

import * as SQLite from 'expo-sqlite';

const DB_NAME = 'tce_admission.db';

export default class SQLiteDataSource {
  constructor() {
    // openDatabase shouldn't throw, but operations may fail
    this.db = SQLite.openDatabase(DB_NAME);
  }

  // initialize tables
  init() {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS students (
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
             );`
          );
        },
        (err) => {
          reject(err);
        },
        () => resolve(true)
      );
    });
  }

  // insert student and return the inserted row
  insertStudent(student) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO students (name, email, password, phone, dob, tenth_mark, twelfth_mark, ug_cgpa, application_no, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
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
            ],
            (_, result) => {
              const insertId = result.insertId;
              // fetch the inserted row
              tx.executeSql(
                `SELECT * FROM students WHERE id = ?;`,
                [insertId],
                (_, { rows }) => {
                  resolve(rows._array[0]);
                }
              );
            }
          );
        },
        (error) => reject(error),
        () => {}
      );
    });
  }

  // get by email + password (for login)
  getStudentByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM students WHERE email = ? AND password = ? LIMIT 1;',
            [email, password],
            (_, { rows }) => {
              if (rows.length > 0) resolve(rows._array[0]);
              else resolve(null);
            }
          );
        },
        (err) => reject(err)
      );
    });
  }

  getStudentById(id) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql('SELECT * FROM students WHERE id = ? LIMIT 1;', [id], (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array[0]);
            else resolve(null);
          });
        },
        (err) => reject(err)
      );
    });
  }

  updateStudent(student) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE students SET name=?, phone=?, dob=?, tenth_mark=?, twelfth_mark=?, ug_cgpa=? WHERE id = ?;`,
            [
              student.name,
              student.phone,
              student.dob,
              student.tenth_mark,
              student.twelfth_mark,
              student.ug_cgpa,
              student.id,
            ],
            () => {
              tx.executeSql('SELECT * FROM students WHERE id = ?;', [student.id], (_, { rows }) =>
                resolve(rows._array[0])
              );
            }
          );
        },
        (err) => reject(err)
      );
    });
  }
}
