"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Law {
  sagId: number;
  title: string;
  statusId: number | string;
  description?: string;
  proposerName?: string;
}

const Kanban = () => {
  const [laws, setLaws] = useState<Law[]>([]);
  const [statusIds, setStatusIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getLaws');
        const fetchedLaws = response.data;

        setLaws(fetchedLaws);

        // Extract unique statusIds from the fetched laws
        const uniqueStatusIds = [
          ...new Set(fetchedLaws.map((law: Law) => {
            return typeof law.statusId === 'string' ? parseInt(law.statusId) : law.statusId;
          })),
        ];
        
        setStatusIds(uniqueStatusIds);
      } catch (error) {
        console.error('Error fetching laws:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="text-black text-2xl font-bold mb-4 text-center">Law Kanban Board</div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statusIds.map((statusId) => {
          // Filter laws for the specific statusId
          const filteredLaws = laws.filter((law) => {
            const currentStatusId = typeof law.statusId === 'string' ? parseInt(law.statusId) : law.statusId;
            return currentStatusId === statusId;
          });

          return (
            <div key={statusId} className="bg-white p-2 border rounded-md shadow-sm">
              <h3 className="text-black text-lg font-semibold mb-2">Status ID: {statusId}</h3>
              {filteredLaws.length > 0 ? (
                filteredLaws.map((law) => (
                  <div
                    key={law.sagId}
                    className="card bg-gray-200 p-2 mb-2 rounded-md"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
                        B {law.sagId}
                      </span>
                    </div>
                    <h4 className="text-black text-md font-bold mb-1">{law.title}</h4>
                    <p className="text-gray-700 text-sm mb-1">
                      {law.description || 'No description available'}
                    </p>
                    {law.proposerName && (
                      <div className="text-black text-sm font-medium">
                        {law.proposerName}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm">No laws available for this status.</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kanban;
