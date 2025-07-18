import styled from 'styled-components';
import {onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserEmail, selectUserName, selectUserPhoto, setSignOutState, setuserLoginDetails } from '../features/user/userSlice';
import { useEffect } from 'react';

const Header = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(selectUserName);
    const userphoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        onAuthStateChanged(auth, async (user)=>{
            if(user){
                setUser(user);
                navigate('/home');
            }
        })
    },[
        username
    ])

    const handleAuth = () => {
        if(!username){
            signInWithPopup(auth, provider).then((result)=>{
                console.log(result);
                setUser(result.user);
            }).catch((error) => {
                alert(error.message);
            })
        }else if(username){
            signOut(auth)
            .then(()=>{
                dispatch(setSignOutState());
                navigate('/');
            }).catch((error) => {
                alert(error);
            })
        }
        
    };

    const setUser = (user) => {
        dispatch(setuserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }));
    };


    return (
        <Nav>
            <Logo> 
                <img src="/images/logo.svg" alt="Disney+" />
            </Logo>

            {
                !username ? 
                    <Login onClick={handleAuth}> Login </Login> 
                :
                <>
                    <NavMenu>
                        <a href='/home'>
                            <img src="/images/home-icon.svg" alt="" />
                            <span>HOME</span>
                        </a>
                        <a>
                            <img src='/images/search-icon.svg' alt="search-icon" />
                            <span>SEARCH</span>
                        </a>
                        <a>
                            <img src='/images/watchlist-icon.svg' alt="wacthlist-icon" />
                            <span>WATCHLIST</span>
                        </a>
                        <a>
                            <img src='/images/original-icon.svg' alt="original-icon" />
                            <span>ORIGINALS</span>
                        </a>
                        <a>
                            <img src='/images/movie-icon.svg' alt="movies-icon" />
                            <span>MOVIES</span>
                        </a>
                        <a>
                            <img src='/images/series-icon.svg' alt="series-icon" />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>
                    <SignOut>
                        <UserImg src={userphoto} alt={username}/>
                        <Dropdown>
                            <span onClick={handleAuth}>Sign Out</span> 
                        </Dropdown>
                    </SignOut>
                </>
            }
        </Nav>
    );
};

const UserImg = styled.img`
    height: 100%;
`;

const Login = styled.a`
    background-color: rgba(0,0,0,0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    position: relative;
    margin-right: auto;
    margin-left: 25px;


    a {
        display: flex;
        align-items: center;
        padding: 0 12px;

        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }

        span {
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &::before{
                background-color: rgb(249, 249, 249);
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: '';
                opacity: 0;
                left: 0px;
                position: absolute;
                right: 0px;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
                width: auto;
                height: 2px;
            }
        }

        &:hover{
            span::before{
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }   
    }
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;
    img{
        display: block;
        width: 100%;
    }
`;

const Nav = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 48px;
    rigth: 0px;
    background: rgb(19,19,19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100%;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    ${UserImg} {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    &:hover{
        ${Dropdown}{
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;



export default Header;