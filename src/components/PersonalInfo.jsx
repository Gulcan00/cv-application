import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export default function PersonalInfo({ personalInfo, isEditing }) {
  return (
    <>
      <div className="card">
        {isEditing ? (
          <form action="#">
            <input type="text" />
          </form>
        ) : (
          <>
            <h1>{personalInfo.fullName || 'Your name'}</h1>
            <button>edit</button>
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              <p>{personalInfo.email || 'email'}</p>
            </span>
          </>
        )}
      </div>
    </>
  );
}
