export const validateProjectName = (name) => /^[a-zA-Z0-9-_]+$/.test(name);

const envContent = `
# Example environment variables
VITE_FIREBASE_API_KEY=**************************
VITE_FIREBASE_AUTH_DOMAIN=************
VITE_FIREBASE_PROJECT_ID=*********
VITE_FIREBASE_STORAGE_BUCKET=**************
VITE_FIREBASE_MESSAGING_ID=**********
VITE_FIREBASE_APP_ID=************
VITE_FIREBASE_VAPID_KEY=***********************
`;

const fireConfigContent = `

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);


`;

const firebaseJsonContent = `
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
`;

const themeConfigContent = `
  export const theme = {
    // Add your theme configuration here
  }
`;

const gitIgnoreContent = `
node_modules
dist
.vscode/*

# Environment files
.env
.env.development
.env.production
`;

const queryProviderContent = `
import { PropsWithChildren } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function QueryProvider({children}: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
{children}
    </QueryClientProvider>
  )
}
`;

export const fileContents = {
  "src/config/theme.config.ts": themeConfigContent,
  "src/config/firebase.config.ts": fireConfigContent,
  ".env.example": envContent,
  ".env.production": envContent,
  ".env.development": envContent,
  "firebase.json": firebaseJsonContent,
  ".gitignore": gitIgnoreContent,
  "src/providers/QueryProvider/index.tsx": queryProviderContent,
};

export const filesAndFoldersList = [
  "src/config",
  "src/constants",
  "src/core",
  "src/config/theme.config.ts",
  "src/config/firebase.config.ts",
  "src/components",
  "src/components/AppLayout/components",
  "src/features/ManageAuth/components",
  "src/features/ManageAuth/routes",
  "src/features/ManageAuth/hooks/useData",
  "src/providers",
  "src/hooks",
  "src/store",
  "src/services/AuthService",
  "src/utils",
  "src/types/dto",
  "src/types/formValues",
  "src/types/generics",
  "src/providers/QueryProvider/index.tsx",
  "public/assets/icons",
  "public/assets/images",
  ".env.development",
  ".env.example",
  ".env.production",
  "firebase.json",
  ".gitignore",
];

export const packages = ["@tanstack/react-query", "firebase"];
