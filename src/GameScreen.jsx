import React, { useState, useEffect } from 'react';

const GameScreen = ({checkedVocab}) => {
    const [imagePaths, setImagePaths] = useState([]);
    
    // USE THIS: https://stackoverflow.com/questions/72077023/import-meta-glob-can-only-accept-string-literals

    useEffect(() => {
        const importImages = async () => {
            const images = await import.meta.glob('./assets/illustrations/fruits/*.png');
            const paths = await Promise.all(Object.values(images).map(image => image()));
            setImagePaths(paths);x
        };

        importImages();
    }, [checkedVocab]);

    return (
        <>
            <div>
                {/* {imagePaths.map((path, index) => (
                    <img key={index} src={path.default} alt={`Image ${index}`} />
                ))} */}
            </div>
        </>
    );
};

export default GameScreen;