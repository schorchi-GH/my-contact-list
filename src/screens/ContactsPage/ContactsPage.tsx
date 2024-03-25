import { FC, useEffect, useState } from "react";
import { Contact } from "../../components/Contact/Contact";
import uniqueId from "lodash/uniqueId";
import { MAIN_URL, SEARCH_QUERY } from "../../api/api";
import { setContactsData } from "../../redux/contactsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";
import {
  ContactActions,
  ContactDataFromApiType,
} from "../../types/contactTypes";
import useModal from "../../hooks/useModal";
import Modal from "../../components/Modal/Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SvgIcon from "@mui/material/SvgIcon";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ContactModal } from "../../components/ContactModal/ContactModal";
import "./ContactsPage.scss";

export const ContactsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isShowing, toggleModal } = useModal();
  let navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsFetching(true);
        const requestUrl = `${MAIN_URL}?${SEARCH_QUERY}`;
        const response = await fetch(requestUrl);
        let contacts = await response.json();
        const formattedContacts = contacts.results.map(
          (contact: ContactDataFromApiType) => {
            const { id, name, location } = contact;
            const idExists = id.name && id.value;
            const fullLocation = `${location.city} ${location.country} ${location.postcode}`;
            const fullName = `${name.title} ${name.first} ${name.last}`;
            const fullId = idExists ? `${id.name}${id.value}` : uniqueId();

            return {
              ...contact,
              id: fullId,
              name: fullName,
              location: fullLocation,
            };
          }
        );
        dispatch(setContactsData(formattedContacts));
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    })();
  }, [dispatch]);

  const contacts = useAppSelector((state) => state.users.contacts);
  const [contactIdToEdit, setContactIdToEdit] = useState("");
  const [modalType, setModalType] = useState(ContactActions.Edit);

  const editHandler = (id: string) => {
    setModalType(ContactActions.Edit);
    setContactIdToEdit(id);
    toggleModal();
  };

  const handleBackButtonClick = () => {
    navigate("/");
  };

  const handleAddNewContact = () => {
    setModalType(ContactActions.Add);
    toggleModal();
  };

  return (
    <>
      {isFetching && <Spinner />}
      {error ? (
        <div className="errors">
          Something went wrong &#128530;<br></br> Please, try again later
        </div>
      ) : (
        <div className="contacts-page-container">
          <header className="contacts-page-header">
            <div className="header-wrapper">
              <button
                type="button"
                onClick={handleBackButtonClick}
                className="header-button"
              >
                <SvgIcon className="arrow-icon">
                  <ArrowBackIcon />
                </SvgIcon>
              </button>
              <h1 className="contact-page-title">Contacts</h1>
              <button
                type="button"
                onClick={handleAddNewContact}
                className="header-button"
              >
                <SvgIcon>
                  <PersonAddIcon />
                </SvgIcon>
              </button>
            </div>
          </header>
          <div className="contacts-container">
            {contacts.map((contact: any) => {
              const {
                id,
                name,
                gender,
                location,
                email,
                phone,
                picture: { large },
              } = contact;

              return (
                <Contact
                  id={id}
                  gender={gender}
                  key={id}
                  name={name}
                  src={large}
                  email={email}
                  phone={phone}
                  location={location}
                  onEdit={editHandler}
                />
              );
            })}
            <Modal
              isShowing={isShowing}
              hide={toggleModal}
              onClick={toggleModal}
            >
              <ContactModal
                contactIdToEdit={contactIdToEdit}
                closeModal={toggleModal}
                type={modalType}
              />
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};
