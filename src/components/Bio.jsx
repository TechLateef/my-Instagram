import { useEffect, useState } from "react";
import getPhotoUrl from "get-photo-url";
import profile from "../asset/profileIcon.svg";
import { db } from "../dexie";
import { useLiveQuery } from "dexie-react-hooks";

const Bio = () => {
  const [buttonValue, setButtonValue] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(profile);

  const [userDetails, setUserDetails] = useState({
    name: "Mubarak Abdullateef",
    about: "Building Ubook -- Get access to your fav book",
  });

  useEffect(() => {
    const setDataFromDb = async () => {
      const userDetailsFromDb = await db.bio.get("info");
      const profilePhotoFromDb = await db.bio.get("profilePhoto");
      userDetailsFromDb && setUserDetails(userDetailsFromDb);
      profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb);
    };
    setDataFromDb();
  });

  const updateUserDetails = async (event) => {
    event.preventDefault();
    const detailsObject = {
      name: event.target.userName.value,
      about: event.target.aboutUser.value,
    };
    setUserDetails(detailsObject);

    await db.bio.put(detailsObject, "info");
    setButtonValue(false);
  };
  /**
   * function for handling edit button
   */

  function editor() {
    setButtonValue(!buttonValue);
  }

  const updateProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
    setProfilePhoto(newProfilePhoto);
    await db.bio.put(newProfilePhoto, "profilePhoto");
  };

  const editForm = (
    <form className="edit-bio-form" onSubmit={(e) => updateUserDetails(e)}>
      <input
        type="text"
        id=""
        name="userName"
        defaultValue={userDetails?.name}
        placeholder="Your name"
      />
      <input
        type="text"
        id=""
        name="aboutUser"
        defaultValue={userDetails?.about}
        placeholder=" About You"
      />
      <br />
      <button type="button" className="cancel-button" onClick={editor}>
        Cancel
      </button>
      <button type="submit" className="">
        Save
      </button>
    </form>
  );

  return (
    <section className="bio">
      <input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
      <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
        <div className="profile-photo" role="button" title="click to edit">
          <img src={profilePhoto} alt="profile" />
        </div>
      </label>

      <div className="profile-info">
        <p className="name">{userDetails.name}</p>
        <p className="about">{userDetails.about}</p>

        {buttonValue ? editForm : <button onClick={editor}>Edit</button>}
      </div>
    </section>
  );
};

export default Bio;
