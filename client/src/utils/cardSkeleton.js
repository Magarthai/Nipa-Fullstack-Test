import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const Card = () => {
  return (
    <SkeletonTheme baseColor="#b6b6b6" highlightColor="#e0e0e0">
    <div className='test'>
    <div className="ticket-card">
       <div className="ticket-header">

       <Skeleton  height={40}/>
       <div className="status-img">
       <Skeleton circle width={75} height={75}/>
     </div>
     
       </div>
       <div className="ticket-infos">
       <p className='ticket-status-text'></p>

       <Skeleton count={4} width="80%" height={30} style={{margin:10}}/>
       <p></p>
     </div>
    </div>
   </div>
   <div className='test'>
    <div className="ticket-card">
       <div className="ticket-header">

       <Skeleton  height={40}/>
       <div className="status-img">
       <Skeleton circle width={75} height={75}/>
     </div>
     
       </div>
       <div className="ticket-infos">
       <p className='ticket-status-text'></p>

       <Skeleton count={4} width="80%" height={30} style={{margin:10}}/>
       <p></p>
     </div>
    </div>
   </div>
   <div className='test'>
    <div className="ticket-card">
       <div className="ticket-header">

       <Skeleton  height={40}/>
       <div className="status-img">
       <Skeleton circle width={75} height={75}/>
     </div>
     
       </div>
       <div className="ticket-infos">
       <p className='ticket-status-text'></p>

       <Skeleton count={4} width="80%" height={30} style={{margin:10}}/>
       <p></p>
     </div>
    </div>
   </div>
   <div className='test'>
    <div className="ticket-card">
       <div className="ticket-header">

       <Skeleton  height={40}/>
       <div className="status-img">
       <Skeleton circle width={75} height={75}/>
     </div>
     
       </div>
       <div className="ticket-infos">
       <p className='ticket-status-text'></p>

       <Skeleton count={4} width="80%" height={30} style={{margin:10}}/>
       <p></p>
     </div>
    </div>
   </div>
   </SkeletonTheme>
  )
}

export default Card
