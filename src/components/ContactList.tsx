import PageHeader from "./PageHeader";
import useContact from "../hooks/useContact";
import Search from "./Search";
import Contact from "./Contact";

const Contacts = () => {
  const { searchInput, handleSearch, clearSearch, cachedContacts, windowWidth, handleUserInfo } =
    useContact();
  return (
    <section className={`relative order-2 w-full  md:w-[55%]`}>
      <PageHeader pageName={"Contacts"} />
      <Search clearSearch={clearSearch} handleSearch={handleSearch} searchInput={searchInput} />
      <section className="absolute bottom-[56px] left-0 right-0 top-2 mt-[129px] w-full overflow-y-auto md:bottom-1">
        {cachedContacts?.map((contact, i) => (
          <Contact
            contact={contact}
            handleUserInfo={handleUserInfo}
            windowWidth={windowWidth}
            key={i}
          />
        ))}
      </section>
    </section>
  );
};
export default Contacts;
