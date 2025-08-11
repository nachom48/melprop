declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        Swiper: any;
    }
}

export { }; 