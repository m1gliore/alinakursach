import YouTube from 'react-youtube-embed';
import styled from 'styled-components';

const VideoContainer = styled.div`
  width: calc(25% - 2vw);
  height: auto;
`

const YouTubeVideo = ({videoId}) => {
    return (
        <VideoContainer>
            <YouTube id={videoId} autoPlay={false}/>
        </VideoContainer>
    )
}

export default YouTubeVideo