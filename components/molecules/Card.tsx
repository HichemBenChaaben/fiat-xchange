import BookmarkIcon from "../../Icons/BookMarkIcon";
import { ICardProps } from "../../interfaces";
import IconWithHover from "./IconWithHover";

const Card: React.FC<ICardProps> = ({ joke, onClick, isBookmarked ,...rest }): JSX.Element => {
  const hoverColor = 'gold';
  const stillColor = '#dddddd';
  const fillColor = isBookmarked ? hoverColor : stillColor;
  return (
    <div className="card" {...rest}>
      <p>{joke.value}</p>
      <button
        className="card-button"
        onClick={onClick}>
        <IconWithHover
          icon={<BookmarkIcon />}
          color={fillColor}
          hoverColor={hoverColor}
        />
      </button>
    </div>)
}

export default Card;