import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const GraphSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#b6b6b6" highlightColor="#e0e0e0">
    <div>
          <div className="dashboard-container" style={{width:"100%", height:"100%" , justifyContent:"center",display:"flex"}}>
            <div className="line-graph" style={{ justifyContent:"center",display:"flex",borderRadius:"20px"}}>
            <Skeleton  height={40} width="60%" style={{margin:"2%" , marginTop:0, borderRadius:"5px"}}/>
            <Skeleton  height={100} width="80%" style={{marginLeft:"2%", borderRadius:"10px"}}/>
            <Skeleton  height={100} width="80%" style={{marginLeft:"2%",marginTop:"1%", borderRadius:"10px"}}/>
            
            </div>
            <div className="line-graph" style={{ justifyContent:"center",display:"flex",borderRadius:"20px",height:"30%",justifyContent:"center"}}>
            <Skeleton  height={30} width="60%" style={{margin:"2%" , marginTop:0, borderRadius:"5px"}}/>
            <Skeleton  height={30} width="60%" style={{margin:"2%" , marginTop:0, borderRadius:"5px"}}/>            
            </div>
          </div>
        </div>
        </SkeletonTheme>
  )
}

export default GraphSkeleton
