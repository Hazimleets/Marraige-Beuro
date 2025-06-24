"use client";

import { useState, useEffect } from "react";
import {
  Search,
  User,
  Calendar,
  VenusAndMars,
  GraduationCap,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Define the Proposal type
interface Proposal {
  id: string;
  name: string;
  age: number;
  education: string;
  occupation: string;
  location: string;
  caste: string;
  imageUrl: string;
  gender: string;
  qualification: string;
}

export default function ProposalSearchPage() {
  const [selectedCaste, setSelectedCaste] = useState("");
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProposals, setAllProposals] = useState<Proposal[]>([]);
  const [uniqueCastes, setUniqueCastes] = useState<string[]>([]);

  // Fetch all proposals on mount
  useEffect(() => {
    fetchAllProposals();
  }, []);

  const fetchAllProposals = async () => {
    try {
      const response = await fetch("/api/proposal");
      const data = (await response.json()) as Proposal[];
      setAllProposals(data);

      const castes = [...new Set(data.map((p) => p.caste))].sort();
      setUniqueCastes(castes);
    } catch (error) {
      console.error("Error fetching all proposals:", error);
    }
  };

  // Client-side filtering
  const handleSearch = () => {
    if (!selectedCaste) return;

    setIsLoading(true);
    const filtered = allProposals.filter(
      (proposal) => proposal.caste === selectedCaste
    );
    setProposals(filtered);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 mb-12 border border-rose-100">
          <h1 className="text-4xl font-serif font-bold text-rose-800 mb-8 text-center">
            Find Your Perfect Match
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <select
                value={selectedCaste}
                onChange={(e) => setSelectedCaste(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-rose-300 bg-white/80 text-gray-700 font-medium transition-all duration-200"
              >
                <option value="">Select Caste</option>
                {uniqueCastes.map((caste) => (
                  <option key={caste} value={caste}>
                    {caste}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSearch}
              disabled={!selectedCaste || isLoading}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
            >
              <Search className="w-5 h-5" />
              {isLoading ? "Searching..." : "Search"}
            </button>
            {selectedCaste && (
              <button
                onClick={() => {
                  setSelectedCaste("");
                  setProposals([]);
                }}
                className="text-sm text-rose-500 underline hover:text-rose-600 transition-all"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Filtered Results Section */}
        {proposals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-rose-800 mb-8 text-center">
              Search Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && proposals.length === 0 && selectedCaste && (
          <div className="text-center py-16">
            <p className="text-rose-600 text-xl font-medium">
              No proposals found for the selected caste.
            </p>
          </div>
        )}

        {/* All Proposals */}
        {!selectedCaste && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-rose-800 mb-8 text-center">
              All Proposals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Proposal Card Component
const ProposalCard = ({ proposal }: { proposal: Proposal }) => {
  const router = useRouter();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden hover:shadow-2xl transition-all duration-300 border border-rose-100 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="space-y-3 text-gray-600">
          <p className="flex items-center gap-2">
            <User className="w-4 h-4 text-rose-700" />
            <span className="font-medium text-rose-700">Name:</span>
            {proposal.name}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-700" />
            <span className="font-medium text-rose-700">Age:</span>
            {proposal.age}
          </p>
          <p className="flex items-center gap-2">
            <VenusAndMars className="w-4 h-4 text-rose-700" />
            <span className="font-medium text-rose-700">Gender:</span>
            {proposal.gender}
          </p>
          <p className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-rose-700" />
            <span className="font-medium text-rose-700">Qualification:</span>
            {proposal.qualification}
          </p>
          <p className="flex items-center gap-2">
            <Users className="w-4 h-4 text-rose-700" />
            <span className="font-medium text-rose-700">Caste:</span>
            {proposal.caste}
          </p>
        </div>
        <button
          onClick={() => router.push(`/proposal-search-form/${proposal.id}`)}
          className="mt-6 w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2.5 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};
