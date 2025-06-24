'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

interface Proposal {
  id: number;
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  height: string;
  disability: string;
  designation: string;
  qualification: string;
  university: string;
  caste: string;
  customCaste: string;
  sect: string;
  propertySize: string;
  homeOwnership: string;
  location: string;
  carAvailable: boolean;
  fatherOccupation: string;
  motherOccupation: string;
  brothers: number;
  brothersMarried: number;
  brothersDetails: string;
  sisters: number;
  sistersMarried: number;
  sistersDetails: string;
  address: string;
  reqAgeLimit: string;
  reqHeight: string;
  reqCity: string;
  reqCaste: string;
  reqCustomCaste: string;
  reqQualification: string;
}

export default function AdminPanel() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch proposals
  const fetchProposals = async () => {
    try {
      const response = await axios.get('/api/proposal');
      setProposals(response.data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  // Delete proposal
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      try {
        await axios.delete(`/api/proposal?id=${id}`);
        setProposals(proposals.filter(proposal => proposal.id !== id));
      } catch (error) {
        console.error('Error deleting proposal:', error);
      }
    }
  };

  // Edit proposal
  const handleEdit = (proposal: Proposal) => {
    setEditingProposal(proposal);
    setIsEditing(true);
  };

  // Update proposal
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProposal) return;

    try {
      await axios.put(`/api/proposal?id=${editingProposal.id}`, editingProposal);
      setProposals(proposals.map(proposal => 
        proposal.id === editingProposal.id ? editingProposal : proposal
      ));
      setIsEditing(false);
      setEditingProposal(null);
    } catch (error) {
      console.error('Error updating proposal:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel - Proposals</h1>
      
      {isEditing && editingProposal ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Edit Proposal</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={editingProposal.name}
                onChange={(e) => setEditingProposal({...editingProposal, name: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Age</label>
              <input
                type="number"
                value={editingProposal.age}
                onChange={(e) => setEditingProposal({...editingProposal, age: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <input
                type="text"
                value={editingProposal.gender}
                onChange={(e) => setEditingProposal({...editingProposal, gender: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Marital Status</label>
              <input
                type="text"
                value={editingProposal.maritalStatus}
                onChange={(e) => setEditingProposal({...editingProposal, maritalStatus: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Height</label>
              <input
                type="text"
                value={editingProposal.height}
                onChange={(e) => setEditingProposal({...editingProposal, height: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Qualification</label>
              <input
                type="text"
                value={editingProposal.qualification}
                onChange={(e) => setEditingProposal({...editingProposal, qualification: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Location</label>
              <input
                type="text"
                value={editingProposal.location}
                onChange={(e) => setEditingProposal({...editingProposal, location: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingProposal(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marital Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{proposal.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proposal.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proposal.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proposal.maritalStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proposal.height}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proposal.qualification}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{proposal.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(proposal)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(proposal.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
