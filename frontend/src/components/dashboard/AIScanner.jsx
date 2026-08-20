import React, { useState, useRef } from 'react';
import api from '../../services/api';
import { FaRobot, FaUpload, FaCamera, FaSearch, FaCheckCircle, FaTimes, FaExclamationTriangle, FaEdit } from 'react-icons/fa';

const FIELDS = [
  { key: 'patientName',  label: 'Patient Name' },
  { key: 'age',          label: 'Age' },
  { key: 'gender',       label: 'Gender' },
  { key: 'doctorName',   label: 'Doctor' },
  { key: 'diagnosis',    label: 'Diagnosis' },
  { key: 'symptoms',     label: 'Symptoms' },
  { key: 'prescription', label: 'Prescription' },
  { key: 'reportDate',   label: 'Report Date' },
  { key: 'notes',        label: 'Additional Notes' },
];

const AIScanner = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview]     = useState(null);
  const [file, setFile]           = useState(null);
  const [scanning, setScanning]   = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [editData, setEditData]   = useState({});
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState('');

  const handleFileSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setScanResult(null);
    setSaved(false);
    setError('');
    const reader = new FileReader();
    reader.onload = ev => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleScan = async () => {
    if (!file) return setError('Please select an image first.');
    setScanning(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const { data } = await api.post('/ai/scan-document', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data.success) {
        setScanResult(data.data);
        setEditData({ ...data.data });
      } else {
        setError(data.message || 'Scan failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed. Ensure backend is running.');
    } finally {
      setScanning(false);
    }
  };

  const handleSave = async () => {
    if (!scanResult) return;
    setSaving(true);
    try {
      const { data } = await api.post('/ai/verify-scan', {
        scanId: scanResult.scanId,
        verifiedData: editData,
      });
      if (data.success) {
        setSaved(true);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setPreview(null); setFile(null); setScanResult(null);
    setEditData({}); setSaved(false); setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <FaRobot className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Medical Information Scanner</h2>
            <p className="text-blue-200 text-xs">Upload or scan a medical document to extract information with AI/OCR</p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm">
        <FaExclamationTriangle className="flex-shrink-0 mt-0.5 text-amber-500" />
        <p>
          <strong>AI Extracted — Verify Required.</strong> AI extracted information may contain errors.
          Please review and verify all fields before saving to a medical record.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <FaUpload className="text-blue-500" /> Upload Document
          </h3>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-56 mx-auto rounded-xl object-contain shadow" />
            ) : (
              <div className="space-y-2">
                <FaUpload className="text-4xl text-slate-300 mx-auto" />
                <p className="text-sm text-slate-500">Click to upload JPG, PNG, or PDF</p>
                <p className="text-xs text-slate-400">Max 5MB</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef} type="file"
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {file && (
            <p className="text-xs text-slate-500 truncate">
              📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleScan}
              disabled={!file || scanning}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50"
            >
              <FaSearch className={scanning ? 'animate-spin' : ''} />
              {scanning ? 'Scanning with AI…' : 'Scan with AI'}
            </button>
            {(preview || scanResult) && (
              <button onClick={handleReset}
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-300 transition">
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <FaEdit className="text-teal-500" /> Extracted Information
            {scanResult && (
              <span className="ml-auto text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-semibold">
                AI Extracted — Verify Required
              </span>
            )}
          </h3>

          {!scanResult && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-300 dark:text-slate-700 space-y-2">
              <FaRobot className="text-5xl" />
              <p className="text-sm">Extracted data will appear here after scanning.</p>
            </div>
          )}

          {scanResult && (
            <div className="space-y-3">
              {FIELDS.map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={editData[key] || ''}
                    onChange={e => setEditData(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              ))}

              {scanResult.confidence !== undefined && (
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <span>AI Confidence:</span>
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${scanResult.confidence > 70 ? 'bg-emerald-500' : scanResult.confidence > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${scanResult.confidence}%` }}
                    />
                  </div>
                  <span className="font-bold">{scanResult.confidence}%</span>
                </div>
              )}

              {saved ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 text-sm font-bold">
                  <FaCheckCircle /> Medical record saved successfully!
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave} disabled={saving}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <FaCheckCircle />
                    {saving ? 'Saving…' : 'Verify & Save'}
                  </button>
                  <button onClick={handleReset}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-300 text-sm transition">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIScanner;
