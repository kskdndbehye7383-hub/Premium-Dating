export const apiClient = {
  getCards: async () => {
    try {
      const res = await fetch('/api/cards');
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend unavailable, using localStorage fallback");
    }
    // Fallback
    const data = localStorage.getItem('spark_valid_cards');
    return data ? JSON.parse(data) : [];
  },

  saveCards: async (cards: string[]) => {
    try {
      const res = await fetch('/api/cards', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend unavailable, using localStorage fallback");
    }
    // Fallback
    localStorage.setItem('spark_valid_cards', JSON.stringify(cards));
    return { success: true, count: cards.length };
  },

  validateCard: async (cardNumber: string) => {
    try {
      const res = await fetch('/api/cards/validate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend unavailable, using localStorage fallback");
    }
    
    // Fallback
    const data = localStorage.getItem('spark_valid_cards');
    const cards = data ? JSON.parse(data) : [];
    const index = cards.indexOf(cardNumber.trim());
    if (index !== -1) {
      cards.splice(index, 1);
      localStorage.setItem('spark_valid_cards', JSON.stringify(cards));
      return { success: true };
    }
    return { success: false };
  },

  getUserStatus: async (email: string) => {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(email)}/status`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend unavailable, using localStorage fallback");
    }
    
    // Fallback
    const data = localStorage.getItem('spark_premium_users');
    const users = data ? JSON.parse(data) : [];
    return { isPremium: users.includes(email) };
  },

  upgradeUser: async (email: string) => {
    try {
      const res = await fetch('/api/users/upgrade', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend unavailable, using localStorage fallback");
    }
    
    // Fallback
    const data = localStorage.getItem('spark_premium_users');
    const users = data ? JSON.parse(data) : [];
    if (!users.includes(email)) {
      users.push(email);
      localStorage.setItem('spark_premium_users', JSON.stringify(users));
    }
    return { success: true };
  }
};
