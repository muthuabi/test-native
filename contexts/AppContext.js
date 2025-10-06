// context/AppContext.js
// Single source of truth for app state: user auth + data access. This file
// also chooses between SQLite and JSON/AsyncStorage data sources at runtime.
// It exports a hook `useApp()` for easy access in screens.

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';


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

    // 1️⃣ Generate unique application number
    const application_no = generateApplicationNo();

    // 2️⃣ Prepare student object for insertion
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
      // 3️⃣ Insert student into data source (SQLite or JSON fallback)
      const created = await dataSource.insertStudent(toInsert);

      // 4️⃣ Set user context (logged in)
      setUser(created);

      // 5️⃣ Attempt to send email using EmailJS
      try {
        await send(
          'service_expo_XXX01',        // Your EmailJS Service ID
          'template_expo_XXX01',       // Your EmailJS Template ID
          {
            to_name: created.name,           // Matches template variable {{to_name}}
            to_email: created.email,         // Matches template variable {{to_email}}
            application_no: created.application_no, // Matches template variable {{application_no}}
            email: created.email,            // Matches template variable {{email}}
            password: created.password,      // Matches template variable {{password}}
          },
          {
            publicKey: 'XXXX',               // Your EmailJS Public Key
          }
        );
        console.log('[AppContext] Mail sent successfully via EmailJS');
      } catch (mailErr) {
        // 6️⃣ If EmailJS fails, log warning but continue
        console.warn('[AppContext] EmailJS sending failed:', mailErr);
      }

      // 7️⃣ Return the newly created student
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
