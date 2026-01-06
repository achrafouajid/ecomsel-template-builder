import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    slug: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any, quantity?: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    total: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: any, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.url || '',
                slug: product.metaSlug,
                quantity
            }];
        });
        setIsOpen(true);
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item._id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems(prev => prev.map(item =>
            item._id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        ));
    };

    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, total, isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
