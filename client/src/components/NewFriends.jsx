import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { socket } from '../socket'
import dbImg from '../images/user-dp.png'

import '../styles/new-friends.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { channelEvents } from '../utils/eventNames'
import { useDispatch } from 'react-redux'
import { chatInfo } from '../app/chatInfoSlice'

const NewFriends = () => {
  const dispatch = useDispatch()
  const [newFriends, setNewFriends] = useState()
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    socket.emit(channelEvents.search, searchValue)
    socket.on(channelEvents.displayNewChats, (data) => {
      if (Array.isArray(data)) {
        setNewFriends(data)
      }
    })
  }, [searchValue])

  const addNewFriend = (newFriendId, newFriendName) => {
    const newFriendObj = {
      newFriendId,
      newFriendName
    }
    dispatch(chatInfo(newFriendObj))
  }

  return (
    <div className="newContacts">
      <section className="close-holder">
        {/* <img src={closeSvg} alt="" /> */}
      </section>
      <section className="search-page">
        <section className="search-holder">
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
          <input type="text" className='search-bar' name="" id="" onChange={handleSearch} />
        </section>
      </section>
      <section className="new-friends-list">
        {
          newFriends?.map(({ _id, username }) => (
            <Link to='/messages' onClick={() => addNewFriend(_id, username)} className="new-friend" key={_id} >
              <section className="dp-holder">
                <img src={dbImg} alt="" />
              </section>
              <section className="user-info">
                <h4 className='username'>
                  {username}
                </h4>
                <section className="bio">
                  bio
                </section>
              </section>
            </Link >
          ))
        }
      </section>
    </div >
  )
}
export default NewFriends