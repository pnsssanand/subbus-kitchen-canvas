
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  getDocs, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { db, auth } from './config';
import { toast } from "sonner";

// Types
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  imageUrl?: string;
  isSpecial?: boolean;
}

// Authentication hooks
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Login failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Logout failed");
    }
  };

  return { currentUser, loading, login, logout };
};

// Menu items hooks
export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "menuItems"));
      const querySnapshot = await getDocs(q);
      const items: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      await addDoc(collection(db, "menuItems"), item);
      toast.success("Menu item added successfully");
      await fetchMenuItems();
      return true;
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("Failed to add menu item");
      return false;
    }
  };

  const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
    try {
      await updateDoc(doc(db, "menuItems", id), item);
      toast.success("Menu item updated successfully");
      await fetchMenuItems();
      return true;
    } catch (error) {
      console.error("Error updating menu item:", error);
      toast.error("Failed to update menu item");
      return false;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "menuItems", id));
      toast.success("Menu item deleted successfully");
      await fetchMenuItems();
      return true;
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error("Failed to delete menu item");
      return false;
    }
  };

  return {
    menuItems,
    loading,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refreshMenuItems: fetchMenuItems
  };
};

// Special menu items
export const useSpecialMenuItems = () => {
  const [specialItems, setSpecialItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialItems = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "menuItems"), where("isSpecial", "==", true));
        const querySnapshot = await getDocs(q);
        const items: MenuItem[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as MenuItem);
        });
        setSpecialItems(items);
      } catch (error) {
        console.error("Error fetching special menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialItems();
  }, []);

  return { specialItems, loading };
};

// Categories
export const useCategories = () => {
  const { menuItems, loading } = useMenuItems();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!loading) {
      const uniqueCategories = Array.from(
        new Set(menuItems.map(item => item.category))
      );
      setCategories(uniqueCategories);
    }
  }, [menuItems, loading]);

  return { categories, loading };
};
