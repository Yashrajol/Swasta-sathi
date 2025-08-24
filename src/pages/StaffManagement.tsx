import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Shield,
  Activity,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { staffService } from '../services/staffService';
import { Staff, StaffActivity } from '../types';

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [activities, setActivities] = useState<StaffActivity[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('staff');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterStaff();
  }, [staff, searchQuery, roleFilter, statusFilter]);

  const loadData = () => {
    const allStaff = staffService.getAllStaff();
    const recentActivities = staffService.getStaffActivities(20);
    const analyticsData = staffService.getStaffAnalytics();
    
    setStaff(allStaff);
    setActivities(recentActivities);
    setAnalytics(analyticsData);
  };

  const filterStaff = () => {
    let filtered = staff;

    // Filter by search query
    if (searchQuery) {
      filtered = staffService.searchStaff(searchQuery);
    }

    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(s => s.role === roleFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => 
        statusFilter === 'active' ? s.isActive : !s.isActive
      );
    }

    setFilteredStaff(filtered);
  };

  const handleStatusToggle = (staffId: string, currentStatus: boolean) => {
    if (currentStatus) {
      staffService.deactivateStaff(staffId);
    } else {
      staffService.activateStaff(staffId);
    }
    loadData();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'doctor':
        return 'bg-blue-100 text-blue-800';
      case 'nurse':
        return 'bg-green-100 text-green-800';
      case 'receptionist':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'staff', label: 'Staff Members', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: Activity },
            { id: 'activities', label: 'Recent Activities', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Staff Members Tab */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add Staff Member</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, role, or specialization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="admin">Admin</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {member.isActive ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                  {member.specialization && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>{member.specialization}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Joined: {formatDate(member.joinedAt)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSelectedStaff(member);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleStatusToggle(member.id, member.isActive)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                      member.isActive
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {member.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No staff members found</p>
            </div>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && analytics && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Staff Analytics</h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Staff</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalStaff}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Staff</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.activeStaff}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inactive Staff</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.inactiveStaff}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Recent Activities</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.recentActivities.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Role Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Staff by Role</h3>
              <div className="space-y-3">
                {Object.entries(analytics.roleDistribution).map(([role, count]) => (
                  <div key={role} className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(role)}`}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </span>
                    <span className="font-medium">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff Workload */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Staff Activity</h3>
              <div className="space-y-3">
                {analytics.staffWorkload.slice(0, 5).map((staff: any) => (
                  <div key={staff.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{staff.name}</p>
                      <p className="text-sm text-gray-600">{staff.role}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      {staff.activityCount} activities
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
          
          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              {activities.map((activity) => (
                <div key={activity.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">{activity.action}</h4>
                        <span className="text-sm text-gray-500">{formatDateTime(activity.timestamp)}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{activity.details}</p>
                      <p className="text-sm text-gray-500 mt-2">By: {activity.staffName}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {activities.length === 0 && (
                <div className="p-8 text-center">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No recent activities</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Staff Details Modal */}
      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Staff Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong className="text-gray-700">Name:</strong>
                  <p className="text-gray-900">{selectedStaff.name}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Role:</strong>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedStaff.role)}`}>
                    {selectedStaff.role.charAt(0).toUpperCase() + selectedStaff.role.slice(1)}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700">Email:</strong>
                  <p className="text-gray-900">{selectedStaff.email}</p>
                </div>
                <div>
                  <strong className="text-gray-700">Phone:</strong>
                  <p className="text-gray-900">{selectedStaff.phone}</p>
                </div>
                {selectedStaff.specialization && (
                  <div>
                    <strong className="text-gray-700">Specialization:</strong>
                    <p className="text-gray-900">{selectedStaff.specialization}</p>
                  </div>
                )}
                <div>
                  <strong className="text-gray-700">Status:</strong>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                    selectedStaff.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedStaff.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-700">Joined:</strong>
                  <p className="text-gray-900">{formatDate(selectedStaff.joinedAt)}</p>
                </div>
              </div>
              
              {/* Permissions */}
              <div>
                <strong className="text-gray-700">Permissions:</strong>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {Object.entries(selectedStaff.permissions).map(([permission, hasPermission]) => (
                    <div key={permission} className="flex items-center space-x-2">
                      {hasPermission ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm text-gray-700">
                        {permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
              <a
                href={`tel:${selectedStaff.phone}`}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </a>
              
              <a
                href={`mailto:${selectedStaff.email}`}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
              
              <button
                onClick={() => handleStatusToggle(selectedStaff.id, selectedStaff.isActive)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedStaff.isActive
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {selectedStaff.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                <span>{selectedStaff.isActive ? 'Deactivate' : 'Activate'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;