import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import EditButton from './EditButton';

function EducationForm({ onCancel, onSubmit, onDelete, defaultValues }) {
  const [isPresent, setIsPresent] = useState(
    defaultValues?.endDate === 'Present'
  );

  return (
    <>
      <h2>{defaultValues ? 'Edit' : 'Create'} Education</h2>
      <form
        action="#"
        className="grid grid-cols-1 gap-y-3 mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          const education = Object.fromEntries(data.entries());
          if (!defaultValues) {
            education.id = crypto.randomUUID();
          } else {
            education.id = defaultValues.id;
          }
          education.endDate = education.present ? 'Present' : education.endDate;
          onSubmit(education);
        }}
      >
        <label>
          School
          <input
            name="school"
            type="text"
            defaultValue={defaultValues?.school}
            placeholder="Enter school / university"
          />
        </label>
        <label>
          Degree
          <input
            name="degree"
            type="text"
            defaultValue={defaultValues?.degree}
            placeholder="Enter Degree / Field Of Study"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label>
            City
            <input
              name="city"
              type="text"
              defaultValue={defaultValues?.city}
              placeholder="Enter City"
            />
          </label>
          <label>
            Country
            <input
              name="country"
              type="text"
              defaultValue={defaultValues?.country}
              placeholder="Enter Country"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label>
            Start Date
            <input
              type="month"
              name="startDate"
              id="startDate"
              defaultValue={defaultValues?.startDate}
            />
          </label>
          {!isPresent && (
            <label>
              End Date
              <input
                type="month"
                name="endDate"
                id="endDate"
                defaultValue={defaultValues?.endDate}
              />
            </label>
          )}
          <div className={`col-start-2 ${isPresent ? 'row-start-1' : ''}`}>
            {isPresent && 'End Date'}
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="present"
                id="present"
                value={isPresent}
                onChange={(e) => setIsPresent(e.target.checked)}
                defaultChecked={defaultValues?.endDate === 'Present'}
                className="h-4 w-4"
              />
              Present (Current)
            </label>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="secondary"
            onClick={() => onDelete(defaultValues?.id)}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="mr-2"
              aria-hidden="true"
            />
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
    <section className="card">
      {isEditing ? (
        <></>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faGraduationCap}
              fontSize={'1.25rem'}
              aria-hidden="true"
            />{' '}
            <h2>Education</h2>
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
                    <div className="flex-1 text-sm flex flex-col">
                      <div>
                        <span className="font-bold">
                          {educationItem.degree}
                        </span>
                        ,{' '}
                        <span className="italic font-light">
                          {educationItem.school}
                        </span>
                      </div>
                      <p className="m-0 text-xs">
                        {`${educationItem.startDate.replace(
                          '-',
                          '/'
                        )} - ${educationItem.endDate.replace('-', '/')}`}
                        <span className="mx-2.5">|</span>
                        {`${educationItem.city}, ${educationItem.country}`}
                      </p>
                    </div>
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
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2"
                  aria-label="Add"
                />{' '}
                Education
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
