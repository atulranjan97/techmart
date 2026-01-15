import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

const Rating = ({ value, text }) => {
  return (
    <div className="text-yellow-400 text-sm flex items-center">
        <span>
            { value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span>
            { value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span>
            { value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span>
            { value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span>
            { value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar /> }
        </span>
        <span className="text-gray-500 text-sm ml-3">{ text && text }</span>
    </div>
  )
}

export default Rating
// rating-text (font-size, font-weight, padding-left)
// h-fit my-auto