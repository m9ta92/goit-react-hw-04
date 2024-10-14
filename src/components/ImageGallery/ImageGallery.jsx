import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

// Не обмежуйся завданням, використовуй дані із об'єктів, щоб відобразити більше цікавої інформації в модальному вікні.
// Наприклад, про автора зображення, кількість лайків, опис і т.д.

const ImageGallery = ({ images, modalImage }) => {
  return (
    <ul className={css.imgList}>
      {images !== null &&
        images.map(image => (
          <li key={image.id}>
            <ImageCard
              href={image.urls.full}
              src={image.urls.small}
              alt={image.alt}
              modalImage={modalImage}
            />
          </li>
        ))}
    </ul>
  );
};

export default ImageGallery;
