// CIPC Registration Verification Service
export class CIPCService {
  // Mock CIPC database with ID verification for ELIDZ partner industries
  static mockCIPCDatabase = [
    {
      registrationNumber: '2019/123456/07',
      companyName: 'AutoTech Manufacturing (Pty) Ltd',
      status: 'Active',
      registrationDate: '2019-05-15',
      businessType: 'Private Company',
      industry: 'Automotive',
      directors: [
        { name: 'John Smith', idNumber: '8501015800083', role: 'CEO' },
        { name: 'Jane Doe', idNumber: '9003127890054', role: 'CTO' }
      ],
      registeredAddress: 'East London IDZ, Buffalo City Municipality, Eastern Cape'
    },
    {
      registrationNumber: '2020/654321/23',
      companyName: 'Green Energy Solutions CC',
      status: 'Active',
      registrationDate: '2020-03-10',
      businessType: 'Close Corporation',
      industry: 'Renewable Energy',
      directors: [
        { name: 'Mike Johnson', idNumber: '7809123456789', role: 'Managing Member' }
      ],
      registeredAddress: 'Coega IDZ, Nelson Mandela Bay Municipality, Eastern Cape'
    },
    {
      registrationNumber: 'CK2021789012',
      companyName: 'Smart Electronics Hub (Pty) Ltd',
      status: 'Active',
      registrationDate: '2021-08-22',
      businessType: 'Private Company',
      industry: 'ICT and Electronics',
      directors: [
        { name: 'Sarah Wilson', idNumber: '8712094567890', role: 'CEO' },
        { name: 'David Brown', idNumber: '9205081234567', role: 'CTO' }
      ],
      registeredAddress: 'Mthatha, King Sabata Dalindyebo Municipality, Eastern Cape'
    },
    {
      registrationNumber: '2018/987654/07',
      companyName: 'Precision Manufacturing (Pty) Ltd',
      status: 'Active',
      registrationDate: '2018-11-30',
      businessType: 'Private Company',
      industry: 'Manufacturing',
      directors: [
        { name: 'Mary Johnson', idNumber: '8306157890123', role: 'Managing Director' },
        { name: 'Peter Davis', idNumber: '7511289012345', role: 'Operations Director' }
      ],
      registeredAddress: 'Port Elizabeth, Nelson Mandela Bay Municipality, Eastern Cape'
    },
    {
      registrationNumber: '2022/111222/07',
      companyName: 'AgriTech Solutions (Pty) Ltd',
      status: 'Active',
      registrationDate: '2022-01-15',
      businessType: 'Private Company',
      industry: 'Agriculture',
      directors: [
        { name: 'Tom Wilson', idNumber: '8904123456789', role: 'CEO' }
      ],
      registeredAddress: 'Queenstown, Chris Hani District Municipality, Eastern Cape'
    },
    {
      registrationNumber: '2023/555666/07',
      companyName: 'Automotive Parts Manufacturing (Pty) Ltd',
      status: 'Deregistered',
      registrationDate: '2023-03-10',
      businessType: 'Private Company',
      industry: 'Automotive',
      directors: [
        { name: 'Robert Smith', idNumber: '8001015800084', role: 'CEO' }
      ],
      registeredAddress: 'Grahamstown, Makana Municipality, Eastern Cape'
    }
  ];

  static validateRegistrationFormat(registrationNumber) {
    // CIPC registration number formats:
    // Private Company: YYYY/NNNNNN/NN
    // Close Corporation: CKYYYYNNNNNN
    // Public Company: Similar to private
    
    if (!registrationNumber || registrationNumber.trim() === '') {
      return false;
    }
    
    const cleanNumber = registrationNumber.trim();
    
    const patterns = [
      /^\d{4}\/\d{6}\/\d{2}$/, // Private/Public Company format: 2019/123456/07
      /^CK\d{10}$/, // Close Corporation format: CK2021789012
      /^\d{10}$/ // Alternative format: 1234567890
    ];

    return patterns.some(pattern => pattern.test(cleanNumber));
  }

  static validateIDNumber(idNumber) {
    // South African ID number validation - simplified for demo
    if (!idNumber || idNumber.trim() === '') {
      return false;
    }
    
    const cleanId = idNumber.trim().replace(/\s/g, '');
    
    // Check if it's exactly 13 digits
    if (!/^\d{13}$/.test(cleanId)) {
      return false;
    }
    
    // For demo purposes, accept any 13-digit number
    // In production, you would implement full SA ID validation
    return true;
  }

  static async verifyCIPCRegistration(registrationNumber, companyName = null, directorIdNumber = null) {
    // Simulate real-time CIPC database query with multiple verification steps
    console.log('Initiating CIPC Database Verification...');
    
    // Step 1: Connect to CIPC Database
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Connected to CIPC Database');
    
    // Step 2: Query company registration
    await new Promise(resolve => setTimeout(resolve, 600));
    console.log('Querying company registration records...');
    
    // Step 3: Cross-reference director ID
    await new Promise(resolve => setTimeout(resolve, 700));
    console.log('Cross-referencing director ID number...');

    // Validate format first
    if (!this.validateRegistrationFormat(registrationNumber)) {
      return {
        success: false,
        error: 'Invalid CIPC registration number format',
        details: 'Please enter a valid CIPC registration number (e.g., 2019/123456/07 or CK2019123456)'
      };
    }

    // Search in CIPC database with detailed logging
    console.log(`Searching for registration: ${registrationNumber}`);
    const company = this.mockCIPCDatabase.find(
      record => record.registrationNumber.toLowerCase() === registrationNumber.toLowerCase()
    );

    if (!company) {
      console.log('Company not found in CIPC database');
      return {
        success: false,
        error: 'Business does not exist in CIPC database',
        details: `Registration number ${registrationNumber} was not found in the official CIPC records. Please verify the registration number is correct.`,
        verificationSteps: [
          'Connected to CIPC Database',
          'Registration format validated',
          'Registration number not found in database'
        ]
      };
    }
    
    console.log(`Company found: ${company.companyName}`);

    if (company.status !== 'Active') {
      console.log(`Company status check failed: ${company.status}`);
      return {
        success: false,
        error: 'Company is not active',
        details: `Company status: ${company.status}. Only active companies can register for funding.`,
        verificationSteps: [
          'Connected to CIPC Database',
          'Registration number found',
          `Company status: ${company.status} (must be Active)`
        ]
      };
    }
    
    console.log('Company status verified: Active');

    // Optional: Verify company name if provided
    if (companyName && company.companyName.toLowerCase() !== companyName.toLowerCase()) {
      console.log(`Company name mismatch. Expected: ${company.companyName}`);
      return {
        success: false,
        error: 'Company name mismatch',
        details: `The company name does not match CIPC records. Expected: ${company.companyName}`,
        verificationSteps: [
          'Connected to CIPC Database',
          'Registration number found',
          'Company status: Active',
          `Company name mismatch (Expected: ${company.companyName})`
        ]
      };
    }
    
    if (companyName) {
      console.log('Company name verified');
    }

    // Mandatory: Verify director ID number (Enhanced Security Feature)
    if (!directorIdNumber) {
      console.log('Director ID number not provided');
      return {
        success: false,
        error: 'Director ID number required for enhanced security',
        details: 'Please provide the ID number of a registered director for verification',
        verificationSteps: [
          'Connected to CIPC Database',
          'Registration number found',
          'Company status: Active',
          'Director ID number required'
        ]
      };
    }

    console.log(`Validating ID number format: ${directorIdNumber}`);
    // Validate ID number format
    if (!this.validateIDNumber(directorIdNumber)) {
      console.log('Invalid ID number format');
      return {
        success: false,
        error: 'Invalid South African ID number format',
        details: 'Please enter a valid 13-digit South African ID number',
        verificationSteps: [
          'Connected to CIPC Database',
          'Registration number found',
          'Company status: Active',
          'Invalid ID number format'
        ]
      };
    }
    
    console.log('ID number format validated');
    console.log('Cross-referencing director ID with company records...');
    
    // Verify director ID number matches CIPC records
    const directorMatch = company.directors.find(
      director => director.idNumber === directorIdNumber
    );

    if (!directorMatch) {
      console.log('Director ID verification failed - No match found');
      return {
        success: false,
        error: 'Director verification failed - Business does not exist',
        details: `The ID number ${directorIdNumber} does not match any registered director for company ${company.companyName}. This indicates the business registration and ID combination does not exist in CIPC records.`,
        verificationSteps: [
          'Connected to CIPC Database',
          'Registration number found',
          'Company status: Active',
          'ID number format validated',
          'Director ID not found in company records'
        ]
      };
    }
    
    console.log(`Director verified: ${directorMatch.name} (${directorMatch.role})`);
    console.log('CIPC verification completed successfully!');

    return {
      success: true,
      data: {
        registrationNumber: company.registrationNumber,
        companyName: company.companyName,
        status: company.status,
        registrationDate: company.registrationDate,
        businessType: company.businessType,
        directors: company.directors,
        industry: company.industry,
        registeredAddress: company.registeredAddress,
        verifiedDirector: directorMatch,
        verificationDate: new Date().toISOString(),
        verificationId: `VER-${Date.now()}`
      },
      verificationSteps: [
        'Connected to CIPC Database',
        'Registration number found and verified',
        'Company status: Active',
        'ID number format validated',
        'Director ID verified in company records',
        'Enhanced security verification completed'
      ],
      securityLevel: 'ENHANCED',
      message: 'Business registration and director identity successfully verified through CIPC database'
    };
  }

  static async checkSMMEEligibility(companyData, additionalInfo) {
    // SMME criteria in South Africa:
    // Small: < 50 employees, < R13M turnover
    // Medium: < 200 employees, < R51M turnover
    // Micro: < 5 employees, < R150K turnover

    const { employeeCount, annualTurnover } = additionalInfo;
    
    let category = 'Not Eligible';
    let eligible = false;

    if (employeeCount < 5 && annualTurnover < 150000) {
      category = 'Micro Enterprise';
      eligible = true;
    } else if (employeeCount < 50 && annualTurnover < 13000000) {
      category = 'Small Enterprise';
      eligible = true;
    } else if (employeeCount < 200 && annualTurnover < 51000000) {
      category = 'Medium Enterprise';
      eligible = true;
    }

    return {
      eligible,
      category,
      criteria: {
        employeeCount: employeeCount < 200,
        turnoverLimit: annualTurnover < 51000000,
        activeStatus: companyData.status === 'Active'
      }
    };
  }
}