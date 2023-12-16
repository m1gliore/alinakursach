import styled from "styled-components";
import {
    CancelOutlined,
    CheckCircleOutlineOutlined,
    CreateOutlined,
    DeleteOutlined,
    ListOutlined
} from "@mui/icons-material";

export const GameCard = styled.div`
  position: relative;
  width: calc(100% - 4vw);
  min-height: calc(65vh - 4vw);
  display: flex;
  flex-direction: column;
  padding: 2vw;
  gap: 2vw;
`

export const DLCIcon = styled(ListOutlined)`
  position: absolute;
  top: 1vw;
  left: 47.5vw;
  cursor: pointer;
  transition: transform .3s ease-out;

  &:hover {
    transform: scale(1.05);
  }
`

export const UpdateIcon = styled(CreateOutlined)`
  position: absolute;
  top: 1vw;
  left: 50vw;
  cursor: pointer;
  transition: transform .3s ease-out;

  &:hover {
    transform: scale(1.05);
  }
`

export const DeleteIcon = styled(DeleteOutlined)`
  position: absolute;
  top: 1vw;
  left: 52.5vw;
  cursor: pointer;
  transition: transform .3s ease-out;

  &:hover {
    transform: scale(1.05);
  }
`

export const Game = styled.div`
  display: flex;
  gap: 2vw;
`

export const GameImage = styled.img`
  width: 15vw;
  height: 20vw;
  object-fit: cover;
  border-radius: .5vw;
`

export const GameContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const GameTitle = styled.h2`
  flex: 1;
  font-size: 2rem;
  margin-bottom: 1vw;
`

export const GameDescription = styled.div`
  flex: 5;
  margin-bottom: 1vw;
  font-size: 1.5rem;
`

export const GamePrice = styled.div`
  flex: 1;
  font-size: 1.5rem;
  margin-bottom: 1vw;
`

export const GameButton = styled.button`
  flex: 1;
  width: 15vw;
  padding: .25vw;
  font-size: 1rem;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: .5vw;
  cursor: pointer;
  transition: .25s ease-out;

  &:hover {
    background-color: transparent;
    color: black;
  }
`

export const GameDetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
`;

export const TechnicalRequirementsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  border: .15vw solid #ccc;
  border-radius: .6vw;
  padding: 1vw;
  background-color: #f5f5f5;
  min-width: 25vw;
`;

export const DLCContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
`

export const TechnicalRequirementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const TechnicalRequirementsItem = styled.li`
  font-size: 1.5rem;
  margin-bottom: 1vw;
  color: #333;
  font-weight: 600;
`

export const DLCHeading = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`

export const DLCItems = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2vw;
`

export const DLCItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-out;

  &:hover {
    transform: scale(1.1);
  }
`

export const DLCImage = styled.img`
  width: 12.5vw;
  height: 9vw;
  object-fit: cover;
  border-radius: .6vw;
`

export const DLCName = styled.p`
  margin-top: .5vw;
  text-align: center;
`

export const DLCPrice = styled.p`
  margin-top: .25vw;
  font-weight: bold;
`

export const ChangelogContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: .15vw solid #ccc;
  border-radius: .6vw;
  padding: 1vw;
  background-color: #f5f5f5;
  margin-top: 2vw;
`

export const ChangelogTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1vw;
`

export const ChangelogList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5vw;
`

export const ChangelogItem = styled.li`
  font-size: 1.2rem;
  margin-bottom: .5vw;
`

export const ReviewsSection = styled.div`
  margin-top: 2vw;
  width: 100%;
`

export const ReviewHeading = styled.h1`
  margin-top: 0;
`

export const ReviewList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const ReviewItem = styled.li`
  margin-bottom: 1vw;
  position: relative;
`

export const ReviewAccept = styled(CheckCircleOutlineOutlined)`
  position: absolute;
  bottom: 1vw;
  right: 3.5vw;
`

export const ReviewReject = styled(CancelOutlined)`
  position: absolute;
  bottom: 1vw;
  right: 1vw;
`

export const ReviewContent = styled.div`
  border: .15vw solid #ccc;
  border-radius: 0.5vw;
  padding: 1vw;
`

export const ReviewAuthor = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: .5vw;
`

export const ReviewText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5vw;
`

export const ReviewDate = styled.p`
  font-size: 1rem;
  color: #888;
`

export const AddReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2vw;
`

export const AddReviewTextarea = styled.textarea`
  width: 100%;
  height: 8rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  resize: vertical;
`

export const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
