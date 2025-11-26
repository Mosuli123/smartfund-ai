import React, { useState, useEffect } from 'react';

const DocumentUpload = ({ user }) => {
  const [documents, setDocuments] = useState({
    cipc_certificate: null,
    tax_clearance: null,
    bank_statements: null,
    financial_statements: null,
    business_plan: null,
    id_document: null,
    proof_of_address: null,
    bee_certificate: null
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const documentTypes = [
    { key: 'cipc_certificate', label: 'CIPC Registration Certificate', required: true },
    { key: 'tax_clearance', label: 'Tax Clearance Certificate', required: true },
    { key: 'bank_statements', label: 'Bank Statements (6 months)', required: true },
    { key: 'financial_statements', label: 'Financial Statements', required: true },
    { key: 'business_plan', label: 'Business Plan', required: true },
    { key: 'id_document', label: 'ID Document', required: true },
    { key: 'proof_of_address', label: 'Proof of Address', required: false },
    { key: 'bee_certificate', label: 'BEE Certificate', required: false }
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const saved = localStorage.getItem('userDocuments');
    if (saved) {
      setDocuments(JSON.parse(saved));
    }
  };

  const handleFileUpload = (docType, file) => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const updatedDocs = {
        ...documents,
        [docType]: {
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date().toISOString(),
          status: 'uploaded'
        }
      };
      
      setDocuments(updatedDocs);
      localStorage.setItem('userDocuments', JSON.stringify(updatedDocs));
      setMessage(`${file.name} uploaded successfully!`);
      setUploading(false);
      
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const removeDocument = (docType) => {
    const updatedDocs = {
      ...documents,
      [docType]: null
    };
    setDocuments(updatedDocs);
    localStorage.setItem('userDocuments', JSON.stringify(updatedDocs));
    setMessage('Document removed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const getCompletionPercentage = () => {
    const requiredDocs = documentTypes.filter(doc => doc.required);
    const uploadedRequired = requiredDocs.filter(doc => documents[doc.key]).length;
    return Math.round((uploadedRequired / requiredDocs.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200 py-8">
      <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Upload</h1>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-blue-900 font-medium">Completion Status</span>
              <span className="text-blue-700 font-bold">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md border border-green-400">
            {message}
          </div>
        )}

        <div className="space-y-6">
          {documentTypes.map((docType) => (
            <div key={docType.key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {docType.label}
                    {docType.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {docType.required ? 'Required document' : 'Optional document'}
                  </p>
                </div>
                
                {documents[docType.key] && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    ✓ Uploaded
                  </span>
                )}
              </div>

              {documents[docType.key] ? (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{documents[docType.key].name}</p>
                      <p className="text-sm text-gray-600">
                        {(documents[docType.key].size / 1024 / 1024).toFixed(2)} MB • 
                        Uploaded {new Date(documents[docType.key].uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeDocument(docType.key)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id={docType.key}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(docType.key, e.target.files[0])}
                    disabled={uploading}
                  />
                  <label
                    htmlFor={docType.key}
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

        {uploading && (
          <div className="mt-6 text-center">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p className="text-gray-600">Uploading document...</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default DocumentUpload;