"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Briefcase,
  Users,
  Home,
  Car,
  School,
  Building2,
  Heart,
} from "lucide-react";
import axios from "axios";

interface Proposal {
  id: string;
  name: string;
  gender: string;
  age: number;
  maritalStatus: string;
  height: string;
  disability: string | null;
  designation: string;
  qualification: string;
  university: string;
  caste: string;
  customCaste: string | null;
  sect: string;
  propertySize: string;
  homeOwnership: string;
  location: string;
  carAvailable: string;
  fatherOccupation: string;
  motherOccupation: string;
  brothers: number;
  brothersMarried: number;
  brothersDetails: string;
  sisters: number;
  sistersMarried: number;
  sistersDetails: string;
  address: string;
  reqAgeLimit: number;
  reqHeight: string;
  reqCity: string;
  reqCaste: string;
  reqCustomCaste: string | null;
  reqQualification: string;
  imageUrl: string;
}

export default function ProposalProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const { data } = await axios.get("/api/proposal");
        setProposals(data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const proposal = proposals.find((p) => p.id == params.id);

  const handleWhatsAppContact = () => {
    // const phoneNumber = "923419385624";
    const phoneNumber = "923367690594";
    const message = `Asslam-o-Alaikum !

i am interesed ih this proposal

________________________________________

Proposal Detail:

name: ${proposal?.name}
age: ${proposal?.age}
gender: ${proposal?.gender}
maritalStatus: ${proposal?.maritalStatus}
height: ${proposal?.height}
qualification: ${proposal?.qualification}
caste: ${proposal?.caste}
location: ${proposal?.location}
address: ${proposal?.address}

_________________________________________

I want to discuss about this proposal`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-rose-800 mb-4">
            Proposal Not Found
          </h2>
          <button
            onClick={() => router.back()}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-rose-700 hover:text-rose-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Search</span>
        </button>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-rose-100">
          
          <div className="bg-rose-50 p-6 rounded-xl mb-8">
            <h1 className="text-4xl font-serif font-bold text-rose-800 mb-2">
              {proposal.name}, {proposal.age}
            </h1>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="bg-rose-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-rose-800 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <GraduationCap className="w-5 h-5 text-rose-500" />
                      <span>Qualification: {proposal.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <School className="w-5 h-5 text-rose-500" />
                      <span>University: {proposal.university}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-5 h-5 text-rose-500" />
                      <span>Designation: {proposal.designation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-rose-500" />
                      <span>Location: {proposal.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-rose-500" />
                      <span>Caste: {proposal.caste}</span>
                    </div>
                    {proposal.customCaste && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-rose-500" />
                        <span>Custom Caste: {proposal.customCaste}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-rose-500" />
                      <span>Sect: {proposal.sect}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-rose-800 mb-4">
                    Family Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-5 h-5 text-rose-500" />
                      <span>
                        Father&apos;s Occupation: {proposal.fatherOccupation}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-5 h-5 text-rose-500" />
                      <span>
                        Mother&apos;s Occupation: {proposal.motherOccupation}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-rose-500" />
                      <span>
                        Brothers: {proposal.brothers} (Married:{" "}
                        {proposal.brothersMarried})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-rose-500" />
                      <span>
                        Sisters: {proposal.sisters} (Married:{" "}
                        {proposal.sistersMarried})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-rose-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-rose-800 mb-4">
                    Property Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Home className="w-5 h-5 text-rose-500" />
                      <span>Property Size: {proposal.propertySize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Home className="w-5 h-5 text-rose-500" />
                      <span>Home Ownership: {proposal.homeOwnership}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Car className="w-5 h-5 text-rose-500" />
                      <span>Car Available: {proposal.carAvailable}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-rose-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-rose-800 mb-4">
                    Requirements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Age Limit: {proposal.reqAgeLimit}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Height: {proposal.reqHeight}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>City: {proposal.reqCity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Caste: {proposal.reqCaste}</span>
                    </div>
                    {proposal.reqCustomCaste && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Heart className="w-5 h-5 text-rose-500" />
                        <span>Custom Caste: {proposal.reqCustomCaste}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-5 h-5 text-rose-500" />
                      <span>Qualification: {proposal.reqQualification}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleWhatsAppContact}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
