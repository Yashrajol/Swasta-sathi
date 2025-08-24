import mongoose, { Document, Schema } from 'mongoose';
import { Appointment } from '../types/index.ts';

export interface AppointmentDocument extends Appointment, Document {}

const appointmentSchema = new Schema<AppointmentDocument>({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: [0, 'Age cannot be negative'],
    max: [150, 'Age cannot exceed 150']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  symptoms: {
    type: String,
    required: true,
    trim: true
  },
  preferredDate: {
    type: String,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['en', 'hi', 'mr'],
    default: 'en'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  medicalReportId: {
    type: Schema.Types.ObjectId,
    ref: 'MedicalReport'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
appointmentSchema.index({ patientId: 1 });
appointmentSchema.index({ doctorId: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ preferredDate: 1 });
appointmentSchema.index({ createdAt: -1 });

// Virtual for formatted date
appointmentSchema.virtual('formattedDate').get(function() {
  return new Date(this.preferredDate).toLocaleDateString();
});

// Ensure virtuals are serialized
appointmentSchema.set('toJSON', { virtuals: true });

export default mongoose.model<AppointmentDocument>('Appointment', appointmentSchema); 