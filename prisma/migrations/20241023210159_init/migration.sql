-- CreateTable
CREATE TABLE "Law" (
    "id" SERIAL NOT NULL,
    "sagId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Law_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Law_sagId_key" ON "Law"("sagId");
