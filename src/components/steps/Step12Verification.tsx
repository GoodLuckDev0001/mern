import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { setVerificationInfoField } from '../../store/slices/formSlice';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

export const Step12Verification: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const verificationInfo = useSelector((state: RootState) => state.form.verificationInfo);
  const [selectedTime, setSelectedTime] = useState('');

  const VERIFICATION_METHODS = [
    {
      value: 'office',
      label: t('verification_office_label'),
      description: t('verification_office_description'),
      icon: '🏢',
      requirements: ['Valid government-issued ID', 'Proof of address', 'Business documents']
    },
    {
      value: 'client_site',
      label: t('verification_client_site_label'),
      description: t('verification_client_site_description'),
      icon: '📍',
      requirements: ['Valid government-issued ID', 'Proof of address', 'Business documents', 'Suitable meeting space']
    },
    {
      value: 'video',
      label: t('verification_video_label'),
      description: t('verification_video_description'),
      icon: '📹',
      requirements: ['Valid government-issued ID', 'Stable internet connection', 'Quiet environment', 'Camera-enabled device']
    }
  ];

  const handleMethodChange = (method: string) => {
    dispatch(setVerificationInfoField({ field: 'verificationMethod', value: method }));
    if (method !== 'video') {
      dispatch(setVerificationInfoField({ field: 'videoDate', value: '' }));
      setSelectedTime('');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <section className="step" data-step="12">
      <h2 className="text-xl font-semibold mb-6" data-i18n="step12_title">12. Verification Method</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4" data-i18n="verification_method">
            {t('verification_method')} *
          </label>

          <div className="space-y-3">
            {VERIFICATION_METHODS.map((method) => (
              <div
                key={method.value}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  verificationInfo.verificationMethod === method.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleMethodChange(method.value)}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="verification_method"
                    value={method.value}
                    checked={verificationInfo.verificationMethod === method.value}
                    onChange={() => handleMethodChange(method.value)}
                    className="mt-1"
                    required
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{method.icon}</span>
                      <span className="font-medium text-gray-800">{method.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    <div className="text-xs text-gray-500">
                      <strong>Requirements:</strong>
                      <ul className="ml-2 mt-1 space-y-1">
                        {method.requirements.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Scheduling Section */}
        {verificationInfo.verificationMethod === 'video' && (
          <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
            <h3 className="font-medium text-blue-800 mb-4">📹 Video Identification Scheduling</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="video_date"
                  min={getMinDate()}
                  max={getMaxDate()}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={verificationInfo.videoDate}
                  onChange={(e) => dispatch(setVerificationInfoField({ field: 'videoDate', value: e.target.value }))}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Select a date between tomorrow and 30 days from now
                </p>
              </div>

              {verificationInfo.videoDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`px-3 py-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    All times are in Central European Time (CET/CEST)
                  </p>
                </div>
              )}
            </div>

            {/* Video Call Instructions */}
            <div className="mt-4 p-4 bg-white border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Video Call Instructions</h4>
              <div className="text-sm text-blue-700 space-y-2">
                <p><strong>Before the call:</strong></p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Ensure you have a stable internet connection</li>
                  <li>Find a quiet, well-lit environment</li>
                  <li>Have your ID documents ready</li>
                  <li>Test your camera and microphone</li>
                </ul>
                <p><strong>During the call:</strong></p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Show your ID documents clearly to the camera</li>
                  <li>Answer all verification questions truthfully</li>
                  <li>Follow the compliance officer's instructions</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Office Visit Information */}
        {verificationInfo.verificationMethod === 'office' && (
          <div className="p-6 border border-green-200 rounded-lg bg-green-50">
            <h3 className="font-medium text-green-800 mb-4">🏢 Centi Office Visit</h3>
            <div className="text-sm text-green-700 space-y-2">
              <p><strong>Address:</strong> Centi AG, Bahnhofstrasse 1, 8001 Zürich, Switzerland</p>
              <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM CET</p>
              <p><strong>Contact:</strong> +41 44 123 45 67 | compliance@centi.ch</p>
              <p className="mt-2">
                Please bring all required documents and arrive 10 minutes before your scheduled appointment.
              </p>
            </div>
          </div>
        )}

        {/* Client Site Visit Information */}
        {verificationInfo.verificationMethod === 'client_site' && (
          <div className="p-6 border border-purple-200 rounded-lg bg-purple-50">
            <h3 className="font-medium text-purple-800 mb-4">📍 Client Site Visit</h3>
            <div className="text-sm text-purple-700 space-y-2">
              <p>
                Our compliance representative will contact you within 2 business days to schedule the visit.
              </p>
              <p><strong>What to prepare:</strong></p>
              <ul className="ml-4 list-disc space-y-1">
                <li>A suitable meeting room or private space</li>
                <li>All required business documents</li>
                <li>Valid identification documents</li>
                <li>Proof of business address</li>
              </ul>
              <p className="mt-2">
                The visit typically takes 30-60 minutes and includes document verification and identity checks.
              </p>
            </div>
          </div>
        )}

        {/* Verification Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Verification Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Selected Method:</strong> {
                VERIFICATION_METHODS.find(m => m.value === verificationInfo.verificationMethod)?.label || 'Not selected'
              }
            </p>
            {verificationInfo.verificationMethod === 'video' && verificationInfo.videoDate && (
              <p>
                <strong>Scheduled:</strong> {verificationInfo.videoDate} {selectedTime && `at ${selectedTime}`}
              </p>
            )}
            <p className="mt-2">
              <strong>Next Steps:</strong> Our compliance team will contact you to confirm the verification details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
