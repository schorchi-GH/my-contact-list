import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addNewContact, updateContactData } from "../../redux/contactsSlice";
import "./ContactModal.scss";
import { Button } from "../Buttons/Button/Button";
import upload from "../../assets/upload.png";
import { ContactActions } from "../../types/contactTypes";

const saveDataActions = {
  [ContactActions.Edit]: updateContactData,
  [ContactActions.Add]: addNewContact,
};

interface ContactModalProps {
  contactIdToEdit?: string;
  closeModal: () => void;
  type: ContactActions;
}

const emptyContactData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  picture: {
    large: "",
  },
};

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const ContactModal = ({
  contactIdToEdit,
  closeModal,
  type,
}: ContactModalProps) => {
  const dispatch = useAppDispatch();

  const selectedContact = useAppSelector((state) =>
    state.users.contacts.find((contact) => contact.id === contactIdToEdit)
  );

  const [contactData, setContactData] = useState(
    type === ContactActions.Edit
      ? selectedContact || emptyContactData
      : emptyContactData
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContactData({ ...contactData, [name]: value });
  };

  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<ArrayBuffer | string | null>(
    null
  );

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  useEffect(() => {
    let fileReader: FileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target) {
          const { result } = e.target;
          if (result && !isCancel) {
            setFileDataURL(result);
            setContactData({
              ...contactData,
              picture: { large: String(result) },
            });
          }
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, contactData]);

  const saveDataHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(saveDataActions[type]({ ...contactData }));

    closeModal();
  };

  const modalTitle = {
    [ContactActions.Edit]: "Contact profile",
    [ContactActions.Add]: "New Contact",
  };

  return (
    <div className="modal-content">
      <div className="edit-modal-header">
        <p className="modal-title">{modalTitle[type]}</p>
      </div>
      <div className="modal-body">
        <form onSubmit={saveDataHandler}>
          {type === ContactActions.Add &&
            (fileDataURL ? (
              <div className="img-preview-wrapper">
                {<img src={String(fileDataURL)} alt="preview" />}
              </div>
            ) : (
              <label htmlFor="file" className="modal-label upload">
                <img
                  src={upload}
                  alt="Upload avatar"
                  className="upload-image"
                />
                <input
                  type="file"
                  id="file"
                  name="image"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleUploadFile}
                />
              </label>
            ))}
          <label htmlFor="Name" className="modal-label">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              className="modal-input"
              value={contactData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="Email" className="modal-label">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              className="modal-input"
              value={contactData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="Phone" className="modal-label">
            Phone:
            <input
              type="text"
              id="phone"
              name="phone"
              className="modal-input"
              value={contactData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="Location" className="modal-label">
            Location:
            <input
              type="text"
              id="location"
              name="location"
              className="modal-input"
              value={contactData.location}
              onChange={handleChange}
              required
            />
          </label>
          <Button type="submit" value="Save" isIcon>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};
