export const MOCK_STORE = {
    _id: 'mock-store-id',
    name: 'Lumina Luxe',
    domain: 'template1.ecomsel.com',
    primaryColor: '#000000',
    foregroundColor: '#1a1a1a',
    pricesColor: '#333333',
    floatingNavbar: true,
    logoUrl: '', // Text logo will be used
    faviconUrl: '',
};

export const MOCK_SLIDES = [
    {
        _id: 'slide1',
        title: 'Autumn Collection 2025',
        image: { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop' },
        link: '/collection/autumn'
    },
    {
        _id: 'slide2',
        title: 'Minimalist Essentials',
        image: { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop' },
        link: '/collection/essentials'
    }
];

export const MOCK_PRODUCTS = [
    {
        _id: 'prod1',
        metaSlug: 'cashmere-sweater',
        name: 'Italian Cashmere Sweater',
        description: '<p>Experience the ultimate luxury with our Italian Cashmere Sweater. Spun from the finest fibers, this piece offers unmatched softness and warmth.</p>',
        price: 299.00,
        currency: '$',
        images: [{ url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop' }]
    },
    {
        _id: 'prod2',
        metaSlug: 'linen-trousers',
        name: 'Relaxed Linen Trousers',
        description: '<p>Breathable and stylish, these linen trousers are perfect for the modern minimalist.</p>',
        price: 145.00,
        currency: '$',
        images: [{ url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop' }]
    },
    {
        _id: 'prod3',
        metaSlug: 'silk-blouse',
        name: 'Pure Silk Blouse',
        description: '<p>Elegant and timeless, our silk blouse transitions effortlessly from day to night.</p>',
        price: 180.00,
        currency: '$',
        images: [{ url: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=1963&auto=format&fit=crop' }]
    },
    {
        _id: 'prod4',
        metaSlug: 'leather-tote',
        name: 'Classic Leather Tote',
        description: '<p>Handcrafted from full-grain leather, designed to last a lifetime.</p>',
        price: 350.00,
        currency: '$',
        images: [{ url: 'https://images.unsplash.com/photo-1590874103328-27cf28b9f566?q=80&w=1887&auto=format&fit=crop' }]
    }
];

export const MOCK_REVIEWS = [
    {
        _id: 'rev1',
        rating: 5,
        body: "Absolutely stunning quality. The fit is perfect.",
        user: { username: "Sarah M." }
    },
    {
        _id: 'rev2',
        rating: 5,
        body: "Fast shipping and beautiful packaging.",
        user: { username: "James L." }
    }
];
