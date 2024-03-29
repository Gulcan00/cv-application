import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import EditButton from './EditButton';

export default function PersonalInfo({
  personalInfo,
  handleSubmit,
  isEditing,
  toggleIsEditing,
}) {
  return (
    <section className="card">
      {isEditing ? (
        <>
          <h2>Edit personal details</h2>
          <form
            action="#"
            className="grid grid-cols-1 gap-y-3 mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.target);
              handleSubmit(Object.fromEntries(data.entries()));
              toggleIsEditing();
            }}
          >
            <label>
              Full Name
              <input
                name="fullName"
                type="text"
                placeholder="Enter your first and last name"
                defaultValue={personalInfo.fullName}
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                defaultValue={personalInfo.email}
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                type="tel"
                placeholder="Enter phone"
                defaultValue={personalInfo.phone}
              />
            </label>
            <label>
              Address
              <input
                name="location"
                type="text"
                placeholder="City, Country"
                defaultValue={personalInfo.location}
              />
            </label>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="secondary"
                onClick={toggleIsEditing}
              >
                Cancel
              </button>
              <button>Submit</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <span className="absolute top-3 right-3">
              <EditButton onClick={toggleIsEditing} />
            </span>
            <h2>{personalInfo.fullName || 'Your name'}</h2>
            <div className="grid grid-cols-1 gap-y-2">
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{personalInfo.email || 'Email'}</p>
              </span>
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faPhone} />
                <p>{personalInfo.phone || 'Phone'}</p>
              </span>
              <span className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{personalInfo.location || 'Address'}</p>
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
