// data/JSONDataSource.js
// Fallback data source using AsyncStorage. Keeps the same API as SQLiteDataSource.
// Good for debugging or if SQLite is not usable on some device.

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'TCE_STUDENTS_V1';

export default class JSONDataSource {
  constructor() {
    // nothing
  }

  async init() {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) {
      await AsyncStorage.setItem(KEY, JSON.stringify([]));
    }
  }

  // helper to read and write
  async _readAll() {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async _writeAll(list) {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  }

  async insertStudent(student) {
    const list = await this._readAll();

    // simple auto-increment id
    const nextId = list.length > 0 ? Math.max(...list.map((s) => s.id)) + 1 : 1;
    const toInsert = { id: nextId, ...student };

    list.push(toInsert);
    await this._writeAll(list);
    return toInsert;
  }

  async getStudentByEmailAndPassword(email, password) {
    const list = await this._readAll();
    return list.find((s) => s.email === email && s.password === password) || null;
  }

  async getStudentById(id) {
    const list = await this._readAll();
    return list.find((s) => s.id === id) || null;
  }

  async updateStudent(student) {
    const list = await this._readAll();
    const idx = list.findIndex((s) => s.id === student.id);
    if (idx === -1) throw new Error('Student not found');
    list[idx] = { ...list[idx], ...student };
    await this._writeAll(list);
    return list[idx];
  }
}
