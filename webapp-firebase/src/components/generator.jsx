import React, { useState, useEffect } from "react";
import { db, auth } from "../main";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";

export default function Generator() {
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [userClass, setUserClass] = useState(null);

  // Fetch user's class from Firestore
  useEffect(() => {
    const fetchUserClass = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(collection(db, "students"), where("email", "==", user.email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          setUserClass(userData.class || 9);
        } else {
          console.warn("No matching student document found.");
        }
      } catch (err) {
        console.error("Error fetching class:", err);
      }
    };

    fetchUserClass();
  }, []);

  // Subject list per class
  const subjectMap = {
    1: ["english", "math", "evs"],
    2: ["english", "math", "evs"],
    3: ["english", "math", "science", "sst"],
    4: ["english", "math", "science", "sst"],
    5: ["english", "math", "science", "sst"],
    6: ["english", "math", "science", "sst", "computer"],
    7: ["english", "math", "science", "sst", "computer"],
    8: ["english", "math", "science", "sst", "computer"],
    9: ["math", "science", "english", "history", "geography"],
    10: ["math", "science", "english", "history", "economics"],
  };

  const generateSchedule = async () => {
    if (!userClass) return alert("User class not found!");
    setLoading(true);

    try {
      const subjects = subjectMap[userClass] || [];
      const syllabusTexts = [];

      // Fetch each subject syllabus from GitHub
      for (const subj of subjects) {
        const pdfUrl = `https://raw.githubusercontent.com/IamDaGod-kira/master/pdf/class${userClass}/syllabus/${subj}/syllabus.pdf`;

        const res = await fetch(pdfUrl);
        if (!res.ok) {
          console.warn(`Failed to fetch ${subj} syllabus`);
          continue;
        }

        // Placeholder — ideally parse actual PDF content
        const pdfContent = `Syllabus content for ${subj}`;
        syllabusTexts.push({ subject: subj, content: pdfContent });
      }

      // Call AI API (URL in your .env)
      const aiRes = await fetch(import.meta.env.VITE_AIAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Create a detailed study schedule for Class ${userClass} using this syllabus: ${JSON.stringify(
            syllabusTexts
          )}. Include daily hours, subject focus, revision days, and test preparation.`,
        }),
      });

      const data = await aiRes.json();
      const finalSchedule = data.schedule || [];
      setSchedule(finalSchedule);

      // Save generated schedule
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "students"), where("email", "==", user.email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          await setDoc(
            doc(db, "schedules", userDoc.id),
            {
              class: userClass,
              schedule: finalSchedule,
              generatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }
      }
    } catch (err) {
      console.error("Error generating schedule:", err);
      alert("Failed to generate schedule. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Smart Schedule Generator
      </h1>

      <button
        onClick={generateSchedule}
        disabled={loading || !userClass}
        className={`${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold px-6 py-2 rounded-xl transition`}
      >
        {loading ? "Generating..." : `Generate Class ${userClass} Schedule`}
      </button>

      {schedule && schedule.length > 0 && (
        <div className="mt-8 w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
            Generated Schedule
          </h2>
          <div className="space-y-3">
            {schedule.map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
              >
                <p className="font-medium text-gray-800">
                  {item.subject || `Subject ${i + 1}`}
                </p>
                <p className="text-sm text-gray-600">
                  {item.hoursPerDay
                    ? `${item.hoursPerDay} hrs/day`
                    : "Duration: not specified"}
                </p>
                {item.notes && (
                  <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
