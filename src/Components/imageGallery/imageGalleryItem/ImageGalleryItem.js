export default function ImageGalleryItem({ url, alt, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={() => onClick({ url })}
        src={url}
        alt={alt}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
