// dataAccess/lawRepository.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Save multiple laws to the database
 * @param laws - Array of law objects to be saved
 */
export const saveLaws = async (laws) => {
  try {
    await prisma.law.createMany({
      data: laws.map((law) => ({
        sagId: law.id,
        title: law.titel,
        typeId: law.typeid,
        statusId: law.statusid,
        description: law.resume,
      })),
      skipDuplicates: true, // Skips rows that already exist (based on sagId being unique)
    });
    console.log('Laws have been saved successfully');
  } catch (error) {
    console.error('Error saving laws to the database:', error);
    throw error;
  }
};
