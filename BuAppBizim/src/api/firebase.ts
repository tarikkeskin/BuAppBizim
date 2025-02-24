import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { config } from '../config';

if (!config.firebaseConfig.apiKey) {
  throw new Error('Firebase configuration is missing');
}

const app = initializeApp(config.firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Remove messaging for now as it's causing issues
// export const messaging = getMessaging(app); 