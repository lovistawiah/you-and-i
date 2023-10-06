import { Link } from 'react-router-dom'
import closeSvg from '../svg/group.svg'
import searchSvg from '../svg/search.svg'
import dbImg from '../img/user-dp.png'

import '../styles/new-friends.css'
const NewFriends = () => {
  return (
    <div className="newContacts">
      <section className="close-holder">
          <img src={closeSvg} alt="" />
      </section>
      <section className="search-page">
        <section className="search-holder">
          <img className='search-icon' 
          src={searchSvg} alt="" />
          <input type="text" className='search-bar' name="" id="" />
          <img
            className='search-close'
            src={closeSvg} alt="" />
        </section>
      </section>
      <section className="new-friends-list">
        <section className="new-friend">
          <section className="dp-holder">
            <img src={dbImg} alt="" />
          </section>
          <section className="user-info">
            <h4 className='username'>
              Lovis Tawiah
            </h4>
            <section className="bio">
              bio
            </section>
          </section>
        </section>
      </section>
    </div>
  )
}
export default NewFriends