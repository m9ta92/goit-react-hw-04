import css from './ImageCard.module.css';

const ImageCard = ({ href, src, alt, modalImage }) => {
  return (
    <img
      className={css.img}
      onClick={() => modalImage(href)}
      src={src}
      alt={alt}
    />
  );
};

export default ImageCard;
