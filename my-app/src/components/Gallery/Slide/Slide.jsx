
import { useContext } from 'react';
import { GalleryContext } from '../Gallery';
import { AppContext } from '../../../App';

const Slide = () => {
    const context = useContext(GalleryContext);
    const appContext = useContext(AppContext);

    if (context === null) throw new Error('No Gallery context');
    if (appContext === null) throw new Error('No App context');


    return (
        <div className="slide">
            Slide {appContext}
        </div>
    );
};

export default Slide;
