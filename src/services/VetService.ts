import { VetRepository } from '../repositories/VetRepository'
import { Vet } from '@prisma/client'

export class VetService {
  private vetRepository = new VetRepository()

  async getAllVets(): Promise<Vet[]> {
    return this.vetRepository.getAllVets()
  }

  async createVet(name: string, specialization: string): Promise<Vet> {
    return this.vetRepository.createVet(name, specialization)
  }

  async getVetById(vetId: string): Promise<Vet | null> {
    return this.vetRepository.findById(vetId)
  }

  async getVetsBySpecialization(specialization: string): Promise<Vet[]> {
    return this.vetRepository.findBySpecialization(specialization)
  }

  async updateVet(vetId: string, data: Partial<Vet>): Promise<Vet | null> {
    return this.vetRepository.updateVet(vetId, data)
  }

  async deleteVet(vetId: string): Promise<Vet | null> {
    return this.vetRepository.deleteVet(vetId)
  }
}
