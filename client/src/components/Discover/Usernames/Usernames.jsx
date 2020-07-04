import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../../utils/isEmpty';
import {
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from 'mdbreact';
import Wrapper from '../../Layout/Wrapper/Wrapper';

import './usernames.css';

const Usernames = ({ users, loading, posts }) => {
    const [searchInput, setSearchInput] = useState('');
    const [trendingUsers, setTrendingUsers] = useState([]);
    const [breederUsers, setBreederUsers] = useState([]);
    const [shelterUsers, setShelterUsers] = useState([]);
    const filteredUsers = users.filter((user) => user.username.includes(searchInput));
    const [filterType, setFilterType] = useState();

    useEffect(() => {
        let trendingCopy = [];
        let breederCopy = [];
        let shelterCopy = [];

        // if the prop users exists... continue
        if (users) {
            trendingCopy.push(...users);
            breederCopy.push(...users);
            shelterCopy.push(...users);
        }

        // sorting the users by how many followers to get the top users of social animals
        let sortedTrending = trendingCopy.sort((a, b) => (a.followers.length > b.followers.length) ? -1 : (b.followers.length > a.followers.length) ? 1 : 0);
        // sorting the users by breeder profile
        let sortedBreeding = breederCopy.filter((user) => user.profileType.includes('breeder'));
        // sorting the users by shelter profile
        let sortedShelter = shelterCopy.filter((user) => user.profileType.includes('shelter'));
        // setting the data to the component state
        setTrendingUsers(sortedTrending);
        setBreederUsers(sortedBreeding);
        setShelterUsers(sortedShelter);
    }, [users]);

    // rendering users when user starts typing for a username
    const renderSearchedUsers = () => {
        if (!loading && !isEmpty(searchInput)) {
            return filteredUsers.map((user, i) => {
                return (
                    <div key={i + 1} className="filteredUserCard">
                        <Link to={`/user_profile/${user._id}`}>
                            <div className="filteredUserBlock">
                                <img className="rounded-circle" src={user.profilePicture} alt="Img" />
                                <h3>{user.username}</h3>
                            </div>
                        </Link>
                    </div>
                )
            });
        }
    }

    // get the post length of the user that is being rendered
    const postLength = (userId) => {
        if (posts && userId) {
            let usersPosts = posts.filter((post) => userId === post.authorId.toString());
            if (usersPosts.length === 0) {
                return (null);
            } else if (usersPosts.length >= 1) {
                return (
                    <div className="col-4 postCol">
                        <h6>{usersPosts.length}</h6>
                        <h5>Posts</h5>
                    </div>
                )
            }
        }
    }

    const onBreeder = () => {
        setFilterType('breeder');
    }

    const onShelter = () => {
        setFilterType('shelter');
    }

    const onClear = () => {
        setFilterType();
    }

    const renderFilter = () => {
        return (
            <MDBDropdown>
                <MDBDropdownToggle caret color="primary">
                    Filter
              </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    <MDBDropdownItem onClick={onClear}>Clear Filter</MDBDropdownItem>
                    <MDBDropdownItem divider />
                    <MDBDropdownItem onClick={onBreeder}>Breeders</MDBDropdownItem>
                    <MDBDropdownItem onClick={onShelter}>Shelters</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        );
    }

    const dataReturn = (arr) => {
        if (!isEmpty(arr)) {
            return Object.values(arr).map((user, i) => {
                return (
                    <div key={i + 1} className="usernamesCard">
                        <Link to={`/user_profile/${user._id}`}>
                            <div className="container">
                                <div className="row d-flex justify-content-center">
                                    <img className="usernamesImg rounded-circle" src={user.profilePicture} alt="Profile" />
                                </div>

                                <div className="row d-flex justify-content-center">
                                    <h3 className="usernamesName" href="#">{user.username}</h3>
                                </div>

                                <div className="row d-flex justify-content-center">
                                    <div className="col-4 followerCol" style={{ display: user.followers.length <= 0 ? 'none' : 'block' }}>
                                        <h6>{user.followers.length}</h6>
                                        <h5>Followers</h5>
                                    </div>
                                    <div className="col-4 followingCol" style={{ display: user.following.length <= 0 ? 'none' : 'block' }}>
                                        <h6>{user.following.length}</h6>
                                        <h5>Following</h5>
                                    </div>
                                    {postLength(user._id)}
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            });
        }
    }

    // render the data of the profiles when selecting a filter
    const renderUserData = () => {
        switch (filterType) {
            case 'breeder':
                if (breederUsers) {
                    return (
                        <Fragment>
                            {dataReturn(breederUsers)}
                        </Fragment>
                    )
                } else {
                    return <p>There are currently no breeders</p>;
                }
            case 'shelter':
                if (shelterUsers) {
                    return (
                        <Fragment>
                            {dataReturn(shelterUsers)}
                        </Fragment>
                    )
                } else {
                    return <p>There are currently no shelters</p>;
                }
            default:
                return (
                    <Fragment>
                        {dataReturn(trendingUsers)}
                    </Fragment>
                )
        }
    }

    return (
        <Fragment>
            <h3>Usernames</h3>
            <Fragment>
                <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                {renderSearchedUsers()}
            </Fragment>
            <section>
                {renderFilter()}
                <div id="outerDataWrap">
                    <div id="userDataWrap">
                        {renderUserData()}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

Usernames.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
}

export default Usernames;