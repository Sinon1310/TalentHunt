import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Award, Users, Book, Filter, Download } from 'lucide-react';

const StudentProgress = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  // Mock data with more project-relevant information
  const mockStudents = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
      competitions: [
        { 
          name: 'TalentHunt Hackathon 2024', 
          status: 'completed', 
          position: '1st',
          projectName: 'AI-Powered Health Monitor',
          technologies: ['React', 'TensorFlow', 'Python', 'Firebase'],
          teamSize: 4
        },
        { 
          name: 'Innovation Challenge', 
          status: 'ongoing', 
          position: '-',
          projectName: 'Smart City Solution',
          technologies: ['Node.js', 'IoT', 'MongoDB', 'AWS'],
          teamSize: 3
        }
      ],
      mentors: [
        { name: 'Dr. Smith', expertise: 'Web Development & Cloud', rating: 4.8 },
        { name: 'Prof. Johnson', expertise: 'AI/ML', rating: 4.9 }
      ],
      skills: ['React', 'Python', 'Machine Learning', 'Node.js', 'Cloud Computing'],
      successRate: 85,
      participationRate: 92,
      projectCompletion: 78,
      teamContribution: 88,
      learningProgress: 90
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=4C51BF&color=fff',
      competitions: [
        { 
          name: 'Innovation Challenge', 
          status: 'completed', 
          position: '2nd',
          projectName: 'Sustainable Energy Platform',
          technologies: ['Vue.js', 'AWS', 'Python', 'PostgreSQL'],
          teamSize: 3
        },
        {
          name: 'TalentHunt CodeFest',
          status: 'ongoing',
          position: '-',
          projectName: 'EdTech Learning Platform',
          technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
          teamSize: 4
        }
      ],
      mentors: [
        { name: 'Dr. Williams', expertise: 'Cloud Computing', rating: 4.7 },
        { name: 'Prof. Davis', expertise: 'Full Stack Development', rating: 4.6 }
      ],
      skills: ['Vue.js', 'AWS', 'Python', 'Database Design', 'React'],
      successRate: 78,
      participationRate: 85,
      projectCompletion: 82,
      teamContribution: 90,
      learningProgress: 85
    },
    {
      id: 3,
      name: 'Alex Kumar',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=047857&color=fff',
      competitions: [
        {
          name: 'TalentHunt AI Challenge',
          status: 'completed',
          position: '1st',
          projectName: 'Intelligent Traffic Management',
          technologies: ['Python', 'TensorFlow', 'OpenCV', 'React'],
          teamSize: 3
        },
        {
          name: 'Smart India Hackathon',
          status: 'ongoing',
          position: '-',
          projectName: 'Rural Healthcare Connect',
          technologies: ['React Native', 'Node.js', 'MongoDB', 'ML'],
          teamSize: 4
        }
      ],
      mentors: [
        { name: 'Dr. Patel', expertise: 'AI & Computer Vision', rating: 4.9 },
        { name: 'Prof. Reddy', expertise: 'Mobile Development', rating: 4.8 }
      ],
      skills: ['Python', 'Machine Learning', 'Computer Vision', 'React Native'],
      successRate: 92,
      participationRate: 88,
      projectCompletion: 85,
      teamContribution: 95,
      learningProgress: 88
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=DC2626&color=fff',
      competitions: [
        {
          name: 'TalentHunt WebDev Challenge',
          status: 'completed',
          position: '2nd',
          projectName: 'Community Marketplace',
          technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
          teamSize: 3
        }
      ],
      mentors: [
        { name: 'Prof. Anderson', expertise: 'Web Development', rating: 4.7 }
      ],
      skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'UI/UX'],
      successRate: 75,
      participationRate: 80,
      projectCompletion: 88,
      teamContribution: 85,
      learningProgress: 82
    },
    {
      id: 5,
      name: 'Raj Patel',
      avatar: 'https://ui-avatars.com/api/?name=Raj+Patel&background=7C3AED&color=fff',
      competitions: [
        {
          name: 'TalentHunt Innovation Summit',
          status: 'completed',
          position: '1st',
          projectName: 'Smart Agriculture System',
          technologies: ['IoT', 'Python', 'React', 'TensorFlow'],
          teamSize: 4
        },
        {
          name: 'Digital India Hackathon',
          status: 'ongoing',
          position: '-',
          projectName: 'Rural Education Platform',
          technologies: ['React', 'Firebase', 'Node.js', 'MongoDB'],
          teamSize: 3
        }
      ],
      mentors: [
        { name: 'Dr. Mehta', expertise: 'IoT & Embedded Systems', rating: 4.9 },
        { name: 'Prof. Shah', expertise: 'Full Stack Development', rating: 4.8 }
      ],
      skills: ['IoT', 'Python', 'React', 'Machine Learning', 'Node.js'],
      successRate: 88,
      participationRate: 90,
      projectCompletion: 92,
      teamContribution: 87,
      learningProgress: 90
    },
    {
      id: 6,
      name: 'Priya Singh',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Singh&background=DB2777&color=fff',
      competitions: [
        {
          name: 'TalentHunt ML Challenge',
          status: 'completed',
          position: '3rd',
          projectName: 'Crop Disease Detection',
          technologies: ['Python', 'TensorFlow', 'React Native', 'AWS'],
          teamSize: 3
        },
        {
          name: 'AgriTech Hackathon',
          status: 'ongoing',
          position: '-',
          projectName: 'Precision Farming Assistant',
          technologies: ['IoT', 'Machine Learning', 'React', 'MongoDB'],
          teamSize: 4
        }
      ],
      mentors: [
        { name: 'Dr. Kumar', expertise: 'Machine Learning', rating: 4.8 },
        { name: 'Prof. Verma', expertise: 'Agriculture Technology', rating: 4.7 }
      ],
      skills: ['Python', 'Machine Learning', 'IoT', 'React Native', 'AWS'],
      successRate: 82,
      participationRate: 88,
      projectCompletion: 85,
      teamContribution: 90,
      learningProgress: 87
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && student.competitions.some(c => c.status === filterStatus);
  });

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const getAverageRating = (mentors) => {
    return mentors.reduce((acc, curr) => acc + curr.rating, 0) / mentors.length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Stats */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Student Progress Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track student participation, success rates, and project performance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Users className="text-white h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-blue-600 font-medium">Total Students</p>
                  <p className="text-2xl font-bold text-blue-800">{students.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Award className="text-white h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-green-600 font-medium">Active Projects</p>
                  <p className="text-2xl font-bold text-green-800">
                    {students.reduce((acc, student) => 
                      acc + student.competitions.filter(c => c.status === 'ongoing').length, 0
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <Book className="text-white h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-purple-600 font-medium">Avg Success Rate</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {Math.round(students.reduce((acc, student) => acc + student.successRate, 0) / students.length || 0)}%
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <BarChart2 className="text-white h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-orange-600 font-medium">Total Projects</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {students.reduce((acc, student) => acc + student.competitions.length, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <label htmlFor="search" className="sr-only">Search students</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Student List and Details */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading student data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Progress Overview
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Projects
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mentors
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map((student) => (
                        <tr 
                          key={student.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${selectedStudent?.id === student.id ? 'bg-blue-50' : ''}`}
                          onClick={() => handleStudentClick(student)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={student.avatar} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.skills.slice(0, 2).join(', ')}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 w-24">Success Rate</span>
                                <div className="flex-1 ml-2">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-600 h-2 rounded-full" 
                                      style={{ width: `${student.successRate}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 w-24">Team Contrib.</span>
                                <div className="flex-1 ml-2">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: `${student.teamContribution}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {student.competitions.filter(c => c.status === 'ongoing').length} Active
                            </div>
                            <div className="text-sm text-gray-500">
                              {student.competitions.filter(c => c.status === 'completed').length} Completed
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex -space-x-2">
                                {student.mentors.map((mentor, idx) => (
                                  <div 
                                    key={idx}
                                    className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                                    title={`${mentor.name} (${mentor.expertise})`}
                                  >
                                    {mentor.name.charAt(0)}
                                  </div>
                                ))}
                              </div>
                              <div className="ml-2 text-sm text-gray-500">
                                {getAverageRating(student.mentors).toFixed(1)} ★
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Student Details Panel */}
            <div className="lg:col-span-1">
              {selectedStudent ? (
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <img 
                        src={selectedStudent.avatar} 
                        alt={selectedStudent.name} 
                        className="h-16 w-16 rounded-full"
                      />
                      <div className="ml-4">
                        <h2 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h2>
                        <p className="text-sm text-gray-500">{selectedStudent.skills.join(' • ')}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Performance Metrics */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Project Completion</span>
                              <span className="text-sm font-medium text-gray-700">{selectedStudent.projectCompletion}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${selectedStudent.projectCompletion}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Team Contribution</span>
                              <span className="text-sm font-medium text-gray-700">{selectedStudent.teamContribution}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-green-600 h-2.5 rounded-full" 
                                style={{ width: `${selectedStudent.teamContribution}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Learning Progress</span>
                              <span className="text-sm font-medium text-gray-700">{selectedStudent.learningProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-purple-600 h-2.5 rounded-full" 
                                style={{ width: `${selectedStudent.learningProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Current Projects */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Projects</h3>
                        <div className="space-y-4">
                          {selectedStudent.competitions.map((competition, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">{competition.projectName}</h4>
                                  <p className="text-sm text-gray-500">{competition.name}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  competition.status === 'completed' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {competition.status}
                                </span>
                              </div>
                              <div className="mt-2">
                                <div className="flex flex-wrap gap-2">
                                  {competition.technologies.map((tech, techIdx) => (
                                    <span 
                                      key={techIdx}
                                      className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mentor Feedback */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Mentor Feedback</h3>
                        <div className="space-y-4">
                          {selectedStudent.mentors.map((mentor, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{mentor.name}</p>
                                <p className="text-sm text-gray-500">{mentor.expertise}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 mr-2">{mentor.rating}</span>
                                <span className="text-yellow-400">★</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                  Select a student to view detailed information
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProgress; 