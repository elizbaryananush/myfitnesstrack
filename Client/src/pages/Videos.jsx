import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchData } from '../redux/videoSlice';

function Videos() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.post.postList.data);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (videos === null) {
        return <div>Loading...</div>;
    }else {
        console.log(videos);
    }

    return (
        <div>
            {videos.map((video, index) => (
                <div key={index}>
                    <img src={video.link} alt={video.name} />
                </div>
            ))}
        </div>
    );
}

export default Videos;
