import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

// Не обмежуйся завданням, використовуй дані із об'єктів, щоб відобразити більше цікавої інформації в модальному вікні.
// Наприклад, про автора зображення, кількість лайків, опис і т.д.

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.imgList}>
      {images !== null &&
        images.map(image => (
          <li key={image.id}>
            <ImageCard src={image.urls.small} alt={image.alt} />
          </li>
        ))}
    </ul>
  );
};

export default ImageGallery;
