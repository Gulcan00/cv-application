import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import EditButton from './EditButton';

export default function Education({ isEditing, toggleIsEditing }) {
  return (
    <div className="card">
      {isEditing ? (
        <>
          <form action="#">todo</form>
        </>
      ) : (
        <div>
          <EditButton onClick={toggleIsEditing} />
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGraduationCap} fontSize={'1.25rem'} />{' '}
            <h1>Education</h1>
          </div>
        </div>
      )}
    </div>
  );
}
