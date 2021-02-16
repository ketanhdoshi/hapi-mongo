// -----------------------------------------------------------------
// Presentational component for the example Matches page
// Written as an example during the initial Redux experimentation.
// Should be cleaned up and re-written 
// -----------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'

import s from '../scss/MatchesView.scss';

const MatchesView = ({ status, list, post, onClickCb, fetchCb }) => (
    <div>
        Matches
        <p>{status}</p>
        {list &&
            <ul className="list-group">
                {list.map(item =>
                    <li key={item.id} className="list-group-item" className={s.root}>
                        <span className="badge">{item.username}</span>
                        {item.name}
                    </li>
                )}
            </ul>
        }

       <div className="well well-lg">{post? post.title : "nothing"}</div>
       <button type="button" onClick={onClickCb}>Get Posts!</button>
       <button type="button" onClick={fetchCb}>Get Matches!</button>
   </div>
)

MatchesView.propTypes = {
  status: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object.isRequired),
  post: PropTypes.object.isRequired,
  onClickCb: PropTypes.func.isRequired,
  fetchCb: PropTypes.func.isRequired
}

export default MatchesView
