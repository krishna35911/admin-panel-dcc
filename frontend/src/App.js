import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Welcome from './components/panel/Welcome';
import Third from './components/districtwise/Third';
import Fourth from './components/notification/Fourth';
import Fifth from './components/carousel/Fifth';
import Polling from './components/Add Poll/Polling';
import Calender1 from './components/Calender/Calender1';
import AddCandidates from './components/socialmedia2/AddCandidates';
import Addimages from './components/partybook2/Addimages';
import Addgroups from './components/Whatsapp/Addgroups';
import Newgrp from './components/Whatsapp links/Newgrp';
import Displaymembers from './components/approval/Displaymembers';
import Displaycandidates from './components/socialmedia/Displaycandidates';
import Displayimages from './components/partybook/Displayimages';
import Displaypoll from './components/Display Poll/Displaypoll';
import Addslogan from './components/Slogans/Addslogan';
import AddAd from './components/Ads/AddAd';
import Displayad from './components/Ads/Displayad';
import Adddeveloper from './components/Developers/Adddeveloper';
import Displaydeveloper from './components/Developers/Displaydeveloper';
import AddLeadership from './components/Leadership/AddLeadership';
import DispplayLeadership from './components/Leadership/DispplayLeadership';
import DisplaySlogans from './components/Slogans/DisplaySlogans';
import Displayassign from './components/Assignments/Displayassign';
import Addassign from './components/Assignments/Addassign';
import Addnews from './components/News/Addnews';
import Displaynews from './components/News/Displaynews';
import Addarticle from './components/Articles/Addarticle';
import Displayarticle from './components/Articles/Displayarticle';
import Displayevent from './components/Calender/Displayevent';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Login/>}></Route>
        <Route path={'/panel'} element={<Welcome/>}></Route>
        <Route path={'/district'} element={<Third/>}></Route>
        <Route path={'/notification'} element={<Fourth/>}></Route>
        <Route path={'/carousel'} element={<Fifth/>}></Route>
        <Route path={'/polling'} element={<Polling/>}></Route>
        <Route path={'/displaypoll'} element={<Displaypoll/>}></Route>
        <Route path={'/calender'} element={<Calender1/>}></Route>
        <Route path={'/socialmedia2'} element={<AddCandidates/>}></Route>
        <Route path={'/partybook2/images'} element={<Addimages images/>}></Route>
        <Route path={'/partybook2/videos'} element={<Addimages videos/>}></Route>
        <Route path={'/partybook2/reels'} element={<Addimages reels/>}></Route>
        <Route path={'/partybook2/memes'} element={<Addimages memes/>}></Route>
        <Route path={'/whatsapp'} element={<Addgroups/>}></Route>
        <Route path={'/whatsapplinks'} element={<Newgrp/>}></Route>
        <Route path={'/approval'} element={<Displaymembers/>}></Route>
        <Route path={'/socialmedia'} element={<Displaycandidates />}></Route>
        <Route path={'/partybook/images'} element={<Displayimages images/>}></Route>
        <Route path={'/partybook/videos'} element={<Displayimages videos/>}></Route>
        <Route path={'/partybook/reels'} element={<Displayimages reels/>}></Route>
        <Route path={'/partybook/memes'} element={<Displayimages memes/>}></Route>
        <Route path={'/slogan'} element={<Addslogan/>}></Route>
        <Route path={'/ad'} element={<AddAd/>}></Route>
        <Route path={'/displayad'} element={<Displayad/>}></Route>
        <Route path={'/developer'} element={<Adddeveloper/>}></Route>
        <Route path={'/displaydeveloper'} element={<Displaydeveloper/>}></Route>
        <Route path={'/leadership'} element={<AddLeadership/>}></Route>
        <Route path={'/displayleadership'} element={<DispplayLeadership/>}></Route>
        <Route path={'/displayslogan'} element={<DisplaySlogans/>}></Route>
        <Route path={'/displayassign'} element={<Displayassign/>}></Route>
        <Route path={'/addassign'} element={<Addassign/>}></Route>
        <Route path={'/addnews'} element={<Addnews/>}></Route>
        <Route path={'/displaynews'} element={<Displaynews/>}></Route>
        <Route path={'/addarticle'} element={<Addarticle/>}></Route>
        <Route path={'/displayarticle'} element={<Displayarticle/>}></Route>
        <Route path={'/displaycalender'} element={<Displayevent/>}></Route>

      </Routes>
    </>
  );
}

export default App;
