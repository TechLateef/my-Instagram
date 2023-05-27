import getPhotoUrl from "get-photo-url";
import { db } from "../dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { Rings, Bars, BallTriangle } from "react-loading-icons";

const Gallery = () => {
  const allPhotos = useLiveQuery(() => db.gallery.toArray(), []);

  const addPhoto = async () => {
    db.gallery.add({
      url: await getPhotoUrl("#addPhotoInput"),
    });
  };
  const clearGallery = async () => {
    await db.gallery.clear();
  };
  const removePhoto = (id) => {
    db.gallery.delete(id);
  };

  return (
    <>
      {!allPhotos && <Bars className="loader" />}

      <input type="file" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addPhoto}>
        <i className="add-photo-button fas fa-plus-square"></i>
      </label>
      <i
        className="clear-photo fas fa-broom"
        title="click to clear gallery"
        onClick={clearGallery}
      ></i>

      <section className="gallery">
        {allPhotos?.map((photo) => (
          <div className="item" key={photo.id}>
            <img src={photo.url} className="item-image" alt="" />
            <button
              className="delete-button"
              onClick={() => removePhoto(photo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default Gallery;
