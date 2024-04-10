import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const BarLoaders = () => {
  return (
    <SkeletonTheme baseColor="#b6b6b6" highlightColor="#e0e0e0">
      <div className="summary-status-container">
          <div className="summary-status-card">
            <div className="info">
            <Skeleton  height={30} width={100}/>
            <Skeleton  height={20} width="70%"/>
            </div>
            <div className="status-img pending">
            <Skeleton circle width={75} height={75}/>
            </div>
          </div>
          <div className="summary-status-card">
          <div className="info">
          <Skeleton  height={30} width={100}/>
            <Skeleton  height={20} width="70%"/>
            </div>
            <div className="status-img pending">
            <Skeleton circle width={75} height={75}/>
            </div>
          </div>
          <div className="summary-status-card">
          <div className="info">
          <Skeleton  height={30} width={100}/>
            <Skeleton  height={20} width="70%"/>
            </div>
            <div className="status-img pending">
            <Skeleton circle width={75} height={75}/>
            </div>
          </div>
          <div className="summary-status-card">
          <div className="info">
          <Skeleton  height={30} width={100}/>
            <Skeleton  height={20} width="70%"/>
            </div>
            <div className="status-img pending">
            <Skeleton circle width={75} height={75}/>
            </div>
          </div>
        </div>
    </SkeletonTheme>
  )
}

export default BarLoaders
