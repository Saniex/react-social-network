const defaultSettings = {
    mainFont: 'Comfortaa, sans-serif',
    secondaryFont: 'Quicksand, sans-serif',
    weight: 500,
    radius: '5px',
    mainColor: '#2563eb',
    darkRed: '#dc2626',
    darkGreen: '#059669',
    darkBlue: '#2563eb',
    breakpoints: {
        desktop: '@media (min-width: 992px)',
        touch: '@media (max-width: 991.5px)',
        tablet: '@media (max-width: 768px)',
        mobile: '@media (max-width: 420px)'
    }
};

export const lightTheme = {
    ...defaultSettings,

    mainBackground: '#f9fafb',
    lightBackground: '#fefefe',
    mainText: '#333',
    lightText: '#8c8d90',
    border: '#e5e7eb',
    red: '#fee2e2',
    green: '#d1fae5',
    blue: '#e5edff',
}

export const darkTheme = {
    ...defaultSettings,

    mainBackground: '#18191a',
    lightBackground: '#212424',
    mainText: '#f1f1f1',
    lightText: '#cacaca',
    border: '#30363d',
    red: 'rgba(220, 38, 38, 0.3)',
    green: 'rgba(5, 150, 104, 0.3)',
    blue: 'rgba(37, 100, 235, 0.3)',
}