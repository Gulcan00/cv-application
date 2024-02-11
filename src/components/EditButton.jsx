import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditButton({ onClick }) {
  return (
    <button onClick={onClick} className="edit self-end">
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
}
