import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

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
