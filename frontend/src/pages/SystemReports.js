import React, { useState, useEffect } from 'react';

const SystemReports = () => {
  const [reportData, setReportData] = useState({
    matchingStats: {},
    applicationStats: {},
    fundingStats: {},
    userEngagement: {},
    sustainabilityMetrics: {}
  });

  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('last30days');

  useEffect(() => {
    generateReportData();
  }, [dateRange]);

  const generateReportData = () => {
    // Generate comprehensive report data
    const matchingStats = {
      totalMatches: 1247,
      successfulMatches: 892,
      matchAccuracy: 71.5,
      avgMatchScore: 78.3,
      topIndustries: [
        { name: 'Manufacturing', matches: 345, success: 78 },
        { name: 'Automotive', matches: 234, success: 82 },
        { name: 'Agriculture', matches: 189, success: 65 },
        { name: 'ICT & Electronics', matches: 156, success: 73 },
        { name: 'Renewable Energy', matches: 123, success: 85 }
      ]
    };

    const applicationStats = {
      totalApplications: 456,
      submitted: 456,
      approved: 234,
      rejected: 89,
      pending: 133,
      approvalRate: 72.4,
      avgProcessingTime: 14.5,
      byFundingType: {
        'Grant': { total: 234, approved: 156, rate: 66.7 },
        'Loan': { total: 145, approved: 89, rate: 61.4 },
        'Equity': { total: 77, approved: 45, rate: 58.4 }
      }
    };

    const fundingStats = {
      totalFundingRequested: 45600000,
      totalFundingApproved: 23400000,
      avgFundingAmount: 156000,
      successRate: 51.3,
      byRange: {
        'R10K-R50K': { count: 189, approved: 145, amount: 4500000 },
        'R50K-R200K': { count: 156, approved: 89, amount: 12300000 },
        'R200K-R1M': { count: 78, approved: 34, amount: 18900000 },
        'R1M+': { count: 33, approved: 12, amount: 34500000 }
      }
    };

    const userEngagement = {
      dailyActiveUsers: 127,
      weeklyActiveUsers: 456,
      monthlyActiveUsers: 1234,
      avgSessionDuration: 24.5,
      bounceRate: 23.4,
      featureUsage: {
        'Profile Management': 89.2,
        'Funding Search': 78.6,
        'Application Draft': 67.3,
        'Document Upload': 45.7,
        'Review & Sign': 34.8
      }
    };

    const sustainabilityMetrics = {
      revenueStreams: {
        'Application Fees': 234000,
        'Premium Features': 89000,
        'Partner Commissions': 156000,
        'Training Services': 67000,
        'API Access': 23000
      },
      operatingCosts: {
        'Infrastructure': 89000,
        'Development': 156000,
        'Support': 45000,
        'Marketing': 34000,
        'Administration': 23000
      },
      profitability: 223000,
      growthRate: 23.4,
      customerAcquisitionCost: 145,
      lifetimeValue: 2340
    };

    setReportData({
      matchingStats,
      applicationStats,
      fundingStats,
      userEngagement,
      sustainabilityMetrics
    });
  };

  const exportReport = (format) => {
    const data = JSON.stringify(reportData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elidz-system-report-${new Date().toISOString().split('T')[0]}.${format}`;
    a.click();
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Matches</h3>
          <p className="text-3xl font-bold text-blue-600">{reportData.matchingStats.totalMatches}</p>
          <p className="text-sm text-green-600">↑ 23% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Applications</h3>
          <p className="text-3xl font-bold text-purple-600">{reportData.applicationStats.totalApplications}</p>
          <p className="text-sm text-green-600">↑ 18% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Funding Approved</h3>
          <p className="text-3xl font-bold text-green-600">R{(reportData.fundingStats.totalFundingApproved / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-green-600">↑ 34% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-orange-600">{reportData.fundingStats.successRate}%</p>
          <p className="text-sm text-green-600">↑ 5% from last month</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Industries</h3>
          <div className="space-y-3">
            {reportData.matchingStats.topIndustries?.map((industry, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{industry.name}</span>
                <div className="text-right">
                  <span className="font-medium text-blue-600">{industry.matches} matches</span>
                  <span className="text-xs text-green-600 ml-2">{industry.success}% success</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Approved</span>
              <span className="font-medium text-green-600">{reportData.applicationStats.approved}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Pending</span>
              <span className="font-medium text-yellow-600">{reportData.applicationStats.pending}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Rejected</span>
              <span className="font-medium text-red-600">{reportData.applicationStats.rejected}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-900">Approval Rate</span>
                <span className="font-bold text-blue-600">{reportData.applicationStats.approvalRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMatchingReport = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Matches Generated</h3>
          <p className="text-3xl font-bold text-blue-600">{reportData.matchingStats.totalMatches}</p>
          <p className="text-sm text-green-600">↑ 23% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Successful Matches</h3>
          <p className="text-3xl font-bold text-green-600">{reportData.matchingStats.successfulMatches}</p>
          <p className="text-sm text-green-600">↑ 18% conversion rate</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Match Accuracy</h3>
          <p className="text-3xl font-bold text-purple-600">{reportData.matchingStats.matchAccuracy}%</p>
          <p className="text-sm text-green-600">↑ 5% improvement</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Match Score</h3>
          <p className="text-3xl font-bold text-orange-600">{reportData.matchingStats.avgMatchScore}%</p>
          <p className="text-sm text-green-600">↑ 3% quality increase</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Matching Performance by Industry</h3>
          <div className="space-y-4">
            {reportData.matchingStats.topIndustries?.map((industry, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{industry.name}</span>
                  <span className="text-sm text-blue-600">{industry.success}% success</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{industry.matches} total matches</span>
                  <span>{Math.round(industry.matches * industry.success / 100)} successful</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${industry.success}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Matching Algorithm Performance</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Algorithm Efficiency</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Processing Speed</span>
                  <span className="font-medium text-green-900">0.3s avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Memory Usage</span>
                  <span className="font-medium text-green-900">12MB avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Accuracy Rate</span>
                  <span className="font-medium text-green-900">94.2%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Matching Criteria Weights</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Industry Match</span>
                  <span className="font-medium text-blue-900">40%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Funding Amount</span>
                  <span className="font-medium text-blue-900">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Location</span>
                  <span className="font-medium text-blue-900">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Business Age</span>
                  <span className="font-medium text-blue-900">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Quality Distribution</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">156</div>
            <div className="text-sm text-red-700">Low Matches (0-50%)</div>
            <div className="text-xs text-red-600">12.5% of total</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">298</div>
            <div className="text-sm text-yellow-700">Medium Matches (51-75%)</div>
            <div className="text-xs text-yellow-600">23.9% of total</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">567</div>
            <div className="text-sm text-green-700">High Matches (76-90%)</div>
            <div className="text-xs text-green-600">45.5% of total</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">226</div>
            <div className="text-sm text-blue-700">Excellent Matches (91-100%)</div>
            <div className="text-xs text-blue-600">18.1% of total</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Range Matching Success</h3>
          <div className="space-y-3">
            {Object.entries(reportData.fundingStats.byRange || {}).map(([range, data]) => (
              <div key={range} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium text-gray-900">{range}</span>
                  <div className="text-sm text-gray-600">{data.count} applications</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{Math.round((data.approved / data.count) * 100)}%</div>
                  <div className="text-xs text-gray-500">{data.approved} approved</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Matching Improvements</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-green-900">Algorithm Update v2.1</h4>
              <p className="text-sm text-green-700">Improved industry classification accuracy by 15%</p>
              <p className="text-xs text-gray-500">Deployed 2 weeks ago</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-blue-900">Location Weighting Enhancement</h4>
              <p className="text-sm text-blue-700">Better regional funding preference matching</p>
              <p className="text-xs text-gray-500">Deployed 1 month ago</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium text-purple-900">Machine Learning Integration</h4>
              <p className="text-sm text-purple-700">Added historical success pattern learning</p>
              <p className="text-xs text-gray-500">Deployed 6 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplicationReport = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-blue-600">{reportData.applicationStats.totalApplications}</p>
          <p className="text-sm text-green-600">↑ 18% from last period</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{reportData.applicationStats.approved}</p>
          <p className="text-sm text-green-600">{reportData.applicationStats.approvalRate}% approval rate</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Review</h3>
          <p className="text-3xl font-bold text-yellow-600">{reportData.applicationStats.pending}</p>
          <p className="text-sm text-yellow-600">Avg {reportData.applicationStats.avgProcessingTime} days</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{reportData.applicationStats.rejected}</p>
          <p className="text-sm text-red-600">{Math.round((reportData.applicationStats.rejected / reportData.applicationStats.totalApplications) * 100)}% rejection rate</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Pipeline</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full mr-3"></div>
                <span className="font-medium text-blue-900">Submitted</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{reportData.applicationStats.submitted}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-600 rounded-full mr-3"></div>
                <span className="font-medium text-yellow-900">Under Review</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{reportData.applicationStats.pending}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 rounded-full mr-3"></div>
                <span className="font-medium text-green-900">Approved</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{reportData.applicationStats.approved}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-600 rounded-full mr-3"></div>
                <span className="font-medium text-red-900">Rejected</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{reportData.applicationStats.rejected}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Rate by Funding Type</h3>
          <div className="space-y-4">
            {Object.entries(reportData.applicationStats.byFundingType || {}).map(([type, data]) => (
              <div key={type} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{type}</span>
                  <span className="text-lg font-bold text-blue-600">{data.rate}%</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{data.total} applications</span>
                  <span>{data.approved} approved</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${data.rate}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Processing Timeline</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2.3</div>
            <div className="text-sm text-blue-700">Days Avg</div>
            <div className="text-xs text-blue-600">Initial Review</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">5.7</div>
            <div className="text-sm text-yellow-700">Days Avg</div>
            <div className="text-xs text-yellow-600">Document Verification</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">3.2</div>
            <div className="text-sm text-purple-700">Days Avg</div>
            <div className="text-xs text-purple-600">Financial Assessment</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">2.8</div>
            <div className="text-sm text-orange-700">Days Avg</div>
            <div className="text-xs text-orange-600">Final Decision</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">14.0</div>
            <div className="text-sm text-green-700">Days Total</div>
            <div className="text-xs text-green-600">End-to-End</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Rejection Reasons</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded">
              <span className="text-sm text-red-700">Incomplete Documentation</span>
              <span className="font-bold text-red-600">34%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded">
              <span className="text-sm text-red-700">Insufficient Business History</span>
              <span className="font-bold text-red-600">28%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded">
              <span className="text-sm text-red-700">Financial Viability Concerns</span>
              <span className="font-bold text-red-600">22%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded">
              <span className="text-sm text-red-700">Industry Mismatch</span>
              <span className="font-bold text-red-600">16%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Quality Metrics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">High Quality Applications</h4>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Complete on First Submission</span>
                <span className="font-bold text-green-900">67%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">All Required Documents</span>
                <span className="font-bold text-green-900">78%</span>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Processing Efficiency</h4>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Auto-Approved (High Score)</span>
                <span className="font-bold text-blue-900">23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Fast-Track Eligible</span>
                <span className="font-bold text-blue-900">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Application Trends</h3>
        <div className="grid md:grid-cols-6 gap-4">
          {[
            { month: 'Jan', applications: 67, approved: 45 },
            { month: 'Feb', applications: 73, approved: 52 },
            { month: 'Mar', applications: 89, approved: 61 },
            { month: 'Apr', applications: 94, approved: 68 },
            { month: 'May', applications: 78, approved: 56 },
            { month: 'Jun', applications: 85, approved: 62 }
          ].map((data, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded">
              <div className="text-lg font-bold text-gray-900">{data.applications}</div>
              <div className="text-xs text-gray-600">{data.month} Applications</div>
              <div className="text-sm font-medium text-green-600">{data.approved} approved</div>
              <div className="text-xs text-green-500">{Math.round((data.approved/data.applications)*100)}% rate</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFundingReport = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Requested</h3>
          <p className="text-3xl font-bold text-blue-600">R{(reportData.fundingStats.totalFundingRequested / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-blue-600">456 applications</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Approved</h3>
          <p className="text-3xl font-bold text-green-600">R{(reportData.fundingStats.totalFundingApproved / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-green-600">{reportData.fundingStats.successRate}% success rate</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Amount</h3>
          <p className="text-3xl font-bold text-purple-600">R{reportData.fundingStats.avgFundingAmount.toLocaleString()}</p>
          <p className="text-sm text-purple-600">Per approved application</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Value</h3>
          <p className="text-3xl font-bold text-orange-600">R{((reportData.fundingStats.totalFundingRequested - reportData.fundingStats.totalFundingApproved) / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-orange-600">Under review</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Distribution by Range</h3>
          <div className="space-y-4">
            {Object.entries(reportData.fundingStats.byRange || {}).map(([range, data]) => (
              <div key={range} className="border-l-4 border-green-500 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{range}</span>
                  <span className="text-lg font-bold text-green-600">R{(data.amount / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{data.count} applications</span>
                  <span>{data.approved} approved ({Math.round((data.approved / data.count) * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{width: `${(data.approved / data.count) * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Funding Allocation</h3>
          <div className="space-y-3">
            {reportData.matchingStats.topIndustries?.map((industry, index) => {
              const fundingAmount = (industry.matches * 180000); // Estimated average
              return (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium text-gray-900">{industry.name}</span>
                    <div className="text-sm text-gray-600">{industry.matches} applications</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">R{(fundingAmount / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-gray-500">{industry.success}% success</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Impact Analysis</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-blue-700">Jobs Created</div>
            <div className="text-xs text-blue-600">Estimated impact</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">234</div>
            <div className="text-sm text-green-700">Businesses Supported</div>
            <div className="text-xs text-green-600">Active recipients</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">R89M</div>
            <div className="text-sm text-purple-700">Economic Impact</div>
            <div className="text-xs text-purple-600">GDP contribution</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">3.8x</div>
            <div className="text-sm text-orange-700">ROI Multiplier</div>
            <div className="text-xs text-orange-600">Economic return</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Provider Performance</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">ELIDZ Development Fund</span>
                <span className="text-lg font-bold text-blue-600">R12.3M</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>89 applications funded</span>
                <span>76% approval rate</span>
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">TIA Innovation Fund</span>
                <span className="text-lg font-bold text-green-600">R8.7M</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>67 applications funded</span>
                <span>82% approval rate</span>
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">AIDC Automotive Fund</span>
                <span className="text-lg font-bold text-purple-600">R6.4M</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>45 applications funded</span>
                <span>71% approval rate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span className="text-sm text-blue-700">Buffalo City (East London)</span>
              <span className="font-bold text-blue-600">R8.9M (38%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span className="text-sm text-green-700">Nelson Mandela Bay (PE)</span>
              <span className="font-bold text-green-600">R6.7M (29%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
              <span className="text-sm text-purple-700">King Sabata Dalindyebo</span>
              <span className="font-bold text-purple-600">R4.2M (18%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
              <span className="text-sm text-orange-700">Other Eastern Cape</span>
              <span className="font-bold text-orange-600">R3.6M (15%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Funding Trends</h3>
        <div className="grid md:grid-cols-6 gap-4">
          {[
            { month: 'Jan', requested: 6.2, approved: 4.1 },
            { month: 'Feb', requested: 7.8, approved: 5.3 },
            { month: 'Mar', requested: 8.9, approved: 6.2 },
            { month: 'Apr', requested: 9.4, approved: 6.8 },
            { month: 'May', requested: 7.6, approved: 5.4 },
            { month: 'Jun', requested: 8.3, approved: 5.8 }
          ].map((data, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded">
              <div className="text-lg font-bold text-gray-900">R{data.requested}M</div>
              <div className="text-xs text-gray-600">{data.month} Requested</div>
              <div className="text-sm font-medium text-green-600">R{data.approved}M</div>
              <div className="text-xs text-green-500">{Math.round((data.approved/data.requested)*100)}% approved</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Utilization Tracking</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Funds Disbursed</h4>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Total Disbursed</span>
                <span className="font-bold text-green-900">R18.7M (80%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Pending Disbursement</span>
                <span className="font-bold text-green-900">R4.7M (20%)</span>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Utilization Rate</h4>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Fully Utilized</span>
                <span className="font-bold text-blue-900">156 projects (67%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Partially Utilized</span>
                <span className="font-bold text-blue-900">78 projects (33%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Metrics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Business Growth</h4>
              <div className="flex justify-between">
                <span className="text-sm text-purple-700">Revenue Increase</span>
                <span className="font-bold text-purple-900">+47% avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-purple-700">Employment Growth</span>
                <span className="font-bold text-purple-900">+23% avg</span>
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Repayment Performance</h4>
              <div className="flex justify-between">
                <span className="text-sm text-orange-700">On-time Repayments</span>
                <span className="font-bold text-orange-900">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-orange-700">Default Rate</span>
                <span className="font-bold text-orange-900">3.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSustainabilityReport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Self-Funding Sustainability Model</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-green-900 mb-4">Revenue Streams</h4>
            <div className="space-y-3">
              {Object.entries(reportData.sustainabilityMetrics.revenueStreams || {}).map(([stream, amount]) => (
                <div key={stream} className="flex justify-between">
                  <span className="text-sm text-gray-700">{stream}</span>
                  <span className="font-medium text-green-600">R{amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total Revenue</span>
                  <span className="font-bold text-green-600">
                    R{Object.values(reportData.sustainabilityMetrics.revenueStreams || {}).reduce((a, b) => a + b, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-red-900 mb-4">Operating Costs</h4>
            <div className="space-y-3">
              {Object.entries(reportData.sustainabilityMetrics.operatingCosts || {}).map(([cost, amount]) => (
                <div key={cost} className="flex justify-between">
                  <span className="text-sm text-gray-700">{cost}</span>
                  <span className="font-medium text-red-600">R{amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total Costs</span>
                  <span className="font-bold text-red-600">
                    R{Object.values(reportData.sustainabilityMetrics.operatingCosts || {}).reduce((a, b) => a + b, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-900">Net Profitability</span>
            <span className="text-2xl font-bold text-blue-600">R{reportData.sustainabilityMetrics.profitability?.toLocaleString()}</span>
          </div>
          <p className="text-sm text-blue-700 mt-2">
            Growth Rate: {reportData.sustainabilityMetrics.growthRate}% | 
            CAC: R{reportData.sustainabilityMetrics.customerAcquisitionCost} | 
            LTV: R{reportData.sustainabilityMetrics.lifetimeValue}
          </p>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="text-lg font-semibold text-green-900 mb-3">Proposed Sustainability Strategies</h4>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• <strong>Tiered Subscription Model:</strong> Basic (Free), Premium (R299/month), Enterprise (R999/month)</li>
            <li>• <strong>Transaction Fees:</strong> 2.5% commission on successful funding matches</li>
            <li>• <strong>Value-Added Services:</strong> Business consulting, training programs, compliance services</li>
            <li>• <strong>API Monetization:</strong> Third-party integrations and data access</li>
            <li>• <strong>Partnership Revenue:</strong> Revenue sharing with funding institutions</li>
            <li>• <strong>Government Contracts:</strong> White-label solutions for other development zones</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">System Reports & Analytics</h1>
          
          <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="overview">System Overview</option>
                <option value="matching">Matching Analytics</option>
                <option value="applications">Application Reports</option>
                <option value="funding">Funding Analysis</option>
                <option value="engagement">User Engagement</option>
                <option value="sustainability">Sustainability Model</option>
              </select>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="lastyear">Last Year</option>
              </select>
              
              <div className="flex gap-2">
                <button
                  onClick={() => exportReport('json')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => exportReport('csv')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {selectedReport === 'overview' && renderOverviewReport()}
        {selectedReport === 'matching' && renderMatchingReport()}
        {selectedReport === 'applications' && renderApplicationReport()}
        {selectedReport === 'funding' && renderFundingReport()}
        {selectedReport === 'sustainability' && renderSustainabilityReport()}
        
        {/* Add other report types as needed */}
        {selectedReport !== 'overview' && selectedReport !== 'matching' && selectedReport !== 'applications' && selectedReport !== 'funding' && selectedReport !== 'sustainability' && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Report
            </h3>
            <p className="text-gray-600">
              Detailed {selectedReport} analytics and reports will be displayed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemReports;