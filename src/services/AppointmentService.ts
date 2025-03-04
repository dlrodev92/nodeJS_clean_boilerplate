import { AppointmentRepository } from '../repositories/AppointmentRepository'
import { VetRepository } from '../repositories/VetRepository'
import { PetRepository } from '../repositories/PetRepository'
import { Appointment } from '@prisma/client'

export class AppointmentService {
  private appointmentRepository = new AppointmentRepository()
  private vetRepository = new VetRepository()
  private petRepository = new PetRepository()

  async bookAppointment(
    petId: string,
    vetId: string,
    userId: string,
    date: Date,
  ): Promise<Appointment> {
    const pet = await this.petRepository.findById(petId)
    if (!pet) throw new Error('Pet not found')
    if (pet.ownerId !== userId)
      throw new Error('Unauthorized: This pet does not belong to you')

    const vet = await this.vetRepository.findById(vetId)
    if (!vet) throw new Error('Vet not found')

    const existingAppointments =
      await this.appointmentRepository.findByVetId(vetId)
    if (
      existingAppointments.some(
        (appt) => appt.date.getTime() === date.getTime(),
      )
    ) {
      throw new Error('Vet is not available on this date')
    }

    return this.appointmentRepository.createAppointment(
      petId,
      vetId,
      userId,
      date,
    )
  }

  async getAppointmentById(appointmentId: string): Promise<Appointment | null> {
    return this.appointmentRepository.findById(appointmentId)
  }

  async getUserAppointments(userId: string): Promise<Appointment[]> {
    return this.appointmentRepository.findByUserId(userId)
  }

  async getVetAppointments(vetId: string): Promise<Appointment[]> {
    return this.appointmentRepository.findByVetId(vetId)
  }

  async rescheduleAppointment(
    appointmentId: string,
    newDate: Date,
  ): Promise<Appointment | null> {
    const appointment = await this.appointmentRepository.findById(appointmentId)
    if (!appointment) throw new Error('Appointment not found')

    const existingAppointments = await this.appointmentRepository.findByVetId(
      appointment.vetId,
    )
    if (
      existingAppointments.some(
        (appt) => appt.date.getTime() === newDate.getTime(),
      )
    ) {
      throw new Error('Vet is not available on this date')
    }

    return this.appointmentRepository.updateAppointment(appointmentId, {
      date: newDate,
    })
  }

  async cancelAppointment(appointmentId: string): Promise<Appointment | null> {
    const appointment = await this.appointmentRepository.findById(appointmentId)
    if (!appointment) throw new Error('Appointment not found')

    return this.appointmentRepository.deleteAppointment(appointmentId)
  }
}
