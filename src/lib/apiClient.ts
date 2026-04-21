import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const apiClient = {
  getCards: async () => {
    try {
      const docRef = doc(db, "system", "cardsKey");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().validCards || [];
      }
      return [];
    } catch (e) {
      console.error("Firebase getCards error:", e);
      return [];
    }
  },

  saveCards: async (cards: string[]) => {
    try {
      const docRef = doc(db, "system", "cardsKey");
      await setDoc(docRef, { validCards: cards }, { merge: true });
      return { success: true, count: cards.length };
    } catch (e) {
      console.error("Firebase saveCards error:", e);
      throw e;
    }
  },

  validateCard: async (cardNumber: string) => {
    try {
      const docRef = doc(db, "system", "cardsKey");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const cards = docSnap.data().validCards || [];
        const index = cards.indexOf(cardNumber.trim());
        if (index !== -1) {
          // Remove exact matched card from the array to consume it
          cards.splice(index, 1);
          await setDoc(docRef, { validCards: cards }, { merge: true });
          return { success: true };
        }
      }
      return { success: false };
    } catch (e) {
      console.error("Firebase validateCard error:", e);
      return { success: false };
    }
  },

  getUserStatus: async (email: string) => {
    try {
      const docRef = doc(db, "system", "usersKey");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const users = docSnap.data().premiumAccounts || [];
        return { isPremium: users.includes(email) };
      }
      return { isPremium: false };
    } catch (e) {
      console.error("Firebase getUserStatus error:", e);
      return { isPremium: false };
    }
  },

  upgradeUser: async (email: string) => {
    try {
      const docRef = doc(db, "system", "usersKey");
      const docSnap = await getDoc(docRef);
      let users: string[] = [];
      if (docSnap.exists()) {
        users = docSnap.data().premiumAccounts || [];
      }
      if (!users.includes(email)) {
        users.push(email);
        await setDoc(docRef, { premiumAccounts: users }, { merge: true });
      }
      return { success: true };
    } catch (e) {
      console.error("Firebase upgradeUser error:", e);
      return { success: false };
    }
  }
};
