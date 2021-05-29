const defaultSettings = {
    mainFont: 'Comfortaa, sans-serif',
    secondaryFont: 'Quicksand, sans-serif',
    weight: 500,
    radius: '5px',
    mainColor: '#2563eb',
    breakpoints: {
        desktop: '@media (min-width: 992px)',
        tablet: '@media (max-width: 768px)'
    }
};

export const lightTheme = {
    ...defaultSettings,

    mainBackground: '#f9fafb',
    lightBackground: '#fefefe',
    mainText: '#333',
    lightText: '#8c8d90',
    border: '#e5e7eb'
}

export const darkTheme = {
    ...defaultSettings,

    mainBackground: '#18191a',
    lightBackground: '#232626',
    mainText: '#f1f1f1',
    lightText: '#cacaca',
    border: '#e5e7eb'
}