import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users } from 'lucide-react';

const Competition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCreateTeam = () => {
    navigate(`/competition/${id}/create-team`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">TalentHunt</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Competition Details</h1>
          <button 
            onClick={handleCreateTeam}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
          >
            <Users size={18} className="mr-2" />
            Create Team
          </button>
        </div>

        {/* Add your competition details content here */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p>Competition content will go here...</p>
        </div>
      </main>
    </div>
  );
};

export default Competition; 