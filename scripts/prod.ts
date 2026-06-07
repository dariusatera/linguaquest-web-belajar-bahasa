import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses (Ubah ke English dan bendera US/UK)
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "English", imageSrc: "/us.png" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Belajar dasar-dasar ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Belajar ${course.title} level menengah`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges (Soal diubah ke Bahasa Indonesia)
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Yang manakah "pria"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Yang manakah "wanita"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Yang manakah "anak laki-laki"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"pria"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Yang manakah "zombi"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Yang manakah "robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Yang manakah "anak perempuan"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"zombi"',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options (Jawaban diubah ke English)
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the man",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the robot",
                  imageSrc: "/robot.svg",
                  audioSrc: "/en_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the girl",
                  imageSrc: "/girl.svg",
                  audioSrc: "/en_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the zombie",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();