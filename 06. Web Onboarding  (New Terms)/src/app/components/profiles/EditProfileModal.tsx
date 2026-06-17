import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, GraduationCap, MapPin, FileText, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    title: string;
    bio: string;
    location: string;
    experiences: Experience[];
    education: Education[];
  }) => void;
  initialData?: {
    name: string;
    title: string;
    bio: string;
    location: string;
    experiences: Experience[];
    education: Education[];
  };
}

export function EditProfileModal({ isOpen, onClose, onSave, initialData }: EditProfileModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [name, setName] = useState(initialData?.name || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [bio, setBio] = useState(initialData?.bio || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [experiences, setExperiences] = useState<Experience[]>(initialData?.experiences || []);
  const [education, setEducation] = useState<Education[]>(initialData?.education || []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setTitle(initialData.title);
      setBio(initialData.bio);
      setLocation(initialData.location);
      setExperiences(initialData.experiences);
      setEducation(initialData.education);
    }
  }, [initialData]);

  const handleSave = () => {
    onSave({
      name,
      title,
      bio,
      location,
      experiences,
      education,
    });
    onClose();
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      year: '',
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl ${
                isDark ? 'bg-[#1a1d29]' : 'bg-white'
              }`}
            >
              {/* Header */}
              <div className={`px-6 py-5 border-b flex items-center justify-between ${
                isDark ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Edit Experience Details
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-6 space-y-6">
                {/* Basic Info */}
                

                {/* Professional Experience */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Professional Experience
                    </h3>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  {experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className={`p-4 rounded-xl border ${
                        isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Building2 className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Experience {index + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDark 
                              ? 'bg-slate-900 border-slate-600 text-white' 
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                          placeholder="Job Title"
                        />

                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDark 
                              ? 'bg-slate-900 border-slate-600 text-white' 
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                          placeholder="Company"
                        />

                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              isDark 
                                ? 'bg-slate-900 border-slate-600 text-white' 
                                : 'bg-white border-slate-300 text-slate-900'
                            }`}
                            placeholder="Start Date (e.g., Jan 2020)"
                          />

                          <input
                            type="text"
                            value={exp.isCurrent ? 'Present' : exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.isCurrent}
                            className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                              isDark 
                                ? 'bg-slate-900 border-slate-600 text-white disabled:opacity-50' 
                                : 'bg-white border-slate-300 text-slate-900 disabled:opacity-50'
                            }`}
                            placeholder="End Date"
                          />
                        </div>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={exp.isCurrent}
                            onChange={(e) => updateExperience(exp.id, 'isCurrent', e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            I currently work here
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Education
                    </h3>
                    <button
                      onClick={addEducation}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  {education.map((edu, index) => (
                    <div
                      key={edu.id}
                      className={`p-4 rounded-xl border ${
                        isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <GraduationCap className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Education {index + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className={`p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 transition-colors`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDark 
                              ? 'bg-slate-900 border-slate-600 text-white' 
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                          placeholder="Degree (e.g., MBA in Human Resources)"
                        />

                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDark 
                              ? 'bg-slate-900 border-slate-600 text-white' 
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                          placeholder="Institution"
                        />

                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            isDark 
                              ? 'bg-slate-900 border-slate-600 text-white' 
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                          placeholder="Year (e.g., 2015)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className={`px-6 py-4 border-t flex items-center gap-3 ${
                isDark ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <button
                  onClick={onClose}
                  className={`flex-1 px-6 py-2.5 rounded-xl font-semibold transition-colors ${
                    isDark 
                      ? 'text-slate-300 hover:bg-slate-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}