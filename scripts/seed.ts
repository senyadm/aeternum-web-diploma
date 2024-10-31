const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Computer science' },
        { name: 'Algorithms and Data Structures' },
        { name: 'Web Development' },
        { name: 'Frontend Development' },
        { name: 'Backend Development' },
        { name: 'Web3 Development' },
        { name: 'IoT: Internet of Things' },
        { name: 'Smart technologies' },
        { name: 'DevOps' },
        { name: 'Native Mobile Development' },
        { name: 'Cross-platform Mobile Development' },
        { name: 'Competitive programming' },
      ],
    })
  } catch (error) {
    console.log('Error:', error)
  } finally {
    await database.$disconnect()
  }
}

main()
