import { PetRepository } from '../repositories/PetRepository'
import { Pet } from '@prisma/client'

export class PetService {
  private petRepository = new PetRepository()

  async getAllPets(): Promise<Pet[]> {
    return this.petRepository.getAllPets()
  }

  async getPetById(petId: string): Promise<Pet | null> {
    return this.petRepository.findById(petId)
  }

  async getPetsByOwner(ownerId: string): Promise<Pet[]> {
    return this.petRepository.findByOwnerId(ownerId)
  }

  async createPet(ownerId: string, name: string, type: string): Promise<Pet> {
    return this.petRepository.createPet(ownerId, name, type)
  }

  async updatePet(petId: string, data: Partial<Pet>): Promise<Pet | null> {
    return this.petRepository.updatePet(petId, data)
  }

  async deletePet(petId: string): Promise<Pet | null> {
    return this.petRepository.deletePet(petId)
  }
}
