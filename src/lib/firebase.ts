import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getFirestore, 
  initializeFirestore,
  collection, 
  getDocs, 
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  type DocumentData 
} from "firebase/firestore";
import { where } from "firebase/firestore";
import type { Perfume } from "./data";

export interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  affiliateLink: string;
  category: string;
  author: string;
  createdAt: any;
}

const firebaseConfig = {
  apiKey: "AIzaSyBxXkg5Jk9KJeIa6MqdDbt17apct8PEkN0",
  authDomain: "scent-and-soul-7e6cd.firebaseapp.com",
  projectId: "scent-and-soul-7e6cd",
  storageBucket: "scent-and-soul-7e6cd.firebasestorage.app",
  messagingSenderId: "294349893817",
  appId: "1:294349893817:web:7ef73f2ae84f65876b6b68",
  measurementId: "G-KF4NSRDYB9"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics conditionally (only supported in browser environments)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Firestore with settings to avoid GRPC issues on server
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export { app, analytics, db };

/**
 * Admin Auth (Firestore-based)
 */
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const q = query(
      collection(db, "admins"),
      where("email", "==", email),
      where("password", "==", password)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { success: false, error: "Invalid email or password." };
    }
    
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed. Please try again." };
  }
}

/**
 * Perfume Helpers
 */
export async function getPerfumesFromDB(): Promise<Perfume[]> {
  try {
    // If on server, use REST API to avoid GRPC issues in Next.js Server Components
    if (typeof window === "undefined") {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/perfumes?mask.fieldPaths=brand&mask.fieldPaths=name&mask.fieldPaths=notes&mask.fieldPaths=occasionTag&mask.fieldPaths=avgRating&mask.fieldPaths=imageUrl&mask.fieldPaths=price&mask.fieldPaths=createdAt`
      );
      const data = await response.json();
      
      if (!data.documents) return [];
      
      return data.documents.map((doc: any) => {
        const fields = doc.fields;
        const id = doc.name.split("/").pop();
        
        return {
          id,
          brand: fields.brand?.stringValue || "",
          name: fields.name?.stringValue || "",
          notes: fields.notes?.arrayValue?.values?.map((v: any) => v.stringValue) || [],
          occasionTag: fields.occasionTag?.stringValue || "daylight",
          avgRating: parseFloat(fields.avgRating?.doubleValue || fields.avgRating?.integerValue || "0"),
          imageUrl: fields.imageUrl?.stringValue || "",
          price: parseInt(fields.price?.integerValue || "0"),
          createdAt: fields.createdAt?.stringValue || new Date().toISOString()
        } as Perfume;
      });
    }

    // Client-side can still use the SDK
    const querySnapshot = await getDocs(collection(db, "perfumes"));
    const perfumesList: Perfume[] = [];
    querySnapshot.forEach((doc) => {
      perfumesList.push({ id: doc.id, ...doc.data() } as Perfume);
    });
    return perfumesList;
  } catch (error) {
    console.error("Error fetching perfumes: ", error);
    return [];
  }
}

/**
 * Article Helpers
 */
export async function getArticlesFromDB(): Promise<Article[]> {
  try {
    // If on server, use REST API
    if (typeof window === "undefined") {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/articles`
      );
      const data = await response.json();
      
      if (!data.documents) return [];
      
      return data.documents.map((doc: any) => {
        const fields = doc.fields;
        const id = doc.name.split("/").pop();
        
        return {
          id,
          title: fields.title?.stringValue || "",
          slug: fields.slug?.stringValue || "",
          content: fields.content?.stringValue || "",
          imageUrl: fields.imageUrl?.stringValue || "",
          affiliateLink: fields.affiliateLink?.stringValue || "",
          category: fields.category?.stringValue || "",
          author: fields.author?.stringValue || "",
          createdAt: fields.createdAt?.timestampValue ? { seconds: new Date(fields.createdAt.timestampValue).getTime() / 1000 } : null
        } as Article;
      });
    }

    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const articlesList: Article[] = [];
    querySnapshot.forEach((doc) => {
      articlesList.push({ id: doc.id, ...doc.data() } as Article);
    });
    return articlesList;
  } catch (error) {
    console.error("Error fetching articles: ", error);
    return [];
  }
}

export async function saveArticleToDB(article: Omit<Article, "id" | "createdAt">) {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      ...article,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving article: ", error);
    return { success: false, error };
  }
}

export async function savePerfumeToDB(perfume: Omit<Perfume, "id" | "createdAt">) {
  try {
    const docRef = await addDoc(collection(db, "perfumes"), {
      ...perfume,
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving perfume: ", error);
    return { success: false, error };
  }
}

export async function updateArticleInDB(id: string, article: Partial<Article>) {
  try {
    const { doc, updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "articles", id), {
      ...article,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating article: ", error);
    return { success: false, error };
  }
}

export async function updatePerfumeInDB(id: string, perfume: Partial<Perfume>) {
  try {
    const { doc, updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "perfumes", id), perfume);
    return { success: true };
  } catch (error) {
    console.error("Error updating perfume: ", error);
    return { success: false, error };
  }
}
