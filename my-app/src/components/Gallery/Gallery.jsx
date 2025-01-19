
import { createContext } from 'react';

export const GalleryContext = createContext(null);

const Gallery = ({children}) => {
    return (
        <div className="gallery">
            <GalleryContext.Provider value={8}>
                {children}
            </GalleryContext.Provider>
        </div>
    );
};

export default Gallery;
