import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function PersonalInfo({
  personalInfo,
  handleSubmit,
  isEditing,
  toggleIsEditing,
}) {
  return (
    <>
      <div className="card">
        {isEditing ? (
          <form action="#">
            <label>
              Full Name
              <input name="fullName" type="text" />
            </label>
            <label>
              Email
              <input name="email" type="email" />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" />
            </label>
            <label>
              Address
              <input name="address" type="text" />
            </label>
            <button
              type="button"
              className="secondary"
              onClick={toggleIsEditing}
            >
              Cancel
            </button>
            <button>Submit</button>
          </form>
        ) : (
          <>
            <button onClick={toggleIsEditing}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <h1>{personalInfo.fullName}</h1>
            <div className="grid grid-cols-1 gap-y-2">
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{personalInfo.email}</p>
              </span>
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faPhone} />
                <p>{personalInfo.phone}</p>
              </span>
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{personalInfo.location}</p>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
