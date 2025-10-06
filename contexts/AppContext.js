// context/AppContext.js
// Single source of truth for app state: user auth + data access. This file
// also chooses between SQLite and JSON/AsyncStorage data sources at runtime.
// It exports a hook `useApp()` for easy access in screens.

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import SQLiteDataSource from '../data/SQLiteDataSource';
import JSONDataSource from '../data/JSONDataSource';

// Create context
const AppContext = createContext();

// Export hook for convenience
export const useApp = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  const [dataSource, setDataSource] = useState(null); // active data source (SQLite or JSON)
  const [user, setUser] = useState(null); // currently logged-in student
  const [ready, setReady] = useState(false); // whether datasource initialized

  useEffect(() => {
    // Initialize data source: try SQLite first, fallback to JSON.
    const init = async () => {
      // Attempt SQLite
      try {
        const sqliteDS = new SQLiteDataSource();
        await sqliteDS.init(); // creates tables
        setDataSource(sqliteDS);
        console.log('[AppContext] Using SQLite data source');
      } catch (e) {
        console.warn('[AppContext] SQLite init failed, falling back to JSON data source:', e);
        const jsonDS = new JSONDataSource();
        await jsonDS.init();
        setDataSource(jsonDS);
        console.log('[AppContext] Using JSON/AsyncStorage data source');
      } finally {
        setReady(true);
      }
    };
    init();
  }, []);

  // Utility: generate application number: TCE + YEAR + zero-padded id
  const generateApplicationNo = (seed = Date.now()) => {
    const year = new Date().getFullYear();
    // use timestamp to avoid collisions in JSON fallback
    const suffix = String(seed).slice(-5);
    return `TCE${year}${suffix}`;
  };

  // registerStudent: uses dataSource.insertStudent and then sets `user`
  const registerStudent = async (payload) => {
    if (!dataSource) throw new Error('Data source not ready');

    // Create application number and ensure minimal fields
    const application_no = generateApplicationNo();
    const toInsert = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone || '',
      dob: payload.dob || '',
      tenth_mark: payload.tenth || '',
      twelfth_mark: payload.twelfth || '',
      ug_cgpa: payload.ug || '',
      application_no,
      status: 'Pending',
    };

    try {
      const created = await dataSource.insertStudent(toInsert);
      setUser(created);

      // Try to compose an email (this opens the mail composer; no background send).
      try {
        const isAvailable = await MailComposer.isAvailableAsync();
        if (isAvailable) {
          await MailComposer.composeAsync({
            subject: 'TCE Admission - Account Created',
            recipients: [created.email],
            body:
              `Hello ${created.name},\n\n` +
              `Your account for TCE admission has been created.\n\n` +
              `Application No: ${created.application_no}\n` +
              `Email (username): ${created.email}\n` +
              `Password: ${created.password}\n\n` +
              `Please keep these safe.\n\n` +
              `- TCE Admission App`,
          });
        } else {
          // Mail composer not available; just ignore (optional)
          console.log('[AppContext] Mail composer not available on device');
        }
      } catch (mailErr) {
        console.warn('[AppContext] Error attempting to send/open mail composer', mailErr);
      }

      return created;
    } catch (err) {
      console.error('[AppContext] registerStudent error', err);
      throw err;
    }
  };

  // login: return the user object if success else null
  const login = async (email, password) => {
    if (!dataSource) throw new Error('Data source not ready');
    const found = await dataSource.getStudentByEmailAndPassword(email, password);
    if (found) {
      setUser(found);
      return found;
    } else {
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const refreshUser = async () => {
    if (!dataSource || !user) return;
    const fresh = await dataSource.getStudentById(user.id);
    if (fresh) setUser(fresh);
  };

  // expose a small API
  const value = {
    ready,
    dataSource,
    user,
    registerStudent,
    login,
    logout,
    refreshUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
