import Link from 'next/link';
import React from 'react'

interface FactoryCardProps {
    name: string;
    id: string;
  }
  
  const FactoryCard: React.FC<FactoryCardProps> = ({ name, id }) => {
    return (
      <Link href={`/dashboard/factory/${id}`}>
        <div className='card'>
          {name}
        </div>
      </Link>
    );
  };
  

interface FactoryListProps{
    factoryList:Object[]
}


export default function FactoryList({factoryList}:FactoryListProps) {
  return (
    <div className='card-grid'>
        {
            factoryList.map((e,i)=>{
                return <FactoryCard name={e.name} id={e._id} key={i} ></FactoryCard>
            })
        }
    </div>
  )
}
