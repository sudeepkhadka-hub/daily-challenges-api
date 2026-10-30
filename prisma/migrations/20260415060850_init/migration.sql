-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "emoji" VARCHAR(10),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "category_id" INTEGER,
    "difficulty" VARCHAR(20),
    "date" DATE NOT NULL,
    "completed" BOOLEAN DEFAULT false,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_challenges" (
    "user_id" VARCHAR(50) NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "completed" BOOLEAN DEFAULT false,
    "date" DATE DEFAULT CURRENT_DATE,

    CONSTRAINT "user_challenges_pkey" PRIMARY KEY ("user_id","challenge_id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "user_id" VARCHAR(50) NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("user_id","category_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_unique" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_challenges" ADD CONSTRAINT "user_challenges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
