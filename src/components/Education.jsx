import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import EditButton from './EditButton';

function EducationForm({ onCancel, onSubmit, onDelete, defaultValues }) {
  return (
    <>
      <h2>{defaultValues ? 'Edit' : 'Create'} Education</h2>
      <form
        action="#"
        className="grid grid-cols-1 gap-y-3 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          const education = Object.fromEntries(data.entries());
          if (!defaultValues) {
            education.id = crypto.randomUUID();
          } else {
            education.id = defaultValues.id;
          }
          onSubmit(education);
        }}
      >
        <label>
          School
          <input
            name="school"
            type="text"
            defaultValue={defaultValues?.school}
          />
        </label>
        <label>
          Degree
          <input
            name="degree"
            type="text"
            defaultValue={defaultValues?.degree}
          />
        </label>
        <div>
          <label>
            City
            <input name="city" type="text" defaultValue={defaultValues?.city} />
          </label>
          <label>
            Country
            <input
              name="country"
              type="text"
              defaultValue={defaultValues?.country}
            />
          </label>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="secondary"
            onClick={() => onDelete(defaultValues?.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete
          </button>
          <div className="flex justify-end gap-4">
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
            <button>Submit</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default function Education({
  education,
  handleAdd,
  handleEdit,
  handleDelete,
  isEditing,
  toggleIsEditing,
}) {
  const [editingId, setEditingId] = useState(null);
  const [isNewEducation, setIsNewEducation] = useState(false);

  const showForm = isNewEducation || !!editingId;

  return (
    <div className="card">
      {isEditing ? (
        <></>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGraduationCap} fontSize={'1.25rem'} />{' '}
            <h1>Education</h1>
          </div>
          {showForm ? (
            <EducationForm
              key={editingId || 0}
              defaultValues={education.find((item) => item.id === editingId)}
              onCancel={() => {
                if (isNewEducation) {
                  setIsNewEducation(false);
                } else {
                  setEditingId(null);
                }
              }}
              onSubmit={(data) => {
                if (isNewEducation) {
                  handleAdd(data);
                  setIsNewEducation(false);
                } else {
                  handleEdit(data);
                  setEditingId(null);
                }
              }}
              onDelete={(id) => {
                handleDelete(id);
                setEditingId(null);
              }}
            />
          ) : (
            <>
              {education.map((educationItem) => (
                <div key={educationItem.id} className="grid grid-cols-1">
                  <div className="flex">
                    <div className="flex-1">{educationItem.school} </div>
                    <EditButton
                      onClick={() => {
                        setEditingId(educationItem.id);
                        toggleIsEditing(educationItem.id);
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="secondary border-2 border-gray-300 dark:border-cyan-800 max-w-max self-center"
                onClick={() => setIsNewEducation(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Education
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
