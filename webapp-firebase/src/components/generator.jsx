import React, { useState, useEffect } from "react";
import { db, auth } from "../main";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Generator() {
  const [loading, setLoading] = useState(false);
  const [loadingClass, setLoadingClass] = useState(true);
  const [schedule, setSchedule] = useState(null);
  const [userClass, setUserClass] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user's class info using last 4 digits of their uniqueid
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("Please log in first.");
          setLoadingClass(false);
          return;
        }

        // Step 1: Get user doc by UID (created during signup)
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          setError("User data not found in Firestore.");
          setLoadingClass(false);
          return;
        }

        const data = userDoc.data();
        if (!data.uniqueid) {
          setError("Unique ID not found for this user.");
          setLoadingClass(false);
          return;
        }

        // Step 2: Get last 4 digits of the uniqueid
        const last4 = String(data.uniqueid).slice(-4);

        // Step 3: Fetch class document using last 4 digits
        const classDocRef = doc(db, "students", last4);
        const classDoc = await getDoc(classDocRef);

        if (classDoc.exists()) {
          const classData = classDoc.data();
          if (classData.class) {
            setUserClass(classData.class);
          } else {
            setError("Class info missing in document.");
          }
        } else {
          setError("No document found for ID: " + last4);
        }
      } catch (err) {
        console.error("Error fetching class:", err);
        setError("Error fetching class info.");
      } finally {
        setLoadingClass(false);
      }
    };

    fetchClass();
  }, []);

  // Subjects per class
  const subjectMap = {
    9: ["english", "maths", "science", "sst"],
    10: ["english", "maths", "science", "sst"],
  };

  const generateSchedule = async () => {
    if (!userClass) return alert("User class not found!");
    setLoading(true);

    try {
      const subjects = subjectMap[userClass];
      const syllabusTexts = [];

      // Fetch each subject's syllabus PDF
      for (const subj of subjects) {
        // Attempt to find the PDF dynamically (matching files ending with "-class-9.pdf" or "-class-10.pdf")
        const baseUrl = `https://raw.githubusercontent.com/IamDaGod-kira/generator-3s-kvb/main/pdfs/class9-10/syllabus/${subj}`;
        const pdfUrl = `${baseUrl}/${subj}-class-${userClass}.pdf`;

        const res = await fetch(pdfUrl);
        if (!res.ok) {
          console.warn(`Failed to fetch syllabus for ${subj} at ${pdfUrl}`);
          continue;
        }

        // In a real setup, this would parse PDF content; for now, placeholder text
        const pdfContent = `Syllabus content for ${subj}, class ${userClass}.`;

        syllabusTexts.push({ subject: subj, content: pdfContent });
      }

      if (syllabusTexts.length === 0) {
        alert("No syllabus files found for your class.");
        setLoading(false);
        return;
      }

      // Call your AI API
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
      const generatedSchedule = data.schedule || [];

      setSchedule(generatedSchedule);

      // Save schedule to Firestore
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "schedules", user.uid), {
          class: userClass,
          schedule: generatedSchedule,
          generatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Error generating schedule:", err);
      alert("Error generating schedule. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Smart Schedule Generator
      </h1>

      {loadingClass ? (
        <button
          disabled
          className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-xl"
        >
          Fetching class info...
        </button>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <button
          onClick={generateSchedule}
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold px-6 py-2 rounded-xl transition`}
        >
          {loading
            ? "Generating..."
            : `Generate Schedule for Class ${userClass}`}
        </button>
      )}

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
